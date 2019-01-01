#!/usr/bin/env bash
set -euo pipefail

function fold_start {
  echo -en "travis_fold:start:$1\\r"
}

function fold_end {
  echo -en "travis_fold:end:$1\\r"
}

fold_start "build"
(cd packages/gestalt && yarn prepublish)
fold_end "build"

fold_start "eslint"
yarn eslint .
fold_end "eslint"

fold_start "stylelint"
yarn stylelint "packages/**/*.css"
fold_end "stylelint"

fold_start "jest"
yarn jest --coverage
fold_end "jest"

fold_start "flow"
yarn flow check
fold_end "flow"

echo "👌 Looks good to me!"

if [[ "${TRAVIS_PULL_REQUEST:-"true"}" = "false" ]]; then
  fold_start "codecov"
  codecov
  fold_end "codecov"
fi

echo "📑 Done!"
