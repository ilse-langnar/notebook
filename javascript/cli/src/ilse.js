
const printf        = console.log


// Lib[s]
    var blessed         = require('blessed')
    var contrib         = require('blessed-contrib')

// Classes
    const Utils         = require( "./utils" )
    const Search        = require( "./Search" )
    const Terminal      = require( "./Terminal" )
    // Native
        const fs            = require( "fs" )

// Messager
    let Messager         = require('./messager')

// TODO: For our tree(files) we might open children, when we have children

const TARGET_DIRECTORY = ""

class Ilse {

    constructor() {

        // Global objects
            this.terminal           = new Terminal()
            this.search             = new Search( this.terminal )
            this.utils              = new Utils()
            this.file               = ""

        this.setup()
    }

    setup() {
        this.set_keyboard_shortcuts()
        // this.set_file_explorer()
        this.set_text_writer()
        this.set_map()

        this.listen()
    }

    set_text_writer() {

        this.text_writer        = this.terminal.add({
            id: "main-writer",
            type: "textarea",
            options: {
                label: "Write",
                mouse: true,
                content: "Example",
                inputOnFocus: true,
                style: {
                    border: {type: "line", fg: "cyan"},
                    blur: {
                        border: {type: "line", fg: "cyan"},
                    },
                    focus: {
                        border: { type: 'line', fg: 'white' }
                    },
                }
            },
            width: 8,
            height: 12,
            y: 0,
            x: 2,
            config: { focus_on_click: false },
        })


        this.text_writer.on( "keypress", (ch, key) => {

            if( key.name === 'tab' ) {
            } else if( key.name === 'left' ) {

            } else if( key.name === "r" && key.ctrl ) {
                this.open_random_file()
            } else if( key.name === 's' && key.ctrl ) {
                let file = this.file
                let text = this.text_writer.getValue()
                fs.writeFileSync( file, text )
            }

        })

    }

    set_map() {

        let map        = this.terminal.add({
            id: "map",
            type: "map",
            options: {
                label: "Graph",
                mouse: true,
                inputOnFocus: true,
                style: {
                    border: {type: "line", fg: "cyan"},
                    focus: {
                        border: { type: 'line', fg: 'white' }
                    },
                }
            },
            width: 2,
            height: 3,
            y: 0,
            x: 10,
            config: { focus_on_click: true },
        })

    }

    async set_file_explorer() {

        let file_explorer   = this.terminal.add({
            id: "test",
            type: "tree",
            options: {
                label: "Files",
                style: {
                    border: {type: "line", fg: "cyan"},
                    // blur: {
                        // border: {type: "line", fg: "cyan"},
                    // },
                    // focus: {
                        // border: { type: 'line', fg: 'white' }
                    // },
                }
            },
            width: 2,
            height: 12,
            y: 0,
            x: 0,
            config: { focus_on_click: true },

        })

        let files   = await fs.readdirSync( TARGET_DIRECTORY )

        let data = {
            extended: true,
            children: {},
        }

        let is_dir
        let dir_files

        for( const file of files ) {

            is_dir      = this.utils.is_directory( TARGET_DIRECTORY + file )

            if( is_dir ) {

                dir_files   =  fs.readdirSync( TARGET_DIRECTORY + file )

                data.children[file] = {
                    name: file,
                    children: {
                    }
                }


                for( const dir_file of dir_files ) {

                    data.children[file].children[dir_file] = {
                        name: dir_file,
                        children: {}
                    }
                }


            } else {

                data.children[file] = {
                    name: file,
                    children: {}
                }

            }
        }

        file_explorer.setData( data )

        file_explorer.on( "select", item => {

            let has_child = Object.values(item.children).length
            if( !has_child ) {
                this.open_file( TARGET_DIRECTORY + item.name )
                this.file = TARGET_DIRECTORY + item.name
            } else {
                // let parent = files[item.position]
                // this.open_file( + parent + "/"+ item.name )
            }

        })


        this.terminal.screen.render()

        /*
        file_explorer.setData({
            extended: true,
            children: {
                'Fruit': {
                    children: {
                    }
                },

                'Vegetables': {
                }
            }

        })
        */
        // file_explorer.focus()
    }

    async open_random_file() {

        let files       = fs.readdirSync( TARGET_DIRECTORY )
        let random_file = files[Math.floor(Math.random() * files.length)]
        let is_markdown = random_file.indexOf(".md") !== -1

        if( is_markdown )  {
            this.open_file( TARGET_DIRECTORY + random_file )
        }

    }

    set_keyboard_shortcuts() {

        this.terminal.screen.key( "C-r", (ch,key) => {
            this.open_random_file()
        })

        this.terminal.screen.key( "C-f", d => {
            this.search.toggle()
        })

        this.terminal.screen.key( [ "C-n" ], d => {

            let new_note = this.terminal.add({
                id: "new-note",
                type: "textarea",
                options: {
                    label: "New Note",
                    mouse: true,
                    inputOnFocus: true,
                    style: {
                        border: {type: "line", fg: "cyan"},
                        blur: {
                            border: {type: "line", fg: "cyan"},
                        },
                        focus: {
                            border: { type: 'line', fg: 'white' }
                        },
                    }
                },
                width: 8,
                height: 3,
                y: 3,
                x: 2,
                config: { focus_on_click: false },
            })

            this.terminal.screen.render()

            new_note.on( "keypress", (ch, key) => {

                if( key.name === 'tab' || key.name === 'escape' ) {

                    let text = new_note.getValue()
                        if( !text ) return

                    let lines           = text.split("\n")
                    let first_line      = lines[0]
                    let new_note_title  = first_line + ".md"
                    let complete_path   = TARGET_DIRECTORY + new_note_title

                    // Write
                        fs.writeFileSync( complete_path, text )

                    // Destroy
                        new_note.destroy()
                        this.terminal.screen.render()

                }

            })

            new_note.focus()

        })

        this.terminal.screen.key( [ "C-right" ], d => {
            this.terminal.screen.focusNext()
            this.terminal.screen.render()
        })

        this.terminal.screen.key( [ "C-left" ], d => {
            this.terminal.screen.focusPrevious()
            this.terminal.screen.render()
        })


    }

    open_file( path ) {

        let content         = fs.readFileSync( path, "utf8")

        if( content ) {
            this.text_writer.setValue( content )
            this.terminal.screen.render()
            this.text_writer.focus()
        }

    }

    listen() {

        let _this = this
        Messager.on( "~search", async (action,payload)  => {

            if( action === 'selected-file' ) {

                let url             = TARGET_DIRECTORY + payload
                let content         = fs.readFileSync( url, "utf8")
                // if( content ) this.text_writer.setText( content )
                // if( content ) this.text_writer.setValue( content )
                // if( content ) this.text_writer.setContent( "This is an example \n another" )

                if( content ) {
                    this.text_writer.setValue( content )
                    this.terminal.screen.render()
                    this.text_writer.focus()
                }

                // this.screen.program.cup(cy, cx);
            }

        })
    }

}

module.exports = Ilse

