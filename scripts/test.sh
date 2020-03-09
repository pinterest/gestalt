#!/usr/bin/env bash
set -euo pipefail

echo "build"
(cd packages/gestalt && yarn build)

echo "eslint"
yarn eslint .

echo "stylelint"
yarn stylelint "**/*.css"

echo "jest"
yarn jest --coverage

echo "flow"
yarn flow check

echo "CSS: flow types"
yarn run flow-generate:css

FILES=$(git diff --name-only)
if [[ "$FILES" ]]
then
  echo "CSS Flow types need to be updated."
  echo "Run \`yarn run flow-generate:css\` and commit your changes."
  echo "----"
  echo "Folowing files require changes:"
  echo "$FILES"
  exit 1
fi

echo "👌 Looks good to me!"
echo "📑 Done!"
