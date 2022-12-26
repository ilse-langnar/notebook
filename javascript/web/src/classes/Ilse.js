import printf                   from "@/functions/printf.js"

// Classes
    import KeyboardShortcut             from "@/classes/KeyboardShortcut.js"
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
    import create_native_components_on_filesystem        from "@/functions/create_native_components_on_filesystem.js"
    import i18n                         from "@/functions/i18n.js"
    import get_plugin_api               from "@/functions/get_plugin_api.js"
    import irequire                     from "@/functions/require.js"
    import string_to_html               from "@/functions/string_to_html.js"
    import html_to_string               from "@/functions/html_to_string.js"
    import extract_markdown_tags        from "@/functions/extract_markdown_tags.js"
    import note_to_config               from "@/functions/note_to_config.js"
    import config_object_to_note        from "@/functions/config_object_to_note.js"

    // Node.js
        const path                       = require("path")
        import Alpine                   from 'alpinejs'

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
        this.is_online              = window.navigator.onLine




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
        }

    }

    listen() {

        window.addEventListener('online', () => {
            this.is_online = true
        })

        window.addEventListener('offline', () => {
            this.is_online = false
        })


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
            this.parse                  = new Parse(this)

        // Filesystem
            this.filesystem             = new Filesystem( this, this.target_directories[0] )
            // this.require                = new IlseRequire(this).require
            this.require                = irequire

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

    render( name, props = {}, options = { stringify: true } ) {

        let id               = Math.random().toString()
            this.store( id, props )

        if( options.stringify ) {
            props                = JSON.stringify( props )
            props                = props.replaceAll( "\"", "\'" )
        }

        // Idea string to HTML and then I pass  a string as x-data?
        let html             = this.components[name]
        let HTML             = string_to_html( html )

        let dom              = HTML.querySelector('[x-data]')
            if( dom ) dom.setAttribute( "x-data", `$store[${id}]` )
            // if( dom ) dom.setAttribute( "x-data", props )
            // if( dom ) dom.setAttribute( "x-init", "Messager.on('behavior', payload => {  })" )

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

    // Question: can I have $store.listeners['store'].on(  ) or somthing?
    store( key, value, reactive ) {

        let len       = arguments.length
        let is_getter = len === 1

        if( is_getter ) {
            let payload = Alpine.store( key )
            return payload

        } else {


            if( reactive ) {

                return Alpine.store( key, {
                    value: value,
                    init() {
                        Alpine.effect( () => {
                            let v = this.value
                            printf( "Ilse.js -> Something changed ilse.store() -> v -> ", v )
                        })

                    }
                })

            } else {
                return Alpine.store( key, value)
            }

        }

    }

    extend_alpine() {

        Alpine.directive('note-id', (el, { expression, modifiers }, { evaluate, evaluateLater, effect  }) => {
            let value = evaluate( expression )
            el.setAttribute( "note-id", value )
        })

        Alpine.directive('watch', (el, { expression, modifiers }, { evaluate, evaluateLater, effect  }) => {

            // let mod           = modifiers[0]
            let parent = ilse.utils.recursively_search_for_dom( el, "x-data" )

            let getThingToLog = evaluateLater(expression)
            evaluate(`${expression} = 'random-string haha'`, {
                scope: { _dom:  parent }
            })

            effect((msg) => {
                getThingToLog( obj => {
                    // $watch( '$store.user', payload => {
                        // user = payload.value
                    // })
                })
            })

        })

        // Alpine.directive('watch', (el, { value, modifiers, expression }, { Alpine, effect, cleanup } ) => {
            // let getThingToLog = effect(expression)
            // effect(() => {
                // effect( () => {
                // })
            // })
            // printf( "@effect -> ", effect )
            // printf( "@cleanup -> ", cleanup )
            // printf( "@Alpine.$watch -> ", Alpine.$watch )
            // printf( "@Alpine.watch -> ", Alpine.watch )
            // printf( "@modifiers -> ", modifiers )

            /*
            Alpine.effect( () => {
                if( expression ) {
                    let o = Alpine.store(`${expression}`)
                    printf( "@ o -> ", o )
                    printf( "@ Ilse.js -> extend_alpine -> " )
                    printf( "@el -> ", el )
                    el.key = Math.random()
                    el.innerText = "<div> <p> Example </p> <div>"
                }

            })
            */

            // el.textContent = Math.random()
        // })

    }

    set_components() {

        let component_html = require("@/html/components.html")
        let DOM            = string_to_html( component_html.default )
        let components =  [ "command-pallet.html", "component-not-found.html", "configuration.html", "daily-notes.html", "dialog-confirm.html", "dialog-info.html", "dialog-input.html", "directory-manager.html", "file.html", "filesystem.html", "help.html", "link.html", "marketplace.html", "modes.html", "new-tab.html", "notification.html", "outline.html", "pan.html", "references.html", "search.html", "setup.html", "status-line-keys-content.html", "status-line-keys-icon.html", "status-line-links-content.html", "status-line-links-icon.html", "status-line.html", "study.html", "template.html", "top-menu.html", "web.html" ]
        let string

        printf( "before -> this.components -> ", this.components )
        components.map( name    => {
            string = DOM.getElementById(name)
            if( string ) this.components[name] = string
        })
        printf( "after -> this.components -> ", this.components )

        /*
        this.components = {
            "top-menu":             top_menu,
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
        */

    }

    // Setup things that needs "ilse.notes" to be readyu
    after_setup() {

        let _this = this

        window.ilse                     = get_plugin_api( "global", this )
        this.store( "links", [], false )
        printf( ">>>>>>>>>>>>>>>>>>>>>>>>>>> this.store('links') -> ", this.store('links') )
        // Alpine.store( "links", [] )

        this.extend_alpine()
        this.set_components()

        // document.addEventListener('alpine:init', () => {
            // Alpine.store("store", {
                // api: get_plugin_api( "global", this ),
                // user: {},
            // })
        // })

        let note    = ilse.notes.query( "#config" )[0] ?  ilse.notes.query( "#config" )[0].content : `20201211181905-v62p5f86: #config "{ \\"modes\\": [] }" `
        let config  = note_to_config( note )
        let modes   = config.modes

        if( modes ) {

            modes.map( mode => {
                this.mode( mode )
            })

        }


        // apply config's
        // keys.map( key => {
            // this[key] = config[key]
        // })


        this.config = { // This object is synched with my shit.

            save() {

                let result             = _this.notes.query( "#config " )[0]
                let has_config_already = !!result

                if( has_config_already ) {
                    result.content = config_object_to_note( config ) + "#hidden"
                } else {
                    _this.notes.add(
                        config_object_to_note( config ) + "#hidden"
                    )
                }

                ilse.notes.save()

            },

            modes: config["modes"],

            // get( key ) {
                // printf( "GGGGEEETTTERRR" )
                // return this.config[key]
            // },
            // set( key, value ) {
                // printf( "SEEETTTTEEER" )
                // this.config[key] = value
                // return value
            // },
        }
        printf( ">>>>>>>>>>>>>>>>>>>>>>>>>> config -> ", config )

        setTimeout( () => {
            printf( "SAVING AAAAAA" )
            printf( "this.config -> ", this.config )
            this.config.save()
        }, 4000 )


    }

    mode( string ) {

        let index       = ilse.config.modes.indexOf( string )
        let has_already = index !== -1

        let chunks      = string.split("|")
        let name        = chunks[0]
        let svg         = chunks[1]
        let fn          = chunks[2]

        let command     = this.commands.get(fn)
        printf( ">>> command -> ", command )

        if( has_already ) {
            command.undo()
            ilse.config.modes.splice( index, 1 )
            this.store( "config", ilse.config, true )
        } else {
            command.fn()
            ilse.config.modes.push( string )
            this.store( "config", ilse.config, true )
        }

    }

    loaded() {
        this.has_loaded             = true
        Messager.emit( "~ilse", "loaded" )

        // Create Native Componenets
        create_native_components_on_filesystem()
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
