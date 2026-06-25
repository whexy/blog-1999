{ pkgs, perSystem, ... }:
pkgs.symlinkJoin {
  name = "tinymist-${pkgs.tinymist.version}";
  paths = [ pkgs.tinymist ];
  nativeBuildInputs = [ pkgs.makeWrapper ];
  postBuild = ''
    wrapProgram $out/bin/tinymist \
      --set TYPST_FONT_PATHS ${perSystem.self.fonts} \
      --set TYPST_PACKAGE_CACHE_PATH ${perSystem.self.typst}/lib/typst/packages
  '';
}
