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
(cd packages/gestalt && npx css-modules-flow-types-cli packages/gestalt/src)

echo "flow"
yarn flow check

echo "Cleanup CSS module flow files"
find . -name "*.css.flow" -type f -delete

echo "👌 Looks good to me!"
echo "📑 Done!"
