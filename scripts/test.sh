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

echo "Generate CSS modules flow files"
yarn flow-generate:css

echo "flow"
yarn flow check

echo "👌 Looks good to me!"
echo "📑 Done!"
