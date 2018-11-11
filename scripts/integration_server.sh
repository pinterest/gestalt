#!/usr/bin/env bash
yarn concurrently --kill-others -n "WEBPACK,SERVER" \
  "(cd test && yarn webpack-dev-server --hot --inline --progress --colors)" \
  "(cd test && yarn babel-node server.js)"
