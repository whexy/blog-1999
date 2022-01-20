import os
import argparse
import re
from sys import stderr


def process(filename):
    rgxStr = "---(.|\n)+?---((.|\n)+?)<!-- more -->"

    # copy description to summary
    with open(filename, "r+") as f:
        _content = f.read()
        try:
            description = re.search(rgxStr, _content, re.M).group(2).strip()
        except:
            return
        print(filename, description)

        lines = _content.split("\n")
        for idx, line in enumerate(lines):
            if line.startswith("date"):
                dateLine = idx
                break
        lines.insert(dateLine, f'summary: "{description}"')
        f.seek(0)
        f.write("\n".join(lines))


if __name__ == "__main__":
    # get dir arg
    ap = argparse.ArgumentParser()
    ap.add_argument("-d", "--dir", required=True, help="input dir")
    args = vars(ap.parse_args())

    if 'dir' in args:
        dir = args['dir']
    else:
        stderr.write("No input dir specified\n")
        exit(-1)

    # open all files in the directory
    for (root, d, files) in os.walk(dir):
        for file in files:
            process(os.path.join(dir, file))
