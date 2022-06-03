#!/bin/bash
set -eux
for file in *.pdf
do
    echo "Processing $file file.."
    pdftocairo $file -svg
    svgo ${file/pdf/svg}
done
