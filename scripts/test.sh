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

echo "jest"
yarn jest --coverage

echo "a11y:validate"
yarn a11y:validate

echo "svgIcons:validate"
yarn svgIcons:validate

echo "flow"
yarn flow check --max-warnings 0

echo "CSS: flow types"
yarn run flow-generate:css

echo "CSS: variables"
yarn run css:validate

echo "Shell check"
yarn run lint:sh

FILES=$(git diff --name-only -- '*.flow')
if [[ "$FILES" ]]
then
  echo "CSS Flow types need to be updated."
  echo "Run \`yarn run flow-generate:css\` and commit your changes."
  echo "----"
  echo "Following files require changes:"
  git diff -- '*.flow'
  exit 1
fi

echo "👌 Looks good to me!"
echo "📑 Done!"
