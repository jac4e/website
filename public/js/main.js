import React from 'react';
const e = React.createElement

class virtualConsole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [],
            position: 0,
            command: ''
        }
        this.loadState()
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.directory = []
        let dirElement = document.querySelector('#directoryElement')
        for (let i = 0; i < dirElement.children.length; i++) {
            this.directory.push(dirElement.children[i].innerText)
        }
    }
    render() {
        return e('input', {
            type: 'text',
            autoFocus: 'true',
            className: 'p-0',
            value: this.state.command,
            onChange: this.handleKeyDown,
            onKeyDown: this.handleKeyDown
        })
    }
    handleKeyDown(e) {
        e.preventDefault()
        // Backspace
        if (e.keyCode == 8) {
            e.target.value = e.target.value.slice(0, -1)
        }
        // Max Length
        // if (e.target.value.length == 21 && e.keyCode != 13) {
        //     return
        // }
        // Any character key
        if (e.key.length == 1) {
            e.target.value = e.target.value.concat(e.key)
        }
        // Up
        if (e.keyCode == 38) {
            if (this.state.position < this.state.history.length) {
                this.state.position += 1
                e.target.value = this.state.history[this.state.history.length - this.state.position]
            }
        }
        //Down
        if (e.keyCode == 40) {
            if (this.state.position > 1) {
                this.state.position -= 1
                e.target.value = this.state.history[this.state.history.length - this.state.position]

            } else if (this.state.position == 1) {
                this.state.position -= 1
                e.target.value = ''
            }
        }
        // Enter
        if (e.keyCode == 13) {
            this.state.history = this.state.history.concat(this.state.command)
            this.parse(this.state.command)
            this.state.position = 0
            e.target.value = ''
        }
        this.setState({
            command: e.target.value
        })
        e.target.parentElement.style.width = e.target.value.length + 'ch'
    }
    saveState() {
        window.sessionStorage.setItem('history', this.state.history)
    }
    loadState() {
        try {
            this.state.history = window.sessionStorage.getItem('history').split(',')
        } catch (err) {
            this.state.history = []
        }
    }
    parse(string) {
        let array = string.split(' ')
        let cmd = array.shift()
        let args = array.filter(Boolean)
        let output = document.querySelector('#output')
        let cmdList = ['cd', 'ls', 'help']
        switch (cmd) {
            case "cd":
                if (args.length > 1) {
                    output.innerText = "cd: invalid arguments. see 'cd -h' for help"
                    break
                } else {
                    if (args.length == 0) {
                        window.location.href = ""
                    } else if (args[0] == '-h') {
                        output.innerText = "usage: cd path"
                    } else if (args[0].match(/^(..\/)+$/g)) {
                        window.location.href = args[0]
                    } else if (args[0].match(/^\/?(?:[^/\n\s\\]+\/?)+$/g)) {
                        console.log(args[0])
                        window.location.href = encodeURIComponent(args[0])
                    } else {
                        output.innerText = `cd: no such file or directory: ${args[0]}`
                    }
                    break
                }
                case "ls":
                    output.innerText = this.directory
                    break
                case "help":
                    if (args.length > 0) {
                        output.innerText = 'help: invalid arguments'
                    } else {
                        output.innerText = `command list: ${cmdList}`
                    }
                    break
                default:
                    output.innerText = `jss: command not found: ${cmd}`
        }
        this.saveState()
    }
}

const consoleInput = document.querySelector('#input')
ReactDOM.render(e(virtualConsole), consoleInput)