# git-hooks.nix pre-commit configuration.
#
# Devshell-only (NOT a blueprint check): the eslint/tsc/prettier hooks rely on
# the project-local node_modules toolchain, which is absent in the offline
# `nix flake check` sandbox. nix/devshell.nix imports this and runs its shellHook
# to install the git hook on `nix develop`. Sandboxed lint/typecheck coverage is
# provided separately by nix/checks/{lint,typecheck}.nix.
{ inputs, pkgs, ... }:
let
  treefmtEval = inputs.treefmt-nix.lib.evalModule pkgs ./treefmt.nix;
in
inputs.git-hooks.lib.${pkgs.stdenv.hostPlatform.system}.run {
  src = inputs.self;
  hooks = {
    # Nix
    nil.enable = true;
    statix.enable = true;

    # Formatting (prettier + nixfmt) via the shared treefmt config.
    treefmt = {
      enable = true;
      package = treefmtEval.config.build.wrapper;
    };

    # ESLint over staged JS/TS using the project-local toolchain (flat config).
    # Runs in the working tree, so node_modules must be installed (pnpm install).
    eslint = {
      enable = true;
      name = "eslint";
      entry = "node_modules/.bin/eslint --max-warnings=0 --no-warn-ignored";
      files = "\\.(js|jsx|ts|tsx|mjs)$";
      pass_filenames = true;
    };

    # Project-wide TypeScript typecheck (no per-file args).
    tsc = {
      enable = true;
      name = "tsc";
      entry = "node_modules/.bin/tsc --noEmit";
      files = "\\.(ts|tsx)$";
      pass_filenames = false;
    };
  };
}
