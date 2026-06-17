{ pkgs, ... }:
pkgs.symlinkJoin {
  name = "typst-fonts";
  paths = with pkgs; [
    corefonts # Microsoft core fonts -- Times New Roman, Arial, etc.
    liberation_ttf # OFL -- Liberation Serif / Sans / Mono (TNR-compatible fallback)
    libertinus # OFL -- Libertinus Serif / Sans / Mono / Math
  ];
}
