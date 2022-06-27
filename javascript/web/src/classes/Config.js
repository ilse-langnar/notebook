const printf                            = console.log

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

const DEFAULT_CONFIG = {
    components: [
        /*
        {
            id: "8043416467068678",
            width: 0,
            is_on: true,
            type: "menu",
            props: {}
        },
        */

        {
            id: "16598606038384878",
            width: 8,
            is_on: true,
            type: "daily-notes",
            props: {}
        }
    ]
}
export default class Config {

    constructor( filesystem ) {

        this.favorites = []
        this.dark      = false
        // this.filesystem = filesystem

        this.setup()
    }

    setup() {
        this.listen()
    }

    async load( ilse ) {

        let config

        try {
            config = await ilse.filesystem.file.get( "config.json" )
        } catch( e ) {
            await ilse.filesystem.file.set( "config.json", JSON.stringify(DEFAULT_CONFIG) )
            this.load( ilse )
        }

        if( typeof config === "string" ) config = JSON.parse( config )
            if( !config ) return

        // ==== Load Components ==== //
        let instance

        for( const component of config.components ) {
            instance    = new ilse.classes.Component( component )
                ilse.components.push( instance )
        }

        let has_components = ilse.components.length

        if( !has_components ) {
            let menu    = new ilse.classes.Component({ type: "menu", width: 0 })
                ilse.components.push( menu )

            let daily_notes    = new ilse.classes.Component({ type: "daily-notes", width: 12 })
                ilse.components.push( daily_notes )
        }
        // ==== Load Components ==== //

        // ==== Load Favorites ==== //
        this.favorites = config.favorites
            if( !this.favorites ) this.favorites = []
        // ==== Load Favorites ==== //


        // ==== Load Favorites ==== //
        for( const key of Object.keys(config) ) {
            if( key === "components" ) continue
            this[key] = config[key]
        }
        // ==== Load Favorites ==== //


        // ==== Load Keys ==== //
        ilse.keyboard.keys = config.keys
        // ==== Load Keys ==== //




        // config.components.map( component => {
            // instance    = new ilse.classes.Component( component )
                // ilse.components.push( instance )
        // })

        // ilse.notification.send( "Loading", "Loading Config" )

    }

    // Saves the config to filesystem
    async save() {


        let components      = ilse.components
        printf( "ilse.components -> ", ilse.components )

        // let object_to_save  = {}
        let object_to_save  = this
            object_to_save.components = components
            object_to_save.dark       = this.dark
            object_to_save.keys       = ilse.keyboard.keys


        await ilse.filesystem.file.set( "config.json", JSON.stringify( object_to_save, null, 4 ) )

        this.after_save()
    }

    after_save() {
        ilse.notes.save()
    }

    listen() {

        Messager.on( "~ilse", (action , payload) => {

            if( action === "loaded" ) {
                this.load( payload )
            }

        })

    }

}
