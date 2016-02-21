"use strict";

const electron = require("electron");

const rpc = (name, func) => {
  const listener = function(event, id, arg) {
    const channel = `${name}-${id}`
    const callback = (result) => event.sender.send(channel, result)
    func(callback, arg)
  }
  electron.ipcMain.on(name, listener)
  return () => electron.ipcMain.removeListener(name, listener)
}

module.exports = rpc