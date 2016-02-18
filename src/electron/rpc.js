"use strict";

const electron = require("electron");

const rpc = (name, func) => {
  const channel = `${name}-{id}`
  const listener = function(event, id, arg) {
    const callback = (result) => event.sender.send(channel, result)
    func(callback, arg)
  }
  electron.ipcMain.on(name, listener)
  return electron.ipcMain.removeListener(channel, listener)
}

module.exports = rpc