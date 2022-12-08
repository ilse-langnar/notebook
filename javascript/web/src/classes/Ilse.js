import printf                   from "@/functions/printf.js"

// Classes
    import KeyboardShortcut             from "@/classes/KeyboardShortcut.js"
    import Config                       from "@/classes/Config.js"
    import Utils                        from "@/classes/Utils.js"
    import Commands                     from "@/classes/Commands.js"
    import Tags                         from "@/classes/Tags.js"
    import Links                        from "@/classes/Links.js"
    import Themes                       from "@/classes/Themes.js"
    import Filesystem                   from "@/classes/Filesystem.js"
    import Notes                        from "@/classes/Notes.js"
    import Files                        from "@/classes/Files.js"
    import Markdown                     from "@/classes/Markdown.js"
    import Electron                     from "@/classes/Electron.js"
    import Cache                        from "@/classes/Cache.js"
    import Tabs                         from "@/classes/Tabs.js"
    import Clipboard                    from "@/classes/Clipboard.js"
    import PluginManager                from "@/classes/PluginManager.js"
    import Parse                        from "@/classes/Parse.js"

    // UI Elements
        import Notification                 from "@/classes/Notification.js"
        import Dialog                       from "@/classes/Dialog.js"

// functions
    import i18n                         from "@/functions/i18n.js"
    import get_plugin_api               from "@/functions/get_plugin_api.js"
    import irequire                     from "@/functions/require.js"
    import string_to_html               from "@/functions/string_to_html.js"
    import html_to_string               from "@/functions/html_to_string.js"
    import extract_markdown_tags        from "@/functions/extract_markdown_tags.js"

    // Node.js
        const path                       = require("path")

// Utilities
    import Messager                     from "@/classes/Messager.js"

// Constants
    import APP_TEMPLATE                 from "@/constants/APP_TEMPLATE.js"
    import CONFIG_TEMPLATE              from "@/constants/CONFIG_TEMPLATE.js"
    import CORE_PLUGINS                 from "@/constants/CORE_PLUGINS.js"
    import DEFAULT_COMMANDS             from "@/constants/DEFAULT_COMMANDS.js"
    import DEFAULT_THEME                from "@/constants/DEFAULT_THEME.js"
    import DEMO_NOTES                   from "@/constants/DEMO_NOTES.js"
    import PERMISSIONS                  from "@/constants/PERMISSIONS.js"
    import REGULAR_EXPRESSIONS          from "@/constants/REGULAR_EXPRESSIONS.js"
    import SUPPORTED_LANGUAGES          from "@/constants/SUPPORTED_LANGUAGES.js"
    import SVG_TABLE                    from "@/constants/SVG_TABLE.js"

// html
    import component_not_found          from "@/html/component-not-found.html"
    import template                     from "@/html/template.html"
    import top_menu                     from "@/html/top-menu.html"
    import help                         from "@/html/help.html"
    import setup                        from "@/html/setup.html"
    import search                       from "@/html/search.html"
    import marketplace                  from "@/html/marketplace.html"
    import configuration                from "@/html/configuration.html"
    import command_pallet               from "@/html/command-pallet.html"
    import references                   from "@/html/references.html"
    import outline                      from "@/html/outline.html"
    import daily_notes                  from "@/html/daily-notes.html"
    import status_line                  from "@/html/status-line.html"
    import new_tab                      from "@/html/new-tab.html"
    import filesystem                   from "@/html/filesystem.html"
    import file                         from "@/html/file.html"
    import study                        from "@/html/study.html"
    import web                          from "@/html/web.html"
    import directory_manager            from "@/html/directory-manager.html"
    import links                        from "@/html/link.html"
    import pan                          from "@/html/pan.html"

// Frame
const JSFrame = require("@/assets/jsframe.min.js")
    let Frame     = JSFrame.JSFrame


// Entry point for our app, there is only one ilse in the entire app, this is the glue for everything else + components
export default class Ilse {

    constructor() {

        // consts
        this.constants    = {
            APP_TEMPLATE,               // <!DOCTYPE <html> </html> ...

            CONFIG_TEMPLATE,            // { "favorites": [], "dark": false, "active_theme": "", "components": [], "keys": [ <key1>, <key2> ... ]

            CORE_PLUGINS,               // [ "https://raw.githubusercontent.com/ilse-langnar/notebook/dev/marketplace/simple-draw.html" ... ]

            DEFAULT_COMMANDS,           // [ <command1>, <command2> ... ]

            DEFAULT_THEME,              // :root, .ilse[data-theme='light'] { --background-color: ... }

            DEMO_NOTES,                 // [ { content: "# Hello, World", depth: 0, }, { content: "This is ilse Langnar's Notebook", depth: 0, }, ... ]

            template,              // <!DOCTYPE <html> </html> ...

            PERMISSIONS,                // [ "read", "write", "clipboard",  "communication" ]

            REGULAR_EXPRESSIONS,        // { "embed": "/^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/", "link": "/\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/", ... }

            SUPPORTED_LANGUAGES,        // { "en": "English(English)", "zh": "Chinese Simplified(简体中文)", "pt": "Brazillian Portuguese(Português Brasileiro)", "hb": "Hebrew (עברית)" }

            SVG_TABLE,                  // {"address-book.svg": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNs ... "
        }

        this.components             = {
            "top-menu":             top_menu,
            "setup":                setup,
            "help":                 help,
            "search":               search,
            "marketplace":          marketplace,
            "configuration":        configuration,
            "command-pallet":       command_pallet,
            "references":           references,
            "outline":              outline,
            "daily-notes":          daily_notes,
            "status-line":          status_line,
            "new-tab":              new_tab,
            "filesystem":           filesystem,
            "file":                 file,
            "study":                study,
            "web":                  web,
            "directory-manager":    directory_manager,
            "links":                links,
            "pan":                  pan,
            "hello-world":          `<p> Hello, World </p>`,
        }

        this.stack                  = []
        this.tabs                   = new Tabs()

        this.store                  = { ui: {}, status_line: {} }

        this.name                   = "Ilse Langnar's Notebook"
        this.key                    = "ilse-key"
        this.cursor                 = null
        this.keys                   = { daily_notes: "daily-notes-key", home: 0 }
        this.languages              = Object.keys(SUPPORTED_LANGUAGES)

        // booleans
        this.is_zen                 = false
        this.tried_too_fast         = false
        this.is_vitruvian_expanded  = false
        this.is_home_page_on        = false
        this.is_search_on           = false
        this.is_left_sidebar_open   = false
        this.left_sidebar           = ""
        this.is_right_sidebar_open  = false
        this.has_loaded             = false
        this.is_left_menu_on        = true
        this.style                  = ""

        // platform/env
        this.env                    = process.env
        this.platform               = process.env.VUE_APP_TARGET.toLowerCase()

        this.i18n                   = i18n

        // utils?
        this.path                   = path

        this.frame                  = new Frame()

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
            // let quine_dir = window.location.pathname

            // let normalized_quine_dir = quine_dir.split("/").filter( e=>e )
            // if( !normalized_quine_dir.length ) normalized_quine_dir.push("/")
                // normalized_quine_dir.pop()
                // normalized_quine_dir = normalized_quine_dir.join("/")
            // this.target_directories = [ normalized_quine_dir ] // quine
        }

    }

    listen() {

        Messager.on( "~keyboard", key => {
            if( key === "esc" ) this.stack.map( (item, index) => { if( item.is_modal ) this.stack.splice( index, 1 ) })
        })

    }

    setup() {
        this.listen()

        this.last_save_attempt      = 0


        // Utils
            this.utils                  = new Utils()
            this.cache                  = new Cache(this)

        // Filesystem
            this.filesystem             = new Filesystem( this, this.target_directories[0] )
            // this.require                = new IlseRequire(this).require
            this.require                = irequire

        this.config = { // This object is synched with my shit.
            get( key ) {
                printf( "GGGGEEETTTERRR" )
                return this.config[key]
            },
            set( key, value ) {
                printf( "SEEETTTTEEER" )
                this.config[key] = value
                return value
            },
        }

        /*
        this.config = function( name, new_value ) {

            if( arguments.length === 1 ) {

                let config      = ilse.query('#config/' + name )[0].content
                let item        = config.match( /\S*#(?:\[[^\]]+\]|\S+)/ )[0]
                let normalized  = item.split(" ")[0]
                let list        = normalized.split("/")
                let value       = list[list.length -1]

                if( value === "false" ) return false
                if( value === "true" ) return true


                return config

            } else { // setter
                let config      = ilse.query('#config/' + name )[0]
                let content     = config.content
                let item        = content.match( /\S*#(?:\[[^\]]+\]|\S+)/ )[0]
                let normalized  = item.split(" ")[0]
                let list        = normalized.split("/")
                let value       = list[list.length -1]

                ilse.notes.list[config.id].content = ilse.notes.list[config.id].content.replace( value, new_value )

                return { name, value }
            }

        }
        */

        // Clipboard
            this.clipboard              = new Clipboard()

        // links/tags
            this.tags                   = new Tags()
            this.links                  = new Links()

        // UI Elements
            this.notification           = new Notification()
            this.dialog                 = new Dialog()

        // Snippets / Themes
            this.themes                 = new Themes( this )

        // Notes(bullets) / File(file)
            this.notes                  = new Notes( this.filesystem, this )
            this.files                  = new Files( this.filesystem, this )

        this.markdown               = new Markdown()

        this.commands               = new Commands(this)
        this.keyboard               = new KeyboardShortcut(this)

        if( this.env.VUE_APP_TARGET === "ELECTRON" ) this.electron               = new Electron( this ) // Electron only

        this.plugin_manager         = new PluginManager( this )

        this.after_setup()
    }

    render( name, props = {}, functions = {} ) {

        let id               = Math.random().toString()
        let string_props     = JSON.stringify( props )
        let normalized_props = string_props.replaceAll( "\"", "\'" )

        // Idea string to HTML and then I pass  a string as x-data?
        let html             = ilse.components[name]
        let HTML             = string_to_html( html )

        let dom              = HTML.querySelector('[x-data]')
            if( dom ) dom.setAttribute( "x-data", normalized_props )
            if( dom ) dom.setAttribute( "x-init", "Messager.on('behavior', payload => {  })" )

        return html_to_string( HTML )
    }

    async modal( content, options = {} ) {

        let id   = Math.random().toString()

        let item = {
            is_modal: true,
            id: id,
            html: `
            <div id="${id}" style="z-index: 2; position: fixed; left: ${options.left || "50%" }; top: ${options.top || "50%" }; transform: translate( -50%, -50% ); width: ${options.width || "50%" }; height: ${options.height || "50%" }; overflow: ${options.overflow || "hidden" }; color: var( --text-color ); background: var( --background-color ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; " >
                <!-- <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift(); let id = this.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'rejected', { id: id })" :src="window.ilse.require('x.svg');" /> -->
                ${content}
            </div>
            `
        }

        this.stack.push( item )

        return new Promise((resolve, reject) => {

            Messager.on( "~ilse", ( action, payload ) => {

                if( action === "modal-done" && id === payload.id ) {
                    // ilse.htmls.remove( id )
                    ilse.stack.pop()
                    resolve( payload.input)
                } else if ( action === "rejected" && id === payload.id){
                    // ilse.htmls.remove( id )
                    ilse.stack.pop()
                    reject( id )
                } else {
                    reject( id )
                }

            })
        })

    }

    remove( id ) {

        let to_return = null
        let component
        this.stack.map( item => { if( item.id === id ) component = item })

        if( component )  {
            let index  = this.list.indexOf( component )
            if( index !== -1 ) to_return = this.list.splice( index, 1 )
        }

        return to_return

    }

    make_native_components() {

        let to_inject = [

            {
                name: "status-line.html",
                content: require("@/html/status-line.html").default,
            },

            {
                name: "command-pallet.html",
                content: require("@/html/command-pallet.html").default,
            },

            {
                name: "component-not-found.html",
                content: require("@/html/component-not-found.html").default,
            },

            {
                name: "configuration.html",
                content: require("@/html/configuration.html").default,
            },

            {
                name: "daily-notes.html",
                content: require("@/html/daily-notes.html").default,
            },

            // {
                // name: "dialog-input",
                // content: require("@/html/dialog-input.html").default,
            // },

            // {
                // name: "dialog-confirm",
                // content: require("@/html/dialog-confirm.html").default,
            // },

            // {
                // content: require("@/html/dialog-info.html").default,
            // },

            {
                name: "status-bar-links-icon.html",
                content: require("@/html/status-line-links-icon.html").default,
            },
            {
                name: "status-bar-links-content.html",
                content: require("@/html/status-line-links-content.html").default,
            },



            // {
                // name: "status-bar-links-content.html",
                // content: require("@/html/status-bar-links-content.html").default,
            // },

            {
                name: "directory-manager.html",
                content: require("@/html/directory-manager.html").default,
            },

            {
                name: "file.html",
                content: require("@/html/file.html").default,
            },

            {
                name: "filesystem.html",
                content: require("@/html/filesystem.html").default,
            },

            {
                name: "help.html",
                content: require("@/html/help.html").default,
            },

            {
                name: "link.html",
                content: require("@/html/link.html").default,
            },

            {
                name: "marketplace.html",
                content: require("@/html/marketplace.html").default,
            },

            {
                name: "new-tab.html",
                content: require("@/html/new-tab.html").default,
            },

            {
                name: "notification.html",
                content: require("@/html/notification.html").default,
            },

            {
                name: "outline.html",
                content: require("@/html/outline.html").default,
            },

            {
                name: "pan.html",
                content: require("@/html/pan.html").default,
            },

            {
                name: "references.html",
                content: require("@/html/references.html").default,
            },

            {
                name: "search.html",
                content: require("@/html/search.html").default,
            },

            {
                name: "setup.html",
                content: require("@/html/setup.html").default,
            },

            {
                name: "study.html",
                content: require("@/html/study.html").default,
            },

            {
                name: "template.html",
                content: require("@/html/template.html").default,
            },

            {
                name: "top-menu.html",
                content: require("@/html/top-menu.html").default,
            },

            {
                name: "web.html",
                content: require("@/html/web.html").default,
            },

        ]

        let file
        to_inject.map( item => {
            this.filesystem.file.write.sync( item.name, item.content )
        })

    }

    after_setup() {

        //
        this.mode                   = "default"
        this.input                  = "latin"

        this.is_zen                 = false
        // window.ilse                     = get_global_api(this) // Set global API

        window.ilse                     = get_plugin_api( "global", this )

    }

    loaded() {
        this.has_loaded             = true
        Messager.emit( "~ilse", "loaded" )

        // Make
        this.make_native_components()

        // inject config
        let list = [
            "#config/dark/false #hidden",
            "#config/zen-mode/false #hidden",
            "#config/@done #hidden",
            "#/html/status-line/links [[status-bar-links-icon.html]]  [[status-bar-links-content.htlm]] #hidden",
        ]

        let injected = this.notes.query('#config/@done').length

        // let dark = this.config('dark')

        if( !injected ) {

            list.map( item => {
                this.notes.add( item )
            })

        }

        function get( name ) {
            let config      = ilse.query('#config/' + name )[0].content
            let item        = config.match( /\S*#(?:\[[^\]]+\]|\S+)/ )[0]
            let normalized  = item.split(" ")[0]
            let list        = normalized.split("/")
            let value       = list[list.length -1]

            if( value === "false" ) return false
            if( value === "true" ) return true
        }

        function set( name, new_value ) {
            let config      = ilse.query('#config/' + name )[0]
            let content     = config.content
            let item        = content.match( /\S*#(?:\[[^\]]+\]|\S+)/ )[0]
            let normalized  = item.split(" ")[0]
            let list        = normalized.split("/")
            let value       = list[list.length -1]

            ilse.notes.list[config.id].content = ilse.notes.list[config.id].content.replace( value, new_value )

            return { name, value }
        }



        // initial
        printf( "this.config -> ", this.config )
            this.config["dark"] = get( "dark" )
            this.config["zen-mode"]  = get( "zen-mode" )
        printf( "this.config -> ", this.config )

        // window.ilse.Messager.emit( "~ilse", "loaded", this )
        // setTimeout( () => { this.keys.home              = Math.random() }, 1000 )
    }

    async save() {
        let is_attempting_too_fast  = this.last_attempt >= ( Date.now() - 4000 )
            if( is_attempting_too_fast ) return

        this.last_attempt           =  Date.now()

         // this.config.save()
    }

    reload() {
        this.key = Math.random()
    }

    update_key( key ) {
        this.keys[key] = Math.random().toString()
    }

}
