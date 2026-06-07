# `nix flake check` -> checks.<system>.typecheck
# Runs `tsc --noEmit` against the full source, fully offline.
{ pkgs, perSystem, ... }:
pkgs.stdenvNoCC.mkDerivation {
  name = "blog-1999-typecheck";
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
    # node_modules is materialized by pnpmConfigHook from pnpmDeps.
    node_modules/.bin/tsc --noEmit
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    touch $out
    runHook postInstall
  '';
}
