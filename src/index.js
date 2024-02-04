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
import './index.css';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);


// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const uploadButton = document.getElementById('outputPane').appendChild(document.getElementById('uploadButton'));
//eneratedCode.appendChild(uploadButton);
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
  ws.updateToolbox(toolbox);
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




uploadButton.addEventListener('click', function() {
  
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




