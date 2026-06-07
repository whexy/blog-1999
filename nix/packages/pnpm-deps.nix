# packages.<system>.pnpm-deps
#
# Reproducible, offline pnpm dependency store for blog-1999. A fixed-output
# derivation containing the fetched pnpm store, consumed by the checks under
# nix/checks/ (via `perSystem.self.pnpm-deps`) so that `nix flake check` can run
# lint/typecheck fully offline inside the sandbox.
#
# When pnpm-lock.yaml changes, update `hash` below: set it to
# pkgs.lib.fakeHash, run a build, and copy the correct hash from the error.
{ pkgs, ... }:
let
  src = pkgs.lib.fileset.toSource {
    root = ../../.;
    fileset = pkgs.lib.fileset.unions [
      ../../package.json
      ../../pnpm-lock.yaml
      ../../pnpm-workspace.yaml
    ];
  };
in
pkgs.fetchPnpmDeps {
  inherit src;
  pname = "blog-1999";
  pnpm = pkgs.pnpm_10;
  fetcherVersion = 4;
  hash = "sha256-qQpaLdM8WznHvVOMb8tQr/n2hKoeA3naE6LWvViAc2w=";
}
