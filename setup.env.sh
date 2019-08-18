#!/bin/sh

ENV_FILE=.env

if [ ! -f "$ENV_FILE" ]; then
  echo NODE_PATH=./ >> "$ENV_FILE"
  echo REACT_APP_API_URL="$API_URL" >> "$ENV_FILE"
  echo GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP >> "$ENV_FILE"
fi
