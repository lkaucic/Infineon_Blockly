#if !defined(CYCFG_NOTICES_H)
#define CYCFG_NOTICES_H

#ifdef CY_SUPPORTS_DEVICE_VALIDATION
#ifndef XMC1404_Q064x0200
    #error "Unexpected MPN; expected DEVICE:=XMC1404-Q064x0200. There may be an inconsistency between the *.modus file and the makefile target configuration device sets."
#endif
#endif

#ifdef CY_SUPPORTS_COMPLETE_DEVICE_VALIDATION
#ifndef XMC1404_Q064x0200
    #error "Unexpected MPN; expected DEVICE:=XMC1404-Q064x0200. There may be an inconsistency between the *.modus file and the makefile target configuration device sets."
#endif
#endif


#endif