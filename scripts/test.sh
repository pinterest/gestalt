#!/usr/bin/env bash
set -e

echo "+++ :eslint: Running eslint"
yarn eslint .

echo "+++ :stylelint: Running stylelint"
yarn stylelint "packages/**/*.css"

echo "+++ :jest: Running jest"
yarn jest

echo "+++ :eslint: Running integration tests"
./run_integration_tests
