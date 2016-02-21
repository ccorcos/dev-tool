import electron from "electron"

const makeId = () => String(Math.round(Math.random()*Math.pow(10, 10)))

const rpc = (name, arg, callback) => {
  const id = makeId()
  const listener = (event, result) => {
    callback && callback(result)
    electron.ipcRenderer.removeListener(channel, listener)
  }
  const channel = `${name}-${id}`
  electron.ipcRenderer.on(channel, listener)
  electron.ipcRenderer.send(name, id, arg)
}

export default rpc