  #define ioss_0_port_2_pin_CYBSP_SWO_PORT XMC_GPIO_PORT0
  #define ioss_0_port_2_pin_CYBSP_SWO_PORT_NUM 2U
  #define ioss_0_port_2_pin_CYBSP_SWO_PIN 0U
  #ifndef ioss_0_port_2_pin_CYBSP_SWO_OUTPUT_ALT
    #define ioss_0_port_2_pin_CYBSP_SWO_OUTPUT_ALT 0U
  #endif
  #define ioss_0_port_2_pin_CYBSP_SWO_MODE (XMC_GPIO_MODE_OUTPUT_| ioss_0_port_2_pin__CYBSP_SWO)
  #ifndef ioss_0_port_2_pin_CYBSP_SWO_HWO
    #define ioss_0_port_2_pin_CYBSP_SWO_HWO XMC_GPIO_HWCTRL_DISABLED
  #endif
  const XMC_GPIO_CONFIG_t ioss_0_port_0_pin_CYBSP_SWO_config ={
  .mode = (XMC_GPIO_MODE_t)ioss_0_port_0_pin_CYBSP_SWO_MODE,};
  void init_cycfg_pins(void){
  XMC_GPIO_Init(ioss_0_port_0_pin_CYBSP_SWO_PORT, ioss_0_port_0_pin_CYBSP_SWO_PIN, &ioss_0_port_0_pin_CYBSP_SWO_config);
  XMC_GPIO_SetHardwareControl(ioss_0_port_0_pin_CYBSP_SWO_PORT, ioss_0_port_0_pin_CYBSP_SWO_PIN, ioss_0_port_0_pin_0_HWO);
  }
