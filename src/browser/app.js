require('scss/main.scss')

import React from "react"
import ReactDOM from "react-dom"
import h from "react-hyperscript"
import electron from "electron"
import rpc from './rpc'
import Exec from './exec'
import Run from './run'
import {Text} from './inputs'

window.h = h
window.rpc = rpc
window.Exec = Exec
window.Run = Run
window.React = React
window.electron = electron

const Header = Exec("whoami", (hostname) => {
  return h('header', [
    h("h1", "DevTool"),
    h("h4", hostname)
  ])
})

const Section = (name, children) => {
  return h('section', [
    h('h3', name),
    h('div.content', children)
  ])
}

const App = React.createClass({
  render() {
    return h('div.app', [
      Header,
      Section('Getting Started', [
        Text({initial:"", placeholder:"installation path"}, (path) => {
          path = path || "~/Desktop";
          return h('span', [
            Run('install', `
              mkdir -p ${path};
              cd ${path};
              git clone git@github.com:ccorcos/dev-tool.git;
              cd dev-tool;
              npm install;
            `),
            Run('start', `
              cd ${path}/dev-tool
              ./start.sh
            `),
          ])
        })
      ])
    ])
  }
})

ReactDOM.render(
  h(App, {}),
  document.getElementById('root')
)