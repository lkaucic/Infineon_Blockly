#include <stdio.h>
#include "cybsp.h"
#include "cy_utils.h"
#include "cy_retarget_io.h"
  int main(void){
    cy_rslt_t result = cybsp_init();
    if (result != CY_RSLT_SUCCESS)
    {
    CY_ASSERT(0);
    }
    NVIC_SetPriority(INTERRUPT_PRIORITY_NODE_ID,INTERRUPT_EVENT_PRIORITY);
    NVIC_EnableIRQ(INTERRUPT_PRIORITY_NODE_ID);
    for(int i = 0; i <=7; i+=1){
      XMC_GPIO_Init(
      	0,
      	i+8,
      	XMC_GPIO_MODE_OUTPUT_PUSH_PULL);

    }int dir = 0;
    int led = 0;
    while (1==1){
      XMC_GPIO_SetOutputLevel(XMC_GPIO_PORT0, led+8, XMC_GPIO_OUTPUT_LEVEL_LOW );
      if (dir == 1) {
        if (i < 8) {
          led += 1;
        } else {
          led = 8;
        }
      } else {
        if (i > 0) {
          led -= 1;
        } else {
          led = 8;
        }
      }
      XMC_GPIO_SetOutputLevel(XMC_GPIO_PORT0, led+8, XMC_GPIO_OUTPUT_LEVEL_HIGH );
      XMC_Delay(200);

    }
  return 0;
  }