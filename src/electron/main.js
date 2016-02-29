"use strict";

const r = require('ramda');

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Debug console and utils
const Debug = require('electron-debug')
// Send crash reports to a remote server
const crashReporter = electron.crashReporter;

// crashReporter.start({
//   productName: 'DevTool',
//   companyName: 'YourCompany',
//   submitURL: 'https://your-domain.com/url-to-submit',
//   autoSubmit: true
// });

Debug({
  showDevTools: (process.env.NODE_ENV === "development")
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  if (process.env.HOT) {
    mainWindow.loadURL('file://' + __dirname + '/../browser/dev_index.html');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/../browser/prod_index.html');
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

const rpc = require('./rpc');
const shell = require('shelljs');

const withDevtoolrc = (cmd) => "source " + __dirname + "/../../devtoolrc.sh; " + cmd
const inNewTab = (cmd) => withDevtoolrc(' tab "' + cmd + '"')

// run command in a new tab
rpc('run', function(cb, cmd) {
  shell.exec(inNewTab(cmd), (code, stdout, stderr) => {
     cb(stdout.trim())
  })
})

// simply execute a command
rpc('exec', function(cb, cmd) {
  shell.exec(withDevtoolrc(cmd), (code, stdout, stderr) => {
     cb(stdout.trim())
  })
})


