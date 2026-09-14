// Opt-in Tailwind design-system audit: runs the @shadcn/lint rules as
// warnings. Separate from eslint.config.mjs so the audit cannot fail CI.
// Run with: pnpm run lint:tailwind
//
// Rules are scoped to what the Frost design language (DESIGN.md) actually
// enforces. The exclusions below are deliberate, not deferred work.
import tseslint from "typescript-eslint";
import { plugin as shadcn } from "@shadcn/lint";
import next from "@next/eslint-plugin-next";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
      "components/UI/Website/404/aav1-player.es.js",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // @next/next is registered without rules so the source's inline
    // eslint-disable comments resolve to a known rule in this config too.
    // Those directives serve eslint.config.mjs, where the rule is active, so
    // this audit must not report them as unused.
    plugins: { shadcn, "@next/next": next },
    linterOptions: { reportUnusedDisableDirectives: "off" },
    settings: {
      shadcn: {
        note: "See DESIGN.md for the Frost design language.",
      },
    },
    rules: {
      "shadcn/no-restyle": ["warn", { allow: ["layout"] }],
      // not-prose is a @tailwindcss/typography marker matched inside :not()
      // selectors; it is never emitted as a utility, so the rule cannot see it.
      "shadcn/no-unknown-classes": ["warn", { allow: ["not-prose"] }],
      "shadcn/no-arbitrary-values": "warn",
      "shadcn/no-raw-colors": "warn",
      "shadcn/no-inline-styles": "warn",
      "shadcn/require-static-classes": "warn",
    },
  },
  {
    // Traced SVG artwork: fill/stroke are geometry, not themeable styling.
    files: ["components/UI/Graphic/icons/**"],
    rules: { "shadcn/no-raw-colors": "off" },
  },
  {
    // Deliberate macOS terminal mock; its palette is intentionally outside
    // the site theme, including the literal window-control colours.
    files: ["app/not-found.tsx"],
    rules: {
      "shadcn/no-raw-colors": "off",
      "shadcn/no-arbitrary-values": "off",
    },
  },
  {
    // glass-tint / glow-blob decorative gradients. The theme declares four
    // colours, so multi-hue blooms have no token equivalent by design.
    files: [
      "app/(root)/error.tsx",
      "components/UI/Homepage/WelcomeCard.tsx",
      "components/UI/Blog/Series.tsx",
    ],
    rules: { "shadcn/no-raw-colors": "off" },
  },
  {
    // Animated or per-instance transforms that cannot be static classes.
    files: [
      "components/UI/Animation/Depth3D.tsx",
      "components/MDX/Layouts/Dialog.tsx",
      "components/MDX/Layouts/Diagram.tsx",
    ],
    rules: { "shadcn/no-inline-styles": "off" },
  },
);
