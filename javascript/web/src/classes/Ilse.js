import printf                   from "@/functions/printf.js"

// Classes
    import KeyboardShortcut             from "@/classes/KeyboardShortcut.js"
    import Commands                     from "@/classes/Commands.js"
    import Filesystem                   from "@/classes/Filesystem.js"
    import Notes                        from "@/classes/Notes.js"
    import Markdown                     from "@/classes/Markdown.js"
    import Electron                     from "@/classes/Electron.js"
    import Parse                        from "@/classes/Parse.js"

// functions
    import i18n                         from "@/functions/i18n.js"
    import get_api                      from "@/functions/get_plugin_api.js"
    import irequire                     from "@/functions/require.js"
    import string_to_html               from "@/functions/string_to_html.js"
    import html_to_string               from "@/functions/html_to_string.js"
    import extract_markdown_tags        from "@/functions/extract_markdown_tags.js"
    import note_to_config               from "@/functions/note_to_config.js"
    import get_uuid                     from "@/functions/get_small_unique_string_id.js"
    import config_object_to_note        from "@/functions/config_object_to_note.js"
    import store                        from "@/functions/store.js"
    import get_tabs                     from "@/functions/get_tabs.js"
    import theme                        from "@/functions/theme.js"
    import async_ilse_get_plugins       from "@/functions/async_ilse_get_plugins.js"
    import get_default_components       from "@/functions/get_default_components.js"
    import config                       from "@/functions/config.js"

    import Alpine                   from 'alpinejs'

// Utilities
    import Messager                     from "@/classes/Messager.js"

// Constants
    import CONSTANTS                    from "@/constants/index.js"

// html
    import ilse_html                    from "@/html/ilse.html"

// Entry point for our app, there is only one ilse in the entire app, this is the glue for everything else + components
// TODO: list.html needs to render outline.html ... somehow. But I also need a way of rendering things such as marketplace, target directories etc.
export default class Ilse {

    constructor() {

        this.constants              = CONSTANTS;
        // this.components             = this.get_components( view )
        this.components             = get_default_components() // { "daily-notes.html": "<div> ...", "main.html": "<div> ..." }
        this.components_props       = {}
        this.stack                  = []

        this.name                   = "Ilse Langnar's Notebook"
        this.key                    = "ilse-key"
        this.cursor                 = null
        this.plugins                = []
        this.keys                   = { daily_notes: "daily-notes-key", home: 0 }
        this.languages              = Object.keys(CONSTANTS.SUPPORTED_LANGUAGES)

        this.has_loaded             = false
        this.env                    = process.env
        this.platform               = process.env.VUE_APP_TARGET.toLowerCase()
        // this.view                   = view

        this.i18n                   = i18n
        this.children               = {}

        // BUGFIX: In my quine I need a time to wait for the DOM to load, otherwise I overwrite since it thinks it does not exists.
        this.before_setup()

        if( this.platform === "quine" ) {
            setTimeout( () => { this.setup() }, 100 )
        } else {
            this.setup();
        }
    }

    before_setup() {

        this.target_directories     = []
        let list        = window.localStorage.getItem( "target-directories" )

        let bugfix_is_string = typeof list === "string"
        if( bugfix_is_string ) {

            try {
                list = JSON.parse( list )
            } catch( e ) {
                list = []
            }

        }

        let bugfix_list_has_items = list && list.length
            if( bugfix_list_has_items ) this.target_directories     = list

        if( this.platform === "quine" ) { // Autoselects "/"

            this.target_directories = [ "/" ]
        }

    }

    async setup() {

        // // Utils
            this.parse                  = new Parse(this)

        // Filesystem
            this.filesystem             = new Filesystem( this, this.target_directories[0] )
            this.require                = irequire

        // Notes
            this.notes                  = new Notes( this.filesystem, this )

        this.markdown               = new Markdown()

        this.commands               = new Commands(this)
        this.keyboard               = new KeyboardShortcut(this)

        if( this.env.VUE_APP_TARGET === "ELECTRON" ) this.electron               = new Electron( this ) // Electron only

        this.after_setup()
    }

    /*
    // Returns a object({  }) with the list of mounted components
    get_components( string ) {

        let DOM            = string_to_html( string )
        let list           = CONSTANTS.COMPONENTS
        let components     = {}
        // let api            = get_api( "global", this )
        let html_string, el

        list.map( name    => {
            el              = DOM.getElementById(name)
            html_string     = DOM.getElementById(name).innerHTML
            if( html_string ) components[name] = html_string
        })

        return components
    }
    */

    /*
    async load_custom_components() {

        if( process.env.VUE_APP_TESTING ) return // Don't do anything when testing

        let has_components  = await  this.filesystem.file.exists.async( "view.html" )

        if( has_components ) {
            let text        = await  this.filesystem.file.read.async( "view.html" )
            this.components = this.get_components( text )
        } else {
            await  this.filesystem.file.write.async( "view.html", view )
            this.load_custom_components()
        }

    }
    */

    init_alpine_store() {

        document.addEventListener( "contextmenu", event => {
            store( "contextmenuevent", event )
        })

        Alpine.directive( "ilse", ( el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {

            /*
            let version         = el.getAttribute( "data-ilse-version" )
            let type            = el.getAttribute( "data-ilse-type" )
            let icon            = el.getAttribute( "data-ilse-icon" )
            let name            = el.getAttribute( "data-ilse-name" )

            let configuration   = el.getAttribute( "data-ilse-configuration" )
                configuration   = JSON.parse( configuration )

            let plugin = {
                version,
                type,
                icon,
                id,
                name,
                configuration,
                html: el.innerHTML,
            }
            */

            let id              = el.getAttribute( "data-ilse-id" )

            let version         = el.getAttribute( "data-ilse-version" )
            let type            = el.getAttribute( "data-ilse-type" )
            let icon            = el.getAttribute( "data-ilse-icon" )
            let name            = el.getAttribute( "data-ilse-name" )

            let configuration   = el.getAttribute( "data-ilse-configuration" )
                configuration   = JSON.parse( configuration )

            this.components_props[id] = {
                icon,
            }

            this.components[id] = el.innerHTML

            /*
            printf( "before -> id -> ", id )
            this.components[id] = {
                id,
                version,
                type,
                icon,
                name,
                configuration,
                html: el.innerHTML
            }
            printf( "after -> this.components[id] -> ", this.components[id]  )

            if( this.components[id] )  {
                Messager.emit( "component-update", id )
            }

            */

            /*
            if( this.components[id] ) {
                // Already Exits I NEED TO PURGE THE EXISTING ONES HERE

                let list = document.querySelectorAll( `[data-ilse-component-uuid='${id}']` )
                for( var i = 0; i < list.length; i++ ) {
                    printf( "list[i] -> ", list[i] )
                    list[i].remove()
                }

                Messager.emit( "component-update", { id, html: el.innerHTML })
                // this.components[id] = el.innerHTML
                this.components[id] = {
                    id,
                    version,
                    type,
                    icon,
                    name,
                    configuration,
                    html: el.innerHTML
                }

            } else {

                // this.components[id] = el.innerHTML
                this.components[id] = {
                    id,
                    version,
                    type,
                    icon,
                    name,
                    configuration,
                    html: el.innerHTML
                }

            }
            */

            // this.components[id] = el.innerHTML
        })

        // Alpine.directive( "ilse-contextmenu", ( el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {
            // let fn                    = eval(expression)
            // let list                  = fn(el)
            // printf( "(ilse-contextmenu) list -> ", list )
        // })

        /*
        Alpine.directive( "ilse-contextmenu", ( el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {

            let fn                    = eval(expression)
            let list                  = fn(el)

            let add_item_2_contextmenu= () => { store( "contextmenu", list ) }
            el.addEventListener( "contextmenu", add_item_2_contextmenu )
        })
        */

        printf( "##before -> this.config -> ", this.config )
        this.config = config( this )
        let tabs
        try {
            tabs    = this.config.tabs.list
        } catch( e ) {
            // TODO: Make default thing work
        }

        printf( "##after -> this.config -> ", this.config )

        store( "selection", [])
        store( "contextmenu", [])
        store( "config", { is_leftsidebar_on: true, is_url_bar_on: true })
        store( "links", [] )
        store( "user", {} )
        store( "api", get_api("global", this) )
        store( "autosave", 0 )
        store( "tabs", get_tabs(this.config.tabs.list) )
        store( "move_notes", [] )
    }

    // Setup things that needs "ilse.notes" to be readyu
    after_setup() {

        // theme( "default", this.constants.DEFAULT_THEME ) // setup default theme
        this._autosave()

        this.init_alpine_store()
        // this.load_custom_components()
    }

    save() {
        config(this, this.config)
    }

    _autosave() {

        // let one_minute = 1000 * 10
        let one_minute = 60000

        setInterval( () => {

            let seconds = store("autosave")

            // Expensive: Do rarely
            if( seconds === 0 )  {
            } else {
                this.notes.save()
                store( "autosave", 0 )
            }

            // Automatically Save(config, tabs)
            this.save()

        }, one_minute )


    }

    async loaded() {
        this.has_loaded           = true

        // Load Plugins
        let plugins = await async_ilse_get_plugins()
        printf( "plugins -> ", plugins )
        let list    = Object.keys(plugins)
        this.plugins= list

        // TODO :Remove this: If I determine something's data-ilse-id from its file name I won't be able to differentiate between multiple-components( dependencies.html[ 1.html, 2.html ] ) etc. DO NOT USE THE NAME AS THE ID.
        // The topmost element WILL TAKE THE NAME OF THE FILE AS ID. THIS WILL MAKE THINGS "CLEARER" AND MORE ORGANIZED.

        let tmp
        list.map( item => {
            // tmp = string_to_html( plugins[item] )
            // printf( "tmp -> ", tmp )
            // tmp = tmp.querySelector("[x-ilse]")
            // printf( "tmp -> ", tmp )
            // tmp.setAttribute( "data-ilse-id", item )
            // this.components[item] = tmp.innerHTML
            // printf( "item -> ", item )
            this.components[item] = plugins[item]
        })

        Messager.emit( "~ilse", "loaded" )
        // this.has_loaded           = true
    }

}
