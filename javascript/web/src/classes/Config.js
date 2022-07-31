const printf                            = console.log

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

const DEFAULT_CONFIG = {
    components: [
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

        let config = await ilse.filesystem.file.read.async( "config.json" )

        if( !config ) {
            await ilse.filesystem.file.write.async( "config.json", JSON.stringify(DEFAULT_CONFIG, null, 4) )
            this.load( ilse )
            return
        } else {
            config = JSON.parse( config )
        }

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
        // ilse.keyboard.keys = config.keys
        // let keys    = Object.keys( config.keys )
        // let values  = Object.values( config.keys )
        // ==== Load Keys ==== //



        // ==== Internal Components ==== //
        if( !this.data ) this.data = {}
        // ==== Internal Components ==== //

    }

    // Saves the config to filesystem
    async save() {


        let components      = ilse.components

        // let object_to_save  = {}
        let object_to_save  = this
            object_to_save.components = components
            object_to_save.dark       = this.dark
            object_to_save.keys       = ilse.keyboard.keys


        await ilse.filesystem.file.write.async( "config.json", JSON.stringify( object_to_save, null, 4 ) )

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
