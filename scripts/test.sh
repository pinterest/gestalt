#!/usr/bin/env bash

yarn test --env jsdom && \
yarn test --env node && \
yarn codecov --commit "$BUILDKITE_COMMIT" \
             --branch "$BUILDKITE_BRANCH" \
             --build "$BUILDKITE_BUILD_ID"
