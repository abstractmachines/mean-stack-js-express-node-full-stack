#!/bin/bash

OUTPUT="$(curl --request POST -d radsauce http://localhost:3100/foo -H "Content-Type: text/plain" 2>/dev/null )"

echo "${OUTPUT}"
#
# if[ "$OUTPUT" == 'radsauce' ];
#
# then
# echo "gimme things 'cause it's the same.";
#
# fi

#else
#echo "nope failure";
