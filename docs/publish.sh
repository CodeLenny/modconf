#!/bin/bash
set -e

PUBLIC_SURGE_USERNAME=$(echo -n "$SURGE_LOGIN" | sed "s/^[^@]*/${SURGE_LOGIN:0:1}***/")
LAST_COMMIT="$(git log -1 --pretty=%B)"

if [[ "$TRAVIS_PULL_REQUEST" == "true" ]]; then
  echo "Not deploying docs from a pull request.  Aborting deployment."
  exit 0;
fi

if [[ "$CI" == "true" ]] && [[ "$TRAVIS_BRANCH" != "master" ]] && [[ "$LAST_COMMIT" != *"[deploy]"* ]]; then
  echo "Not on 'master'.  Aborting deployment."
  echo "  Add '[deploy]' to the commit message to override deployment check."
  exit 0;
fi
echo "Running deployment."

npm run docs

npm install surge

rm -rf _surge/
mkdir -p _surge/

cp CNAME _surge/
echo '<meta http-equiv="refresh" content="0;url=master/" />Redirecting. <a href="master/">Link</a>' > _surge/index.html
cp -r public _surge/master/


if [[ -z ${CI:x} ]]; then
  $(npm bin)/surge _surge
else
  $(npm bin)/surge _surge 2>&1 | sed "s/$SURGE_LOGIN/$PUBLIC_SURGE_USERNAME/g"
fi
