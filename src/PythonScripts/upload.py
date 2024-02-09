import os


# Changing working directory to Desktop........
os.chdir("/Users/lkaucic/Desktop")
# Checking working directory.........
os.system("pwd")
# Crating /Users/lkaucic/Desktop/BlocklyInfineon directory.........
os.system("mkdir BlocklyInfineon")
# Changing working directory to /Desktop/BlocklyInfineon/.........
os.chdir("BlocklyInfineon")
# Creating MyHelloWorld blank project for KIT_XMC47_RELAX_V1.........
#create_project_call = os.system("/Applications/ModusToolbox/tools_3.1/project-creator/project-creator-cli --board-id KIT_XMC14_BOOT_001 --app-id mtb-example-xmc-blinky-freertos --user-app-name Blinky --target-dir './'")
create_project_call = os.system("/Applications/ModusToolbox/tools_3.1/project-creator/project-creator-cli --board-id KIT_XMC47_RELAX_V1 --app-id mtb-example-xmc-empty-app --user-app-name MyHelloWorld --target-dir './'")
# Copying main .c file to Modus Toolbox project.........
os.system("cp /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/main.c MyHelloWorld/")
# Copying configuration files to MyHelloWorld/bsps/TARGET_APP_KIT_XMC47_RELAX_V1/config/GeneratedSource/.........
# os.system("mkdir MyHelloWorld/bsps/TARGET_APP_KIT_XMC47_RELAX_V1/config/GeneratedSource")
# os.system("cp /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.c MyHelloWorld/bsps/TARGET_APP_KIT_XMC47_RELAX_V1/config/GeneratedSource/cycfg_pins.c")
# os.system("cp /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.h MyHelloWorld/bsps/TARGET_APP_KIT_XMC47_RELAX_V1/config/GeneratedSource/cycfg_pins.h")
# os.system("cp /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.h MyHelloWorld/bsps/TARGET_APP_KIT_XMC47_RELAX_V1/config/GeneratedSource/cycfg_pins.h")
os.system("cp -r /Users/lkaucic/Downloads/running_led_interrupt/bsps/TARGET_APP_KIT_XMC47_RELAX_V1/config/GeneratedSource/ MyHelloWorld/bsps/TARGET_APP_KIT_XMC47_RELAX_V1/config/")
# Specify the file path and name
file_path = './test.txt'

# Open the file in write mode ('w')
# This will create the file if it doesn't exist or overwrite it if it does
with open(file_path, 'w') as file:
    # Write content to the file
    file.write("Project created with exit code %d" % create_project_call)

print("Upload script finished successfully")


