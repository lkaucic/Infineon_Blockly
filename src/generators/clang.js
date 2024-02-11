/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */



import * as Blockly from 'blockly';
import { variables } from 'blockly/blocks';


export const clangGenerator = new Blockly.Generator('CLANG');

clangGenerator.addReservedWords(
  ',alignas,alignof,and,and_eq,asm,auto,bitand,bitor,bool,break,case,catch,char,char16_t,char32_t,class,compl,const,constexpr,const_cast,continue,decltype,default,delete,do,double,dynamic_cast,else,enum,explicit,export,extern,false,float,for,friend,goto,if,inline,int,long,long double,long long,mutable,namespace,new,noexcept,not,not_eq,nullptr,operator,or,or_eq,private,protected,public,register,reinterpret_cast,return,short,signed,sizeof,static,static_assert,static_cast,struct,switch,template,this,thread_local,throw,true,try,typedef,typeid,typename,union,unsigned,using,virtual,void,volatile,wchar_t,while,xor,xor_eq,posix,'
  // http://en.cppreference.com/w/cpp/keyword
);

const Order = {
ATOMIC : 0,         // 0 "" ...
MEMBER : 2,         // . []
FUNCTION_CALL : 2,  // ()
INCREMENT : 3,      // ++
DECREMENT : 3,      // --
LOGICAL_NOT : 3,    // !
BITWISE_NOT : 3,    // ~
UNARY_PLUS : 3,    // +
UNARY_NEGATION : 3, // -
MULTIPLICATION : 5, // *
DIVISION : 5,       // /
MODULUS : 5,        // %
ADDITION : 6,       // +
SUBTRACTION : 6,    // -
BITWISE_SHIFT : 7,  // << >>
RELATIONAL : 8,     // < <= > >=
EQUALITY : 9,       // == != 
BITWISE_AND : 10,   // &
BITWISE_XOR : 11,   // ^
BITWISE_OR : 12,    // |
LOGICAL_AND : 13,   // &&
LOGICAL_OR : 14,    // ||
CONDITIONAL : 15,   // ?:
ASSIGNMENT : 15,    // = += -= *= /= %= <<= >>= ...
COMMA : 17,         // ,
NONE : 99           // (...)
};

/**
 * Initialises the database of global definitions, the setup function, function
 * names, and variable names.
 * @param {Blockly.Workspace} workspace Workspace to generate code from.
 */


clangGenerator.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
    clangGenerator.definitions_ = Object.create(null);

    clangGenerator.times_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  clangGenerator.functionNames_ = Object.create(null);


  
    if (!clangGenerator.nameDB_) {
      clangGenerator.nameDB_ =  new Blockly.Names(clangGenerator.RESERVED_WORDS_);

    
    } else {
     clangGenerator.nameDB_.reset();
     
    }

    clangGenerator.nameDB_.setVariableMap(workspace.getVariableMap());
    clangGenerator.nameDB_.populateVariables(workspace);
    clangGenerator.nameDB_.populateProcedures(workspace);

    const defvars = [];
    // Add developer variables (not created or named by the user).
    const devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (let i = 0; i < devVarList.length; i++) {
      defvars.push(
        clangGenerator.nameDB_.getName(devVarList[i], Blockly.Names.NameType.DEVELOPER_VARIABLE),
      );
    }

     // Add user variables, but only ones that are being used.
     const variables = Blockly.Variables.allUsedVarModels(workspace);
     for (let i = 0; i < variables.length; i++) {
       defvars.push(
         clangGenerator.nameDB_.getName(variables[i].getId(), Blockly.Names.NameType.VARIABLE),
       );
     }

    
    // Declare all of the variables.
    clangGenerator.isInitialized = true;



};




clangGenerator.finish = function(code) {
  // Indent every line.
  if (code) {
    code = this.prefixLines(code, clangGenerator.INDENT);
  }
  code = '\n' + code;

    // Convert the definitions dictionary into a list.
    var includes = [];
    var declarations = [];
    var defines = [];
    var func_definitions = [];
    for (var name in clangGenerator.definitions_) {
        var def = clangGenerator.definitions_[name];
        var nameInclude = 'include';
        var nameFunc_declare = 'Func_declare';
        var nameDefine = 'define';
        if (name.match(nameInclude)) {
            includes.push(def);
        }
        else if(name.match(nameFunc_declare)){
            declarations.push(def);//declaration
        }
        else if(name.match(nameDefine)){
            defines.push(def);//#define
        }
        else {
            func_definitions.push(def);//definition
        }
    }
    //imports--> #include
    //definitions--> function def, #def
    var allDefs = includes.join('\n') + '\n\n' + declarations.join('\n') + '\n\n' + defines.join('\n');
    var allFuncs = func_definitions.join('\n');

  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n') + code + allFuncs.replace(/\n\n+/g, '\n\n');
};

clangGenerator.finishFull = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in clangGenerator.definitions_) {
    definitions.push(clangGenerator.definitions_[name]);
  }
  code = definitions.join('\n\n') + '\n\n' + 
  'void setPos(float x, float y, float z) {\n\tfloat pos[3];\n\tpos[0] = x; pos[1] = y; pos[2] = z;\n\tapi.setPositionTarget(pos);\n}'
  + '\n\n' + code;
  //HACK: Make sure the code contains an init function in case the init page has not been properly initialized
  if(code.indexOf('//Begin page init\nvoid init() {\n') === -1) {
    code = 'void init() {}\n' + code;
  }
  return code;
};

clangGenerator.scrubNakedValue = function(line) {
  return line + ';\n';
//ZR editor should ignore all blocks that are not children of the page's function block
// return '';
};

clangGenerator.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote

    string = string.replace(/\\/g, '\\\\')
                    .replace(/'/g, '\\\'')
                    .replace(/"/g, '\\\"')
                    .replace(/\?/g, '\\?');
    string = string.replace(/\\\\n/g, '\\n');
  return string; //Do not add quotes so printf formatting can be used
};

clangGenerator.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

clangGenerator.forBlock['arith_operation'] = function(block, generator) {
  var value_var1 = generator.valueToCode(block, 'var1', Order.ATOMIC);
  var dropdown_operation = block.getFieldValue('operation');
  var value_var2 = generator.valueToCode(block, 'var2', Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = value_var1 + ' ' + dropdown_operation + ' ' + value_var2;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.ATOMIC];
};

clangGenerator.forBlock['asign'] = function(block, generator) {
  var value_var1 = generator.valueToCode(block, 'var1', Order.ATOMIC);
  var dropdown_operation = block.getFieldValue('operation');
  var value_var2 = generator.valueToCode(block, 'var2', Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = value_var1 + ' ' + dropdown_operation + ' ' + value_var2;
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

clangGenerator.forBlock['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  return [code, Order.ATOMIC];
};

  /* clangGenerator.forBlock['variables_sett'] = function(block, generator) {
  var dropdown_type = block.getFieldValue('TYPE');
  var text_var_name = generator.nameDB_.getNameForUserVariable(block.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  var value_variable_type = generator.valueToCode(block, 'VARIABLE_TYPE', Order.ASSIGNMENT);
  var code = dropdown_type + ' ' + text_var_name + ' = ' + value_variable_type + ';' + '\n';
  return code;
};
  */

clangGenerator.forBlock['text'] = function(block, generator){
  const code = block.getFieldValue('TEXT');
  return [code, Order.ATOMIC];
};


clangGenerator.forBlock['variables_sett'] = function(block, generator) {
  var dropdown_type = block.getFieldValue('TYPE');
 // var text_var_name = generator.nameDB_.getVariableName(block.getFieldValue('VAR'));
  var text_var_name = generator.nameDB_.getNameForUserVariable(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var value_variable_type = generator.valueToCode(block, 'VARIABLE_TYPE', Order.ASSIGNMENT);
  var code = dropdown_type + ' ' + text_var_name + ' = ' + value_variable_type + ';' + '\n';
  return code;
};

clangGenerator.forBlock['macro_sett'] = function(block, generator) {
 // var text_var_name = generator.nameDB_.getVariableName(block.getFieldValue('VAR'));
  var text_var_name = generator.nameDB_.getNameForUserVariable(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var value_variable_type = generator.valueToCode(block, 'VARIABLE_TYPE', Order.ASSIGNMENT);
  var code = '#define'+ ' ' + text_var_name.toUpperCase() + ' ' + value_variable_type  + '\n';
  return code;
};

clangGenerator.forBlock['volatile_wrap'] = function(block, generator) {
  var statements_vol = generator.statementToCode(block, 'VOL');
  // TODO: Assemble javascript into code variable.
  var code = 'volatile' + statements_vol;
  return code;
};

clangGenerator.forBlock['main'] = function(block, generator){
  var statements_main = generator.statementToCode(block, 'main');
  var code = 'int main(void){' + '\n' + statements_main + '\n' + 'return 0;' + '\n' +'}';
  return code;
}


clangGenerator.forBlock['procedures_defreturn'] = function(block, generator){

  const funcName = generator.getProcedureName(block.getFieldValue('NAME'));
  let xfix1 = '';
  if (generator.STATEMENT_PREFIX) {
    xfix1 += generator.injectId(generator.STATEMENT_PREFIX, block);
  }
  if (generator.STATEMENT_SUFFIX) {
    xfix1 += generator.injectId(generator.STATEMENT_SUFFIX, block);
  }
  if (xfix1) {
    xfix1 = generator.prefixLines(xfix1, generator.INDENT);
  }
  let loopTrap = '';
  if (generator.INFINITE_LOOP_TRAP) {
    loopTrap = generator.prefixLines(
      generator.injectId(generator.INFINITE_LOOP_TRAP, block),
      generator.INDENT,
    );
  }
  const branch = generator.statementToCode(block, 'STACK');
  let returnValue = generator.valueToCode(block, 'RETURN', Order.NONE) || '';
  let xfix2 = '';
  if (branch && returnValue) {
    // After executing the function body, revisit this block for the return.
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = generator.INDENT + 'return ' + returnValue + ';\n';
  }
  const args = [];
  var type = '';
  const variables = block.getVars();
  for (let i = 1; i < variables.length; i++) {
    args[i-1] = variables[i];
  }

 type = variables[0] || 'void';
 args.length > 0 ? args : args[0] = 'void';
 
  let code =
    type + ' ' +
    funcName +
    '(' +
    args.join(', ') +
    ') {\n' +
    xfix1 +
    loopTrap +
    branch +
    xfix2 +
    returnValue +
    '}';
  code = generator.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  // TODO(#7600): find better approach than casting to any to override
  // CodeGenerator declaring .definitions protected.
  generator.definitions_['%' + funcName] = code;
  return null;
};

clangGenerator.forBlock['while_do'] = function(block, generator) {
  var value_condition_var = generator.valueToCode(block, 'condition_var', Order.ATOMIC);
  var dropdown_logic = block.getFieldValue('logic');
  var value_condition_logic = generator.valueToCode(block, 'condition_logic', Order.ATOMIC);
  var statements_do = generator.statementToCode(block, 'do');

  var code = 'while (' + value_condition_var + dropdown_logic + value_condition_logic + ')' + '{' + '\n' + statements_do + '\n' + '}' ;
  return code;
};

clangGenerator.forBlock['controls_if'] = function(block, generator) {
    // If/elseif/else condition.
    let n = 0;
    let code = '';
    if (generator.STATEMENT_PREFIX) {
      // Automatic prefix insertion is switched off for this block.  Add manually.
      code += generator.injectId(generator.STATEMENT_PREFIX, block);
    }
    do {
      const conditionCode =
        generator.valueToCode(block, 'IF' + n, Order.NONE) || 'false';
      let branchCode = generator.statementToCode(block, 'DO' + n);
      if (generator.STATEMENT_SUFFIX) {
        branchCode =
          generator.prefixLines(
            generator.injectId(generator.STATEMENT_SUFFIX, block),
            generator.INDENT,
          ) + branchCode;
      }
      code +=
        (n > 0 ? ' else ' : '') +
        'if (' +
        conditionCode +
        ') {\n' +
        branchCode +
        '}';
      n++;
    } while (block.getInput('IF' + n));
  
    if (block.getInput('ELSE') || generator.STATEMENT_SUFFIX) {
      let branchCode = generator.statementToCode(block, 'ELSE');
      if (generator.STATEMENT_SUFFIX) {
        branchCode =
          generator.prefixLines(
            generator.injectId(generator.STATEMENT_SUFFIX, block),
            generator.INDENT,
          ) + branchCode;
      }
      code += ' else {\n' + branchCode + '}';
    }
    return code + '\n';
};

clangGenerator.forBlock['condition'] = function(block, generator) {
  var value_first = generator.valueToCode(block, 'first', Order.ATOMIC);
  var dropdown_condition = block.getFieldValue('condition');
  var value_second = generator.valueToCode(block, 'second', Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = value_first + ' ' + dropdown_condition + ' ' + value_second;
  return [code, Order.ATOMIC];
};

clangGenerator.forBlock['logical_cond'] = function(block, generator) {
  var value_first = generator.valueToCode(block, 'first', Order.ATOMIC);
  var dropdown_condition = block.getFieldValue('condition');
  var value_second = generator.valueToCode(block, 'second', Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = value_first + ' ' + dropdown_condition + ' ' + value_second;
  return [code, Order.ATOMIC];
};

clangGenerator.forBlock['variables_get'] = function(block, generator) {
  var code = generator.getVariableName(block.getFieldValue('VAR'));
  return [code, Order.ATOMIC];
};


clangGenerator.forBlock['for_loop'] = function(block, generator) {
  var text_var_name = block.getFieldValue('var_name');
  var number_start = block.getFieldValue('START');
  var number_to = block.getFieldValue('TO');
  var number_name = block.getFieldValue('NAME');
  var statements_name = generator.statementToCode(block, 'NAME');
  var operator = number_start > number_to ? '>=' : '<=';
  var operation = number_start > number_to ? '-=' : '+=';
  var code = 'for(int ' + text_var_name + ' = ' + number_start + '; ' + text_var_name + ' ' + operator  + number_to + '; ' + text_var_name + operation + number_name +'){' + '\n' + statements_name + '\n}' ;
  return code;
};



clangGenerator.forBlock['operation'] = function(block, generator) {
  var variable_var = generator.nameDB_.getNameForUserVariable(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE);
  var dropdown_condition = block.getFieldValue('operation');
  console.log(dropdown_condition);
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
  var code = variable_var + ' ' + dropdown_condition + ' ' + text_name +';\n';
  return code;
};

clangGenerator.forBlock['operation2'] = function(block, generator) {
  var variable_var = generator.nameDB_.getNameForUserVariable(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE);
  var dropdown_condition = block.getFieldValue('operation');
  console.log(dropdown_condition);
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
  var code = variable_var + ' ' + dropdown_condition + ' ' + text_name +';\n';
  return code;
};

clangGenerator.forBlock['delay'] = function(block, generator) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
  var code = 'XMC_Delay('+ number_name+');\n';
  return code;
};

clangGenerator.forBlock['interrupt'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = 'NVIC_SetPriority(INTERRUPT_PRIORITY_NODE_ID,INTERRUPT_EVENT_PRIORITY);\nNVIC_EnableIRQ(INTERRUPT_PRIORITY_NODE_ID);\n';
  return code;
};

clangGenerator.forBlock['input_type'] = function(block, generator) {
  var dropdown_input_types = block.getFieldValue('input_type');
  // TODO: Assemble javascript into code variable.
  // TODO: Change ORDER_NONE to the correct strength.
  return [dropdown_input_types, Order.ATOMIC];
};

clangGenerator.forBlock['output_type'] = function(block, generator) {
  var dropdown_output_types = block.getFieldValue('output_types');
  var dropdown_output_levels = block.getFieldValue('output_levels');
  var dropdown_driver = block.getFieldValue('driver');
  // TODO: Assemble javascript into code variable.
  var code = [dropdown_output_types, dropdown_output_levels, dropdown_driver];

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Order.ATOMIC];
};


clangGenerator.forBlock['pins47'] = function(block, generator) {
  var port = block.getFieldValue('NAME1');
  var pin = block.getFieldValue('NAME');
  var direction = block.getFieldValue("DIR");
  var mode = generator.valueToCode(block, 'variable', Order.ATOMIC);
 
  // TODO: Assemble javascript into code variable.
  var code = GetCustomConfigCode(port,pin,direction,mode);
  return code[0] + code[1] + code[2];
};

clangGenerator.forBlock['pins14'] = function(block, generator) {
  var port = block.getFieldValue('NAME1');
  var pin = block.getFieldValue('NAME');
  var direction = block.getFieldValue("DIR");
  var mode = generator.valueToCode(block, 'variable', Order.ATOMIC);
 
  // TODO: Assemble javascript into code variable.
  var code = GetCustomConfigCode(port,pin,direction,mode);
  return code[0] + code[1] + code[2];
};


clangGenerator.forBlock['init'] = function(block, generator) {
  var code = 'cy_rslt_t result = cybsp_init();\nif (result != CY_RSLT_SUCCESS)\n{\nCY_ASSERT(0);\n}\n';
  return code;
};

clangGenerator.forBlock['toggle'] = function(block, generator) {
  var code = 'XMC_GPIO_ToggleOutput(CYBSP_USER_LED_PORT, CYBSP_USER_LED_PIN);\n';
  return code;
};

clangGenerator.forBlock['gpio_init'] = function(block, generator) {
  var text_port = block.getFieldValue('PORT');
  var text_pin = block.getFieldValue('PIN');
  var text_config = block.getFieldValue('CONFIG');
  // TODO: Assemble javascript into code variable.
  var code = 'XMC_GPIO_Init(\n\t'+text_port+', \n\t'+text_pin+', \n\tXMC_GPIO_MODE_'+text_config+');\n';
  return code;
};

clangGenerator.forBlock['gpio_set_mode'] = function(block, generator) {
  var text_port = block.getFieldValue('PORT');
  var text_pin = block.getFieldValue('PIN');
  var text_config = block.getFieldValue('CONFIG');
  // TODO: Assemble javascript into code variable.
  var code = 'XMC_GPIO_SetMode(XMC_GPIO_PORT'+text_port+', '+text_pin+', '+text_config+');\n';
  return code;
};
clangGenerator.forBlock['gpio_set_output_level'] = function(block, generator) {
  var text_port = block.getFieldValue('PORT');
  var text_pin = block.getFieldValue('PIN');
  var dropdown_level = block.getFieldValue('LEVEL');
  // TODO: Assemble javascript into code variable.
  var code = 'XMC_GPIO_SetOutputLevel(XMC_GPIO_PORT'+text_port+', '+text_pin+', '+dropdown_level+');\n';
  return code;
};
clangGenerator.forBlock['adc'] = function(block, generator) {
  var field_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
  var code = 'XMC_DAC_CH_Init(XMC_DAC0, dac_0_ch_0_NUM, &dac_0_ch_0_config);\nXMC_DAC_CH_Init(XMC_DAC0, dac_0_ch_1_NUM, &dac_0_ch_1_config);\nXMC_DAC_CH_StartSingleValueMode(XMC_DAC0, dac_0_ch_0_NUM);\nXMC_DAC_CH_StartSingleValueMode(XMC_DAC0, dac_0_ch_1_NUM);\n';
  return code;

};
clangGenerator.forBlock['adc_result'] = function(block, generator) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
  var code = 'XMC_VADC_GROUP_GetResult(vadc_0_group_0_HW,' + number_name+');\n';
  return [code, Order.ATOMIC];
};

clangGenerator.forBlock['adc_write'] = function(block, generator) {
  var variable_value =  generator.nameDB_.getNameForUserVariable(block.getFieldValue('value'), Blockly.Variables.NAME_TYPE);
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
  var code = 'XMC_DAC_CH_Write(XMC_DAC0, dac_0_ch_'+number_name+'_NUM,  '+variable_value+');\n';
  return code;
};

clangGenerator.forBlock['toggle_led'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = "XMC_GPIO_ToggleOutput(CYBSP_USER_LED_PORT, CYBSP_USER_LED_PIN);\n";
  return code;
};

clangGenerator.workspaceToCode = function(workspace = Blockly.Workspace){
  if (!workspace) {
    // Backwards compatibility from before there could be multiple workspaces.
    console.warn(
      'No workspace specified in workspaceToCode call.  Guessing.',
    );
    workspace = common.getMainWorkspace();
  }
  var code = '';
  var configCode = '';

  this.init(workspace);
  const unfilteredBlocks = workspace.getTopBlocks(true);

  const blocks = unfilteredBlocks.filter((block) => block.getTooltip() !== 'config');
  const configBlocks = unfilteredBlocks.filter((block) => block.getTooltip() === 'config');

  code = getCodeFromBlocks(blocks);
  configCode = getCodeFromBlocks(configBlocks);

  return [code,configCode];
  
}

function GetCustomConfigCode(num, dropdown_pin, dropdown_direction, value_variable ){

  if(value_variable.includes(',')){
    value_variable = value_variable.split(',').map(element => element.trim());
  }


if(typeof value_variable === "object"){
  var dropdown_output_types = value_variable[0];
  var dropdown_output_levels = value_variable[1];
  var dropdown_driver = value_variable[2];

  var code1 = "#define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_PORT XMC_GPIO_PORT0\n#define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_PORT_NUM "+num+"U\n#define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_PIN 0U\n#ifndef ioss_0_port_"+num+"_pin_" + dropdown_pin +"_" + dropdown_direction + (dropdown_direction==="OUTPUT"? "_ALT" : "") + "\n  #define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_" + dropdown_direction + (dropdown_direction==="OUTPUT"? "_ALT" : "")+" 0U\n#endif\n#define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_MODE (XMC_GPIO_MODE_" + dropdown_direction + '_'+ dropdown_output_types + "| ioss_0_port_"+num+"_pin__" + dropdown_pin +")\n#ifndef ioss_0_port_"+num+"_pin_"+ dropdown_pin +"_HWO\n  #define ioss_0_port_"+num+"_pin_"+ dropdown_pin +"_HWO XMC_GPIO_HWCTRL_DISABLED\n#endif\n";
  var code2 = "const XMC_GPIO_CONFIG_t ioss_0_port_0_pin_"+ dropdown_pin +"_config ={\n.mode = (XMC_GPIO_MODE_t)ioss_0_port_0_pin_"+ dropdown_pin +"_MODE,\n.output_level = XMC_GPIO_OUTPUT_LEVEL_" +dropdown_output_levels +",\n" + (dropdown_driver!=="dont_care"? ".output_strength = XMC_GPIO_OUTPUT_STRENGTH_"+dropdown_driver+"," : "")+"};\n"
  var code3 = "void init_cycfg_pins(void){\nXMC_GPIO_Init(ioss_0_port_0_pin_"+ dropdown_pin +"_PORT, ioss_0_port_0_pin_"+ dropdown_pin +"_PIN, &ioss_0_port_0_pin_"+ dropdown_pin +"_config);\nXMC_GPIO_SetHardwareControl(ioss_0_port_0_pin_"+ dropdown_pin +"_PORT, ioss_0_port_0_pin_"+ dropdown_pin +"_PIN, ioss_0_port_0_pin_0_HWO);\n}\n"

}

else{
  var code1 = "#define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_PORT XMC_GPIO_PORT0\n#define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_PORT_NUM "+num+"U\n#define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_PIN 0U\n#ifndef ioss_0_port_"+num+"_pin_" + dropdown_pin +"_" + dropdown_direction + (dropdown_direction==="OUTPUT"? "_ALT" : "") + "\n  #define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_" + dropdown_direction + (dropdown_direction==="OUTPUT"? "_ALT" : "")+" 0U\n#endif\n#define ioss_0_port_"+num+"_pin_" + dropdown_pin +"_MODE (XMC_GPIO_MODE_" + dropdown_direction + '_'+ value_variable + "| ioss_0_port_"+num+"_pin__" + dropdown_pin +")\n#ifndef ioss_0_port_"+num+"_pin_"+ dropdown_pin +"_HWO\n  #define ioss_0_port_"+num+"_pin_"+ dropdown_pin +"_HWO XMC_GPIO_HWCTRL_DISABLED\n#endif\n";
  var code2 = "const XMC_GPIO_CONFIG_t ioss_0_port_0_pin_"+ dropdown_pin +"_config ={\n.mode = (XMC_GPIO_MODE_t)ioss_0_port_0_pin_"+ dropdown_pin +"_MODE,};\n"
  var code3 = "void init_cycfg_pins(void){\nXMC_GPIO_Init(ioss_0_port_0_pin_"+ dropdown_pin +"_PORT, ioss_0_port_0_pin_"+ dropdown_pin +"_PIN, &ioss_0_port_0_pin_"+ dropdown_pin +"_config);\nXMC_GPIO_SetHardwareControl(ioss_0_port_0_pin_"+ dropdown_pin +"_PORT, ioss_0_port_0_pin_"+ dropdown_pin +"_PIN, ioss_0_port_0_pin_0_HWO);\n}\n"
}


  
  return [code1, code2, code3];
}


 function getCodeFromBlocks(blocks){
  const code = [];
  for (let i = 0, block; (block = blocks[i]); i++) {

    let line = clangGenerator.blockToCode(block);
    if (Array.isArray(line)) {
      // Value blocks return tuples of code and operator order.
      // Top-level blocks don't care about operator order.
      line = line[0];
    }
    if (line) {
      if (block.outputConnection) {
        // This block is a naked value.  Ask the language's code generator if
        // it wants to append a semicolon, or something.
        line = clangGenerator.scrubNakedValue(line);
        if (clangGenerator.STATEMENT_PREFIX && !block.suppressPrefixSuffix) {
          line = clangGenerator.injectId(clangGenerator.STATEMENT_PREFIX, block) + line;
        }
        if (clangGenerator.STATEMENT_SUFFIX && !block.suppressPrefixSuffix) {
          line = line + clangGenerator.injectId(clangGenerator.STATEMENT_SUFFIX, block);
        }
      }
      code.push(line);
    }
  }
  // Blank line between each section.

  let codeString = code.join('\n');
  codeString = clangGenerator.finish(codeString);
  // Final scrubbing of whitespace.
  codeString = codeString.replace(/^\s+\n/, '');
  codeString = codeString.replace(/\n\s+$/, '\n');
  codeString = codeString.replace(/[ \t]+\n/g, '\n');
  return codeString;
}










