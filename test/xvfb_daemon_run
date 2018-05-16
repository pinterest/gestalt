#!/bin/bash
export DISPLAY=:99
/etc/init.d/xvfb start
sleep 1
$@
exit_value=$?
/etc/init.d/xvfb stop
exit $exit_value
