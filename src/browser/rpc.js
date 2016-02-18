
import electron from "electron"

const makeId = () => String(Math.round(Math.random()*Math.pow(10, 10)))

const isFunction = (x) => Object.prototype.toString.apply(x) === "[object Function]"

const rpc = (name, arg, callback) => {
  // XXX check if its a function!
  if (isFunction(arg)) {
    callback = arg
    arg = null
  }
  const id = makeId()
  const listener = (event, result) => callback && callback(result)
  const channel = `${name}-{id}`
  electron.ipcRenderer.on(channel, listener)
  electron.ipcRenderer.send(name, id, arg)
  return () => electron.ipcRenderer.removeListener(channel, listener)
}

export default rpc

window.rpc = rpc