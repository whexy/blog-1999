# `nix flake check` -> checks.<system>.lint
# Runs ESLint (flat config) against the full source, fully offline.
{ pkgs, perSystem, ... }:
pkgs.stdenvNoCC.mkDerivation {
  name = "blog-1999-lint";
  src = ../../.;

  nativeBuildInputs = [
    pkgs.nodejs_22
    pkgs.pnpm_10
    (pkgs.pnpmConfigHook.override { pnpm = pkgs.pnpm_10; })
  ];

  pnpmDeps = perSystem.self.pnpm-deps;

  dontConfigure = false;

  buildPhase = ''
    runHook preBuild
    # ESLint writes caches to $HOME; keep it inside the sandbox.
    export HOME="$TMPDIR"
    export NEXT_TELEMETRY_DISABLED=1
    # Flat config (eslint.config.mjs) is the default in ESLint 9; just run eslint.
    node_modules/.bin/eslint . --max-warnings=0
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    touch $out
    runHook postInstall
  '';
}
