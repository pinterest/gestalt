#!/bin/bash
set -euo pipefail

echo "+++ :jest: Running Jest"
yarn test --coverage
echo "👌 Looks good to me!"

echo "--- :hammer_and_wrench: Building for integration tests"
yarn build
(cd test && yarn build)

echo "+++ :jest: Running Integration Jest"
yarn concurrently --kill-others --names "SERVER,JEST" \
  "(cd test && yarn start)" \
  "./run_integration_tests.sh"
echo "👌 Looks good to me!"

echo "--- :codecov: Sending coverage report to CodeCov"
yarn codecov
echo "📑 Done!"
