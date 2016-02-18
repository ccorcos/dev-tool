# DevTool

This is a basic boilerplate for building an Electron app with React, HMR, SCSS, and basic commandline rpc features. My intentions with this project is to build simple GUI's for different projects of mine.

# Getting Started

```bash
git clone https://github.com/ccorcos/electron-dev-tool
cd dev-tool
npm install -g webpack-dev-server electron-prebuilt
npm install && npm start
# tab 1: start-server
node server.js
# tab 2: start-electron
electron src/electron/main.js --debug
# tab 3: main process debug console
node debug localhost:5858
```