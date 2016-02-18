require('scss/main.scss')

import React from "react"
import ReactDOM from "react-dom"
import h from "react-hyperscript"
import electron from "electron"
import withData from "./withData"

const Header = withData(
  'whoami', 
  ({data}) => {
    return h('header', [
      h("h1", "DevTool"),
      h("h4", data)
    ])
  })

const App = React.createClass({
  render() {
    return h('div.app', [
      h(Header),
    ])
  }
})

ReactDOM.render(
  h(App, {}),
  document.getElementById('root')
)