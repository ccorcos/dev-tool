#!/bin/bash

# build js and css files
trash dist
NODE_ENV=production ./node_modules/.bin/webpack -p --config webpack.config.prod.js

# build mac app
trash built
./node_modules/.bin/electron-packager . "Dev Tool" \
  --platform=darwin --arch=x64 --version=0.35.6 \
  --prune \
  --app-bundle-id "com.dev-tool.app" --app-version 0.1.0 \
  --icon ./src/assets/icon.icns \
  --out ./built

# compress it
cd built
tar -czf DevTool.tar.gz -C ./Dev\ Tool-darwin-x64/ Dev\ Tool.app
cd ..

# open it
open built/Dev\ Tool-darwin-x64/Dev\ Tool.app