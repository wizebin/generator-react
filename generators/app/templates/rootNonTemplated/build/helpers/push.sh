#!/bin/bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

cd $(dirname "$0")
cd ../..

pwd;

aws s3 cp --recursive --acl public-read ./dist/ s3://$BUCKET/
