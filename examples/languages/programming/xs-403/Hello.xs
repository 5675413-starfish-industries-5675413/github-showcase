#include "EXTERN.h"
#include "perl.h"
#include "XSUB.h"

MODULE = Hello PACKAGE = Hello

const char *
greet()
    CODE:
        RETVAL = "Hello, world!";
    OUTPUT:
        RETVAL
