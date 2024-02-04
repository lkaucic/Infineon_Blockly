
file = open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/config.c')
c_file = open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.c', 'a+')
h_file = open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.h', 'a+')

if('#include "cycfg_pins.h"' not in c_file.read()):
    c_file.write('#include "cycfg_pins.h"\n')


if('#if !defined(CYCFG_PINS_H)\n#define CYCFG_PINS_H\n#include "cycfg_notices.h"\n#include "xmc_gpio.h"\n#include "cycfg_routing.h"\n#if defined(__cplusplus)\n extern "C" {\n#endif\n' not in h_file.read()):
    h_file.write('#if !defined(CYCFG_PINS_H)\n#define CYCFG_PINS_H\n#include "cycfg_notices.h"\n#include "xmc_gpio.h"\n#include "cycfg_routing.h"\n#if defined(__cplusplus)\nextern "C" {\n#endif\n')


for line in file:
    if '#' in line:
        with open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.h', 'a+') as h_file:
            h_file.write(line)
    elif('const' in line or '.' in line):
        with open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.c', 'a+') as c_file:

            c_file.write(line)


h_file = open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.h', 'a+')
if('void init_cycfg_pins(void);\n#if defined(__cplusplus)\n}\n#endif\n#endif /* CYCFG_PINS_H */\n' not in h_file.read()):
    h_file.write('void init_cycfg_pins(void);\n#if defined(__cplusplus)\n}\n#endif\n#endif /* CYCFG_PINS_H */\n')

file.close()
h_file.close()
c_file.close()

file = open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/config.c')
file1 = open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_pins.c', 'a+')
if("\nvoid init_cycfg_pins(void){" not in file1.read()):
    file1.write("\nvoid init_cycfg_pins(void){\n")
lines = file.readlines()
for i in range(len(lines)):
    if("void init_cycfg_pins(void){" in lines[i]):
        while('}' not in lines[i]):
            i+=1
            if('}' not in lines[i]):
                file1.write(lines[i])
file1.write('}')

file.close()
file1.close()        

print("Pin configuration files arranged successfully!")