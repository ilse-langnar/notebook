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
        this.can_save  = false
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
        // let instance

        if( !config.permissions ) config.permissions = {}
        if( !config.apps || config.apps.indexOf("ilse.html") === -1 ) config.apps = [ "ilse.html" ]

        config.components = config.components.filter(e=>e)

        let type
        config.components.map( component => {

            if( component && component.id ) {
                type = ilse.types.get( component.id )
                if( type ) ilse.components.push( type )
            }
        })

        let has_components  = ilse.components.length

        if( !has_components ) {

            let daily_notes    = ilse.types.get( "daily-notes" )
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

        this.can_save = true

        this.after_load()
    }


    get_theme_tone() {
        ilse.theme_tone = this.dark ? "dark" : "light"
    }

    after_load() {
        this.get_theme_tone()
    }

    get_normalized_config() {

        let components      = ilse.components

        // let object_to_save  = {}
        let object_to_save  = this
            object_to_save.components = components.map( component =>
                {
                    // printf( ">>>@>@@>@>@>@>@>@>@>@ component -> ", component )
                })
            object_to_save.dark       = this.dark
            object_to_save.keys       = ilse.keyboard.keys

        let props_to_save = Object.keys(this)
            props_to_save.can_save = null //

        props_to_save.map( key => {
            object_to_save[key] = this[key]
        })

        return JSON.stringify(object_to_save, null, 4)
    }

    // Saves the config to filesystem
    async save( save_notes = false ) {

        if( !this.can_save ) return

        // let components      = ilse.components

        // let object_to_save  = {}
        // let object_to_save  = this
            // object_to_save.components = components
            // object_to_save.dark       = this.dark
            // object_to_save.keys       = ilse.keyboard.keys

        let object_to_save = this.get_normalized_config()
        // let object_to_save = JSON.stringify( this, null, 4 )

        // await ilse.filesystem.file.write.async( "config.json", JSON.stringify( object_to_save, null, 4 ) )
        await ilse.filesystem.file.write.async( "config.json", object_to_save )

        if( save_notes ) ilse.notes.save()
    }

    listen() {

        Messager.on( "~ilse", (action , payload) => {

            if( action === "loaded" ) {
                this.load( payload )
            }

        })

    }

}
