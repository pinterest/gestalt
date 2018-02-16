#!/bin/bash

# Builds docs and deploys them to GitHub pages.
# usage (repo is optional):
# ./scripts/ghpages repo

# Aborts script on command failure
set -e

# Prints out commands about to be executed
set -x

repo=${1:-pinterest}

git checkout -b tmp-deploy
npm run build_docs
git add -f docs
git commit -m "Deployed to Github Pages"
git push git@github.com:${repo}/gestalt.git :gh-pages
git subtree push --prefix docs git@github.com:${repo}/gestalt.git gh-pages
git checkout master
git reset --hard HEAD
git branch -D tmp-deploy
