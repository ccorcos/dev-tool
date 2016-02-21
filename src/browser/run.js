import React from "react"
import h from "react-hyperscript"
import rpc from './rpc'

const RunButton = React.createClass({
  getInitialState() {
    return {running: false}
  },
  run() {
    this.setState({running: true})
    rpc('run', this.props.cmd, (result) => {
      this.setState({running: false})
    })
  },
  render() {
    return h('button' + (this.state.running ? ".running" : ""), {onClick: this.run}, this.props.name)
  }
})

const RunBtn = (name, cmd) => {
  return h(RunButton, {name, cmd})
}

export default RunBtn