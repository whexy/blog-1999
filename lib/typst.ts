/**
 * Utilities for Typst post compilation and metadata extraction.
 *
 * Typst posts declare their metadata using the built-in #metadata()
 * function with a <post-meta> label:
 *
 *   #metadata((
 *     title: "My Post",
 *     summary: "A short description",
 *     publishDate: "2026-06-16",
 *     lang: "en",          // optional: "en" | "zh"
 *     series: "My Series", // optional
 *   )) <post-meta>
 *
 * Both `queryTypstMetadata` and `compileTypstToHtml` invoke the typst
 * binary synchronously — they are intended for build-time SSG only.
 *
 * HTML export is an in-development feature in Typst (requires
 * --features html). Behaviour may change across Typst versions.
 * See: https://github.com/typst/typst/issues/5512
 */

import { execFileSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Binary resolution
// ---------------------------------------------------------------------------

/**
 * Resolve the typst binary path.
 *
 * Precedence:
 *   1. TYPST_BIN env var — explicit override
 *   2. node_modules/.bin/typst — installed by scripts/install-typst.mjs
 *      (present on Vercel CI and after `pnpm run build` locally)
 *   3. "typst" — rely on PATH (Nix dev shell, system install)
 */
function resolveTypstBin(): string {
  if (process.env.TYPST_BIN) {
    return process.env.TYPST_BIN;
  }
  const local = path.resolve("node_modules/.bin/typst");
  if (existsSync(local)) {
    return local;
  }
  return "typst";
}

const TYPST_BIN = resolveTypstBin();

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Language = "en" | "zh";

export interface TypstMetadata {
  title: string;
  summary: string;
  publishDate: string;
  lang?: Language;
  series?: string;
}

/** Shape of one entry in the JSON array returned by `typst eval`. */
interface TypstEvalEntry {
  func: string;
  value: unknown;
  label: string;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Extract the <post-meta> value from a .typ file.
 * Returns a partial because some optional fields may be absent.
 * Throws if the binary fails or no <post-meta> label is found.
 *
 * Requires Typst ≥ 0.15 (`typst eval` subcommand).
 * On Vercel: installed automatically by `prebuild` (scripts/install-typst.mjs).
 * Locally: run `nix develop` for the correct version from the flake.
 */
export function queryTypstMetadata(
  filePath: string,
): Partial<TypstMetadata> {
  let stdout: string;
  try {
    // typst eval outputs JSON by default; stderr carries only warnings.
    stdout = execFileSync(
      TYPST_BIN,
      ["eval", "query(<post-meta>)", "--in", filePath],
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
    );
  } catch (err) {
    throw new Error(
      `typst eval failed for ${filePath}.\n` +
        `Binary: ${TYPST_BIN}\n` +
        `Requires typst ≥ 0.15. On Vercel this is installed automatically.\n` +
        `Locally, run \`nix develop\` to get the correct version.\n` +
        `Underlying error: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  const entries: TypstEvalEntry[] = JSON.parse(stdout);
  const entry = entries.find(e => e.label === "<post-meta>");

  if (!entry) {
    throw new Error(
      `No <post-meta> label found in Typst file: ${filePath}`,
    );
  }

  const v = entry.value as Record<string, string>;

  const result: Partial<TypstMetadata> = {
    title: v.title,
    summary: v.summary,
    publishDate: v.publishDate,
    series: v.series,
  };

  if (v.lang === "en" || v.lang === "zh") {
    result.lang = v.lang;
  }

  return result;
}

/**
 * Compile a .typ file to HTML using `typst compile --features html`
 * and return only the inner HTML of the <body> element.
 *
 * The returned string is safe to inject via dangerouslySetInnerHTML
 * inside a server component — no user-supplied content is eval'd.
 */
export function compileTypstToHtml(filePath: string): string {
  // stderr contains the "html export is experimental" warning; discard it.
  const fullHtml = execFileSync(
    TYPST_BIN,
    [
      "compile",
      "--features",
      "html",
      "--format",
      "html",
      filePath,
      "-",
    ],
    { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
  );

  // Extract everything between <body> and </body>.
  const match = /<body>([\s\S]*?)<\/body>/.exec(fullHtml);
  if (!match) {
    throw new Error(
      `Typst HTML output contained no <body> element: ${filePath}`,
    );
  }

  return match[1].trim();
}
