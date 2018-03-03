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
git commit -m "Deployed to Github Pages"
git push ${repo} :gh-pages
git subtree push --prefix docs/build ${repo} gh-pages
git checkout master
git reset --hard HEAD
git branch -D tmp-deploy
