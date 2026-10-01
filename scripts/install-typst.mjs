/**
 * Download the Typst binary for the current platform and place it in
 * node_modules/.bin/typst so it is on PATH during `pnpm run build`.
 *
 * Run automatically via the `prebuild` npm lifecycle hook.
 * Skips the download when a suitable binary already exists:
 *   - TYPST_BIN is set (explicit override, e.g. a Nix store path);
 *   - node_modules/.bin/typst already reports the target version;
 *   - a `typst` on PATH (Nix dev shell, system install) reports the
 *     target version.
 *
 * The target version is read from TYPST_VERSION env var, falling back
 * to the hardcoded TYPST_DEFAULT_VERSION constant below.
 *
 * Integrity: typst does not publish checksum files with its releases,
 * so the SHA-256 of each default-version asset is pinned below
 * (computed from the official release downloads). A download whose
 * hash does not match is rejected. Custom TYPST_VERSIONs have no
 * pinned hash and are installed with a warning.
 */

import { execFileSync } from "child_process";
import { createHash } from "crypto";
import {
  chmodSync,
  copyFileSync,
  createWriteStream,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
} from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import os from "os";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const TYPST_DEFAULT_VERSION = "0.15.0";
const version = process.env.TYPST_VERSION ?? TYPST_DEFAULT_VERSION;

/** SHA-256 of the v0.15.0 release assets. */
const pinnedSha256 = {
  "0.15.0": {
    "typst-x86_64-unknown-linux-musl.tar.xz":
      "59b207df01be2dab9f13e80f73d04d7ff8273ffd46b3dd1b9eef5c60f3eeabea",
    "typst-aarch64-unknown-linux-musl.tar.xz":
      "cdf50ffc7b8ba759ed02200632eda3d78eb8b99aacb6611f4f75684990647620",
    "typst-x86_64-apple-darwin.tar.xz":
      "30210c7c539c7954db94c063cd98b43fd0a0cad285d656dbbce2a40aee2e79be",
    "typst-aarch64-apple-darwin.tar.xz":
      "fe53838737abf93a774495952a1a797b4686e9c4a21c2d99b9fdf77f46cc3572",
  },
};

// Destination: node_modules/.bin/typst (on PATH for all npm/pnpm scripts).
const binDir = path.resolve("node_modules/.bin");
const dest = path.join(binDir, "typst");

// ---------------------------------------------------------------------------
// Platform → asset name mapping
// ---------------------------------------------------------------------------

function getAssetName() {
  const arch = os.arch(); // 'x64', 'arm64'
  const platform = os.platform(); // 'linux', 'darwin', 'win32'

  if (platform === "linux") {
    if (arch === "x64")
      return "typst-x86_64-unknown-linux-musl.tar.xz";
    if (arch === "arm64")
      return "typst-aarch64-unknown-linux-musl.tar.xz";
  }
  if (platform === "darwin") {
    if (arch === "x64") return "typst-x86_64-apple-darwin.tar.xz";
    if (arch === "arm64") return "typst-aarch64-apple-darwin.tar.xz";
  }
  throw new Error(
    `Unsupported platform/arch for Typst binary: ${platform}/${arch}. ` +
      `Install typst ${version} manually and ensure it is on PATH.`,
  );
}

// ---------------------------------------------------------------------------
// Version check — skip download if a suitable binary already exists
// ---------------------------------------------------------------------------

/** Version reported by `<bin> --version`, or null if not runnable. */
function versionOf(bin) {
  try {
    const out = execFileSync(bin, ["--version"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    // output: "typst 0.15.0 (3ae52774)\n"
    const m = /typst (\S+)/.exec(out);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

if (process.env.TYPST_BIN) {
  console.log(
    `TYPST_BIN is set (${process.env.TYPST_BIN}), skipping download.`,
  );
  process.exit(0);
}

if (versionOf(dest) === version) {
  console.log(
    `typst ${version} already installed at ${dest}, skipping.`,
  );
  process.exit(0);
}

// `pnpm run` puts node_modules/.bin first on PATH, so this only finds
// a system/Nix typst when the local one is missing or outdated.
if (versionOf("typst") === version) {
  console.log(`typst ${version} found on PATH, skipping download.`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Download
// ---------------------------------------------------------------------------

const asset = getAssetName();
const url = `https://github.com/typst/typst/releases/download/v${version}/${asset}`;

console.log(`Installing typst ${version}`);
console.log(`  from: ${url}`);
console.log(`  to:   ${dest}`);

const response = await fetch(url, { redirect: "follow" });
if (!response.ok) {
  throw new Error(
    `Failed to download typst: ${response.status} ${response.statusText}`,
  );
}

const workDir = mkdtempSync(path.join(os.tmpdir(), "typst-install-"));
const tmpTar = path.join(workDir, asset);

try {
  await pipeline(response.body, createWriteStream(tmpTar));

  // -------------------------------------------------------------------------
  // Verify integrity
  // -------------------------------------------------------------------------

  const expected = pinnedSha256[version]?.[asset];
  const actual = createHash("sha256")
    .update(readFileSync(tmpTar))
    .digest("hex");
  if (expected) {
    if (actual !== expected) {
      throw new Error(
        `typst download checksum mismatch for ${asset}:\n` +
          `  expected ${expected}\n  got      ${actual}`,
      );
    }
  } else {
    console.warn(
      `No pinned checksum for typst ${version} (${asset}); ` +
        `skipping verification. sha256: ${actual}`,
    );
  }

  // -------------------------------------------------------------------------
  // Extract
  // -------------------------------------------------------------------------

  // Find the binary entry inside the archive (path: typst-<triple>/typst).
  const listing = execFileSync("tar", ["-tJf", tmpTar], {
    encoding: "utf-8",
  });
  const binaryEntry = listing
    .split("\n")
    .map(line => line.trim())
    .find(line => /(?:^|\/)typst$/.test(line));

  if (!binaryEntry) {
    throw new Error(
      `Could not find typst binary inside archive.\nListing:\n${listing}`,
    );
  }

  execFileSync("tar", ["-xJf", tmpTar, "-C", workDir, binaryEntry]);
  const extractedBin = path.join(workDir, binaryEntry);

  // -------------------------------------------------------------------------
  // Install
  // -------------------------------------------------------------------------

  mkdirSync(binDir, { recursive: true });

  // Stage next to the destination, then rename: atomic, so an
  // interrupted install never leaves a truncated binary at `dest`.
  const staged = `${dest}.tmp-${process.pid}`;
  copyFileSync(extractedBin, staged);
  chmodSync(staged, 0o755);
  renameSync(staged, dest);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// Verify
// ---------------------------------------------------------------------------

const installed = versionOf(dest);
if (installed !== version) {
  throw new Error(
    `Typst installation verification failed: ` +
      `expected ${version}, got ${installed ?? "nothing"}.`,
  );
}

console.log(`typst ${version} installed successfully.`);
