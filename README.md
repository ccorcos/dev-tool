# DevTool

This is a basic boilerplate for building an Electron app with React, HMR, SCSS, and basic commandline rpc features. My intentions with this project is to build simple GUI's for different projects of mine.

# Getting Started

```bash
git clone https://github.com/ccorcos/dev-tool
cd dev-tool
npm install
./start.sh
# OR manually:
# tab 1: start-server
node server.js
# tab 2: start-electron
node_modules/.bin/electron src/electron/main.js --debug
# tab 3: main process debug console
node debug localhost:5858
```

# ToDo

- better sass organization and theming
- path autocomplete
- input selections
