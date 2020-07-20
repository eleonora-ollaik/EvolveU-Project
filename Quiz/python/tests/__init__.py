# This is only required for earlier verions of Python 
# to indicate this folder as a package
#
# https://stackoverflow.com/questions/448271/what-is-init-py-for
# Python defines two types of packages, regular packages and namespace packages. 
# Regular packages are traditional packages as they existed in Python 3.2 and earlier. 
# A regular package is typically implemented as a directory containing an __init__.py file. 
# When a regular package is imported, this __init__.py file is implicitly executed, 
# and the objects it defines are bound to names in the package’s namespace. 
# The __init__.py file can contain the same Python code that any other module can contain, 
# and Python will add some additional attributes to the module when it is imported.