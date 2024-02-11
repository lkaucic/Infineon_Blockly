from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import sys
import os

app = Flask(__name__)
CORS(app) 

log_file_path = './log.txt'

sys.stdout = open(log_file_path, 'a')
sys.stderr = open(log_file_path, 'a')


@app.route('/deviceCheck', methods=['POST'])
def device_Check():
    try:
        output = subprocess.run(['python', '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/PythonScripts/checkDevices.py'], capture_output=True, text=True)
        print(output)
        print(output.stderr)
        return jsonify({'success': True, 'data': output.stdout})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/runPythonScript', methods=['POST'])
def run_python_script():
    try:
        # get code from response

        request_data = request.get_json()
        code = request_data.get('code')
        config_code = request_data.get('config_code')
        selected_device = request_data.get('device')
      

        #specify destitation and save code
        destination1 = '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/main.c'
        destination2 = '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/config.c'
        if(code):
            with open(destination1, 'w+') as file:
                if('#include <stdio.h>\n#include "cybsp.h"\n#include "cy_utils.h"\n#include "cy_retarget_io.h"\n' not in file.read()):
                    file.write('#include <stdio.h>\n#include "cybsp.h"\n#include "cy_utils.h"\n#include "cy_retarget_io.h"\n')
                file.write(code)
        if(config_code):
            with open(destination2, 'w') as file:
                file.write(config_code)

        populate_cycfg_notices(selected_device)


        print("Script executed successfully")
        print("###############################################################")
        print("Fetching all connected devices and ports")
        output = subprocess.run(['python', '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/PythonScripts/checkDevices.py'], capture_output=True, text=True)
        print("###############################################################")
        print("STARTING ARRANGE FILES SCRIPT")
        output = subprocess.run(['python', '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/PythonScripts/arrangeFiles.py'], capture_output=True, text=True)
        print(output.stdout)
        print(output.stderr)
        print("###############################################################")
        print("STARTING UPLOAD SCRIPT")
        output = subprocess.run(['python', '/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/PythonScripts/upload.py'], capture_output=True, text=True)
        print(output.stdout)
        print(output.stderr)
        print("###############################################################")
        return jsonify({'success': True, 'message': 'Python script executed successfully'})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)})
    

def populate_cycfg_notices(device_name):
    # Copy the template file to cycfg_notices.h
    os.system("cp /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_notices_template.h /Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_notices.h")

    # Read the template file
    with open("/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_notices_template.h", "r") as f:
        template_content = f.read()

    f.close()
    # Replace placeholders with actual device name
    if device_name == "XMC4700":
        series = "XMC4700"
        sub = "F144x2048"
    else:
        series = "XMC1404"
        sub = "Q064x0200"
        
    replaced_content = template_content.replace("$SERIES$", series).replace("$SUB$", sub)

    with open("/Users/lkaucic/Desktop/Blockly_start/Blockly_start/src/cFiles/cycfg_notices.h", 'w+') as f:
        f.write(replaced_content)
    f.close()


if __name__ == '__main__':
    app.run(port=8000,debug=True)
 