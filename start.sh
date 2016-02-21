source devtoolrc.sh

# tab 1: start-server
tab "node server.js"
# tab 2: start-electron
tab "node_modules/.bin/electron src/electron/main.js --debug"
# tab 3: main process debug console
tab "node debug localhost:5858"
