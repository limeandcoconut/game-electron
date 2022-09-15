<template>
    <div id="app">
        <div id="display">
            <pre>{{ output + '\n' }}</pre>
        </div>
        <div id="input-line">
            <pre><span>></span>{{ input }}</pre>
            <pre class="cursor-container"><span>></span>{{ input }}<span class="cursor" :style="{color: cursorColor}">_</span></pre>
        </div>
    </div>
</template>

<script>
    const adventure = require('adventure')

    export default {
        name: 'vue-g',
        data() {
            console.log('data')
            return {
                name: this.name,
                input: '',
                output: '',
                cursorColor: '#8c8c8c',
            }
        },
        methods: {
            logKeypress(event) {
                // console.time('key')
                let {key} = event
                let specialMethod = this.specialKeys[key]
                if (specialMethod) {
                    specialMethod()
                    return
                }
                if (!this.ignored.includes(key)) {
                    if (this.input.length >= this.maxChars) {
                        return
                    }
                    this.input += key
                }
            },

            sizeLines() {
                this.maxChars = Math.floor(window.innerWidth / this.charWidth) - 2
                this.maxLines = Math.floor(window.innerHeight / this.charHeight) - 2
                console.log(this.maxLines)
                // FIXIT: TODO: change back when we're done with json output
                // let linesRegex = new RegExp(`.{1,${maxChars}}(\\b|$)|\\S+?(\\b|$)`, 'g')
                this.linesRegex = new RegExp(`.{1,${this.maxChars}}(\\s|$)|\\S+?(\\s|$)`, 'g')
            },
        },
        created() {
            let textColor = this.cursorColor
            // this.charHeight = 36
            this.charHeight = 24
            // this.charWidth = 18
            this.charWidth = 12
            this.sizeLines()
            window.onresize = this.sizeLines
            let newline = '\n'

            const wrap = (response) => {
                // console.time('wrap')
                response = response.match(this.linesRegex) || []
                response = response.map(function(line) {
                    if (line.slice(-1) === newline) {
                        line = line.slice(0, line.length - 1)
                    }
                    return line
                })
                response = response.join(newline)
                // console.timeEnd('wrap')
                return response
            }
            // Match all lines up to the max number
            // let lineMatch = new RegExp(`^[\\s\\S]*((.*\\s.*){${this.maxLines}})$`)
            // let lineMatch = new RegExp(`^(.*\\s)*((.*\\s.*){${this.maxLines}})$`)

            this.ignored = [
                'Meta',
                'Shift',
                'Alt',
                'Control',
                'Enter',
                'Tab',
                'Backspace',
                'CapsLock',
                'ArrowLeft',
                'ArrowRight',
                'ArrowUp',
                'ArrowDown',
                'Escape',
            ]
            this.specialKeys = {
                Enter: () => {
                    let output = `${this.output}${newline}>${this.input}`
                    // console.timeEnd('key')
                    // console.time('call')
                    let response = adventure(this.input).toString()
                    response = wrap(response)
                    output += response + newline

                    // console.time('trim')
                    let split = output.split(newline)
                    let lineDiff = split.length - this.maxLines
                    if (lineDiff > 0) {
                        output = split.slice(lineDiff).join(newline)
                    }
                    // console.timeEnd('trim')
                    this.output = output
                    this.input = ''
                },
                Backspace: () => {
                    this.input = this.input.slice(0, -1)
                },
                Tab: () => {
                    this.input += '    '
                },
            }

            window.addEventListener('keyup', this.logKeypress)

            this.cursorInterval = setInterval(() => {
                this.cursorColor = this.cursorColor === textColor ? 'transparent' : textColor;
            }, 120)
        },

        destroyed() {
            window.removeEventListener('keyup', this.logKeypress)
            clearInterval(this.cursorInterval)
        }
    }
</script>

<style lang="less">
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body,
    pre {
        font-family: 'Px437 IBM VGA8', 'consolas', monospace;
        margin: 0;
    }

    #app {
        font-family: 'Terminal', monospace;
        color: #8c8c8c;
        background: #000000;
        width: 100vw;
        height: 100vh;
        // font-size: 36px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
    }

    #display {
        width: 100%;
        ;
        flex-grow: 2;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
    }

    #input-line {
        width: 100%;
        position: relative;
    }

    .cursor-container {
        position: absolute;
        top: 0;
        height: 36px;
        height: 20px;
        width: 100%;
        color: transparent;
    }

    .cursor {
        color: #8c8c8c;
    }
</style>
