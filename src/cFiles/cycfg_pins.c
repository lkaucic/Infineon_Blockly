#include "cycfg_pins.h"
  const XMC_GPIO_CONFIG_t ioss_0_port_0_pin_0_config ={
  .mode = (XMC_GPIO_MODE_t)ioss_0_port_0_pin_0_MODE,};
  const XMC_GPIO_CONFIG_t ioss_0_port_0_pin_0_config ={
  .mode = (XMC_GPIO_MODE_t)ioss_0_port_0_pin_0_MODE,};

void init_cycfg_pins(void){
  XMC_GPIO_Init(ioss_0_port_0_pin_0_PORT, ioss_0_port_0_pin_0_PIN, &ioss_0_port_0_pin_0_config);
  XMC_GPIO_SetHardwareControl(ioss_0_port_0_pin_0_PORT, ioss_0_port_0_pin_0_PIN, ioss_0_port_0_pin_0_HWO);
  XMC_GPIO_Init(ioss_0_port_0_pin_0_PORT, ioss_0_port_0_pin_0_PIN, &ioss_0_port_0_pin_0_config);
  XMC_GPIO_SetHardwareControl(ioss_0_port_0_pin_0_PORT, ioss_0_port_0_pin_0_PIN, ioss_0_port_0_pin_0_HWO);
}