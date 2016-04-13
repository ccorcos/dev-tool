module.exports = function({React, h, R}, {Header, Section, Row}, {Exec, RunBtn, ExecBtn}, {Text, Path, Select}) {
  return React.createClass({
    render() {
      return h('div.app', [
        Header,
        Section('Demo', [
          Row([
            "Here's a demo of some of the various UI components."
          ])
        ]),
        Section('RunBtn', [
          Row([
            RunBtn("Node REPL", "cd ~; node;")
          ])
        ]),
        Section('ExecBtn', [
          Row([
            ExecBtn("Say Hello", "say hello `whoami`")
          ])
        ]),
        Section('Exec', [
          Row([
            Exec("ls -1 ~/Desktop", (result) => {
              const files = R.pipe(
                R.trim,
                R.split('\n'),
                R.map(R.trim)
              )(result)
              return h('div', [
                "The following files are the first 10 items on your desktop:",
                h('ul', R.map(file => h('li', file), files.slice(0,10)))
              ])
            })
          ])
        ]),
        Section('Text', [
          Row([
            Text({placeholder: 'shell command'}, (cmd) => {
              return RunBtn('Run', cmd)
            })
          ])
        ]),
        Section('Path', [
          Row([
            Path({placeholder: '~/path/to/file'}, (path) => {
              return ExecBtn('Open', `open ${path}`)
            })
          ])
        ]),
        Section('Select', [
          Row([
            Select(['Desktop', 'Documents'], (selection) => {
              return ExecBtn('Open Folder', `open ~/${selection}`)
            })
          ])
        ]),
        Section('Composing Components', [
          Row([
            Exec('ls -1 ~/Desktop/', (result) => {
              const files = R.pipe(
                R.trim,
                R.split('\n'),
                R.map(R.trim)
              )(result)
              return Select(files, (selected) => {
                return ExecBtn("Open", `open ~/Desktop/${selected}`)
              })
            })
          ])
        ])
      ])
    }
  })
}