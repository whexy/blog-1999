# Default devshell: `nix develop`
# Provides a reproducible Node.js + pnpm toolchain for blog-1999 and installs
# the git-hooks.nix pre-commit hook.
{
  inputs,
  pkgs,
  perSystem,
  ...
}:
let
  pre-commit-check = import ./pre-commit-check.nix { inherit inputs pkgs; };
in
pkgs.mkShell {
  packages = [
    pkgs.nodejs_22
    pkgs.pnpm_10
    pkgs.typescript
    pkgs.git
    perSystem.self.typst
    perSystem.self.tinymist
  ]
  ++ pre-commit-check.enabledPackages;

  shellHook = ''
    ${pre-commit-check.shellHook}

    export PS1="(blog-1999) $PS1"

    echo "blog-1999 dev shell"
    echo "  node $(node --version)  pnpm $(pnpm --version)"
    echo ""
    echo "  pnpm install     install dependencies"
    echo "  pnpm run dev     start dev server (http://localhost:3000)"
    echo "  pnpm run build   production build"
    echo "  pnpm run lint    eslint"
    echo "  nix flake check  run checks (lint + typecheck + pre-commit hooks)"
    echo ""
    echo "  git-hooks installed; they also run on every commit."
    echo ""

    if [ ! -f .env.local ]; then
      echo "  note: .env.local not found (see .env.example for required vars)"
    fi
  '';
}
