export const toolbox_xmc_14 = {
  'kind': 'categoryToolbox',
  'contents': [
    {
      "kind" : "category",
      "name": "Pin config",
      "colour": "120",
      "contents":[
        {
          'kind': 'block',
          'type': 'pins14',
        },
        {
          'kind': 'block',
          'type': 'input_type',
        },
        {
          'kind': 'block',
          'type': 'output_type',
        },
      ]
    },
    {
      "kind": "category",
      "name": "Variables",
      "colour": "160",
      "contents": [
        {
          'kind': 'block',
          'type': 'variables_sett'
        },
        {
          'kind': 'block',
          'type': 'variables_get'
        },
        {
          'kind': 'block',
          'type': 'macro_sett'
        },
        {
          'kind': 'block',
          'type': 'volatile_wrap'
        },
        {
          'kind': 'block',
          'type': 'asign'
        },
      ]
    },
    {
      "kind": "category",
      "name": "Operations",
      "colour": "330",
      "contents": [
        {
          'kind': 'block',
          'type': 'operation'
        },
        {
          'kind': 'block',
          'type': 'operation2'
        },
        {
          'kind': 'block',
          'type': 'math_number'
        },
        {
          'kind': 'block',
          'type': 'arith_operation'
        },
      ]
    },
    {
      "kind": "category",
      "name": "Loops",
      "colour": "210",
      "contents": [
        {
          'kind': 'block',
          'type': 'for_loop'
        },
        {
          'kind': 'block',
          'type': 'while_do'
        },
      ]
    },
    {
      "kind": "category",
      "name": "flow and logic",
      "colour": "60",
      "contents":[
        {
          'kind': 'block',
          'type': 'controls_if'
        },
        {
          'kind': 'block',
          'type': 'condition'
        },
        {
          'kind': 'block',
          'type': 'logical_cond'
        },
      ]
    },
    {
      "kind": "category",
      "name": "XMC functions",
      "colour": "20",
      "contents": [
        {
          'kind': 'block',
          'type': 'gpio_init'
        },
        {
          'kind': 'block',
          'type': 'gpio_set_mode'
        },
        {
          'kind': 'block',
          'type': 'gpio_set_output_level'
        },
        {
          'kind': 'block',
          'type': 'toggle'
        },
        {
          'kind': 'block',
          'type': 'interrupt'
        },
        {
          'kind': 'block',
          'type': 'delay'
        },
        {
          'kind': 'block',
          'type': 'adc'
        },
        {
          'kind': 'block',
          'type': 'adc_result'
        },
        {
          'kind': 'block',
          'type': 'adc_write'
        }
      ]
    },
    {
      "kind": "category",
      "name": "C functions",
      "colour": "180",
      "contents":[
        {
          'kind': 'block',
          'type': 'main'
        },
        {
          'kind': 'block',
          'type': 'procedures_defreturn'
        },
      ]
    },
    {
      "kind": "category",
      "name": "Text",
      "colour": "300",
      "contents":[
        {
          'kind': 'block',
          'type': 'text'
        },
      ]
    }
  ]
}
