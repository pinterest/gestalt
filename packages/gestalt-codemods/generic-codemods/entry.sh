#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
AVAILABLE_CODEMODS="$(find $DIR -maxdepth 1 -name '*.js' -exec basename {} .js ';')"

if [[ $# -eq 0 ]] ; then
  echo -e "Error: Please specify which codemod you would like to run.\n"
  echo -e "Available Codemods:\n${AVAILABLE_CODEMODS}"
  exit 0
fi

yarn jscodeshift --ignore-pattern=**/node_modules/** --ignore-pattern=build/** --parser=flow -t=${DIR}/${1}.js ${@:2}
modified_files=$(git diff --relative --name-only  -- '**/*.js' | xargs)
if [ -n "${modified_files}" ]; then
  yarn prettier --write $(git diff --relative --name-only  -- '**/*.js' | xargs)
fi
