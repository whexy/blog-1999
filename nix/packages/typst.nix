{ pkgs, perSystem, ... }:
let
  typstWithPackages = pkgs.typst.withPackages (p: [
    p.cetz # Drawing, diagrams, plots
    p.tablex # Extended table layout
    p.fletcher # Commutative diagrams / flowcharts
  ]);
in
pkgs.symlinkJoin {
  name = "typst-${pkgs.typst.version}-env";
  paths = [ typstWithPackages ];
  nativeBuildInputs = [ pkgs.makeWrapper ];
  postBuild = ''
    wrapProgram $out/bin/typst \
      --set TYPST_FONT_PATHS ${perSystem.self.fonts}
  '';
}
