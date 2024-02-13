import os
import sys

name = sys.argv[1]
# Changing working directory to Desktop........
os.chdir("/Users/lkaucic/Desktop")
# Checking working directory.........
os.system("pwd")
# Crating /Users/lkaucic/Desktop/BlocklyInfineon directory.........
os.system("mkdir BlocklyInfineon")
# Changing working directory to /Desktop/BlocklyInfineon/.........
os.chdir("BlocklyInfineon")
# Creating MyXMCapp blank project for Selected device.........
create_project_call = os.system(f"/Applications/ModusToolbox/tools_3.1/project-creator/project-creator-cli --board-id {name} --app-id mtb-example-xmc-empty-app --user-app-name MyXMCapp --target-dir './'")
# Copying main .c file to Modus Toolbox project.........
os.system("cp /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/main.c MyXMCapp/")
# Copying configuration files to MyXMCapp/bsps/{name}/config/GeneratedSource/.........
os.system(f"mkdir MyXMCapp/bsps/TARGET_APP_{name}/config/GeneratedSource")
os.system(f"cp /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.c MyXMCapp/bsps/TARGET_APP_{name}/config/GeneratedSource/cycfg_pins.c")
os.system(f"cp /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.h MyXMCapp/bsps/TARGET_APP_{name}/config/GeneratedSource/cycfg_pins.h")


# Specify the file path and name
file_path = './test.txt'

# Open the file in write mode ('w')
# This will create the file if it doesn't exist or overwrite it if it does
with open(file_path, 'w') as file:
    # Write content to the file
    file.write("Project created with exit code %d" % create_project_call)

print("Upload script finished successfully")


