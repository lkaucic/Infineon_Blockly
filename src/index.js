/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {blocks} from './blocks/clang_blocks';
import { clangGenerator } from './generators/clang';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import {toolbox_xmc_47} from './toolbox_xmc_47'
import {toolbox_xmc_14} from './toolbox_xmc_14'
import './index.css';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);

// Set up UI elements and inject Blockly
var devices = []
var selected_device = "Default"
var sel_toolbox = toolbox;
const codeDiv = document.getElementById('generatedCode').firstChild;
const devicesButton = document.getElementById('outputPane').appendChild(document.getElementById('devicesButton'));
const buildButton = document.getElementById('outputPane').appendChild(document.getElementById('buildButton'));

const modal = document.getElementById('myModal');
const modalDevices = document.getElementById('checklistContainer')
const selectButton = document.getElementById('selectButton')

const closeModalButton = document.getElementById('closeModalButton');
//eneratedCode.appendChild(buildButton);
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {
  toolbox, 
  grid:{spacing: 20,length: 3,colour: '#ccc', snap: true},
  trashcan: true,
  scrollbars: true
});


// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const [code,config_code] = clangGenerator.workspaceToCode(ws);
  //codeDiv.innerText = code;
  // Separate variables for code and configuration code

  // Iterate over all blocks in the workspace
  /* Array.from(ws.getAllBlocks()).forEach((block) => {
      
    if (block.getTooltip() == "config") {
      // Save configuration code to the variable
      configurationCode += clangGenerator.blockToCode(block);
    }
    else {
      code += clangGenerator.blockToCode(block)
    }
  }); */

  // Display code in the codeDiv
  codeDiv.innerText = code;
};

// Load the initial state from storage and run the code.


load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  ws.updateToolbox(sel_toolbox);
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
  
});


// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()) {
    return;
  }
  runCode();
});


devicesButton.addEventListener('click', function(){

    modalDevices.innerHTML = '';

    fetch(`http://127.0.0.1:8000/deviceCheck`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    })

    .then(response => response.json())
    .then(data => {
        data = JSON.parse(data.data.replace(/'/g, '"'))
        devices = data
        console.log(data); // Log the response from the server

      devices.forEach(device => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'deviceRadio';
        radio.value = device;
        radio.id = 'radio_' + device;

        const label = document.createElement('label');
        label.htmlFor = radio.id;
        label.appendChild(document.createTextNode(device));

        modalDevices.appendChild(radio);
        modalDevices.appendChild(label);
        modalDevices.appendChild(document.createElement('br'));
      })

      modal.style.display = 'block';

      const radioButtons = document.querySelectorAll('input[type="radio"]');
      radioButtons.forEach(radio => {
          radio.addEventListener('change', function () {
              selected_device = radio.value;
              console.log(selected_device)
          });
      });

    })
    // Show the modal


});

selectButton.addEventListener('click', function () {
  modal.style.display = 'none';
  console.log(selected_device)
  selected_device === "other" ? sel_toolbox = toolbox : (selected_device === "XMC4700" ? sel_toolbox = toolbox_xmc_47 : sel_toolbox = toolbox_xmc_14 );
  ws.clear();
  ws.updateToolbox(sel_toolbox);
});

closeModalButton.addEventListener('click', function () {
  modal.style.display = 'none';
});

buildButton.addEventListener('click', function() {
  
    const [code,configurationCode] = clangGenerator.workspaceToCode(ws);



    fetch(`http://127.0.0.1:8000/runPythonScript`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({code: code, config_code: configurationCode }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response from the server
    })
    .catch(error => {
        console.error('Error:', error);
    });

    //console.log(code);
    console.log(configurationCode);
});

function saveCCodeToFile(code, fileName) {
  const blob = new Blob([code], { type: 'text/plain' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  // Create a hidden link, trigger a click, and remove the link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function saveConfigurationCodeToFile(code, fileName) {
  saveCCodeToFile(code, fileName);
}

window.addEventListener('click', function (event) {
  if (event.target === modal) {
      modal.style.display = 'none';
  }
});




