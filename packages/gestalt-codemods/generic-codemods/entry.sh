#!/usr/bin/env bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null 2>&1 && pwd)"
AVAILABLE_CODEMODS="$(find "$DIR" -maxdepth 1 -name '*.ts' -exec basename {} .ts ';')"

if [[ $# -eq 0 ]]; then
  echo -e "Error: Please specify which codemod you would like to run.\n"
  echo -e "Available Codemods:\n${AVAILABLE_CODEMODS}"
  exit 0
fi

yarn jscodeshift --ignore-pattern=**/node_modules/** --ignore-pattern=build/** --extensions=tsx --parser=tsx -t="${DIR}"/"${1}".ts "${@:2}"
modified_files=$(git diff --relative --name-only -- '**/*.tsx' | xargs)
if [ -n "${modified_files}" ]; then
  yarn prettier --write "$(git diff --relative --name-only -- '**/*.tsx' | xargs)"
fi
