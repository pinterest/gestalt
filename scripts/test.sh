#!/bin/bash
set -euo pipefail

echo "+++ :jest: Running Jest"
yarn test --coverage

echo "👌 Looks good to me!"

echo "--- :codecov: Sending coverage report"
yarn codecov

echo "📑 Done!"
