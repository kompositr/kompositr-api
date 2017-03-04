#!/bin/bash

# Exit on any error
set -e

docker build --no-cache -t kompositr/kompositr-api:local2 .
docker tag kompositr/kompositr-api:local2 kompositr/kompositr-api:latest
docker run -d -p 8080:8080 kompositr/kompositr-api:latest; sleep 5
curl http://localhost:8080/