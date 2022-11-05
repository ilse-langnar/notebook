import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Filesystem {

    constructor( ilse, dir ) {

        this.ilse = ilse

        this.has_checked_default_files = false

        if( process.env.VUE_APP_TARGET === "ELECTRON" ) {
            const FSFilesystem          = require("@/classes/FSFilesystem.js").default
            let new_filesystem          = new FSFilesystem( dir )
                this.file               = new_filesystem.file
                this.dir                = new_filesystem.dir
                this.target_directory   = dir

        }

        if( process.env.VUE_APP_TARGET === "WEB" ) {
            const RESTFilesystem        = require("@/classes/RESTFilesystem.js").default
            let new_filesystem          = new RESTFilesystem( dir )
                this.file               = new_filesystem.file
                this.dir                = new_filesystem.dir
                this.target_directory   = dir
        }

        /*
        if( process.env.VUE_APP_TARGET === "DEMO" ) {
            const LocalStorageFilesystem = require("@/classes/LocalStorageFilesystem.js").default
            this.filesystem  = new LocalStorageFilesystem( dir )
                this.file    = this.filesystem.file
                this.dir     = this.filesystem.dir

        }
        */

        if( process.env.VUE_APP_TARGET === "QUINE" ) {
            const DOMFilesystem         = require("@/classes/DOMFilesystem.js").default
            this.filesystem             = new DOMFilesystem( dir )
                this.file               = this.filesystem.file
                this.dir                = this.filesystem.dir
                this.target_directory   = dir
        }

        this.setup()
    }

    async setup() {
        // await this.create_default_dirs()
        // await this.create_default_dirs()
        // await this.create_default_plugin_dir()
        // setTimeout( () => { this.test() }, 3000 )
    }

    /*
    async test() {

        if( process.env.VUE_APP_TARGET === "QUINE" ) {
            let result = await this.dir.is.async( "/" )
            let config = await this.file.read.async( "config.json" )
        }

    }
    */

    /*
    async create_default_plugin_dir() {
        let has_plugins       = await this.dir.exists.async("plugins")
        printf( "has_plugins -> ", has_plugins )
            if( !has_plugins ) await this.dir.create.async( "plugins" )
    }
    */

    /*
    async create_default_dirs() {

        // let is_demo_or_quine = process.env.VUE_APP_TARGET === "QUINE"
        if( !this.ilse.target_directories[0] ) return

        let has_notes       = await this.file.exists.async( "notes" )
            if( !has_notes ) {
                let time_id         = get_unique_date_id()
                let note            = `${time_id}: "Hello, World"` // 20220120155758: Hello, World
                await this.file.write.async( "notes", note )
            }

        let has_queue       = await this.file.exists.async( "queue" )
            if( !has_queue ) await this.file.write.async( "queue", "" )

        let has_statistics  = await this.file.exists.async( "statistics" )
            if( !has_statistics ) await this.file.write.async( "statistics", "" )

        let has_priorities  = await this.file.exists.async( "priorities" )
            if( !has_priorities ) await this.file.write.async( "priorities", "" )

        let has_first       = await this.dir.exists.async( "first" )
            if( !has_first ) await this.dir.create.async( "first" )

        let has_second      = await this.dir.exists.async( "second" )
            if( !has_second ) await this.dir.create.async( "second" )

        let has_trash       = await this.dir.exists.async(".trash")
            if( !has_trash ) await this.dir.create.async( ".trash" )

        let has_plugins     = await this.dir.exists.async("plugins")
            if( !has_plugins ) await this.dir.create.async( "plugins" )

        this.has_checked_default_files = true
        // Messager.emit( "~filesystem", "zir-files-check" )
    }
    */

    listen() {

        Messager.on( "~ilse", async ( action, payload ) => {

        })

    }
}

