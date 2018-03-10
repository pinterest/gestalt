#/usr/bin/env sh
set -x
set -e

(cd packages/gestalt && yarn build)
(cd docs && PUBLIC_URL=$DEPLOY_PRIME_URL yarn build)
(cd docs/build && echo "/*    /index.html   200" > _redirects)
