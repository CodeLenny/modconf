#!/bin/bash
set -e

PUBLIC_SURGE_USERNAME=$(echo -n "$SURGE_LOGIN" | sed "s/^[^@]*/${SURGE_LOGIN:0:1}***/")
LAST_COMMIT="$(git log -1 --pretty=%B)"

if $CI && [[ "$TRAVIS_BRANCH" != "master" ]] && [[ "$LAST_COMMIT" != *"[deploy]"* ]]; then
  echo "Not on 'master'.  Aborting deployment."
  echo "  Add '[deploy]' to the commit message to override deployment check."
  exit 0;
fi
echo "Running deployment."

npm run docs

npm install surge

cp CNAME public/

if [[ -z ${CI:x} ]]; then
  $(npm bin)/surge public
else
  $(npm bin)/surge public 2>&1 | sed "s/$SURGE_LOGIN/$PUBLIC_SURGE_USERNAME/g"
fi
