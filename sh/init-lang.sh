#!/bin/bash

# Create PO files
echo "Creating ${locale} language files"
mkdir -p locale/${locale}/LC_MESSAGES
mkdir -p i18n/${locale}
msginit --input=./locale/templates/LC_MESSAGES/messages.pot \
      --output-file=./locale/${locale}/LC_MESSAGES/messages.po \
      -l ${locale} --no-translator
echo "You can translate i18n/${locale}/messages.json"
