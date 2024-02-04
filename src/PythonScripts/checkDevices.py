import os
import json

output_file = '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/devicesInfo/devicesInfo.json'
output_file2 = '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/devicesInfo/portsInfo.txt'
os.system(f'system_profiler SPUSBDataType -json > {output_file}')
os.system(f'ls -l /dev/cu.* > {output_file2}')




with open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/devicesInfo/devicesInfo.json', 'r') as json_file:
    data = json.load(json_file)

def extract_names(obj):
    names = []
    if isinstance(obj, list):
        for item in obj:
            names.extend(extract_names(item))
    elif isinstance(obj, dict):
        for key, value in obj.items():
            if key == "_name":
                names.append(value)
            names.extend(extract_names(value))
    return names

all_names = set(extract_names(data))
print(all_names)


