#!/bin/bash

#terminal 1: run PORT=3100 node app.js
#expected output after terminal 2 curl's:
#radsauce

#terminal 2:  ./verifyscript.sh && echo "it worked" || echo "fail"
#expected output:
# radsauce
# it worked

OUTPUT="$(curl --request POST -d radsauce http://localhost:3100/foo -H "Content-Type: text/plain" 2>/dev/null )"

echo "${OUTPUT}"


if [ "${OUTPUT}" = "radsauce" ]; then

  #this next line is unnecessary, just exists to clarify purpose:
  echo "success, child process exit code 0: OUTPUT is ${OUTPUT}";

  exit 0;

else

  #this next line is unnecessary, just exists to clarify purpose:
  echo "failure, child process exit code 1: OUTPUT is ${OUTPUT}";

  exit 1;

fi
