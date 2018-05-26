#!/bin/bash

rm index.zip
zip -r index.zip *

aws lambda update-function-code --function-name lambda-eventPush-dev --zip-file fileb://index.zip
