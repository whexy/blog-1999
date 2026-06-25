/**
 * Utilities for compiling inline Typst programs to SVG.
 *
 * Used by lib/remark-typst.ts at MDX compile time (SSR/SSG).
 * SVG content is returned as a string and inlined directly into the
 * rendered HTML — no files are written to the source tree.
 *
 * Hot-reload cache: compiled SVGs are stored in the OS temp directory
 * at `<tmpdir>/typst-blog-cache/<hash>.svg` so repeated requests to
 * the same page during `pnpm dev` skip the typst invocation.
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
  writeFileSync,
} from "fs";
import { tmpdir } from "os";
import path from "path";

// ---------------------------------------------------------------------------
// Binary resolution
// ---------------------------------------------------------------------------

function resolveTypstBin(): string {
  if (process.env.TYPST_BIN) return process.env.TYPST_BIN;
  const local = path.resolve("node_modules/.bin/typst");
  if (existsSync(local)) return local;
  return "typst";
}

const TYPST_BIN = resolveTypstBin();

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

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Hash the final Typst program (preamble + user code).
 * Returns a 16-character hex string used as the cache key.
 */
export function hashTypstProgram(userCode: string): string {
  return createHash("sha256")
    .update(PREAMBLE + userCode)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Compile a Typst program to SVG and return the SVG string.
 *
 * The preamble is prepended automatically. Results are cached in the
 * OS temp directory keyed by the program hash so that repeated calls
 * with the same source (e.g. during `pnpm dev` hot-reload) skip the
 * typst invocation entirely.
 *
 * Throws with a descriptive message if typst is not found or compilation
 * fails.
 */
export function compileTypstToSvg(userCode: string): string {
  const hash = hashTypstProgram(userCode);
  const cachedSvg = path.join(CACHE_DIR, `${hash}.svg`);

  // Cache hit — return the stored SVG without re-invoking typst.
  if (existsSync(cachedSvg)) {
    return readFileSync(cachedSvg, "utf-8");
  }

  const program = PREAMBLE + userCode;

  // Write the program to a temp .typ source file.
  mkdirSync(CACHE_DIR, { recursive: true });
  const srcFile = path.join(CACHE_DIR, `${hash}.typ`);
  writeFileSync(srcFile, program, "utf-8");

  // Compile to SVG. stderr carries only warnings; we discard it.
  try {
    execFileSync(
      TYPST_BIN,
      ["compile", "--format", "svg", srcFile, cachedSvg],
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
    );
  } catch (err) {
    throw new Error(
      `typst compilation failed.\n` +
        `Binary: ${TYPST_BIN}\n` +
        `Source:\n${program}\n` +
        `Underlying error: ${err instanceof Error ? err.message : String(err)}\n\n` +
        `Tip: ensure typst is available. In the Nix dev shell run \`nix develop\`.\n` +
        `On Vercel, typst is installed automatically via the prebuild script.`,
    );
  }

  return readFileSync(cachedSvg, "utf-8");
}
