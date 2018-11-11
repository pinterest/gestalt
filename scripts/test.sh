#!/usr/bin/env bash
set -euo pipefail

function fold_start {
  if [[ -z BUILDKITE ]]; then
    echo "--- $1"
  else
    echo -en "travis_fold:start:$1\\r"
  fi
}

function fold_end {
  if [[ -z BUILDKITE ]]; then
    if [[ $? -ne 0 ]]; then
      echo "^^^ +++"
    fi
  else
    echo -en "travis_fold:end:$1\\r"
  fi
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

fold_start "puppeteer"
JEST_PUPPETEER_CONFIG="scripts/jestPuppeteer.config.js" \
  yarn jest --config scripts/jestIntegration.config.json
fold_end "puppeteer"

echo "👌 Looks good to me!"

if [[ "${BUILDKITE_PULL_REQUEST:-"true"}" = "false" || "${TRAVIS_PULL_REQUEST:-"true"}" = "false" ]]; then
  fold_start "codecov"
  codecov
  fold_end "codecov"
fi

echo "📑 Done!"
