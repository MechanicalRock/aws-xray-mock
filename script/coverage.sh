#!/bin/bash
cat coverage/lcov.info | node_modules/coveralls/bin/coveralls.js