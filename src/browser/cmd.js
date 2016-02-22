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

// run command in a new tab
const RunBtn = (name, cmd) => {
  return h(RunButton, {name, cmd})
}

const ExecButton = React.createClass({
  getInitialState() {
    return {running: false}
  },
  exec() {
    this.setState({running: true})
    rpc('exec', this.props.cmd, (result) => {
      this.setState({running: false})
    })
  },
  render() {
    return h('button' + (this.state.running ? ".running" : ""), {onClick: this.exec}, this.props.name)
  }
})

// execute a command
const ExecBtn = (name, cmd) => {
  return h(ExecButton, {name, cmd})
}

const ExecData = React.createClass({
  getInitialState() {
    return {data: undefined}
  },
  componentWillMount() {
    rpc("exec", this.props.cmd, (data) => {
      this.setState({data})
    })
  },
  render() {
    return (this.state.data === undefined) ? false : this.props.render(this.state.data)
  }
})

// execute command and render result
const Exec = (cmd, render) => {
  return h(ExecData, {cmd, render})
}

export {RunBtn, ExecBtn, Exec}