#!/bin/bash

# Exit on any error
set -e

docker build -t kompositr/kompositr-api:local .
docker tag kompositr/kompositr-api:local kompositr/kompositr-api:local
docker run -d -p 8080:8080 kompositr/kompositr-api:latest
curl http://localhost:8080/kompositions/