#!/bin/bash
echo Generating API
node swag-cli --in ./swagger.json --out theApi.js
echo Running test-app
node test-app
