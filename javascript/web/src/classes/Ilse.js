import printf                   from "@/classes/printf.js"

// Classes
    import KeyboardShortcut             from "@/classes/KeyboardShortcut.js"
    import Config                       from "@/classes/Config.js"
    import Utils                        from "@/classes/Utils.js"
    import Commands                     from "@/classes/Commands.js"
    import Types                        from "@/classes/Types.js"
    import Tags                         from "@/classes/Tags.js"
    import Links                        from "@/classes/Links.js"
    import Themes                       from "@/classes/Themes.js"
    import Filesystem                   from "@/classes/Filesystem.js"
    import Notes                        from "@/classes/Notes.js"
    import Files                        from "@/classes/Files.js"
    import Markdown                     from "@/classes/Markdown.js"
    import Electron                     from "@/classes/Electron.js"
    import Cache                        from "@/classes/Cache.js"
    // import IlseRequire                  from "@/classes/IlseRequire.js"
    import irequire                     from "@/classes/require.js"

    import Clipboard                    from "@/classes/Clipboard.js"
    import PluginManager                from "@/classes/PluginManager.js"

    // UI Elements
        import Menu                         from "@/classes/Menu.js"
        import Modals                       from "@/classes/Modals.js"
        import Notification                 from "@/classes/Notification.js"
        import Dialog                       from "@/classes/Dialog.js"


    // functions
        import i18n                              from "@/classes/i18n.js"
        import get_plugin_api                    from "@/classes/get_plugin_api.js"
        import string_to_html                    from "@/classes/string_to_html.js"

    // Node.js
        const path                       = require("path")

// Utilities
    import Messager                     from "@/classes/Messager.js"

// Constants
    import APP_TEMPLATE                 from "@/classes/APP_TEMPLATE.js"
    import CONFIG_TEMPLATE              from "@/classes/CONFIG_TEMPLATE.js"
    import CORE_PLUGINS                 from "@/classes/CORE_PLUGINS.js"
    import DEFAULT_COMMANDS             from "@/classes/DEFAULT_COMMANDS.js"
    import DEFAULT_THEME                from "@/classes/DEFAULT_THEME.js"
    import DEMO_NOTES                   from "@/classes/DEMO_NOTES.js"
    import HTML_COMPONENT_NOT_FOUND     from "@/classes/HTML_COMPONENT_NOT_FOUND.js"
    import HTML_TEMPLATE                from "@/classes/HTML_TEMPLATE.js"
    import PERMISSIONS                  from "@/classes/PERMISSIONS.js"
    import REGULAR_EXPRESSIONS          from "@/classes/REGULAR_EXPRESSIONS.js"
    import SUPPORTED_LANGUAGES          from "@/classes/SUPPORTED_LANGUAGES.js"
    import SVG_TABLE                    from "@/classes/SVG_TABLE.js"

    import HTML_TOP_MENU                from "@/classes/HTML_TOP_MENU.js"
    import HTML_HELP                    from "@/classes/HTML_HELP.js"

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

            HTML_COMPONENT_NOT_FOUND,   // <div id="not-found"> <p> Component Not Found</p> </div> ...

            HTML_TEMPLATE,              // <!DOCTYPE <html> </html> ...

            HTML_TOP_MENU,              // <div id="top-menu" style="" > </div> ...

            PERMISSIONS,                // [ "read", "write", "clipboard",  "communication" ]

            REGULAR_EXPRESSIONS,        // { "embed": "/^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/", "link": "/\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/", ... }

            SUPPORTED_LANGUAGES,        // { "en": "English(English)", "zh": "Chinese Simplified(简体中文)", "pt": "Brazillian Portuguese(Português Brasileiro)", "hb": "Hebrew (עברית)" }

            SVG_TABLE,                  // {"address-book.svg": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNs ... "
        }

        // this.u_html                 = uHTML
        this.HTMLs                  = [ HTML_TOP_MENU ]

        this.self                   = `
            <top-menu.native> </top-menu.native>
            <body.native> </body.native>
            <status-line.native> </status-line.native>
         `

        // printf( "this.self -> ", this.self )
        // let html = string_to_html( `<!DOCTYPE html> <html> ${this.self} </html>` )
        // printf( "@before -> html - >", html )
        // printf( "@before -> html.getElementsByTagName('top-menu.native')[0] -> ", html.getElementsByTagName('top-menu.native')[0] )
        // html.getElementsByTagName('top-menu.native')[0].innerHTML = HTML_TOP_MENU
        // printf( "after -> html.getElementsByTagName('top-menu.native')[0] -> ", html.getElementsByTagName('top-menu.native')[0] )
        // printf( "after -> html - >", html )
        // <div data-reactive="" > </div> // I can have: loops, one-way, two-way binding etc.

        this.hash          = {
            "top-menu.native":      HTML_TOP_MENU,
            "help":                 `<style>
.help {
}

.item {
    margin-bottom: 20px;
}

.help .question {
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: var( --padding );
    margin-bottom: 10px;
}
</style>

<div id="help" x-data="{ ilse: ilse }" >
    <div style="width: 20%; border: 1px solid #000; " >

        <div @click="window.ilse.store.ui.selected = 'Introduction' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('settings.svg')" /> <p> &nbsp; &nbsp; Introduction </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Plugin' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('address-book.svg')" /> <p> &nbsp; &nbsp; Plugin </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Components' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('tech-box.svg')" /> <p> &nbsp; &nbsp; Components </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Themes' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('palette.svg')" /> <p> &nbsp; &nbsp; Themes </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Keyboard' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('keyboard.svg')" /> <p> &nbsp; &nbsp; Keyboard </p> <div>

        <div @click="window.ilse.store.ui.selected = 'Lore' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('address-book.svg')" /> <div>

        <div @click="window.ilse.store.ui.selected = 'Others' " > <img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" onload="this.src = window.ilse.require('letter-i.svg')" /> <p> &nbsp; &nbsp; Others </p> <div>

    </div>

    <!-- <div class="options" style="width: 80%; float: left;">

        <div x-if="window.ilse.store.ui.selected === 'General' " class="general" >
            <p> Welcome to Ilse Langnart's Notebook, this tool is intended to augment human cognition, by being a reference system, spaced repetition system and thinkin system in itself.  </p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Plugin' " class="general" >
            <p> Plugin <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Components' " class="general" >
            <p> Components <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Themes' " class="general" >
            <p> Themes <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Keyboard' " class="general" >
            <p> Keyboard <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Lore' " class="general" >
            <p> Lore lll <p>
        </div>

        <div x-if="window.ilse.store.ui.selected === 'Others' " class="general" >
            <p> Others <p>
        </div>

    </div> -->

</div> `
            // "body.native":          HTML_BODY,
            // "status-line.native":   HTML_STATUS_LINE,
        }
        // document.getElementsByTagName( "top-menu.native" ).
        // this.list                   = [ "<ilse-top-menu style='display: block;' >", "<ilse-body>", "<ilse src='tabs.html'>", "<ilse-footer>" ] // can be added/removed

        this.components             = []
        this.store                  = {
            ui: { }
        }

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

    get_html( name ) {
        if( name === "top-menu" ) return HTML_TOP_MENU
    }

    before_setup() {

        this.target_directories     = []
        let list        = window.localStorage.getItem( "target-directories" )

        let bugfix_is_string = typeof list === "string"
            if( bugfix_is_string ) list = JSON.parse( list )

        let bugfix_list_has_items = list && list.length
            if( bugfix_list_has_items ) this.target_directories     = list

        // if( this.platform === "quine" ) this.target_directories = [ "/" ] // quine
        if( this.platform === "quine" ) {

            let quine_dir = window.location.pathname

            let normalized_quine_dir = quine_dir.split("/")
                normalized_quine_dir.pop()
                normalized_quine_dir = normalized_quine_dir.join("/")
            this.target_directories = [ normalized_quine_dir ] // quine
        }

    }

    setup() {

        this.last_save_attempt      = 0


        // Utils
            this.utils                  = new Utils()
            this.cache                  = new Cache(this)

        // Filesystem
            this.filesystem             = new Filesystem( this, this.target_directories[0] )
            // this.require                = new IlseRequire(this).require
            this.require                = irequire

        // Config
            this.config                 = new Config()

        // Clipboard
            this.clipboard              = new Clipboard()

        // Components
            this.types                  = new Types( this )

        // links/tags
            this.tags                   = new Tags()
            this.links                  = new Links()

        // UI Elements
            this.modals                 = new Modals()
            this.notification           = new Notification()
            this.dialog                 = new Dialog()
            this.menu                   = new Menu()

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

    /*
    auto_save() {

        let _this       = this
        let one_minute  = 1 * 60 * 1000
        let should_save

        setInterval( () => {

            should_save = true

            this.notification.send( "Saving in 3s ", "Press on 'x' to cancel", {
                on_cancel: function() {
                    should_save = false
                    printf( "on_cancel -> should_save -> ", should_save )
                },
                on_close: function( notification ) {
                    printf( "Ilse.js -> on_close -> notification -> ", notification )
                    if( should_save ) {
                        _this.save()
                        _this.notification.send( "Saved", "Modifications were saved" )
                    }
                }
            })

        }, 10 * 1000  )

    }
    */

    load_daily_notes() {

        let components      = this.components
        let has_daily_notes = false

        components.map( component => {
            if( component.id === "daily-noyes" ) has_daily_notes = true
        })

        if( !has_daily_notes ) {
            let daily_notes = this.types.get( "daily-notes" )
            this.components.push( daily_notes )

        }
    }

    after_setup() {

        //
        this.modes                  = this.config.modes || [ "ilse" ]
        this.input                  = this.config.input || "latin"

        this.loaded()
        this.load_daily_notes()
        this.is_zen                 = this.config.is_zen
        // window.ilse                     = get_global_api(this) // Set global API
        // setTimeout( () => { printf( "before -> window.ilse -> ", window.ilse ) printf( "after -> window.ilse -> ", window.ilse ) }, 2000 )

        window.ilse                     = get_plugin_api( "global", this )

    }

    loaded() {
        this.has_loaded             = true
        Messager.emit( "~ilse", "loaded", this )
    }

    async save() {

        printf( "Save()" )
        let is_attempting_too_fast  = this.last_attempt >= ( Date.now() - 4000 )
            if( is_attempting_too_fast ) return

        this.last_attempt           =  Date.now()

         this.config.save()
    }

    reload() {
        this.key = Math.random()
    }

    update_key( key ) {
        this.keys[key] = Math.random().toString()
    }

}
