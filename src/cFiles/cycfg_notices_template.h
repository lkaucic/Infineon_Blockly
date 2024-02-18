#if !defined(CYCFG_NOTICES_H)
#define CYCFG_NOTICES_H

#ifdef CY_SUPPORTS_DEVICE_VALIDATION
#ifndef $SERIES$_$SUB$
    #error "Unexpected MPN; expected DEVICE:=$SERIES$-$SUB$. There may be an inconsistency between the *.modus file and the makefile target configuration device sets."
#endif
#endif

#ifdef CY_SUPPORTS_COMPLETE_DEVICE_VALIDATION
#ifndef $SERIES$_$SUB$
    #error "Unexpected MPN; expected DEVICE:=$SERIES$-$SUB$. There may be an inconsistency between the *.modus file and the makefile target configuration device sets."
#endif
#endif


#endif