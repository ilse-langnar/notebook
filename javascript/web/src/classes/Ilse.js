const printf                        = console.log

// Classes
    import KeyboardShortcut             from "@/classes/KeyboardShortcut.js"
    import Config                       from "@/classes/Config.js"
    import Utils                        from "@/classes/Utils.js"
    import Commands                     from "@/classes/Commands.js"
    import Graph                        from "@/classes/Graph.js"
    import Types                        from "@/classes/Types.js"
    import Tags                         from "@/classes/Tags.js"
    import Links                        from "@/classes/Links.js"
    import Themes                       from "@/classes/Themes.js"
    import Filesystem                   from "@/classes/Filesystem.js"
    import Notes                        from "@/classes/Notes.js"
    import Files                        from "@/classes/Files.js"
    import Markdown                     from "@/classes/Markdown.js"
    import Electron                     from "@/classes/Electron.js"
    import Priorities                   from "@/classes/Priorities.js"
    import Statistics                   from "@/classes/Statistics.js"
    import PanSVG                       from "@/classes/PanSVG.js"
    import Cache                        from "@/classes/Cache.js"

    // UI Elements
        import Menu                         from "@/classes/Menu.js"
        import Options                      from "@/classes/Options.js"
        import Modals                       from "@/classes/Modals.js"
        import Notification                 from "@/classes/Notification.js"
        import Dialog                       from "@/classes/Dialog.js"

    // Brains
        import FirstBrain                   from "@/classes/FirstBrain.js"
        // import SecondBrain                   from "@/classes/SecondBrain.js"

    import Clipboard                    from "@/classes/Clipboard.js"
    // import CommandPrompt                from "@/classes/CommandPrompt.js"
    import PluginManager                from "@/classes/PluginManager.js"
    // import PluginMenu                   from "@/classes/PluginMenu.js"

    // Component
        import Component                from "@/classes/Component.js"
        import Note                     from "@/classes/Note.js"

    // Node.js
        const path                       = require("path")

// Utilities
    import Messager                     from "@/classes/Messager.js"

// Entry point for our app, there is only one ilse in the entire app, this is the glue for everything else + components
export default class Ilse {

    constructor() {

        this.components             = []
        this.env                    = process.env
        this.name                   = "Ilse Langnar's Notebook"
        this.key                    = "ilse-key"
        this.keys                   = { daily_notes: "daily-notes-key" }
        this.ISO_language_name      = {
            "en": "English(English)",
            "zh": "Chinese Simplified(简体中文)",
            "pt": "Brazillian Portuguese(Português Brasileiro)",
            "es": "Spanish(Español)",
            "kr": "Korean(한국어)",
            "jp": "japanese(日本人)",
            "nl": "Dutch(Nederlands)",
            "hb": "Hebrew (עברית)",
            "fr": "French (français)",
            "it": "Italian (italiano)",
            "gt": "Greek (Ελληνικά)",
            "ar": "Arabic (عربى)",
            "ru": "Russian (русский)",
            "po": "Polish (Polskie)",
            "de": "German(Deutsche)",
        }
        this.languages              = Object.keys(this.ISO_language_name)


        this.tried_too_fast         = false
        this.is_vitruvian_expanded  = false
        this.is_home_page_on        = false
        this.style                  = ""

        this.platform               = process.env.VUE_APP_TARGET.toLowerCase()

        this.classes                = { Component, Note, PanSVG }
        this.path                   = path

        this.has_loaded             = false

        // Init
            this.setup()
    }

    before_setup() {

        this.target_directories     = []
        let list        = window.localStorage.getItem( "target-directories" )

        let bugfix_is_string = typeof list === "string"
            if( bugfix_is_string ) list = JSON.parse( list )

        let bugfix_list_has_items = list && list.length
            if( bugfix_list_has_items ) this.target_directories     = list

        // === DEMO === //
        if( this.platform === "demo" ) this.target_directories = [ "/" ]

    }

    setup() {

        this.before_setup()
        // this.set_watch()

        this.last_save_attempt      = 0

        // Utils
            this.utils                  = new Utils()
            this.cache                  = new Cache()

        // Filesystem
            this.filesystem             = new Filesystem( this, this.target_directories[0] )

        // Config
            this.config                 = new Config()

        // Clipboard
            this.clipboard              = new Clipboard()

        // Components
            this.types                  = new Types()

        // links/tags
            this.tags                   = new Tags()
            this.links                  = new Links()

        // UI Elements
            this.modals                 = new Modals()
            this.notification           = new Notification()
            this.dialog                 = new Dialog()
            this.menu                   = new Menu()
            this.options                = new Options()

        // Snippets / Themes
            this.themes                 = new Themes( this )

        // Notes(bullets) / File(file)
            this.notes                  = new Notes( this.filesystem, this )
            this.files                  = new Files( this.filesystem, this )

        // Brains
            this.brains                 = {}
            this.brains.first           = new FirstBrain( this )
                this.brains.first.statistics= new Statistics( this )
                this.brains.first.priorities= new Priorities( this )
                // this.brains.first.queue     = new Queue( this )
            // this.brains.second          = new SecondBrain( this )

        this.markdown               = new Markdown()

        this.commands               = new Commands()
        this.graph                  = new Graph()
        this.keyboard               = new KeyboardShortcut(this)

        // === Electron.js === //
        if( this.platform === "electron" ) this.electron               = new Electron( this )

        // this.command_prompt         = new CommandPrompt()
        // this.plugin_menu            = new PluginMenu()

        // this.plugin_manager         = new PluginManager( this )

        this.after_setup()
    }

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

    after_setup() {
        this.loaded()
        // this.auto_save()
        this.create_daily_page()
    }

    loaded() {
        this.has_loaded             = true
        Messager.emit( "~ilse", "loaded", this )
    }

    async save() {

        let is_attempting_too_fast  = this.last_attempt >= ( Date.now() - 4000 )
            if( is_attempting_too_fast ) return

        this.last_attempt           =  Date.now()

         this.config.save()
    }

    // FEATURE: every day we'll create a file named: "17th Set, 2022.md"
    async create_daily_page() {

        let today           = this.utils.get_daily_note_format() + ".md"// Jan 10th , 2020
        let exists          = await this.filesystem.file.exists( path.join("second" , today) )
        let has_today_file  = !!exists

        if( !has_today_file ) {
            await this.filesystem.file.set( path.join("second" , today), today )
        }

    }

    reload() {
        this.key = Math.random()
    }

    update_key( key ) {
        this.keys[key] = Math.random().toString()
    }

    set_watch() {

        // object.watch
        if (!Object.prototype.watch) {
            Object.defineProperty(Object.prototype, "watch", {
                  enumerable: false
                , configurable: true
                , writable: false
                , value: function (prop, handler) {
                    var
                      oldval = this[prop]
                    , newval = oldval
                    , getter = function () {
                        return newval;
                    }
                    , setter = function (val) {
                        oldval = newval;
                        return newval = handler.call(this, prop, oldval, val);
                    }
                    ;

                    if (delete this[prop]) { // can't watch constants
                        Object.defineProperty(this, prop, {
                              get: getter
                            , set: setter
                            , enumerable: true
                            , configurable: true
                        });
                    }
                }
            });
        }

        // object.unwatch
        if (!Object.prototype.unwatch) {
            Object.defineProperty(Object.prototype, "unwatch", {
                  enumerable: false
                , configurable: true
                , writable: false
                , value: function (prop) {
                    var val = this[prop];
                    delete this[prop]; // remove accessors
                    this[prop] = val;
                }
            });
        }
    }

}
