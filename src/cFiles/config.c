  #define ioss_0_port_0_pin_0_PORT XMC_GPIO_PORT0
  #define ioss_0_port_0_pin_0_PORT_NUM 0U
  #define ioss_0_port_0_pin_0_PIN 0U
  #ifndef ioss_0_port_0_pin_0_INPUT
    #define ioss_0_port_0_pin_0_INPUT 0U
  #endif
  #define ioss_0_port_0_pin_0_MODE (XMC_GPIO_MODE_INPUT_| ioss_0_port_0_pin__0)
  #ifndef ioss_0_port_0_pin_0_HWO
    #define ioss_0_port_0_pin_0_HWO XMC_GPIO_HWCTRL_DISABLED
  #endif
  const XMC_GPIO_CONFIG_t ioss_0_port_0_pin_0_config ={
  .mode = (XMC_GPIO_MODE_t)ioss_0_port_0_pin_0_MODE,};
  void init_cycfg_pins(void){
  XMC_GPIO_Init(ioss_0_port_0_pin_0_PORT, ioss_0_port_0_pin_0_PIN, &ioss_0_port_0_pin_0_config);
  XMC_GPIO_SetHardwareControl(ioss_0_port_0_pin_0_PORT, ioss_0_port_0_pin_0_PIN, ioss_0_port_0_pin_0_HWO);
  }
