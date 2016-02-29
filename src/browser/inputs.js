import React from "react"
import h from "react-hyperscript"
import R from 'ramda'
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

const PathInput = React.createClass({
  getInitialState() {
    return {value: this.props.initial || '', valid: true}
  },
  onChange(e) {
    this.setState({value: e.target.value})
  },
  validate() {
    rpc("exec", `ls -d ${this.state.value}`, (result) => {
      if (result) {
        this.setState({valid: true})
      } else {
        this.setState({valid: false})
      }
    })
  },
  componentWillMount() {
    this.validate()
  },
  onBlur() {
    this.validate()
  },
  onKeyDown(e) {
    // if the user presses tab
    if (e.keyCode == 9) {
      e.preventDefault()
      // break up into pieces
      const pieces = R.pipe(
        R.trim,
        R.split('/')
      )(this.state.value)
      // get the latest directory
      const dir = R.pipe(
        R.init,
        R.join('/')
      )(pieces)
      // and get the ending
      const ending = R.last(pieces)
      if (ending === "") { return }
      // see if anything matches in that directory
      rpc('exec', `ls ${dir}`, (value) => {
        // first with hard constrain on beginning
        const re = RegExp("^" + ending, "ig")
        const files = R.pipe(
          R.trim,
          R.split('\n'),
          R.map(R.trim)
        )(value)
        const matches = R.filter(R.pipe(
          R.match(re),
          R.length
        ), files)
        if (matches.length) {
          this.setState({valid: true, value: dir + "/" + matches[0]})
        } else {
          // compare with fuzzy matching
          const re = RegExp(ending, "ig")
          const matches = R.filter(R.pipe(
            R.match(re),
            R.length
          ), files)
          if (matches.length) {
            this.setState({valid: true, value: dir + "/" + matches[0]})
          } else {
            this.setState({valid: false})
          }
        }
      })
    }
  },
  render() {
    return h('div', [
      h('input' + (this.state.valid ? '' : '.invalid'), {
        type: 'text',
        value: this.state.value,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        placeholder: this.props.placeholder
      }),
      this.props.render(this.state.value)
    ])
  }
})

const Path = ({initial, placeholder}, render) => {
  return h(PathInput, {initial, placeholder, render})
}

const SelectInput = React.createClass({
  getInitialState() {
    return {selected: this.props.options[0]}
  },
  onChange(e) {
    this.setState({selected: e.target.value})
  },
  render() {
    return h('span.select-wrapper', [
      h('select', {value: this.state.selected, onChange: this.onChange},
        this.props.options.map(option => {
          return h('option', {value: option}, option)
        })
      ),
      this.props.render(this.state.selected)
    ])
  }
})

const Select = (options, render) => {
  return h(SelectInput, {options, render})
}

export {Text, Path, Select}