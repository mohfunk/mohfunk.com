import os
import sys
dr = (str(sys.argv[1])).split("/")
name = dr.pop(len(dr) - 1)
op = "{"
cp = "}"
sq = "'"
dlr = "$"
t = "    "
wgts = {'Thin': 100, 'ExtraLight': 200, 'Light': 300, 'Regular': 400, "": 400,
        'Medium': 500, 'SemiBold': 600, 'Bold': 700, 'ExtraBold': 800, 'Black': 900}


def chi(string):
    if (not string.find("Italic")):
        return "Italic"
    else:
        return "Normal"


def fst(string):
    return f'{t}font-style: {chi(string)};\n'


def ws(string):
    return f'{t}font-weight: {wgts[string.split("-")[1].split(".")[0]]};\n'


def ex(e):
    if (e == "ttf"):
        return f'format("truetype"); \n'
    else:
        return f'format("opentype"); \n'


def tmp(string, ext):
    rpl = ws(string.replace("Italic", ""))
    far = fst(string)
    hd = f'\n@font-face {op}\n{t}font-family: "{name}";\n'
    sr = f'{t}src: url(fonts/{name}/{string}) {ex(ext)}'
    return f'{hd}{sr}{rpl}{far}{cp}\n'


def fn(string):
    ext = string.split(".")[1]
    if (ext == "ttf" or ext == "otf"):
        return tmp(string, ext)
    else:
        return


with open('fonts.css', 'a') as f:
    for fnt in os.listdir(str(sys.argv[1])):
        ftx = fn(fnt)
        if (ftx is not None):
            print(ftx, file=f)
