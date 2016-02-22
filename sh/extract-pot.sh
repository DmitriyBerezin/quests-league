#!/bin/bash

mkdir -p locale/templates/LC_MESSAGES
./node_modules/.bin/extract-pot --locale locale . -t Jade -f jade --exclude bower_components/ --exclude docs/ --exclude i18n/ --exclude database/ --exclude static/ --exclude test/

# merge pot with existing po
./node_modules/i18n-abide/bin/merge-po.sh locale