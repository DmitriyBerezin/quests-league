#!/bin/bash

# echo "Extracting strings"
mkdir -p locale/templates/LC_MESSAGES
./node_modules/.bin/extract-pot --locale locale . -t Jade -f jade --exclude bower_components/ --exclude docs/ --exclude i18n/ --exclude database/ --exclude static/ --exclude test/

# # Create PO files
# for locale in en ru; do
#   echo "Creating ${locale} language files"
#   mkdir -p locale/${locale}/LC_MESSAGES
#   mkdir -p i18n/${locale}
#   msginit --input=./locale/templates/LC_MESSAGES/messages.pot \
#           --output-file=./locale/${locale}/LC_MESSAGES/messages.po \
#           -l ${locale} --no-translator
#   echo "You can translate i18n/${locale}/messages.json"
# done

./node_modules/i18n-abide/bin/merge-po.sh locale

# Convert PO files to JSON
./node_modules/i18n-abide/bin/compile-json locale i18n

# Make current version of the code happy
./node_modules/i18n-abide/bin/compile-mo.sh locale