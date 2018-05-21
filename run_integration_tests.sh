#!/bin/bash
set -euo pipefail

until $(curl --output /dev/null --silent --head --fail http://localhost:3000); do
    printf '.'
    sleep 5
done

JEST_PUPPETEER_CONFIG="scripts/jestPuppeteer.config.js" yarn jest --config scripts/jestIntegration.config.json
