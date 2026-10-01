/**
 * Utilities for compiling inline Typst programs to SVG.
 *
 * Used by lib/remark-typst.ts at MDX compile time (SSR/SSG).
 * SVG content is returned as a string and inlined directly into the
 * rendered HTML — no files are written to the source tree.
 *
 * Hot-reload cache: compiled SVGs are stored in the OS temp directory
 * at `<tmpdir>/typst-blog-cache/<hash>.svg` so repeated requests to
 * the same page during `pnpm dev` skip the typst invocation. The hash
 * covers the typst version too, so upgrading typst invalidates it.
 *
 * Typst binary resolution order:
 *   1. TYPST_BIN env var  — explicit override
 *   2. node_modules/.bin/typst  — installed by scripts/install-typst.mjs
 *      (present on Vercel CI and after `pnpm run build` locally)
 *   3. "typst"  — rely on PATH (Nix dev shell, system install)
 */

import { createHash } from "crypto";
import { execFileSync } from "child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import path from "path";

// ---------------------------------------------------------------------------
// Binary resolution
//
// Resolved lazily (on first compile, not at module load) so merely
// importing this module does no filesystem work. The
// `turbopackIgnore` hint keeps Turbopack's file tracer from treating
// the cwd-relative path and the dynamic binary path as dependencies,
// which would otherwise make it trace the whole project into the
// server output.
// ---------------------------------------------------------------------------

interface TypstToolchain {
  bin: string;
  /** `typst --version` output; part of the cache key. */
  version: string;
}

let toolchain: TypstToolchain | undefined;

function resolveTypstBin(): string {
  if (process.env.TYPST_BIN) return process.env.TYPST_BIN;
  const local = path.join(
    /*turbopackIgnore: true*/ process.cwd(),
    "node_modules",
    ".bin",
    "typst",
  );
  if (existsSync(local)) return local;
  return "typst";
}

const installTip =
  "Tip: ensure typst is available. In the Nix dev shell run " +
  "`nix develop`.\nOn Vercel, typst is installed automatically " +
  "via the prebuild script.";

function getToolchain(): TypstToolchain {
  if (toolchain) return toolchain;
  const bin = resolveTypstBin();
  let version: string;
  try {
    version = execFileSync(
      /*turbopackIgnore: true*/ bin,
      ["--version"],
      {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "pipe"],
      },
    ).trim();
  } catch (err) {
    throw new Error(
      `typst binary not usable (${bin}): ` +
        `${err instanceof Error ? err.message : String(err)}\n\n` +
        installTip,
    );
  }
  toolchain = { bin, version };
  return toolchain;
}

// ---------------------------------------------------------------------------
// Default preamble
//
// Prepended to every inline Typst program so the SVG is compact and
// auto-sized. Users write only the content; page setup is handled here.
// ---------------------------------------------------------------------------

const PREAMBLE = `#set page(width: auto, height: auto, margin: 8pt)\n`;

// ---------------------------------------------------------------------------
// Temp-dir cache
// ---------------------------------------------------------------------------

const CACHE_DIR = path.join(tmpdir(), "typst-blog-cache");

/**
 * Hash the typst version and the final program (preamble + user
 * code). Returns a 16-character hex string used as the cache key.
 */
function hashTypstProgram(version: string, program: string): string {
  return createHash("sha256")
    .update(version)
    .update("\0")
    .update(program)
    .digest("hex")
    .slice(0, 16);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Compile a Typst program to SVG and return the SVG string.
 *
 * The preamble is prepended automatically. Results are cached in the
 * OS temp directory keyed by typst version + program hash so that
 * repeated calls with the same source (e.g. during `pnpm dev`
 * hot-reload) skip the typst invocation entirely.
 *
 * Throws with a descriptive message if typst is not found or
 * compilation fails.
 */
export function compileTypstToSvg(userCode: string): string {
  const { bin, version } = getToolchain();
  const program = PREAMBLE + userCode;
  const hash = hashTypstProgram(version, program);
  const cachedSvg = path.join(CACHE_DIR, `${hash}.svg`);

  // Cache hit — return the stored SVG without re-invoking typst.
  if (existsSync(cachedSvg)) {
    return readFileSync(cachedSvg, "utf-8");
  }

  // Per-process file names so concurrent build workers compiling the
  // same program never clobber each other's in-progress files.
  mkdirSync(CACHE_DIR, { recursive: true });
  const unique = `${hash}.${process.pid}`;
  const srcFile = path.join(CACHE_DIR, `${unique}.typ`);
  const tmpSvg = path.join(CACHE_DIR, `${unique}.svg.tmp`);
  writeFileSync(srcFile, program, "utf-8");

  // Compile to a temp file, then rename into place (atomic): an
  // interrupted compile can never leave a truncated cached SVG.
  // stderr carries only warnings; we discard it on success.
  try {
    execFileSync(
      /*turbopackIgnore: true*/ bin,
      ["compile", "--format", "svg", srcFile, tmpSvg],
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
    );
    renameSync(tmpSvg, cachedSvg);
  } catch (err) {
    rmSync(tmpSvg, { force: true });
    throw new Error(
      `typst compilation failed.\n` +
        `Binary: ${bin} (${version})\n` +
        `Source:\n${program}\n` +
        `Underlying error: ${err instanceof Error ? err.message : String(err)}\n\n` +
        installTip,
    );
  } finally {
    rmSync(srcFile, { force: true });
  }

  return readFileSync(cachedSvg, "utf-8");
}
