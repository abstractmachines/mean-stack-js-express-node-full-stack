#!/bin/bash

#terminal 1: run PORT=3100 node app.js
#expected output after terminal 2 curl's:
#radsauce

#terminal 2:  ./verifyscript.sh && echo "it worked" || echo "fail" etc
#
# Specific command to run in terminal 2 is:
#
# ( ./verifyscript.sh && if [ $? -lt 0 ];
# then echo "failure, exit code -1";
# elif [ $? -eq 0 ]; then echo "success, exit code 0";
# elif [ $? -lt 0 ]; then echo "failure, exit code less than 1";
# elif [ $? -gt 1 ]; then echo "exit code greater than 1"; fi )
# radsauce
# success, child process exit code 0: OUTPUT is radsauce

OUTPUT="$(curl --request POST -d radsauce http://localhost:3100/foo -H "Content-Type: text/plain" 2>/dev/null )"

echo "${OUTPUT}"

# possible alternative:
# if [ $? -eq 0 ]; then

if [ "${OUTPUT}" = "radsauce" ]; then

  #this next line is unnecessary, just exists to clarify purpose:
  echo "success, child process exit code 0: OUTPUT is ${OUTPUT}";

  exit 0;

else

  #this next line is unnecessary, just exists to clarify purpose:
  echo "failure, child process exit code 1: OUTPUT is ${OUTPUT}";

  exit 1;

fi
