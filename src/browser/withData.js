import rpc from './rpc'
import React from 'react'
import h from 'react-hyperscript'

const AsyncRpc = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    arg: React.PropTypes.any,
  },
  getInitialState() {
    return {data: null}
  },
  listen(event, data) {
    this.setState({data})
  },
  start(name, arg) {
    this.stopRpc = rpc(name, (data) => {
      this.setState({data})
    })
  },
  stop(name) {
    this.stopRpc()
  },
  componentWillMount() {
    this.start(this.props.name, this.props.arg)
  },
  componentWillUnmount() {
    this.stop(this.props.name)
  },
  componentWillReceiveProps(nextProps) {
    this.stop(this.props.name)
    this.start(nextProps.name, nextProps.arg)
  },
  render() {
    if (this.state.data) {
      return h('span.async', React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {data: this.state.data})
      }))
    } else {
      return false
    }
  }
})

const withData = (name, arg, component) => {
  if (!component) {
    component = arg
    arg = null
  }
  return () => h(AsyncRpc, {name, arg}, h(component))
}

export default withData