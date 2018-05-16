#!/usr/bin/env bash

yarn test --env jsdom && yarn test --env node && yarn codecov
