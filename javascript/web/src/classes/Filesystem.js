const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Filesystem
    import RESTFilesystem               from "@/classes/RESTFilesystem.js"
    import FSFilesystem                 from "@/classes/FSFilesystem.js"
    import LocalStorageFilesystem       from "@/classes/LocalStorageFilesystem.js"

// Libs
    import axios                         from "axios"
    // import PowershellScript              from "@/classes/PowershellScript.js"
    // import BashShellScript               from "@/classes/BashshellScript.js"

const fs = require('fs')

export default class Filesystem {

    // constructor( type = 'fs' ) {
    constructor( ilse, dir ) {
        this.ilse = ilse

        // window.api.receive("fromMain", (data) => {
            // printf( `Received ${data} from main process` )
        // });

        // window.api.send("toMain", "some data" )

        // Different default Filesystem depending on build, fs for electron and rest for normal web page
        // let type
        // if( process.env.VUE_APP_TARGET === "WEB" ) {
            // type  = 'rest'
        // } else {
            // type  = 'fs'
            // printf( "L>>>>>>>>>>>>>>>>>>>>>> window.require -> ", window.require )
        // }

        this.has_checked_zir_files = false

        if( process.env.VUE_APP_TARGET === "ELECTRON" ) {

            let new_filesystem  = new FSFilesystem( dir )
                this.file = new_filesystem.file
                this.dir  = new_filesystem.dir

        }

        if( process.env.VUE_APP_TARGET === "WEB" ) {

            let new_filesystem  = new RESTFilesystem()
                this.file = new_filesystem.file
                this.dir  = new_filesystem.dir

        }

        if( process.env.VUE_APP_TARGET === "DEMO" ) {

            this.filesystem  = new LocalStorageFilesystem()
                this.file    = this.filesystem.file
                this.dir     = this.filesystem.dir

        }

        this.has_ilse_dir   = false
        this.setup()
    }

    setup() {
        this.loaded()
        this.create_default_zir_files()
    }

    async create_default_zir_files() {
        if( !this.ilse.target_directories[0] ) return

        let time_id         = this.ilse.utils.get_unique_date_id() // 20220120155758
        let note            = `${time_id}: "Hello, World"` // 20220120155758: Hello, World

        let has_notes       = await this.file.exists( "notes" )
            if( !has_notes ) await this.file.set( "notes", note )

        let has_queue       = await this.file.exists( "queue" )
            if( !has_queue ) await this.file.set( "queue", "" )

        let has_statistics  = await this.file.exists( "statistics" )
            if( !has_statistics ) await this.file.set( "statistics", "" )

        let has_priorities  = await this.file.exists( "priorities" )
            if( !has_priorities ) await this.file.set( "priorities", "" )

        let has_first       = await this.dir.exists( "first" )
            if( !has_first ) await this.dir.create( "first" )

        let has_second      = await this.dir.exists( "second" )
            if( !has_second ) await this.dir.create( "second" )

        let has_trash       = await this.dir.exists(".trash")
            if( !has_trash ) await this.dir.create( ".trash" )

        let has_plugins     = await this.dir.exists("plugins")
            if( !has_plugins ) await this.dir.create( "plugins" )

        // this.create_default_script()

        this.has_checked_zir_files = true
        // Messager.emit( "~filesystem", "zir-files-check" )
    }

    /*
    async create_default_script() {

        let is_windows  = ilse.platform === "windows"
        let is_linux    = ilse.platform === "linux"
        let is_macos    = ilse.platform === "macOS"

        let target_dir              = ilse.target_directories[0]

        if( is_windows ) {
            // let has_script     = await this.file.exists( "script.ps1" )
                // if( !has_script ) await this.file.set( "script.ps1", new PowershellScript( target_dir ) )
        }

        if( is_linux ) {
            // let has_script     = await this.file.exists( "script.sh" )
                // if( !has_script ) await this.file.set( "script.sh", new BashshellScript( target_dir ) )
        }

        if( is_macos ) {
            // let has_script     = await this.file.exists( "script.sh" )
                // if( !has_script ) await this.file.set( "script.sh", new BashshellScript( target_dir ) )
        }

    }
    */

    loaded() {
        Messager.emit( "~filesystem", "loaded", this )
    }

    /*
    async on_ilse_loaded( ilse ) {


        let target_directory            = ilse.data.volatile.get( 'target-directory' )
        printf( "target_directory -> ", target_directory )

        let has_zettelkasten_directory  =  target_directory
        printf( "has_zettelkasten_directory -> ", has_zettelkasten_directory )
            if( !has_zettelkasten_directory ) return

        ilse.update_key()

        let backend_url                    = `http://localhost:8090`
            ilse.target_directory           = target_directory

        // initiate Server
        await axios.get( backend_url + `/initialize/?dir=${target_directory}` )

        printf( "backend_url -> ", backend_url )
        Messager.emit( "~filesystem", "ok", {
            target_directory: target_directory,
            backend_url: backend_url
        })

    }

    listen() {

        Messager.on( "~ilse", async ( action, payload ) => {

            if( action === 'loaded' ) {
                this.on_ilse_loaded( payload )
            }

        })

    }
    */

    listen() {

        Messager.on( "~ilse", async ( action, payload ) => {

        })

    }
}

