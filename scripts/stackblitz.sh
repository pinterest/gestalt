#!/usr/bin/env sh

# Simplified start script for the stack blitz environment, which can't handle multiple watchers
set -x
set -e

(cd packages/gestalt-design-tokens && yarn build)
(cd packages/gestalt && yarn build)
(cd packages/gestalt-charts && yarn build)
(cd packages/gestalt-datepicker && yarn build)
(cd docs && yarn build-metadata)
(cd docs && (npx next dev))

