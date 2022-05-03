const printf        = console.log

// Lib[s]
    let blessed         = require('blessed')
    let contrib         = require('blessed-contrib')

    // Native
        const fs            = require( "fs" )

// Messager
    let Messager         = require('./messager')

const TARGET_DIRECTORY = ""

class Search {

    constructor( terminal ) {

        this.terminal   = terminal
        this.is_on      = false

        /*
        this.input.on('keypress', async (ch, key) => {

            // TODO: capture this for selecting the file
            if( key.name === "return" ) {

                // this.input.destroy()

                // this.search_result.focus()
                // this.screen.debug( "key", key )
                return
            }

            // let key   = key.sequence
            let text    = this.input.getValue()
            let files   = await fs.readdirSync( "" )
            let result  = this.utils.fuzzy_search( text, files )
            let data    = []

            for( const [index, file] of result.entries() ) {

                if( file && file.target ) {

                    data.push([
                        [file.target],
                        ["ll"]
                    ])
                }

            }

            this.search_result.setData({
                headers: [ "File", "Other" ],
                data: data,
            })

        })

        this.input.focus()
        */

    }

    set_files( files ) {

        let data = []

        for( const file of files ) {

            if( file ) {

                data.push([
                    [file],
                    ["ll"]
                ])
            }

        }

        this.result.setData({
            headers: [ "File", "Other" ],
            data: data,
        })

    }

    async open() {

        this.is_on = true

        this.input        = this.terminal.add({
            id: "search-input",
            type: "textarea",
            options: {
                label: "Search",
                mouse: true,
                inputOnFocus: true,
                keys: true,
            },
            width: 8,
            height: 1,
            y: 1,
            x: 2,
            config: { focus_on_click: false },
        })

        this.result        = this.terminal.add({
            id: "search-result",
            type: "table",
            options: {
                label: "Result",
                mouse: true,
                // inputOnFocus: true,
                interactive: true,
                keys: true,
                border: {type: "line", fg: "cyan"},
                columnWidth: [100, 12, 12],
                columnSpacing: 10,
            },
            width: 8,
            height: 8,
            y: 2,
            x: 2,
            config: { focus_on_click: false },
        })

        this.terminal.screen.append( this.input )
        this.terminal.screen.append( this.result )

        let files   = await fs.readdirSync( TARGET_DIRECTORY )
            this.set_files( files )

        this.terminal.screen.render()

        this.result.rows.on( "select", ( item, index ) => {
            let file = item._clines.fake[0]
            Messager.emit( "~search", "selected-file", file )
            this.close()
        })

        // PROBLEM: If i'm selecting from the result, and press escape, we'll get out of the app tho
        this.result.on( "keypress", ( ch, key ) => {

            if( key.name === "escape" ) {
                this.close()
                return
            }

        })

        // this.result.on( "select item", () => {
            // process.exit( 0 )
            // this.result.focus()
            // this.terminal.screen.debug( "debug: clicked this.result" )
        // })

        this.input.on('keypress', async (ch, key) => {

            this.terminal.screen.debug( "ch -> ", ch )
            this.terminal.screen.debug( "key -> ", key )

            // <---------> Close <---------> //
                if( key.name === 'tab' ) {
                    this.input.destroy()
                    this.terminal.screen.render()
                    this.result.focus()
                    return
                } else if( key.name === "escape" ) {
                    this.close()
                    return
                }

                this.input.on('cancel', () => {
                    // this.input.destroy()
                    // this.result.destroy()
                    // this.terminal.screen.render()
                    // this.destroy()
                })
            // <---------> Close <---------> //

            // <---------> Focus on result + destroy input <---------> //
                if( key.name === 'down' ) {
                    this.input.destroy()
                    this.terminal.screen.render()
                    this.result.focus()
                    return
                } else if( key.name === 'up' ) {
                    this.terminal.screen.render()
                    this.result.focus()
                    return
                }
            // <---------> Focus on result + destroy input <---------> //

            let text                = this.input.getValue()
            let result              = this.terminal.utils.fuzzy_search( text, files )
            let normalized_result   = result.map( result => result.target ).filter( e=>e )

            this.set_files( normalized_result )

            /*
            let data    = []
            for( const [index, file] of result.entries() ) {

                if( file && file.target ) {

                    data.push([
                        [file.target],
                        ["ll"]
                    ])
                }

            }

            this.result.setData({
                headers: [ "File", "Other" ],
                data: data,
            })
            */

        })

        this.input.focus()

    }

    toggle() {

        this.is_on = !this.is_on

        if( this.is_on ) {
            this.open()
        } else {
            this.close()

        }
    }

    close() {
        this.is_on = false
        this.input.destroy()
        this.result.destroy()
        this.terminal.screen.render()
    }
}

module.exports = Search
