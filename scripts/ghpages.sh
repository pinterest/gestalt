#!/bin/bash

# Builds docs and deploys them to GitHub pages.
# usage (repo is optional):
# ./scripts/ghpages repo

# Aborts script on command failure
set -e

# Prints out commands about to be executed
set -x

repo=${1:-https://github.com/pinterest/gestalt.git}

git checkout -b tmp-deploy
(cd docs && NODE_ENV=production yarn build --output-public-path '/gestalt')
git add -f docs/build
git commit -m "Deployed to Github Pages" --no-verify
git subtree split --prefix docs/build -b tmp-gh-pages
git push -f ${repo} tmp-gh-pages:gh-pages
git checkout master
git reset --hard HEAD
git branch -D tmp-deploy
git branch -D tmp-gh-pages
