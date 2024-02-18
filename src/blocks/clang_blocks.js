import * as Blockly from 'blockly';

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([{
  "type": "object",
  "message0": "{ %1 %2 }",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "MEMBERS"
    }
  ],
  "output": null,
  "colour": 230,
},
{
  "type": "member",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "MEMBER_NAME",
      "text": ""
    },
    {
      "type": "field_label",
      "name": "COLON",
      "text": ":"
    },
    {
      "type": "input_value",
      "name": "MEMBER_VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
},
{
  "type": "variables_sett",
  "message0": "%1 %2 = %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TYPE",
      "options": [
        [
          "int",
          "int"
        ],
        [
          "float",
          "float"
        ],
        [
          "double",
          "double"
        ],
        [
          "uint32_t",
          "uint32_t"
        ],
        [
          "XMC_VADC_RESULT_SIZE_t",
          "XMC_VADC_RESULT_SIZE_t"
        ]
      ]
    },
    {
      "type": "field_variable",
      "name": "VAR",
      'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
    },
    {
      "type": "input_value",
      "name": "VARIABLE_TYPE",
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  'style': 'variable_blocks',
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "volatile_wrap",
  "message0": "volatile %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "VOL",
      "check": "variables_sett"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 210,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "macro_sett",
  "message0": "#define %1 %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    },
    {
      "type": "input_value",
      "name": "VARIABLE_TYPE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 210,
  "tooltip": "",
  "helpUrl": ""
},
  {
    "type": "main",
    "message0": "main function \n %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "main"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "condition",
    "message0": "%1 %2 %3 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "first"
      },
      {
        "type": "field_dropdown",
        "name": "condition",
        "options": [
          [
            "equals to",
            "=="
          ],
          [
            "not equals to",
            "!="
          ],
          [
            "greater than",
            ">"
          ],
          [
            "less than",
            "<"
          ],
          [
            "greater than or equal to",
            ">="
          ],
          [
            "less than or equal to",
            "<="
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "second"
      }
    ],
    "output": null,
    "colour": 210,
    "tooltip": "",
    "helpUrl": ""
  },

  {
    "type": "logical_cond",
    "message0": "%1 %2 %3 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "first"
      },
      {
        "type": "field_dropdown",
        "name": "condition",
        "options": [
          [
            "and",
            "&&"
          ],
          [
            "or",
            "||"
          ],
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "second"
      }
    ],
    "output": null,
    "colour": 210,
    "tooltip": "",
    "helpUrl": ""
  },


  {
    "type": "arith_operation",
    "message0": "%1 %2 %3 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "var1"
      },
      {
        "type": "field_dropdown",
        "name": "operation",
        "options": [
          [
            "+",
            "+"
          ],
          [
            "-",
            "-"
          ],
          [
            "*",
            "*"
          ],
          [
            "/",
            "/"
          ],
          [
            "%",
            "%"
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "var2"
      }
    ],
    "output": null,
    "colour": 210,
    "tooltip": "",
    "helpUrl": ""
  },


  {
    "type": "asign",
    "message0": "%1 %2 %3 %4",
    "args0": [
      {
        "type": "input_value",
        "name": "var1"
      },
      {
        "type": "field_dropdown",
        "name": "operation",
        "options": [
          [
            "=",
            "="
          ],
          [
            "+",
            "+"
          ],
          [
            "-",
            "-"
          ],
          [
            "*",
            "*"
          ],
          [
            "/",
            "/"
          ],
          [
            "%",
            "%"
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "var2"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "",
    "helpUrl": ""
  },

    {
      "type": "while_do",
      "message0": "while %1 %2 %3 do %4",
      "args0": [
        {
          "type": "input_value",
          "name": "condition_var",
          "align": "RIGHT"
        },
        {
          "type": "field_dropdown",
          "name": "logic",
          "options": [
            [
              "greater than",
              ">"
            ],
            [
              "greater than or equal to",
              ">="
            ],
            [
              "less than",
              "<"
            ],
            [
              "less than or equal to",
              "<="
            ],
            [
              "equal to",
              "=="
            ],
            [
              "not equal to",
              "!="
            ]
          ]
        },
        {
          "type": "input_value",
          "name": "condition_logic"
        },
        {
          "type": "input_statement",
          "name": "do"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "for_loop",
      "message0": "with integer variable %1 repeat \n from %2 to %3 \n by %4 %5  do %6",
      "args0": [
        {
          "type": "field_input",
          "name": "var_name",
          "text": "var_name"
        },
        {
          "type": "field_number",
          "name": "START",
          "value": 0
        },
        {
          "type": "field_number",
          "name": "TO",
          "value": 0
        },
        {
          "type": "field_number",
          "name": "NAME",
          "value": 0
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "NAME"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "pin_set",
      "message0": "port 0 pin: %1 direction: %2 %3",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "pin",
          "options": [
            [
              "0",
              "0"
            ],
            [
              "1",
              "1"
            ],
            [
              "2",
              "2"
            ],
            [
              "3",
              "3"
            ],
            [
              "4",
              "4"
            ],
            [
              "5",
              "5"
            ],
            [
              "6",
              "6"
            ],
            [
              "7",
              "7"
            ],
            [
              "8",
              "8"
            ],
            [
              "9",
              "9"
            ],
            [
              "10",
              "10"
            ],
            [
              "11",
              "11"
            ],
            [
              "12",
              "12"
            ],
            [
              "13",
              "13"
            ],
            [
              "14",
              "14"
            ],
            [
              "15",
              "15"
            ],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "direction",
          "options": [
            [
              "input",
              "INPUT"
            ],
            [
              "input/output",
              "OUTPUT"
            ],
            [
              "hardware controlled",
              "OUTPUT"
            ]
          ]
        },
        {
          "type": "input_value",
          "name": "variable"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 300,
      "tooltip": "config",
      "helpUrl": ""
    },
    {
      "type": "input_type",
      "message0": "input type: %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "input_type",
          "options": [
            [
              "Tristate",
              "TRISTATE"
            ],
            [
              "Pull up",
              "PULL_UP"
            ],
            [
              "Pull down",
              "PULL_DOWN"
            ],
            [
              "Continuous Sampling Mode",
              "SAMPLING"
            ],
            [
              "Inverted Tristate",
              "INVERTED_TRISTATE"
            ],
            [
              "Inverted Pull Up",
              "INVERTED_PULL_UP"
            ],
            [
              "Inverted Pull Down",
              "INVERTED_PULL_DOWN"
            ],
            [
              "Inverted Continuous Sampling Mode",
              "INVERTED_SAMPLING"
            ]
          ]
        }
      ],
      "inputsInline": true,
      "output": null,
      "colour": 135,
      "tooltip": "config",
      "helpUrl": ""
    },
    {
  "type": "output_type",
  "message0": "output mode: %1 Initial Output Level: %2 Driver Strength: %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "output_types",
      "options": [
        [
          "Push Pull",
          "push_pull"
        ],
        [
          "Open Drain",
          "open_drain"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "output_levels",
      "options": [
        [
          "Low",
          "low"
        ],
        [
          "High",
          "high"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "driver",
      "options": [
        [
          "Don't Care",
          "dont_care"
        ],
        [
          "Weak Driver",
          "weak"
        ],
        [
          "Medium Driver",
          "medium"
        ],
        [
          "Strong Driver Soft Edge",
          "strong_soft"
        ],
        [
          "Strong Driver Slow Edge",
          "strong_slow"
        ],
        [
          "Strong Driver Sharp Edge",
          "strong_sharp"
        ],
        [
          "Strong Driver Medium Edge",
          "strong_medium"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 135,
  "tooltip": "config",
  "helpUrl": ""
},
{
  "type": "output_type",
  "message0": "output mode: %1 \n Initial Output Level: %2 \n Driver Strength: %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "output_types",
      "options": [
        [
          "Push Pull",
          "push_pull"
        ],
        [
          "Open Drain",
          "open_drain"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "output_levels",
      "options": [
        [
          "Low",
          "LOW"
        ],
        [
          "High",
          "HIGH"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "driver",
      "options": [
        [
          "Don't Care",
          "dont_care"
        ],
        [
          "Weak Driver",
          "WEAK"
        ],
        [
          "Medium Driver",
          "MEDIUM"
        ],
        [
          "Strong Driver Soft Edge",
          "STRONG_SOFT_EDGE"
        ],
        [
          "Strong Driver Slow Edge",
          "STRONG_SLOW_EDGE"
        ],
        [
          "Strong Driver Sharp Edge",
          "STRONG_SHARP_EDGE"
        ],
        [
          "Strong Driver Medium Edge",
          "STRONG_MEDIUM_EDGE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 135,
  "tooltip": "config",
  "helpUrl": ""
},


  {
    "type": "gpio_init",
    "message0": "Initialize GPIO: %1 , %2 , %3",
    "args0": [
      {
        "type": "field_input",
        "name": "PORT",
        "text": "port"
      },
      {
        "type": "field_input",
        "name": "PIN",
        "text": "pin"
      },
      {
        "type": "field_input",
        "name": "CONFIG",
        "text": "config"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "gpio_set_mode",
    "message0": "Set GPIO mode: %1 , %2 , %3",
    "args0": [
      {
        "type": "field_input",
        "name": "PORT",
        "text": "port"
      },
      {
        "type": "field_input",
        "name": "PIN",
        "text": "pin"
      },
      {
        "type": "field_input",
        "name": "CONFIG",
        "text": "config"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "gpio_set_output_level",
    "message0": "Set %1 : %2 to %3",
    "args0": [
      {
        "type": "field_input",
        "name": "PORT",
        "text": "port"
      },
      {
        "type": "field_input",
        "name": "PIN",
        "text": "pin"
      },
      {
        "type": "field_dropdown",
        "name": "LEVEL",
        "options": [
          [
            "low",
            "XMC_GPIO_OUTPUT_LEVEL_LOW "
          ],
          [
            "high",
            "XMC_GPIO_OUTPUT_LEVEL_HIGH "
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "toggle",
    "message0": "Toggle GPIO",
    "colour": 20,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": null,
    "nextStatement": null,
  },
  {
    "type": "operation",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_variable",
        "name": "var",
        "variable": "item"
      },
      {
        "type": "field_dropdown",
        "name": "operation",
        "options": [
          [
            "=",
            "="
          ],
          [
            "+=",
            "+="
          ],
          [
            "-=",
            "-="
          ],
          [
            "*=",
            "*="
          ],
          [
            "/=",
            "/="
          ],
          [
            "%=",
            "%="
          ],
        ]
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "default"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "operation2",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_variable",
        "name": "var",
        "variable": "item"
      },
      {
        "type": "field_dropdown",
        "name": "operation",
        "options": [
          [
            "=",
            "="
          ],
          [
            "+=",
            "+="
          ],
          [
            "-=",
            "-="
          ],
          [
            "*=",
            "*="
          ],
          [
            "/=",
            "/="
          ],
          [
            "%=",
            "%="
          ],
        ]
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "default"
      }
    ],
    "output": null,
    "colour": 210,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "interrupt",
    "message0": "Enable interrupt",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "delay",
    "message0": "delay %1 ms",
    "args0": [
      {
        "type": "field_number",
        "name": "NAME",
        "value": 0,
        "min": 0,
        "max": 4294967295
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "adc",
    "message0": "%1",
    "args0": [
      {
        "type": "field_label_serializable",
        "name": "NAME",
        "text": "Initialise AD converter"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "adc_result",
    "message0": "Get Result from ADC %1",
    "args0": [
      {
        "type": "field_number",
        "name": "NAME",
        "value": 0,
        "min": 0,
        "max": 1
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "adc_write",
    "message0": "Write %1 to ADC %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "value",
        "variable": "item"
      },
      {
        "type": "field_number",
        "name": "NAME",
        "value": 0,
        "min": 0,
        "max": 1
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "toggle_led",
    "message0": "toggle LED",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

Blockly.Blocks['pins47'] = {
  init: function() {
    var thisBlock = this;
    var optionsForName = [["0", "0"], ["1", "1"], ["2", "2"],["3", "3"], ["4", "4"], ["5", "5"],["6", "6"], ["7", "7"], ["8", "8"],["9", "9"], ["10", "10"], ["11", "11"],["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"]];
    var dropdownName = new Blockly.FieldDropdown(optionsForName, function(option) {
      // Handle change of the second dropdown here if needed
    });

    var input = this.appendValueInput("TYPE")
    .appendField("Add ")
    .appendField(new Blockly.FieldDropdown([[  "input",  "INPUT"],[  "input/output",  "OUTPUT"],[  "hardware controlled",  " OUTPUT"]]), "DIR")
    .appendField("on Port: ")
    .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"],["3", "3"], ["4", "4"], ["5", "5"],["6", "6"], ["14", "14"], ["15", "15"]]), "NAME1")
    .appendField("Pin: ")
    .appendField(dropdownName, "NAME");
      

    thisBlock.setOnChange(function(event = Blockly.Events.BlockChange) {
      if (event.name === 'NAME1') {
        var newValue = event.newValue;
        if (newValue === "0") {
          optionsForName = [["0", "0"], ["1", "1"], ["2", "2"],["3", "3"], ["4", "4"], ["5", "5"],["6", "6"], ["7", "7"], ["8", "8"],["9", "9"], ["10", "10"], ["11", "11"],["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"]];
        } else if(newValue === "1") {
          optionsForName = [["0","0"],["1","1"],["2","2"],["3","3"],["4 - CYBSP_DEBUG_UART_RX","CYBSP_DEBUG_UART_RX"],["5 - CYBSP_DEBUG_UART_TX","CYBSP_DEBUG_UART_TX"],["6 - CYBSP_MMC_DAT1","CYBSP_MMC_DAT1"], [   "7 - CYBSP_MMC_DAT2",   "CYBSP_MMC_DAT2" ], [   "8",   "8" ], [   "9",   "9" ], [   "10",   "10" ], [   "11",   "11" ], [   "12 - CYBSP_CAN_TX",   "CYBSP_CAN_TX" ], [   "13 - CYBSP_CAN_RX",   "CYBSP_CAN_RX" ], [   "14",   "14" ], [   "15",   "15" ]];
        } else if(newValue === "2") {
          optionsForName = [[  "0 - CYBSP_ETH_MDIO",  "CYBSP_ETH_MDIO"],[  "1 - CYBSP_SWO",  "CYBSP_SWO"],[  "2 - CYBSP_ETH_RXD0",  "CYBSP_ETH_RXD0"],[  "3 - CYBSP_ETH_RXD1",  "CYBSP_ETH_RXD1"],[  "4 - CYBSP_ETH_RXER",  "CYBSP_ETH_RXER"],[  "5 - CYBSP_ETH_TXEN",  "CYBSP_ETH_TXEN"],[  "6",  "6"],[  "7 - CYBSP_ETH_MDC",  "CYBSP_ETH_MDC"],[  "8 - CYBSP_ETH_TXD0",  "CYBSP_ETH_TXD0"],[  "9 - CYBSP_ETH_TXD1",  "CYBSP_ETH_TXD1"],[  "10",  "10"],[  "11",  "11"],[  "12",  "12"],[  "13",  "13"],[  "14",  "14"],[  "15",  "15"]];
        } else if(newValue === "3"){
          optionsForName = [[  "0",  "0"],[  "1 ",  "1"],[  "2",  "2"],[  "3 ",  "3"],[  "4",  "4"],[  "5 - CYBSP_MMC_CMD",  "CYBSP_MMC_CMD"],[  "6 - CYBSP_MMC_CLK",  "CYBSP_MMC_CLK"],[  "7",  "7"],[  "8",  "8"],[  "9",  "9"],[  "10",  "10"],[  "11",  "11"],[  "12",  "12"],[  "13",  "13"],[  "14",  "14"],[  "15",  "15"]];
        } else if (newValue === "4"){
          optionsForName = [[  "0 - CYBSP_MMC_DAT3",  "CYBSP_MMC_DAT3"],[  "1 - CYBSP_MMC_DAT0",  "CYBSP_MMC_DAT0"],[  "2 - CYBSP_QSPI_SCK",  "CYBSP_QSPI_SCK"],[  "3 - CYBSP_SS",  "CYBSP_SS"],[  "4 - CYBSP_QSPI_D3",  "CYBSP_QSPI_D3"],[  "5 - CYBSP_QSPI_D2",  "CYBSP_QSPI_D2"],[  "6 - CYBSP_QSPI_D1",  "CYBSP_QSPI_D1"],[  "7 - CYBSP_QSPI_D0",  "CYBSP_QSPI_D0"]];        
        } else if(newValue === "5"){
          optionsForName = [[  "0",  "0"],[  "1",  "1"],[  "2",  "2"],[  "3",  "3"],[  "4",  "4"],[  "5",  "5"],[  "6",  "6"],[  "7",  "7"],[  "8 - CYBSP_USER_LED2",  "CYBSP_USER_LED2"],[  "9 - CYBSP_USER_LED, CYBSP_USER_LED1",  "CYBSP_USER_LED, CYBSP_USER_LED1"],[  "10",  "10"],[  "11",  "11"]];
        } else if(newValue === "6") {
          optionsForName = [[  "0",  "0"],[  "1",  "1"],[  "2",  "2"],[  "3",  "3"],[  "4",  "4"],[  "5",  "5"],[  "6",  "6"],[  "7",  "7"]];        
        } else if(newValue === "14") {
          optionsForName = [[  "0",  "0"],[  "1",  "1"],[  "2",  "2"],[  "3",  "3"],[  "4",  "4"],[  "5",  "5"],[  "6",  "6"],[  "7",  "7"],[  "8",  "8"],[  "9",  "9"],[  "12",  "12"],[  "13",  "13"],[  "14",  "14"],[  "15",  "15"]];        
        } else optionsForName = [[  "2",  "2"],[  "3",  "3"],[  "4",  "4"],[  "5",  "5"],[  "6",  "6"],[  "7",  "7"],[  "8 - CYBSP_ETH_CLK",  "CYBSP_ETH_CLK"],[  "9 - CYBSP_ETH_CRS",  "CYBSP_ETH_CRS"],[  "12 - CYBSP_USER_BTN2",  "CYBSP_USER_BTN2"],[  "13 - CYBSP_USER_BTN, CYBSP_USER_BTN1",  "CYBSP_USER_BTN, CYBSP_USER_BTN1"],[  "14",  "14"],[  "15",  "15"]];

        dropdownName.setValue("default");
        dropdownName.dispose();
        dropdownName = new Blockly.FieldDropdown(optionsForName);
        input.removeField("NAME");
        input.appendField(dropdownName, "NAME");
      }
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("config");
    this.setHelpUrl("");
  },
};

Blockly.Blocks['pins14'] = {
  init: function() {
    var thisBlock = this;
    var optionsForName = [["0", "0"], ["1", "1"], ["2", "2"],["3", "3"], ["4", "4"], ["5", "5"],["6", "6"], ["7", "7"], ["8", "8"],["9", "9"], ["10", "10"], ["11", "11"],["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"]];
    var dropdownName = new Blockly.FieldDropdown(optionsForName, function(option) {
      // Handle change of the second dropdown here if needed
    });

    var input = this.appendValueInput("TYPE")
    .appendField("Add ")
    .appendField(new Blockly.FieldDropdown([[  "input",  "INPUT"],[  "input/output",  "OUTPUT"],[  "hardware controlled",  " OUTPUT"]]), "DIR")
    .appendField("on Port: ")
    .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"],["3", "3"], ["4", "4"]]), "NAME1")
    .appendField("Pin: ")
    .appendField(dropdownName, "NAME");
      

    thisBlock.setOnChange(function(event = Blockly.Events.BlockChange) {
      if (event.name === 'NAME1') {
        var newValue = event.newValue;
        if (newValue === "0") {
          optionsForName = [["0", "0"], ["1", "1"], ["2", "2"],["3", "3"], ["4", "4"], ["5", "5"],["6", "6"], ["7", "7"], ["8 - CYBSP_RTC_XTAL1", "CYBSP_RTC_XTAL1"],["9 - CYBSP_RTC_XTAL2", "CYBSP_RTC_XTAL2"], ["10 - CYBSP_XTAL1", "CYBSP_XTAL1"], ["11 - CYBSP_XTAL2", "CYBSP_XTAL2"],["12", "12"], ["13", "13"], ["14 - CYBSP_SWDIO", "CYBSP_SWDIO"], ["15 - CYBSP_SWDCK", "CYBSP_SWDCK"]];
        } else if(newValue === "1") {
          optionsForName = [["0","0"],["1","1"],["2 - CYBSP_DEBUG_UART_TX","CYBSP_DEBUG_UART_TX"],["3 - CYBSP_DEBUG_UART_RX","CYBSP_DEBUG_UART_RX"],["4","4"],["5","5"],["6","6"], [   "7",   "7" ], [   "8",   "8" ]];
        } else if(newValue === "2") {
          optionsForName = [[  "0",  "0"],[  "1",  "1"],[  "2",  "2"],[  "3",  "3"],[  "4",  "4"],[  "5 - CYBSP_POT",  "CYBSP_POT"],[  "6",  "6"],[  "7",  "7"],[  "8",  "8"],[  "9",  "9"],[  "10",  "10"],[  "11",  "11"],[  "12",  "12"],[  "13",  "13"]];
        } else if(newValue === "3"){
          optionsForName = [[  "0",  "0"],[  "1 ",  "1"],[  "2",  "2"],[  "3 ",  "3"],[  "4",  "4"]];
        } else optionsForName = [[  "0 - CYBSP_USER_LED, CYBSP_USER_LED1",  "CYBSP_USER_LED, CYBSP_USER_LED1"],[  "1 - CYBSP_USER_LED2",  "CYBSP_USER_LED2"],[  "2 - CYBSP_USER_LED3",  "CYBSP_USER_LED3"],[  "3 - CYBSP_USER_LED4",  "CYBSP_USER_LED4"],[  "4",  "4"],[  "5",  "5"],[  "6",  "6"],[  "7",  "7"],[  "8",  "8"],[  "9",  "9"],[  "10",  "10"],[  "11",  "11"]];

        dropdownName.setValue("default");
        dropdownName.dispose();
        dropdownName = new Blockly.FieldDropdown(optionsForName);
        input.removeField("NAME");
        input.appendField(dropdownName, "NAME");
      }
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("config");
    this.setHelpUrl("");
  },
};

