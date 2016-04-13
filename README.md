# Dev Tool

This is a basic boilerplate for building an Electron app with React, HMR, SCSS, and basic commandline rpc features. My intentions with this project is to build simple GUI's for different projects of mine.

![](https://s3.amazonaws.com/uploads.hipchat.com/51605/2692734/b2xk1miLJyTF7Fq/upload.png)

# To Do

- icon.icns for distributable app
- readme to explain the tools for building the UI
- a better demo app


# Getting Started

First off, you need to be on a Mac using iTerm2. You can install iTerm2 using `brew cask install iterm2`.

Then clone and install some dependencies:

```bash
git clone https://github.com/ccorcos/dev-tool
cd dev-tool
npm install
```

To start developing:

```bash
./start.sh
```

To build a distributable standalone app:

```bash
./build.sh
```

Some references you might want to checkout that are used in this project:

- [Ramda.js](http://ramdajs.com/0.19.0/docs/) is a functional programming utility library
- [react-hyperscript](https://github.com/mlmorg/react-hyperscript) is a nice way of writing React code without JSX.


## UI Components

This project comes with a set of UI components that make it easy to build your own functionality in `src/browser/app.js`. This project uses React and Webpack with hot-module-replacement so your code will update almost instantly with no refresh!

There are 6 main UI elements for building the UI:

### CLI Components

Three components are in charge of interfacing with Terminal.

#### `RunBtn` 

`RunBtn` creates a button that runs a shell command in a new tab. For this to work, you must have iTerm open. For example:

```js
RunBtn("Node REPL", "cd ~; node;")
```

#### `ExecBtn`

`ExecBtn` is like `RunBtn` but doesn't create a new tab. For example:

```js
ExecBtn("say hi", "say hello `whoami`")
```

#### `Exec`

`Exec` is a higher-order function for running a command and rendering something with the result:

```js
Exec("ls -1 ~/Desktop", (result) => {
  const files = R.pipe(
    R.trim,
    R.split('\n'),
    R.map(R.trim)
  )(lt)
  return h('div', [
    "The following files are on your desktop:",
    h('ul', R.map(file => h('li', file), files))
  ])
})
```

### Input Components

There are also a number of input higher-order functions that compose together well.

#### `Text`

Text` renders a text input and lets you render something with the result. For example, the following will run a command typed into the text input:

```js
Text({placeholder: 'shell command'}, (cmd) => {
  return RunBtn('Run', cmd)
})
```

#### `Path`

If you're specifying paths, the `Path` component provides tab completion. The following will open a file:

```js
Path({placeholder: '~/path/to/file'}, (path) => {
  return ExecBtn('open', `open ${path}`)
})
```

#### `Select`

If you want to list things in a dropdown, you can use the `Select` component. This example will open either your Desktop or Documents folders:

```js
Select(['Desktop', 'Documents'], (selection) => {
  return ExecBtn('Open Folder', `open ~/${selection}`)
})
```

### Composing Components

The most important thing about all these functions is that they compose beautifully. For example, suppose you want to open any file on your Desktop:

```js
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
```