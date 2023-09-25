#!/bin/bash

all_args=("$@")
target="$1"
trap "echo Exited!; exit;" SIGINT SIGTERM

hostname=""
read -r -p "Which host should we connect to? Often used to complete this command: gironde ssh " hostname

./scripts/remote-watch/index.js --selfRestart false --root ./ --remote "${hostname}":~/code/pinboard/webapp/packages/gestalt

