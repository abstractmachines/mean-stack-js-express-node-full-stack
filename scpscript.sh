#!/bin/bash

#scp script for npm, hooray!

OUTPUT="$(scp ~/express_projects/mean-stack-js-express-node-full-stack/app.js deployment@54.148.122.112:/data/www/nodeapp/app.js
2>/dev/null )"

echo "${OUTPUT}"

