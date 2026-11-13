# Legacy NumPy/Pyrex include-style declarations.
cdef extern from "numpy/arrayobject.h":
    void import_array()
