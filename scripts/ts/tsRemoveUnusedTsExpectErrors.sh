#!/bin/bash
TMP_FILE=/tmp/gestalt-tsc-results.txt
yarn tsc > $TMP_FILE
yarn babel-node scripts/ts/removeUnusedTsExpectErrorComments.ts $TMP_FILE
rm $TMP_FILE
