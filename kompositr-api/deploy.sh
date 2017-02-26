#!/bin/bash

# Exit on any error
set -e

sudo /opt/google-cloud-sdk/bin/gcloud docker push us.gcr.io/${PROJECT_NAME}/kompositr-api
export GOOGLE_APPLICATION_CREDENTIALS="${HOME}/account-auth.json"
sudo chown -R ubuntu:ubuntu /home/ubuntu/.kube
sudo kubectl patch deployment kompositr-api -p '{"spec":{"template":{"spec":{"containers":[{"name":"kompositr-api","image":"us.gcr.io/kompositr/kompositr-api:'"$CIRCLE_SHA1"'"}]}}}}'