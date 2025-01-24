#!/usr/bin/env sh
set -x
set -e

(cd packages/gestalt-design-tokens && yarn build)
(cd packages/gestalt && yarn build)
(cd packages/gestalt-charts && yarn build)
(cd packages/gestalt-datepicker && yarn build)
(cd docs && PUBLIC_URL=$DEPLOY_PRIME_URL yarn build)
