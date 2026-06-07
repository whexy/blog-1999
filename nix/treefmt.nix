# Shared treefmt config, consumed by nix/formatter.nix (`nix fmt`) and the
# treefmt git-hook in nix/checks/pre-commit-check.nix.
_: {
  projectRootFile = "flake.nix";

  programs.nixfmt.enable = true;

  programs.prettier = {
    enable = true;
    includes = [
      "*.ts"
      "*.tsx"
      "*.js"
      "*.jsx"
      "*.mjs"
      "*.json"
      "*.css"
      "*.md"
      "*.mdx"
      "*.yaml"
      "*.yml"
    ];
    # Respect the repo .prettierrc (print width 70, double quotes, tailwind plugin).
    settings = { };
  };

  settings.global.excludes = [
    "node_modules/*"
    ".next/*"
    "pnpm-lock.yaml"
    "*.lock"
    "public/*"
    "data/blog/*"
  ];
}
