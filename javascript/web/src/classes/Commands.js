import printf                                   from "@/functions/printf.js"

// Ilse
    import ilse                                 from "@/ilse.js"

// Utils
    import Messager                             from "@/classes/Messager.js"

// node.js
    import path                                 from "path"
    import fs                                   from "fs"

// functions
    import is_dev                               from "@/functions/is_dev.js"
    import get_target_directory_url             from "@/functions/get_target_directory_url.js"
    import html_to_string                       from "@/functions/html_to_string.js"
    // import get_plugin_api                    from "@/functions/get_plugin_api.js"
    import is_inside                            from "@/functions/is_inside.js"
    import if_else                              from "@/functions/if_else.js"
    import get_parent_with_attr                 from "@/functions/find_parent_element_with_attribute.js"
    import toggle                               from "@/functions/toggle.js"
    import render                               from "@/functions/render.js"
    import modal                                from "@/functions/modal.js"
    import store                                from "@/functions/store.js"
    import get_command_by_keyboard_shortcut     from "@/functions/get_command_by_keyboard_shortcut.js"
    import clipboard                            from "@/functions/clipboard.js"
    import string_to_html                       from "@/functions/string_to_html.js"
    import notify                               from "@/functions/notify.js"
    import fixed                                from "@/functions/set_fixed_window_on_document.js"
    import get_uuid                             from "@/functions/get_small_unique_string_id.js"
    import get_random_array_elements            from "@/functions/get_random_array_elements.js"
    import get_note_id                          from "@/functions/get_note_id.js"
    import get_note_children                    from "@/functions/get_note_children.js"

class Commands {

    constructor( ilse ) {
        this.list             = []
        this.history          = []
        this.last_command     = {}
        this.last_called_time = 0
        this.setup()
    }

    setup() {
        this.set_default_commands()
    }

    add_for_plugin({  id, name, icon, source, description, fn, undo, props = {} }) {
        props.is_plugin = true
        props.source    = source
        this.add({ id, name, icon, description, fn, undo, props })
    }


    add({ id, name, icon, description, fn, undo, props = {} }) {

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
            undo: undo,

            description: description,
            name: name,
            props: props,
        }

        // Check for duplicates
            let id_list = this.list.map( command => {
                return command.id
            }).filter( e => e )

            let is_duplicated = id_list.indexOf(id) !== -1
            // dup, don't add
                if( is_duplicated ) return null

        // If not dup, then push
        this.list.push( command )

        return command
    }

    resolve_name( name ) {

        let selected
        this.list.map( command => {
            if( command.name === name ) {
                selected = command
                return
            }
        })

        return selected
    }

    get( id ) {

        let commands = this.list

        for( let command of commands ) {
            if( command.id === id ) return command
        }

        return null
    }

    // USE: let payload = args[0]
    run( id, args ) {

        if( !id ) throw new Error( "Commands.js -> run(<id>) <id> is not defined, it should be a string with the id of the command " )

        let command = this.get( id )

        if( id !== "repeat-last-command" ) {
            this.last_command = { id, args }
            ilse.commands.last = this.last_command
        }

        Messager.emit( "~commands", "exec", id )
        printf( "Runnign command" )

        /* BUGFIX: Prevent keyboard from opening */
        let api = store( "api" )
            api.last_called_command_time = ( new Date().getTime() )

        store( "api", api )
        /* BUGFIX: Prevent keyboard from opening */


        if( command && command.fn ) {
            return command.fn( args )
        }
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
                id: "test",
                fn: async function() {
                    // printf( "api.notes.list -> ", api.notes.list )
                    // ilse.commands.run( "put-fixed-window", { html: "Hello, World", x: 300, y: 300 } )

                    console.log("window.document.getSelection().toString() -> ", window.document.getSelection().toString() )
                    console.log("window.document.getSelection() -> ", window.document.getSelection() )

                    console.log("window.getSelection().toString() -> ", window.getSelection().toString() )
                    console.log("window.getSelection() -> ", window.getSelection() )
                    // ilse.electron.send( "test", { url: "http://localhost", x: 0, y: 0, width: 300, height: 300} )
                    // ilse.electron.send( "test", "http://localhost", { url: "http://localhost", x: 0, y: 0, width: 300, height: 300} )
                    // notify( "Title", "Description" )

                    // console.time("first")
                    // console.time("query_t")
                    // let arr = []
                    // let o   = await ilse.notes.query_t("[[Tools for Thought]]", arr)

                    // let o   = await ilse.notes.query_t("[[Tools for Thought]]", id => {
                        // setTimeout( () => console.log(id) ), 1000
                    // })

                    // console.timeEnd("query_t")
                    let tabs        = store("tabs")
                    tabs.add_component( "hello-world.html", "[[Tools for Thought]]" )
                },
                description: "Test",
                name: "Test",
                props: {},
            },

            {
                id: "notify",
                fn: async function( payload ) {
                    printf( "payload -> ", payload )
                    let { title, description, options } = payload
                    notify( title, description, options )
                },
                description: "Notify",
                name: "Notify",
                props: {},
            },

            {
                id: "search-selection-for-links",
                fn: async function() {

                    let selection = window.getSelection().toString()

                    let links     = store("links")
                        links.push( selection )

                    store( "links", links )

                },
                description: "Will search the selected text for links.",
                name: "Search Selection for Links",
                props: {},
            },

            {
                id: "open-make-plugin-modal",
                fn: async function() {

                    modal(
                        render("make-plugin.html",
                            {
                            }
                        ),
                        // { width: '80%', height: 'fit-content' }
                        { width: '80%', height: '80%' }
                    )


                },
                description: "Will open a plugin IDE for you to make a plugin",
                name: "Open Make Plugin Modal",
                props: {},
            },

            {
                id: "setup-select-target-directory",
                fn: async function() {
                    ilse.electron.setup_target_folder()
                },
                description: "Will open a menu for your to select your target directory",
                name: "(Setup) Select Target Directory",
                props: {},
            },

            {
                id: "put-fixed-window",
                fn: async function( options ) {

                    let { html, x, y, width, height } = options

                    printf( "Commands.js -> html -> ", html )
                    printf( "Commands.js -> x -> ", x )
                    printf( "Commands.js -> y -> ", y )
                    printf( "Commands.js -> width -> ", width )
                    printf( "Commands.js -> height -> ", height )

                    let id   = get_uuid()

                    let item = {
                        id:   "fixed-" + Math.random().toString().replace("0.", ""),
                        html: `<div style="background: #fff; border: 1px solid #000; position: fixed; left: ${x}px; top: ${y}px; width: ${options.width || "300px;"}; height: ${options.height || "300px;" }; " > <img class="is-pulled-right" style="width: 20px; cursor: pointer;" @click="api.get('stack').pop(); " :src="api.require('x.svg')" />
                            <hr>
                            ${html}
                        </div>`
                    }
                    printf( "item -> ", item )

                    ilse.stack.push( item )


                    return new Promise((resolve, reject) => {

                        Messager.on( "~ilse", ( action, payload ) => {

                            if( action === "modal-done" && id === payload.id ) {
                                ilse.stack.pop()
                                resolve( payload.input)
                            } else if ( action === "rejected" && id === payload.id){
                                ilse.stack.pop()
                                reject( id )
                            } else {
                                reject( id )
                            }

                        })
                    })





                },
                description: "Put Fixed Window",
                name: "Put Fixed Window",
                props: {},
            },

            {
                id: "open-command-pallet-modal",
                fn: async function() {

                    let list = []

                    ilse.commands.list.map( command => {
                        list.push( command_2_html_ui(command) )
                    })

                    function command_2_html_ui( command ) {
                        return `<div class="flex" >
                            <img src="${ilse.require(command.icon)}" style="width: 20px;" />
                            <p data-command-id="${command.id}" > ${command.name} </p>
                            <p style="position: absolute; right: 0px; color: var( --background-color ); background: var( --text-color ); padding: 3px; border-radius: 4px; min-width: 30px; min-height: 30px; "> ${get_command_by_keyboard_shortcut(command.id)} </p>
                        </div>`
                    }

                    let content = await ilse.commands.run( "html-list", {
                        placeholder: "Search for Commands ...",
                        icon: "command.svg",
                        init() {
                            this.list = list
                        },
                        on_click( el, item, index ) {

                            let HTML        = string_to_html( item )
                            let dom         = HTML.querySelector( "[data-command-id]" )
                            let id  = dom.getAttribute("data-command-id")
                            ilse.commands.run( id )

                        },
                        example() {

                        },
                        on_input() {

                            let query     = this.search

                            // filter commands by query
                            let result    = ilse.commands.list.map( item => {
                                if( item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ) return item
                            }).filter( e=>e )

                            // transform them into HTML
                            let html_list = result.map( item => {
                                return command_2_html_ui( item )
                            })

                            printf( "on_input -> " )
                            this.list = html_list

                        },
                        on_enter() {

                            let query     = this.search

                            // filter commands by query
                            let result    = ilse.commands.list.map( item => {
                                if( item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ) return item
                            }).filter( e=>e )

                            // transform them into HTML
                            let html_list = result.map( item => {
                                return command_2_html_ui( item )
                            })

                            this.list = html_list
                        },
                    })
                },
                undo: args => {
                    ilse.list.shift()
                },
                description: "Open Command Pallet Modal",
                name: "Open Command Pallet Modal",
                props: {},
            },

            {
                id: "open-all-components",
                fn: async function() {

                    printf( "open-all-components" )

                    let components  = []
                    let list        = []
                    let tabs        = store("tabs")

                    tabs.list.map( tab => {

                        tab.components.map( component => {
                            list.push(`<img src="${tab.icon}" style="width: 30px; " /> <span style="vertical-align: 8px;" > <img :src="api.require('app-window.svg')" style="width: 20px; display: inline; vertical-align: text-bottom; " /> <span> ${component.name} </span> </span> `)
                        })

                    })

                    let content           = await ilse.commands.run( "html-list", {
                        list: list,
                        placeholder: "Search Tabs",
                        icon: "app-window.svg",
                        init() { },
                        on_click() {},
                        on_input() {},
                        on_enter() {
                            if( !this.search ) return
                            let tabs = store("tabs")
                            ilse.stack.pop()
                        }
                    })

                },
                description: "Open Links Modal",
                name: "Open Links Modal",
                props: {},
            },

            {
                id: "open-search-fs-files-modal",
                fn: async function() {

                    let list = await ilse.filesystem.file.get_all.async()

                    let content           = await ilse.commands.run( "html-list", {
                        list: [],
                        placeholder: "Search for files",
                        icon: "file.svg",
                        init() { },
                        on_click() {},
                        on_input() {},
                        on_enter() {
                            let query    = this.search
                            let filtered = list.map( item => {
                                if( item.indexOf(query) !== -1 ) return item
                            }).filter( e=>e )

                            this.list = filtered
                        }
                    })

                },
                description: "Search for your brain's files",
                name: "Open Files Search",
                props: {},
            },

            {
                id: "open-calendar-on-modal",
                fn: function() {

                    modal(
                        render( "calendar.html", { },
                            {
                                stringify: false,
                            }
                        ),
                        { width: '70%', height: '70%', overflow: 'auto' }
                    )

                },
                description: "Open Calendar on Modal",
                name: "Open Calendar On Modal",
                props: {},
            },

            {
                id: "open-website-via-url",
                fn: async function() {
                    let url = await ilse.commands.run( "html-list", { placeholder: "Type URL" })
                    printf( "url -> ", url )
                    modal(
                        render( "web.html", { url: url } ),
                        { width: '70%', height: '70%' }
                    )

                },
                description: "Will open a text prompt for you to type the URL",
                name: "Open Website via URL",
                props: {},
            },

            {
                id: "outline-search",
                fn: async function( options ) {

                    return new Promise((resolve, reject) => {

                        modal(
                            render("outline-search.html",
                                {
                                    search:        options.search         || '',
                                    list:          options.list           || [],
                                    pointer:       options.pointer        || -1,
                                    icon:          options.icon           || "icon.svg",
                                    placeholder:   options.placeholder    || "Search Notes",
                                    prepend_search:options.prepend_search || "",
                                    append_search: options.append_search  || "",
                                    init: options.init                    || function init() { },
                                    on_input: options.on_input            || function on_input( note ) { },
                                    on_click: options.on_click            || function on_click( note ) { ilse.stack.pop(); resolve( this.search ) },
                                    on_enter: options.on_enter            || function on_enter() { ilse.stack.pop(); resolve( this.search ) }
                                },
                                {
                                    stringify: false,
                                }
                            ),
                            { width: '80%', height: 'fit-content' }
                        )

                    })

                },
                description: "Search for a note and get a outline.html as a result",
                name: "Outline Search",
                props: {},
            },

            {
                id: "box",
                fn: async function( options ) {

                    return new Promise((resolve, reject) => {

                        modal(
                            render("box.html",
                                {
                                    html:         options.html         || '',
                                },
                                {
                                    stringify: false,
                                }
                            ),
                            { width: '80%', height: 'fit-content' }
                        )

                    })

                },
                description: "Text Input",
                name: "Text Input",
                props: {},
            },

            {
                id: "close-active-component",
                fn: function() {
                    // printf( "close-active_tab" )
                    // let tabs = store( "tabs" )
                    // tabs.close_active_tab()
                },
                description: "Open New Tab",
                name: "Open New Tab",
                props: {},
            },

            {
                id: "create-new-component",
                fn: function() {
                    let tabs = store("tabs")
                    tabs.add_component( "new-tab.html", "New Tab" )
                },
                description: "Will create a new component",
                name: "Create New Component",
                props: {},
            },

            {
                id: "create-new-tab",
                fn: function() {
                    let tabs = store("tabs")
                    tabs.add()
                },
                description: "Open New Tab",
                name: "Open New Tab",
                props: {},
            },

            {
                id: "go-to-previous-tab",
                fn: function() {

                    let copy = ilse.selected
                    if( ilse.tabs.list[--copy] ) {
                        ilse.select = copy
                    }

                },
                description: "Go To Previous Tab",
                name: "Previous Tab",
                props: {},
            },

            {
                id: "go-to-next-tab",
                fn: function() {

                    let tabs = store("tabs")
                    tabs.next_tab()

                },
                description: "Go To Next Tab",
                name: "Next Tab",
                props: {},
            },

            {
                id: "flywheel",
                fn: function() {

                    let todos                  = ilse.notes.query("- [ ]")
                    let random_todos           = get_random_array_elements( todos, 10 )

                    // let html = ""
                    // random_todos.map( item => {
                        // html += `<span x-html="api.render('outline.html', { list: [ '${item}' ] })" > </span>`
                        // html += `<div x-html="api.markdown(api.notes.list['${item}'].content)" > </div>`
                    // })

                    store( "work", random_todos )

                    ilse.commands.run("box", {
                        html: `<span x-html="api.render('outline.html', { list: $store.work })" > </span>`,
                    })

                    /*
                    ilse.commands.run("box", {
                        html: `<div style="overflow: auto;" >
                            ${html}
                        </div>`,
                    })
                    */

                },
                description: "Spins the Flywheel",
                name: "Flywheel",
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

                    // printf( "@before -> ilse.config.modes -> ", ilse.config.modes )
                    let dark_mode_string = "dark-mode|PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLW1vb24iIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iIzQ4NTM2MSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICA8cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMTIgM2MuMTMyIDAgLjI2MyAwIC4zOTMgMGE3LjUgNy41IDAgMCAwIDcuOTIgMTIuNDQ2YTkgOSAwIDEgMSAtOC4zMTMgLTEyLjQ1NHoiIC8+Cjwvc3ZnPgoKCg==|dark-mode"
                    ilse.mode( dark_mode_string )
                    // ilse.save()
                },
                description: "Will turn on if it's off, and off if it's on",
                name: "Toggle Dark Mode",
                props: {},
            },

            {
                id: "save",
                icon: "save.svg",
                fn: function() {
                    ilse.notes.save()
                    ilse.save()
                },
                undo: args =>{},
                description: "Will save: bullets, config etc.",
                name: "Save",
                props: {},
            },

            {
                id: "open-random-notes-images",
                icon: "dice-3.svg",
                fn: async function() {

                    let list                   = ilse.notes.query_regexp( /(\.png|\.jpg|\.gif)/ )
                    let random_list            = get_random_array_elements( list, 10 )
                    let normalized_list        = random_list.map( item => { return `<div @click="navigator.clipboard.writeText('${item}'); api.notify('Copied!', 'Copied: ' + '${item}' + ' To your clipboard' ); " >
                        <span x-html="api.markdown(api.notes.list['${item}'].content)" > </span>
                    </div>`
                    })

                    await ilse.commands.run( "html-list", {
                        search: "",
                        list: normalized_list,
                        placeholder: "See Random Images",
                        on_input( item ) { },
                        on_click( item ) { },
                        init() { },
                        async on_enter() {

                            let random_list            = get_random_array_elements( list, 10 )
                            random_list                = random_list.map( item => { return `<div @click="navigator.clipboard.writeText('${item}'); api.notify('Copied!', 'Copied: ' + '${item}' + ' To your clipboard' ); " >
                                <span x-html="api.markdown(api.notes.list['${item}'].content)" > </span>
                            </div>`
                            })

                            this.list = random_list

                        },
                    })


                },
                undo: args =>{},
                description: "See a list of random images",
                name: "Random Images",
                props: {},
            },

            {
                id: "open-random-notes",
                icon: "dice-3.svg",
                fn: async function() {

                    let list                   = Object.values(ilse.notes.list)
                        list                       = list.map( item => { return item.id })
                    let random_list            = get_random_array_elements( list, 10 )

                    let normalized_list        = random_list.map( item => { return `<div @click="navigator.clipboard.writeText('${item}'); notify('Copied!', 'Copied: ' + '${item}' + ' To your clipboard' ); " >
                        <span x-html="api.markdown(api.notes.list['${item}'].content)" > </span>
                    </div>`
                    })

                    await ilse.commands.run( "html-list", {
                        search: "",
                        list: normalized_list,
                        placeholder: "See Random Notes",
                        on_input( item ) { },
                        on_click( item ) { },
                        init() { },
                        async on_enter() {

                            let random_list            = get_random_array_elements( list, 10 )
                            random_list                = random_list.map( item => { return `<div @click="navigator.clipboard.writeText('${item}'); notify('Copied!', 'Copied: ' + '${item}' + ' To your clipboard' ); " >
                                <span x-html="api.markdown(api.notes.list['${item}'].content)" > </span>
                            </div>`
                            })

                            this.list = random_list

                        },
                    })

                },
                undo: args =>{},
                description: "See a list of random notes",
                name: "Random Notes",
                props: {},
            },

            {
                id: "open-folders-modal",
                icon: "folders.svg",
                fn: async function() {

                    let list     = []

                    function folder_2_html( folder, index ) {

                        let last = folder[folder.split("").length - 1]
                        let notes

                        try {

                            if( last === "/" || last === "\\" ) {
                                notes = fs.readFileSync( folder + "notes", "utf8" )
                            } else {
                                notes = fs.readFileSync( folder + path.join("/") + "notes", "utf8" )
                            }

                        } catch( e ) {
                            notes = ""
                        }

                        let lines = notes.split("\n").length
                        if( index === 0 ) {

                            return `<div class="flex space-between" >
                                <p> ${folder} </p>
                                <p> ${lines}[s] notes <p>
                                <div> </div>
                            </div>`

                        } else {

                            return `<div class="flex space-between" >
                                <p> ${folder} </p>
                                <p> ${lines}[s] notes <p>
                                <button class="slick-span" @click="let list = api.get('target_directories'); let folder = '${folder}'; list.unshift(folder); window.localStorage.setItem('target-directories', JSON.stringify(list) ); window.location.reload()" > Select </button>
                                <img :src="api.require('trash.svg')" style="width: 20px;" @click="let list = api.get('target_directories'); let folder = '${folder}'; list = list.splice( list.indexOf(folder), 1 ); console.log('list -> ', list); window.localStorage.setItem('target-directories', JSON.stringify(list)); console.log('window.localStorage.getItem() -> ', window.localStorage.getItem('target-directories')); api.utils.close_all_modals(); console.log('the work is done')" />
                            </div>`
                        }

                    }

                    function update_list( target_directories ) {

                        target_directories.map( (item, index) => {
                            list.push( folder_2_html(item, index) )
                        })

                    }

                    update_list( ilse.target_directories )

                    await ilse.commands.run( "html-list", {
                        list: list,
                        placeholder: "Search or Add Folders",
                        on_input( item ) {

                        },
                        on_click( item ) {
                        },
                        init() {

                        },
                        async on_enter() {

                            let text                = this.search
                            let chunks              = text.split("")
                            let len                 = chunks.length
                            let last                = text[length -1]

                            if( last === "/" || last === "\\" )  {
                                chunks.pop()
                                text = chunks.join("")
                            }

                            let target_directories  = ilse.target_directories
                                if( /* Avoid Duplicated */ target_directories.indexOf( text ) === -1 ) target_directories.push( text )
                            window.localStorage.setItem( "target-directories", JSON.stringify( target_directories  ))

                            ilse.stack = [] // close all modals

                            update_list( target_directories )
                        },
                    })

                },
                undo: args =>{},
                description: "Will open the folders modal",
                name: "Open Folders Modal",
                props: {},
            },

            {
                id: "open-search-in-outline",
                icon: "point.svg",
                fn: async function() {

                    let content = await ilse.commands.run( "outline-search", {
                        placeholder: "Search notes, show as a outline",
                        icon: "sitemap.svg",
                        init() { },
                        on_click( el, item, index ) {},
                        on_input( arg ) {},
                        on_enter() {

                            console.time("one")
                            if( !this.search ) return

                            let result = ilse.notes.query( this.prepend_search + this.search + this.append_search )
                                if( !result.length ) return

                            let children = []
                            let list
                            result.map( item => {
                                list = get_note_children( item )
                                list.map( _item => {
                                    children.push(_item)
                                })
                            })
                            printf( "children -> ", children )
                            children.map( item => {
                                result.push( item )
                            })

                            let tabs = store( "tabs" )
                            tabs.add_component( "outline.html", "Outline", { list: result, style: "height: 90vh !important; overflow: auto;"})
                            ilse.stack.pop()
                            console.timeEnd("one")
                        }
                    })

                },
                undo: args => { ilse.list.shift()},
                description: "Will render your search as an outline",
                name: "Open Outline",
                props: {},
            },

            {
                id: "append-new-note",
                icon: "point.svg",
                fn: async function() {

                    let selected
                    await ilse.commands.run( "html-list", {
                        placeholder: "New Note",
                        on_click( item ) { selected = item },
                        init() { },
                        on_input() { },
                        async on_enter() {

                            let len     = this.list.length
                                if( !len ) this.list = ilse.notes.query( this.prepend_search + this.search + this.append_search )

                            if( len )  {
                                selected  = this.list[0]
                                ilse.stack.pop()
                                let text = await ilse.commands.run( "html-list", {
                                    placeholder: "Note Content",
                                    async on_enter() {
                                        ilse.stack.pop()
                                    }
                                })
                                printf( "text -> ", text )
                            }
                        },
                    })

                },
                undo: args => {
                },
                description: "Will open a prompt for a new note",
                name: "New Note",
                props: {},
            },

            {
                id: "new-note",
                icon: "point.svg",
                fn: async function( arg ) {

                    let content = await ilse.commands.run( "html-list", {
                        list: [],
                        placeholder: "New Note",
                        init() { },
                        on_click() { },
                        on_input() { },
                        on_enter() {

                            let result      = ilse.notes.query( this.prepend_search + this.search + this.append_search )
                            let html_list   = result.map( item => { return `<div>
                                <span x-html="api.markdown(api.notes.list['${item}'].content)" > </span>
                            </div>`})
                            this.list       = html_list

                            let has_result  = result.length

                            if( !has_result ) {

                                ilse.notes.add( this.search )
                                // let id = get_note_id()
                                // ilse.notes.list[id] = {
                                    // content: this.search,
                                    // id: id,
                                    // depth: 0,
                                    // source: ilse.target_directories[0],
                                // }

                                // let api = store("api")
                                    // api.emit( "~notes", { action: "added", id: id, index: null } )

                                ilse.stack.pop()
                            }
                        },
                    })

                },
                undo: args => {
                },
                description: "Will open a prompt for a new note",
                name: "New Note",
                props: {},
            },

            {
                id: "screenshot",
                icon: "photo.svg",
                fn: async function() {
                    ilse.stack.pop()

                    setTimeout( () => {
                        ilse.electron.screenshot()
                    }, 500 )
                },
                description: "Screenshot",
                name: "Screenshot",
                props: {},
            },

            {
                id: "open-todos-modal",
                icon: "lupe.svg",
                fn: async function() {

                    let content = await ilse.commands.run( "outline-search", {
                        placeholder: "Search Todos",
                        prepend_search: "- [ ] ",
                        icon: "checklist.svg",
                        init() { },
                        on_click( el, item, index ) {},
                        on_input( arg ) {},
                        on_enter() {
                            if( !this.search ) return
                            let list  = ilse.notes.query(this.prepend_search + this.search + this.append_search )
                            this.list = list
                        }
                    })

                },
                description: "Search Todos",
                name: "Search Todos",
                props: {},
            },

            {
                id: "html-list",
                icon: "lupe.svg",
                fn: async function( options ) {

                    return new Promise((resolve, reject) => {

                        modal(
                            render("html-list.html",
                                {
                                    search:        options.search         || '',
                                    list:          options.list           || [],
                                    pointer:       options.pointer        || -1,
                                    icon:          options.icon           || "icon.svg",
                                    placeholder:   options.placeholder    || "Search Notes",
                                    prepend_search:options.prepend_search || "",
                                    append_search: options.append_search  || "",
                                    init: options.init                    || function init() { },
                                    on_input: options.on_input            || function on_input( note ) { },
                                    on_click: options.on_click            || function on_click( note ) { ilse.stack.pop(); resolve( this.search ) },
                                    on_enter: options.on_enter            || function on_enter() { ilse.stack.pop(); resolve( this.search ) }
                                },
                                {
                                    stringify: false,
                                }
                            ),
                            { width: '80%', height: 'fit-content' }
                        )

                    })

                },
                description: "Render a search modal and render it as HTML",
                name: "HTML List",
                props: {},
            },

            {
                id: "open-notes-search-modal",
                icon: "lupe.svg",
                fn: async function() {

                    let _this = this

                    let clipboard_content = await navigator.clipboard.readText()
                        printf( "clipboard_content -> ", clipboard_content )

                    let text_selection    = window.getSelection().toString()
                        printf( "text_selection -> ", text_selection )

                    let content           = await ilse.commands.run( "html-list", {
                        placeholder: "Search Notes",
                        icon: "lupe.svg",
                        init() { },
                        on_click( el, item, index ) {},
                        on_input( arg ) {},
                        on_enter() {
                            printf( "on_enter -> 1" )
                            if( !this.search ) return
                            printf( "on_enter -> 2" )

                            let list            = ilse.notes.query(this.prepend_search + this.search + this.append_search )
                            printf( "on_enter -> 3 list -> ", list )
                                list                = list.map( item => { return `<div @dblclick="navigator.clipboard.writeText('${item}'); notify('Copied!', 'Copied: ' + '${item}' + ' To your clipboard' ); " >
                                    <span x-html="api.markdown(api.notes.list['${item}'].content)" > </span>
                                </div>`
                                })

                            this.list           = list
                        }
                    })

                },
                description: "Open Search Modal",
                name: "Open Search Modal",
                props: {},
            },

            {
                id: "copy-image-path",
                fn: async function() {

                    // document.body.style.cursor = "crosshair !important"
                    document.body.style.cursor = "crosshair";

                    ilse.cursor = async function on_click( event ) {


                        if( event.target.tagName === "IMG" ) {
                            await clipboard( event.target.src )
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
                undo: command.undo,
                props: command.props
            })
        })

        // this.add_components_commands()
    }

}

export default Commands
