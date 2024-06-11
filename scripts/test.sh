#!/usr/bin/env bash
set -euo pipefail

echo "build"
(cd packages/gestalt && yarn build)
(cd packages/gestalt-charts && yarn build)
(cd packages/gestalt-datepicker && yarn build)

echo "eslint"
yarn eslint .

echo "prettier"
yarn prettier --check .

echo "stylelint"
yarn stylelint "**/*.css"

echo "Tokens:Output Tests"
yarn run tokens:test

echo "jest"
yarn jest --coverage

echo "a11y:validate"
yarn a11y:validate

echo "svgIcons:validate"
yarn svgIcons:validate

echo "TypeScript"
yarn tsc

echo "CSS: variables"
yarn run css:validate

echo "Shell check"
yarn run lint:sh



if [ -z "${GITHUB_ACTIONS:-}" ] && git diff HEAD master --name-only | grep -q packages/gestalt; then
  echo "Found changes to Components"
  echo "Running playwright tests locally"
  yarn run playwright:visual-test
else
  echo "Skipping visual tests for components"
fi

echo "👌 Looks good to me!"
echo "📑 Done!"
