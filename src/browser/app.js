require('scss/main.scss')

import React from "react"
import ReactDOM from "react-dom"
import h from "react-hyperscript"
import R from "ramda"
import electron from "electron"
import rpc from './rpc'
import Exec from './exec'
import Run from './run'
import {Text, Path, Select} from './inputs'

window.h = h
window.R = R
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
        Path({initial:"", placeholder:"~/path/to/project"}, (path) => {
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
      ]),
      Section('More Fun', [
        Exec('ls ~/Documents/', (result) => {
          const files = R.pipe(
            R.trim,
            R.split('\n'),
            R.map(R.trim)
          )(result)
          return Select(files, (selected) => {
            return Run("open sesame", `open ~/Documents/${selected}`)
          })
        })
      ])
    ])
  }
})

ReactDOM.render(
  h(App, {}),
  document.getElementById('root')
)