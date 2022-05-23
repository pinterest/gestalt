#!/bin/bash

# generate snapshots in a container to match the CI env
yarn run playwright:test visual-test --update-snapshots --workers 20
