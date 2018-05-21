#!/bin/bash
set -euo pipefail

echo "--- :hammer_and_wrench: Building gestalt"

yarn build

echo "--- :hammer_and_wrench: Building server"
(cd test && yarn build)

echo "+++ :jest: Running Jest"
(cd test && yarn test)
yarn concurrently --kill-others --names "SERVER,JEST" \
  "(cd test && yarn start)" \
  "./run_integration_tests.sh"
echo "👌 Looks good to me!"
