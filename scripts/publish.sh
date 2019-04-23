#!/usr/bin/env bash
./scripts/build.sh
pushd dist/ng-quick-form
npm publish
popd
