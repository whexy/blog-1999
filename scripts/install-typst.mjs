/**
 * Download the Typst binary for the current platform and place it in
 * node_modules/.bin/typst so it is on PATH during `pnpm run build`.
 *
 * Run automatically via the `prebuild` npm lifecycle hook.
 * Safe to re-run: skips the download if the correct version is already
 * present (checked by running `typst --version`).
 *
 * The target version is read from TYPST_VERSION env var, falling back
 * to the hardcoded TYPST_DEFAULT_VERSION constant below.
 */

import { execFileSync, execSync } from "child_process";
import { chmodSync, createWriteStream, mkdirSync } from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import os from "os";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const TYPST_DEFAULT_VERSION = "0.15.0";
const version = process.env.TYPST_VERSION ?? TYPST_DEFAULT_VERSION;

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
// Version check — skip download if already correct
// ---------------------------------------------------------------------------

function installedVersion() {
  try {
    const out = execFileSync(dest, ["--version"], {
      encoding: "utf-8",
    });
    // output: "typst 0.15.0 (3ae52774)\n"
    const m = /typst (\S+)/.exec(out);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

if (installedVersion() === version) {
  console.log(
    `typst ${version} already installed at ${dest}, skipping.`,
  );
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

const tmpTar = path.join(os.tmpdir(), asset);
await pipeline(response.body, createWriteStream(tmpTar));

// ---------------------------------------------------------------------------
// Extract
// ---------------------------------------------------------------------------

// Find the binary entry inside the archive (path: typst-<triple>/typst).
const listing = execSync(`tar -tJf ${JSON.stringify(tmpTar)}`, {
  encoding: "utf-8",
});
const binaryEntry = listing
  .split("\n")
  .find(line => /(?:^|\/)typst$/.test(line.trim()));

if (!binaryEntry) {
  throw new Error(
    `Could not find typst binary inside archive.\nListing:\n${listing}`,
  );
}

const tmpDir = os.tmpdir();
execSync(
  `tar -xJf ${JSON.stringify(tmpTar)} -C ${JSON.stringify(tmpDir)} ${JSON.stringify(binaryEntry.trim())}`,
);

const extractedBin = path.join(tmpDir, binaryEntry.trim());

// ---------------------------------------------------------------------------
// Install
// ---------------------------------------------------------------------------

mkdirSync(binDir, { recursive: true });

try {
  // Prefer rename (atomic, same-device).
  const { renameSync } = await import("fs");
  renameSync(extractedBin, dest);
} catch {
  // Cross-device fallback.
  execSync(
    `cp ${JSON.stringify(extractedBin)} ${JSON.stringify(dest)}`,
  );
  execSync(`rm -f ${JSON.stringify(extractedBin)}`);
}

chmodSync(dest, 0o755);
execSync(`rm -f ${JSON.stringify(tmpTar)}`);

// ---------------------------------------------------------------------------
// Verify
// ---------------------------------------------------------------------------

const installed = installedVersion();
if (installed !== version) {
  throw new Error(
    `Typst installation verification failed: ` +
      `expected ${version}, got ${installed ?? "nothing"}.`,
  );
}

console.log(`typst ${version} installed successfully.`);
