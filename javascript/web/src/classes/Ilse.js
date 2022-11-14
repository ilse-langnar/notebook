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
    import HTMLs                        from "@/classes/HTMLs.js"
    import PluginManager                from "@/classes/PluginManager.js"

    // UI Elements
        import Notification                 from "@/classes/Notification.js"
        import Dialog                       from "@/classes/Dialog.js"

    // functions
        import i18n                         from "@/functions/i18n.js"
        import get_plugin_api               from "@/functions/get_plugin_api.js"
        import irequire                     from "@/functions/require.js"

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
    import component_not_found          from "@/html/component_not_found.html"
    import template                     from "@/html/template.html"
    import top_menu                     from "@/html/top_menu.html"
    import help                         from "@/html/help.html"
    import setup                        from "@/html/setup.html"
    import search                       from "@/html/search.html"
    import marketplace                  from "@/html/marketplace.html"
    import configuration                from "@/html/configuration.html"
    import command_pallet               from "@/html/command_pallet.html"
    import references                   from "@/html/references.html"
    import outline                      from "@/html/outline.html"
    import daily_notes                  from "@/html/daily_notes.html"
    import status_line                  from "@/html/status_line.html"
    import new_tab                      from "@/html/new_tab.html"
    import filesystem                   from "@/html/filesystem.html"
    import file                         from "@/html/file.html"
    import study                        from "@/html/study.html"
    import web                          from "@/html/web.html"
    import directory_manager            from "@/html/directory_manager.html"
    import links                        from "@/html/link.html"

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
            "hello-world":          `<p> Hello, World </p>`,
        }

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
        if( this.platform === "quine" ) printf( "1 " )

        this.i18n                   = i18n

        // utils?
        this.path                   = path
        if( this.platform === "quine" ) printf( "2 " )

        this.frame                  = new Frame()
        if( this.platform === "quine" ) printf( "3 " )

        // BUGFIX: In my quine I need a time to wait for the DOM to load, otherwise I overwrite since it thinks it does not exists.
        this.before_setup()
        if( this.platform === "quine" ) printf( "4 " )

        if( this.platform === "quine" ) {
            if( this.platform === "quine" ) printf( "5 " )
            setTimeout( () => { this.setup() }, 100 )
        } else {
            if( this.platform === "quine" ) printf( "6 " )
            this.setup();
        }
    }

    get_html( name ) {

        let to_return = null

        this.htmls.map( item => {
            if( item.id === id ) to_return
        })

        return to_return
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
        printf( "bugfix_list_has_items -> ", bugfix_list_has_items )
        printf( "list -> ", list )
        printf( "window.localStorage.getItem('target-directories') -> ", window.localStorage.getItem('target-directories') )
        printf( "this.target_directories -> ", this.target_directories )
            if( bugfix_list_has_items ) this.target_directories     = list

        if( this.platform === "quine" ) { // Autoselects "/"

            this.target_directories = [ "/" ]
            // let quine_dir = window.location.pathname
            // printf( "quine_dir -> ", quine_dir )

            // let normalized_quine_dir = quine_dir.split("/").filter( e=>e )
            // if( !normalized_quine_dir.length ) normalized_quine_dir.push("/")
            // printf( "normalized_quine_dir -> ", normalized_quine_dir )
                // normalized_quine_dir.pop()
                // normalized_quine_dir = normalized_quine_dir.join("/")
            // this.target_directories = [ normalized_quine_dir ] // quine
            // printf( "after -> this.target_directories -> ", this.target_directories )
        }

    }

    setup() {

        this.last_save_attempt      = 0


        // Utils
            this.utils                  = new Utils()
            this.cache                  = new Cache(this)

        // Components
            this.htmls                  = new HTMLs()

        // Filesystem
            this.filesystem             = new Filesystem( this, this.target_directories[0] )
            // this.require                = new IlseRequire(this).require
            this.require                = irequire

        // Config
            this.config                 = new Config()

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

    after_setup() {

        //
        this.mode                   = this.config.modes || "default"
        this.input                  = this.config.input || "latin"

        this.is_zen                 = this.config.is_zen
        // window.ilse                     = get_global_api(this) // Set global API
        // setTimeout( () => { printf( "before -> window.ilse -> ", window.ilse ) printf( "after -> window.ilse -> ", window.ilse ) }, 2000 )

        // printf( "Ilse.js ----> 1 -> " )
        printf( ">>>>> Ilse.js -> get_plugin_api -> ", get_plugin_api )
        window.ilse                     = get_plugin_api( "global", this )
        // printf( "Ilse.js ----> 2 -> window.ilse -> ", window.ilse )

    }

    loaded() {
        this.has_loaded             = true
        Messager.emit( "~ilse", "loaded" )
        // window.ilse.Messager.emit( "~ilse", "loaded", this )
        // setTimeout( () => { this.keys.home              = Math.random() }, 1000 )
    }

    async save() {
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
