#!/usr/bin/env bash
set -e

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
yarn jest
fold_end "jest"

fold_start "puppeteer"
./run_integration_tests
fold_end "puppeteer"

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  fold_start "codecov"
  codecov
  fold_end "codecov"
fi

echo ":tada:"
