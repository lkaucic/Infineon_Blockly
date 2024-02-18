import os

os.chdir("/Users/lkaucic/Desktop/BlocklyInfineon/MyXMCapp")
build_flag = False
with open("./text.txt", "r+") as file:
    lines = file.readlines()
file.close()

for line in lines:
    if "Project built with exit code 0" in line:
        build_flag = True
        break

if build_flag:
    os.system("make qprogram")
else:
    os.system("make program")