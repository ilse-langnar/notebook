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

    // UI Elements
        import Menu                         from "@/classes/Menu.js"
        import Options                      from "@/classes/Options.js"
        import Popovers                     from "@/classes/Popovers.js"
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
        this.tried_too_fast         = false
        this.is_vitruvian_expanded  = false

        this.platform               = process.env.VUE_APP_TARGET.toLowerCase()

        this.classes                = { Component, Note }
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

        this.last_save_attempt      = 0

        // Utils
            this.utils                  = new Utils()

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
            this.popovers               = new Popovers()
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
            // this.brains.second          = new SecondBrain( this )

        this.markdown               = new Markdown()
        this.commands               = new Commands()
        this.graph                  = new Graph()
        this.keyboard               = new KeyboardShortcut(this)

        // === Electron.js === //
        if( this.platform === "electron" ) this.electron               = new Electron( this )

        // this.command_prompt         = new CommandPrompt()
        // this.plugin_menu            = new PluginMenu()

        this.plugin_manager         = new PluginManager( this )

        this.after_setup()
    }

    after_setup() {
        this.loaded()
        this.create_daily_page()
    }

    loaded() {
        this.has_loaded             = true
        Messager.emit( "~ilse", "loaded", this )
    }

    async save( notify ) {

        let is_attempting_too_fast  = this.last_attempt >= ( Date.now() - 4000 )
            if( is_attempting_too_fast ) return

        this.last_attempt           =  Date.now()

        if( notify ) ilse.notification.send( "Saved", "Sucessfully Saved!" )

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

    update_key() {
        this.key = Math.random()
    }

}
