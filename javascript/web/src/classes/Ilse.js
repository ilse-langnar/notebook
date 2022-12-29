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
    import Notification                 from "@/classes/Notification.js"
    import Dialog                       from "@/classes/Dialog.js"

// functions
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
    import CONSTANTS                    from "@/constants/index.js"


// html
    import component_html          from "@/html/components.html"

// Frame
const Frame = require("@/assets/jsframe.min.js").JSFrame

// Entry point for our app, there is only one ilse in the entire app, this is the glue for everything else + components
export default class Ilse {

    constructor() {

        this.constants              = CONSTANTS;
        this.components             = this.get_components( component_html )
        this.stack                  = []
<<<<<<< HEAD
=======
        this.tabs                   = new Tabs(this)
>>>>>>> experimental-all-in-bullets


        this.name                   = "Ilse Langnar's Notebook"
        this.key                    = "ilse-key"
        this.cursor                 = null
        this.keys                   = { daily_notes: "daily-notes-key", home: 0 }
        this.languages              = Object.keys(CONSTANTS.SUPPORTED_LANGUAGES)
        this.has_loaded             = false
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
            this.notification           = new Notification(this)
            this.dialog                 = new Dialog(this)

        // Snippets / Themes
            this.themes                 = new Themes( this )

        // Notes(bullets) / File(file)
            this.notes                  = new Notes( this.filesystem, this )
            this.files                  = new Files( this.filesystem, this )

        this.markdown               = new Markdown()

        this.commands               = new Commands(this)
        this.keyboard               = new KeyboardShortcut(this)


        if( this.env.VUE_APP_TARGET === "ELECTRON" ) this.electron               = new Electron( this ) // Electron only

        this.tabs                   = new Tabs(this)
        this.plugin_manager         = new PluginManager( this )

        this.after_setup()
    }

<<<<<<< HEAD

    render( name, props = {} ) {
=======
    render( name, props = {}, options = { stringify: true } ) {
>>>>>>> experimental-all-in-bullets

        let api             = get_plugin_api( "global", this )
            props.ilse = api
        let id               = Math.random().toString()
<<<<<<< HEAD
=======
            this.store( id, props )

        if( options.stringify ) {
            props                = JSON.stringify( props )
            props                = props.replaceAll( "\"", "\'" )
        }
>>>>>>> experimental-all-in-bullets

        // Idea string to HTML and then I pass  a string as x-data?
        let html             = this.components[name]
        let HTML             = string_to_html( html )
        let dom              = HTML.body.firstChild

        dom.api = {
            require(url) {
                printf( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" )
                return url
            },
            version: "33",
        }

        printf( "dom -> ", dom )
        printf( "HTML -> ", HTML )

        /*
        let parent           = document.createElement( "div" )
            parent.setAttribute( "x-data", `
                {
                    ilse: {
                        require( url ) { let table = ${JSON.stringify(SVG_TABLE)}; return "data:image/svg+xml;base64," + table[url] },
                        tabs: [],
                    },
                }` )

        let root              = HTML.body.firstChild
        parent.append(root)
        HTML.body.firstChild.remove()
        HTML.body.append(parent)
        printf( "HTML -> ", HTML )
        */

        // let dom              = HTML.querySelector('[x-data]')
            // if( dom ) dom.setAttribute( "x-data", `{ ilse: ${api} }` )
            // if( dom ) dom.setAttribute( "x-data", `
                // {
                    // ilse: {
                        // require( url ) { let table = ${JSON.stringify(SVG_TABLE)}; return "data:image/svg+xml;base64," + table[url] },
                        // tabs: [],
                    // },
                // }` )


<<<<<<< HEAD
=======
        let dom              = HTML.querySelector('[x-data]')
            if( dom ) dom.setAttribute( "x-data", `$store[${id}]` )
            // if( dom ) dom.setAttribute( "x-data", props )
            // if( dom ) dom.setAttribute( "x-init", "Messager.on('behavior', payload => {  })" )
>>>>>>> experimental-all-in-bullets

        return html_to_string( HTML )
    }

    async modal( content, options = {} ) {

        let id   = Math.random().toString()

        let item = {
            is_modal: true,
            id: id,
            html: `
            <div id="${id}" style="z-index: 2; position: fixed; left: ${options.left || "50%" }; top: ${options.top || "50%" }; transform: translate( -50%, -50% ); width: ${options.width || "50%" }; height: ${options.height || "50%" }; overflow: ${options.overflow || "hidden" }; color: var( --text-color ); background: var( --background-color ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; " >
<<<<<<< HEAD
                <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift(); let id = this.parentNode.parentNode.id; ilse.Messager.emit('~dialog.vue', 'rejected', { id: id })" :src="ilse.require('x.svg');" />
=======
                <!-- <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift(); let id = this.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'rejected', { id: id })" :src="window.ilse.require('x.svg');" /> -->
>>>>>>> experimental-all-in-bullets
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

<<<<<<< HEAD
        this.is_zen                 = this.config.is_zen
        // ilse                     = get_global_api(this) // Set global API
        // setTimeout( () => { printf( "before -> ilse -> ", ilse ) printf( "after -> ilse -> ", ilse ) }, 2000 )

        // printf( "Ilse.js ----> 1 -> " )
        printf( ">>>>> Ilse.js -> get_plugin_api -> ", get_plugin_api )
        // ilse                     = get_plugin_api( "global", this )
        // printf( "Ilse.js ----> 2 -> ilse -> ", ilse )
=======
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

    get_components( string ) {

        let DOM            = string_to_html( string )
        let html_string
        let list       = CONSTANTS.COMPONENTS
        let components = {}

        list.map( name    => {
            html_string = DOM.getElementById(name).innerHTML
            if( html_string ) components[name] = html_string
        })

        return components
    }

    async load_custom_components() {

        printf( "process.env -> ", process.env )
        printf( "process.env.VUE_APP_TESTING -> ", process.env.VUE_APP_TESTING )

        if( process.env.VUE_APP_TESTING ) return // Don't do anything when testing

        let has_components  = await  this.filesystem.file.exists.async( "components.html" )

        if( has_components ) {
            let text        = await  this.filesystem.file.read.async( "components.html" )
            this.components = this.get_components( text )
        } else {
            await  this.filesystem.file.write.async( "components.html", component_html )
            this.load_custom_components()
        }

    }

    init_alpine_store() {
        this.store( "links", [] )
        this.store( "user", {} )
    }

    init_config() {

        let _this = this

        let note    = ilse.notes.query( "#config" )[0] ?  ilse.notes.query( "#config" )[0].content : `20201211181905-v62p5f86: #config "{ \\"modes\\": [] }" `
        let config  = note_to_config( note )
        let modes   = config.modes

        if( modes ) {

            modes.map( mode => {
                this.mode( mode )
            })

        }

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
        }

    }

    init_global_api() {
        window.ilse                     = get_plugin_api( "global", this )
    }

    // Setup things that needs "ilse.notes" to be readyu
    after_setup() {
        this.init_global_api()
        this.init_alpine_store()
        this.extend_alpine()
        this.load_custom_components()
        this.init_config()
    }

    mode( string ) {

        let index       = ilse.config.modes.indexOf( string )
        let has_already = index !== -1

        let chunks      = string.split("|")
        let name        = chunks[0]
        let svg         = chunks[1]
        let fn          = chunks[2]

        let command     = this.commands.get(fn)

        if( has_already ) {
            command.undo()
            ilse.config.modes.splice( index, 1 )
            this.store( "config", ilse.config, true )
        } else {
            command.fn()
            ilse.config.modes.push( string )
            this.store( "config", ilse.config, true )
        }
>>>>>>> experimental-all-in-bullets

    }

    loaded() {
        printf( "Ilse.js LOADED" )
        this.has_loaded             = true
        Messager.emit( "~ilse", "loaded" )
<<<<<<< HEAD
        // ilse.Messager.emit( "~ilse", "loaded", this )
        // setTimeout( () => { this.keys.home              = Math.random() }, 1000 )
=======
>>>>>>> experimental-all-in-bullets
    }

    async save() {

        if( this.last_attempt >= ( Date.now() - 4000 ) ) return // Return if too fast
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
