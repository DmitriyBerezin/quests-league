#!/bin/bash

# Convert PO files to JSON
./node_modules/i18n-abide/bin/compile-json locale i18n

# Make current version of the code happy
./node_modules/i18n-abide/bin/compile-mo.sh locale