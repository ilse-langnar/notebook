const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

class Commands {

    // TODO: ask-delete-this-component/tab/container -> this -> focused
    // TODO: Increase component width -> set-component-width -> set-component
    constructor() {
        this.commands = []
        this.setup()
    }

    setup() {
        this.set_default_commands()
    }

    add({ id, name, description, fn, props = {} }) {

        let command = {
            id: id,
            fn: fn,
            description: description,
            name: name,
            props: props,
        }

        // Check for duplicates
            let id_list = this.commands.map( command => {
                return command.id
            }).filter( e => e )

            let is_duplicated = id_list.indexOf(id) !== -1
            // dup, don't add
                if( is_duplicated ) return null

        // If not dup, then push
        this.commands.push( command )

        return command
    }

    resolve_name( name ) {

        let selected
        this.commands.map( command => {
            if( command.name === name ) {
                selected = command
                return
            }
        })

        return selected
    }

    get( id ) {

        let commands = this.commands

        for( let command of commands ) {
            if( command.id === id ) return command
        }

        return null
    }

    // USE: let payload = args[0]
    run( id, ...args ) {

        if( !id ) throw new Error( "Commands.js -> run(<id>) <id> is not defined, it should be a string with the id of the command " )

        let command = this.get( id )

        if( command && command.fn ) {
            command.fn( args )
        }

    }

    set_default_commands() {

        this.commands = [

            {
                id: "void",
                fn: function() { },
                description: "Void",
                name: "Void",
            },

            {
                id: "open-command-pallet-modal",
                fn: function() {
                    ilse.modals.open( "command-pallet" )
                },
                description: "Open Command Pallet Modal",
                name: "Open Command Pallet Modal",
            },

            {
                id: "toggle-dark-mode",
                fn: function() {
                    ilse.config.dark = !ilse.config.dark
                },
                description: "Will turn on if it's off, and off if it's on",
                name: "Toggle Dark Mode",
            },

            {
                id: "open-keyboard-shortcuts-modal",
                fn: function() {
                    ilse.modals.open( "keyboard-shortcut" )
                },
                description: "Will open modal with the list of shortcuts",
                name: "Open Keyboard Shortcuts Modal",
            },

            {
                id: "open-types-selection",
                fn: function() {
                    ilse.modals.open( "type-selection" )
                },
                description: "Will open a modal with a list of <Types>",
                name: "Open Type Selection",
            },

            {
                id: "save",
                fn: function() {
                    ilse.save()
                },
                description: "Will save: bullets, config etc.",
                name: "Save",
            },

            {
                id: "first-brain-read",
                fn: function() {
                    ilse.brains.first.read_first()
                },
                description: "Will read an item from first brain",
                name: "First Brain: Read",
            },

            {
                id: "first-brain-shuffle",
                fn: function() {
                    ilse.brains.first.shuffle()
                },
                description: "Will shuffle your queu",
                name: "First Brain: Shuffle",
            },

            {
                id: "first-brain-open-last",
                fn: function() {
                    ilse.brains.first.last()
                },
                description: "Will open the last time",
                name: "First Brain: Open Last",
            },

            {
                id: "first-brain-increase",
                fn: function() {
                    ilse.brains.first.increase()
                },
                description: "Will increase interest interet on last item",
                name: "First Brain: Increase",
            },

            {
                id: "first-brain-decrease",
                fn: function() {
                    ilse.brains.first.decrease()
                },
                description: "Will decrease interest interet on last item",
                name: "First Brain: Decrease",
            },

            {
                id: "open-file",
                fn: function() {
                    let component = new ilse.classes.Component({ type: "file", width: 12, props: { file: "Ilse.md" } })
                        ilse.components.push( component )
                    ilse.modals.close()
                },
                description: "Will open a new file",
                name: "Open File",
            },

            {
                id: "open-help-modal",
                fn: function() {
                    ilse.modals.open( "help" )
                },
                description: "Will open the help modal",
                name: "Open Help Modal",
            },

            {
                id: "open-configuration-modal",
                fn: function() {
                    ilse.modals.open( "configuration" )
                },
                description: "Will open the configuration modal",
                name: "Open Configuration Modal",
            },

            {
                id: "open-first-brain-modal",
                fn: function() {
                    ilse.modals.open( "first-brain" )
                },
                description: "Will open the all-in-one first-brain modal",
                name: "Open First Brain Modal",
            },

            {
                id: "list-projects",
                fn: async function() {
                    let list = await ilse.filesystem.dir.list( "projects/" )
                    ilse.dialog.listing( "Files", "/", list, async selected =>{
                        printf( "selected -> ", selected )

                    })
                },
                description: "Will list your projects",
                name: "List Projects",
            },

            {
                id: "toggle-menu",
                fn: async function() {

                    let has_menu_already = false
                    let menu_index       = null
                    let found

                    ilse.components.map( (component, index)  => {
                        found = component.type === "menu"
                        if( found ) {
                            has_menu_already = true
                            menu_index       = index
                        }
                    })

                    if( has_menu_already ) {
                        ilse.components.splice( menu_index, 1 )
                        // ilse.notification.send( "Already there", "The menu is already on!" )
                    } else {
                        let component = new ilse.classes.Component({ type: "menu", width: 0 })
                            ilse.components.unshift( component )
                    }

                },
                description: "Will add if it's not there, will remove if it's there",
                name: "Toggle Menu",
            },

            {
                id: "search-files",
                fn: async function() {
                    let list = await ilse.filesystem.dir.list( "/" )
                    let is_file, file

                    // function show_list( title, description path, list, fn )
                        // ilse.dialog.listing( title, description, list, fn )
                    // }

                    ilse.dialog.listing( "Files", "/", list, async selected => {

                        is_file = await ilse.filesystem.file.is( selected )

                        if( is_file ) {
                            file    = await ilse.filesystem.file.get( selected )
                            ilse.dialog.info( `File: ${selected}`, file )
                        } else {

                            printf( "selected -> ", selected )
                            list = await ilse.filesystem.dir.list( `/${selected}` )
                            printf( ">>> list -> ", list )

                            ilse.dialog.listing( "Files", `/${selected}`, list, async selected_2 => {
                                printf( ">>> selected_2 -> ", selected_2 )
                            })

                        }

                    })

                },
                description: "Will search the files for the first brain",
                name: "Search files",
            },

            {
                id: "new-note",
                fn: async function() {
                    printf( "new-note -> " )
                    let payload = await ilse.dialog.input( "New note", "Content:" )
                    let input   = payload.input
                    let index   = ilse.notes.list.length
                        ilse.notes.add( input, index, 0 )
                },
                description: "Will open a prompt for a new note",
                name: "New Note",
            },

            {
                id: "search",
                fn: async function() {
                    let component = new ilse.classes.Component({ type: "search-component", width: 12, props: {} })
                        ilse.components.push( component )
                },
                description: "Search Notes, Files and more",
                name: "Search",
            },

            {
                id: "add-new-line",
                fn: async function() {
                    printf( "Command.js -> void:add-new-line" )
                },
                description: "Add new line",
                name: "Add New Line",
            },

            {
                id: "open-text-file",
                fn: async function() {
                    let payload = await ilse.dialog.input( "File Name", "Description" )
                    // let name    = payload.input
                    let name    = `projects/lazy-scheduler/Lazy Scheduler.html`
                    let component = new ilse.classes.Component({ type: "text-file", width: 8, props: { name }})
                        ilse.components.push( component )

                },
                description: "Will open a new text file",
                name: "Open Text File",
            },

            {
                id: "open-note-on-a-mind-map",
                fn: async function() {
                    document.body.style.cursor = "crosshair";
                    let event_listener
                    function on_click( event ) {
                        document.removeEventListener( "click", on_click )
                        let id        = event.target.id.split("-")[1]
                        printf( "event.target -> ", event.target.id )
                        printf( "id -> ", id )
                        if( id ) {
                            let component = new ilse.classes.Component({ type: "mind-map", width: 12, props: { id: id } })
                                ilse.components.push( component )
                        }
                        document.body.style.cursor = "auto";

                    }
                    event_listener = document.addEventListener( "click", on_click )

                },
                description: "Will listen to your click and open the note on a mind map",
                name: "Open Note on a Mind Map",
            },

            {
                id: "open-note-on-a-table-pan",
                fn: async function() {
                    document.body.style.cursor = "crosshair";
                    let event_listener
                    function on_click( event ) {
                        document.removeEventListener( "click", on_click )
                        let id        = event.target.id.split("-")[1]
                        if( id ) {
                            let component = new ilse.classes.Component({ type: "table-pan", width: 12, props: { id: id } })
                                ilse.components.push( component )
                        }
                        document.body.style.cursor = "auto";

                    }
                    event_listener = document.addEventListener( "click", on_click )

                },
                description: "Will listen to your click and open the note on a table pan",
                name: "Open Note on a Table Pan",
            },

            {
                id: "open-note-on-a-memex",
                fn: async function() {
                    document.body.style.cursor = "crosshair";
                    let event_listener
                    function on_click( event ) {
                        document.removeEventListener( "click", on_click )
                        let id        = event.target.id.split("-")[1]
                        printf( ">>>>>>> id -> ", id )
                        if( id ) {
                            let component = new ilse.classes.Component({ type: "memex", width: 12, props: { id: id } })
                                ilse.components.push( component )
                        }
                        document.body.style.cursor = "auto";

                    }
                    event_listener = document.addEventListener( "click", on_click )

                },
                description: "Will listen to your click and open the note on a memex",
                name: "Open Note on a Memex",
            },

            {
                id: "open-textarea-search",
                fn: async function() {

                    let dom = document.activeElement
                    printf( "dom -> ", dom )
                        if( !dom ) return

                    let id = dom.id
                    printf( "id -> ", id )
                        if( !id ) return
                    let note = ilse.notes.query( `${id}: ` )[0]
                    Messager.emit( "~note.vue", "open-search", { target: note.id, type: "files" } )

                },
                description: "",
                name: "Open Textarea Search",
            },

            {
                id: "open-note-search",
                fn: async function() {

                    let dom = document.activeElement
                        if( !dom ) return

                    let id = dom.id
                        if( !id ) return

                    let note = ilse.notes.query( `${id}: ` )[0]

                    Messager.emit( "~note.vue", "open-search", { target: note.id, type: "notes" } )

                },
                description: "",
                name: "Open Textarea Search",
            },


            {
                id: "first-brain-tag-add",
                fn: async function() {
                    ilse.brains.first.tag()
                },
                description: "Add a tag to the last item on your first brain",
                name: "First Brain: Add Tag",
            },

            {
                id: "first-brain-tag-remove",
                fn: async function() {
                    ilse.brains.first.tag()
                },
                description: "Remove a tag to the last item on your first brain",
                name: "First Brain: Remove Tag",
            },

            {
                id: "open-query-blocks",
                fn: async function() {
                    let component = new ilse.classes.Component({ type: "query-blocks", width: 12, props: {} })
                        ilse.components.push( component )
                },
                description: "Will open a new 'query blocks' component",
                name: "Open Query Blocks",
            },
        ]
    }

}

export default Commands
