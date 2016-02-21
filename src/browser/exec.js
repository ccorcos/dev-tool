import React from "react"
import h from "react-hyperscript"
import rpc from './rpc'

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

const Exec = (cmd, render) => {
  return h(ExecData, {cmd, render})
}

export default Exec