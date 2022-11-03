import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

// functions
    import is_dev                       from "@/classes/is_dev.js"
    import create_window                from "@/classes/create_window.js"
    import get_target_directory_url     from "@/classes/get_target_directory_url.js"
    import html_to_string               from "@/classes/html_to_string.js"
    import get_plugin_api               from "@/classes/get_plugin_api.js"
    // import has                          from "@/classes/has.js"
    import is_inside                    from "@/classes/is_inside.js"
    import if_else                      from "@/classes/if_else.js"

class Commands {

    // TODO: ask-delete-this-component/tab/container -> this -> focused
    // TODO: Increase component width -> set-component-width -> set-component
    constructor( ilse ) {
        this.ilse         = ilse
        this.commands     = []
        this.history      = []
        this.last_command = {}
        this.setup()
    }

    setup() {
        this.set_default_commands()
    }

    add_for_plugin({  id, name, icon, source, description, fn, props = {} }) {
        props.is_plugin = true
        props.source    = source
        this.add({ id, name, icon, description, fn, props })
    }


    add({ id, name, icon, description, fn, props = {} }) {

        props.is_plugin = !!props.is_plugin

        if( props.is_plugin ) {
            icon = icon ? icon : "plugin.svg"
        } else {
            icon = icon ? icon : "command.svg"
        }

        let command = {
            id: id,
            icon: icon,
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
        if( command.props.is_plugin ) window.ilse = get_plugin_api( command.props.source )

        if( command && command.fn ) {
            command.fn( args )
        }

        if( id !== "repeat-last-command" ) {
            this.last_command = { id, args }
            window.ilse.commands.last = this.last_command
        }

        Messager.emit( "~commands", "exec", id )

        // this.history.push( id, args )
    }

    // get_command_shortcuts("read-first-brain") -> [ "command+space v k" ]
    get_command_shortcuts( id ) {

        let list  = ilse.keyboard.keys
        let found = []

        list.map( item => {
            if( item.command === id ) found.push( item.combo )
        })

        return found
    }

    /*
    add_components_commands() {

        let _this = this
        let components = this.ilse.types.types

        components.map( component => {

            this.commands.push({

                id: `open-${component.name}`,
                icon: "tech-box.svg",
                fn: function() {
                    let _component = _this.ilse.types.get( component.id )
                        ilse.components.push( _component )
                },
                description: `Will open: ${component.name}`,
                name: `Open: ${component.name}`,

            })

        })

    }
    */

    set_default_commands() {

        let _this    = this

        let commands = [

            {
                id: "void",
                icon: "question-mark.svg",
                fn: function() { },
                description: "Void",
                name: "Void",
                props: {},
            },

            {
                id: "open-command-pallet-modal",
                fn: function() {
                    // ilse.htmls.add( "command-pallet", ilse.components["command-pallet"] )
                    // ilse.htmls.modal( ilse.components["command-pallet"] )
                    ilse.htmls.modal( ilse.htmls.render('command-pallet', { search: '' }) )
                },
                undo: args => {
                    ilse.htmls.list.shift()
                },
                description: "Open Command Pallet Modal",
                name: "Open Command Pallet Modal",
                props: {},
            },

            {
                id: "close-active-tab",
                fn: function() {
                    let current = ilse.tabs.list.map( tab => { if( tab.is_active ) return tab }).filter( e=>e )[0]
                    ilse.tabs.remove( current )
                },
                description: "Open New Tab",
                name: "Open New Tab",
                props: {},
            },

            {
                id: "open-new-tab",
                fn: function() {

                    ilse.tabs.list.map( tab => {
                        tab.is_active = false
                    })

                    ilse.tabs.list.push({ is_active: true, name: 'New Tab', id: Math.random().toString(), components: [ 'top-menu', 'new-tab', 'status-line' ] });
                },
                description: "Open New Tab",
                name: "Open New Tab",
                props: {},
            },

            {
                id: "go-to-previous-tab",
                fn: function() {
                    printf( "Commands.js -> go-to-previous-tab" )

                    let tabs       = ilse.tabs
                    let index
                    tabs.list.map( ( tab, tab_index ) => {
                        printf( "1" )
                        if( tab && tab.is_active ) index = tab_index
                    })

                    let previous_index = --index
                    tabs.list.map( tab => {
                        if( tab ) tab.is_active = false
                    })

                    if( ilse.tabs.list[previous_index] ) {
                        ilse.tabs.list[previous_index].is_active = true
                    } else {
                        ilse.tabs.list[0].is_active = true
                    }
                },
                description: "Go To Previous Tab",
                name: "Previous Tab",
                props: {},
            },

            {
                id: "go-to-next-tab",
                fn: function() {

                    let tabs       = ilse.tabs
                    let index
                    tabs.list.map( ( tab, tab_index ) => {
                        printf( "1" )
                        if( tab && tab.is_active ) index = tab_index
                    })

                    let next_index = ++index
                    tabs.list.map( tab => {
                        if( tab ) tab.is_active = false
                    })

                    if( ilse.tabs.list[next_index] ) {
                        ilse.tabs.list[next_index].is_active = true
                    } else {
                        ilse.tabs.list[0].is_active = true
                    }

                },
                description: "Go To Next Tab",
                name: "Next Tab",
                props: {},
            },

            {
                id: "autocomplete",
                fn: function() {
                    printf( "autocomplete" )
                    let dom = document.activeElement
                        printf( "dom -> ", dom )
                },
                description: "Autocomplete for common names.",
                name: "Autocomplete",
                props: {},
            },

            {
                id: "repeat-last-command",
                fn: function() {
                    _this.run( _this.last_command.id, _this.last_command.args )
                },
                description: "Will repeat the last command with all of its arguments",
                name: "Repeat Last Command",
                props: {},
            },

            {
                id: "toggle-dark-mode",
                icon: "moon-stars.svg",
                fn: function() {
                    printf( "@before -> ilse.config.dark -> ", ilse.config.dark )
                    ilse.config.dark = !ilse.config.dark
                    printf( "@after -> ilse.config.dark -> ", ilse.config.dark )
                    ilse.config.save()
                },
                description: "Will turn on if it's off, and off if it's on",
                name: "Toggle Dark Mode",
                props: {},
            },

            {
                id: "save",
                icon: "save.svg",
                fn: function() {
                    ilse.save()
                },
                undo: args =>{}, // TODO
                description: "Will save: bullets, config etc.",
                name: "Save",
                props: {},
            },

            {
                id: "reload-plugins",
                icon: "moon-stars.svg",
                fn: function() {
                    ilse.plugin_manager.load()
                    ilse.notification.send( "Reloaded", "Plugins Reloaded" )
                },
                undo: args =>{}, // TODO
                description: "Will re-load all plugins",
                name: "Reload Plugins",
                props: {},
            },

            {
                id: "open-help-modal",
                icon: "lifebuoy.svg",
                fn: function() {
                    ilse.htmls.modal( ilse.components.help, { overflow: 'auto' } )
                },
                undo: args => { ilse.htmls.list.shift()},
                description: "Will open the help modal",
                name: "Open Help Modal",
                props: {},
            },

            {
                id: "open-configuration-modal",
                icon: "settings.svg",
                fn: function() {
                    ilse.htmls.add( "configuration", ilse.components.configuration )
                },
                undo: args => { ilse.htmls.list.shift()},
                description: "Will open the configuration modal",
                name: "Open Configuration Modal",
                props: {},
            },

            {
                id: "new-note",
                icon: "point.svg",
                fn: async function() {
                    let input   = await ilse.dialog.input( "New note", "Content:" )
                    let index   = ilse.notes.list.length
                        ilse.notes.add( input )
                },
                undo: args => {
                    // TODO: Remove last note added
                },
                description: "Will open a prompt for a new note",
                name: "New Note",
                props: {},
            },

            {
                id: "set-default-mode",
                icon: "logo.svg",
                fn: async function() {

                    if_else(
                        not(
                            // is_inside( ilse.modes, "ilse" )
                            is_inside( "ilse", ilse.modes )
                        ),
                        yes => {
                            ilse.modes.push( "ilse" )
                            ilse.config.modes = [ "ilse" ]
                            ilse.config.save()
                        }
                    )

                },
                undo: args => {
                    // TODO:
                },
                description: "Set Default Mode",
                name: "Set Default Mode",
                props: {},
            },

            {
                id: "spawn",
                icon: "lupe.svg",
                fn: async function( args ) {
                    // ilse.dialog.info( "Hello World", "This is my message to the world" )
                    // let o = await ilse.dialog.input( "Hello World", "This is my message to the world" )
                    let o = await ilse.dialog.confirm( "Hello World", "This is my message to the world" )
                    printf( 'o -> ', o )
                },
                undo: arg => {},
                description: "Spawn",
                name: "Spawn",
                props: {},
            },

            {
                id: "open-search-modal",
                icon: "lupe.svg",
                fn: async function() {
                    // ilse.is_search_on = !ilse.is_search_on
                    // ilse.htmls.add( "search", ilse.components.search )

                    ilse.htmls.modal(
                        ilse.htmls.render('search',
                            { search: '', list: [] }
                        ),
                        { width: '70%', height: '70%' }
                    )
                },
                description: "Open Search Modal",
                name: "Open Search Modal",
                props: {},
            },

            {
                id: "toggle-zen-mode",
                icon: "yin-yang.svg",
                fn: async function() {
                    ilse.is_zen = ilse.config.is_zen = !ilse.config.is_zen
                    ilse.config.save()
                },
                description: "Will toggle zen mode",
                name: "Toggle Zen Mode",
                props: {},
            },

            {
                id: "reset-theme",
                fn: async function() {
                    ilse.themes.apply_default_theme()
                },
                undo: args => {
                    // re-scan and apply theme.
                },
                description: "Will reset the theme to the default theme",
                name: "Reset Theme",
                props: {},
            },

            {
                id: "toggle-left-sidebar",
                fn: async function() {
                    ilse.is_left_sidebar_open = !ilse.is_left_sidebar_open
                    ilse.left_sidebar = "default"
                },
                description: "Toggle Left Sidebar",
                name: "Toggle Left Sidebar",
                props: {},
            },

            {
                id: "toggle-right-sidebar",
                fn: async function() {
                    ilse.is_right_sidebar_open = !ilse.is_right_sidebar_open
                },
                description: "Toggle Right Sidebar",
                name: "Toggle Right Sidebar",
                props: {},
            },

            {
                id: "insert-random-text",
                fn: async function() {
                    const dom       = document.activeElement
                    dom.innerText  += `<button onclick="alert('Hello, World')" > Hello, World </button>`
                    // dom.onkeypress = function(){ return false }
                },
                undo: args => {},
                description: "Printf Keys",
                name: "Printf Keys",
                props: {},
            },

            {
                id: "open-website-on-window",
                fn: async function() {

                    let clip    = await ilse.clipboard.read()
                    let is_url  = clip && clip.indexOf("http") !== -1 || clip.indexOf("ftp://") !== -1 || clip.indexOf("file://") !== -1
                    let url

                    if( clip && is_url ) {
                        url = clip
                    } else {
                        url = await ilse.dialog.input( "Query", "Type:" )
                    }

                    // TODO: I can't reference to this after.
                    create_window({ title: "Browse", external: true, url: url })

                },
                undo: args => {
                    // TODO: find instance of "create_window" and then close it!
                    // Something like ilse.windows[id].close()
                },
                description: "Will open a new query windows based on your choice.",
                name: "Open new Query",
                props: {},
            },

            {
                id: "open-external-website-on-window",
                fn: async function() {
                    let full_path   = await ilse.dialog.input( "Query", "Type:" )
                    create_window({ title: `${full_path}(Website)`, external: true, url: full_path })
                },
                undo: args => {
                    // TODO: find instance of "create_window" and then close it!
                    // Something like ilse.windows[id].close()
                },
                description: "Will open a new query windows based on your choice(External).",
                name: "Open External Website",
                props: {},
            },

            {
                id: "open-html-on-window",
                fn: async function() {

                    let full_path

                    try {
                        full_path   = await ilse.dialog.input( "Query", "Type:" )
                        printf( "full_path -> ", full_path )
                    } catch( e ) {
                        printf( "e -> ", e )
                    }

                    printf( "full_path -> ", full_path )
                    create_window({ title: `${full_path}(HTML)`, url: full_path })
                },
                undo: args => {
                    // TODO: find instance of "create_window" and then close it!
                    // Something like ilse.windows[id].close()
                },
                description: "Will open a new query windows based on your choice.",
                name: "Open HTML",
                props: {},
            },

            {
                id: "focus-quick-search",
                fn: async function() {
                    let dom   = document.getElementById( "quick-search" )
                    if( dom ) {
                        dom.focus()
                        setTimeout( () => { dom.value = "" }, 1 )
                    }
                },
                undo: args => {

                },
                description: "Focus Quick Search",
                name: "Focus Quick Search",
                props: {},
            },

            {
                id: "copy-image-path",
                fn: async function() {

                    // document.body.style.cursor = "crosshair !important"
                    document.body.style.cursor = "crosshair";



                    ilse.cursor = async function on_click( event ) {


                        if( event.target.tagName === "IMG" ) {
                            await ilse.clipboard.write( event.target.src )
                            ilse.notification.send( "Copied", event.target.src )
                        }
                        document.body.style.cursor = "auto"
                        document.body.removeEventListener( "click", ilse.cursor )
                    }

                    document.body.addEventListener( "click", ilse.cursor )

                },
                undo: args => {
                    document.body.removeEventListener( "click", ilse.cursor )
                    document.body.style.cursor = "auto"
                },
                description: "Click on a image to get it's full path",
                name: "Copy Image Path",
                props: {},
            },

        ]


        let icon
        commands.map( command => {
            this.add({
                id: command.id,
                name: command.name,
                icon: command.icon,
                description: command.description,
                fn: command.fn,
                props: command.props
            })
        })

        // this.add_components_commands()
    }

}

export default Commands
