#!/usr/bin/env bash
set -e

function fold_start {
  echo -en "travis_fold:start:$1\\r"
}

function fold_end {
  echo -en "travis_fold:end:$1\\r"
}

fold_start "eslint"
yarn eslint .
fold_end "eslint"

fold_start "stylelint"
yarn stylelint "packages/**/*.css"
fold_end "stylelint"

fold_start "jest"
yarn jest
fold_end "jest"

fold_start "integration_tests"
./run_integration_tests
fold_end "integration_tests"
