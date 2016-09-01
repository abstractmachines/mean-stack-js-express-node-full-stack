#!/bin/bash

echo "what"

OUTPUT="$(curl --request POST -d radfuckinnames http://localhost:3100/foo -H "Content-Type: text/plain")"

echo "${OUTPUT}"
