import os
import json
from flask import jsonify

output_file = '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/devicesInfo/devicesInfo.json'
output_file2 = '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/devicesInfo/portsInfo.txt'
os.system(f'system_profiler SPUSBDataType -json > {output_file}')
os.system(f'ls -l /dev/cu.* > {output_file2}')




with open('/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/devicesInfo/devicesInfo.json', 'r') as json_file:
    data = json.load(json_file)

def extract_names(obj, parent_key=None):
    names = []
    if isinstance(obj, list):
        for item in obj:
            names.extend(extract_names(item, parent_key))
    elif isinstance(obj, dict):
        serial_num = obj.get("serial_num")
        for key, value in obj.items():
            if key == "_name" and parent_key == "_items":
                if(("Adapter" not in value) and ("Hub" not in value)):
                    if(serial_num == "000591195364"):
                        value="XMC1400"
                    elif(serial_num == "000591199982"):
                        value="XMC4700"
                    else:
                        value="other"
                    names.append(value)
            names.extend(extract_names(value, key))
    return names

all_names = set(extract_names(data))
print(list(all_names))


