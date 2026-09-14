import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import { plugin as shadcn } from "@shadcn/lint";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
      // Vendored / pre-built bundle (minified), not authored source.
      "components/UI/Website/404/aav1-player.es.js",
      // Audit-only config, linted via its own script.
      "eslint.shadcn.mjs",
    ],
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    // Registered so the rules can be adopted per-rule over time; the audit
    // sweep lives in eslint.shadcn.mjs. No rules enabled here yet.
    plugins: { shadcn },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
);
