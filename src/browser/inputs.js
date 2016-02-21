import React from "react"
import h from "react-hyperscript"
import rpc from './rpc'

const TextInput = React.createClass({
  getInitialState() {
    return {value: this.props.initial || ''}
  },
  onChange(e) {
    this.setState({value: e.target.value})
  },
  render() {
    return h('div', [
      h('input', {
        type: 'text',
        value: this.state.value,
        onChange: this.onChange,
        placeholder: this.props.placeholder
      }),
      this.props.render(this.state.value)
    ])
  }
})

const Text = ({initial, placeholder}, render) => {
  return h(TextInput, {initial, placeholder, render})
}

export {Text}