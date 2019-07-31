#!/bin/bash

to_camel_case() {
    echo $1 | perl -pe 's/(-)./uc($&)/ge;s/-//g'
}

echo "// @flow"

for icon in $(find ./packages/gestalt/src/icons | sort)
do
    if [[ $icon =~ (([0-9a-zA-Z-]+)\.svg) ]]; then
        echo "import $(to_camel_case ${BASH_REMATCH[2]}) from './${BASH_REMATCH[1]}';"
    fi
done

echo "export default {"

for icon in $(find ./packages/gestalt/src/icons | sort)
do
    if [[ $icon =~ (([0-9a-zA-Z-]+)\.svg) ]]; then
        echo "  '${BASH_REMATCH[2]}': $(to_camel_case ${BASH_REMATCH[2]}),"
    fi
done

echo "};"
