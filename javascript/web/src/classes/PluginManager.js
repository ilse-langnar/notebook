const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Classes
    import PluginAPIFactory             from "@/classes/PluginAPIFactory.js"
    import Plugin                       from "@/classes/Plugin.js"

// Utils
    import Messager                     from "@/classes/Messager.js"


class PluginManager {

    constructor( ilse ) {

        this.plugin_api = {}
        this.plugins    = []
        this.ilse       = ilse
        this.setup()
    }

    setup() {
        this.load()
    }

    get( plugin_name ) {

        let plugins = this.plugins

        for( let plugin of plugins ) {

            if( plugin.name === plugin_name ) return plugin

        }

        return null

    }

    add({ name, index, readme, manifest, options = { is_on: false }, icon }) {

        let plugin = new Plugin({ name, index, manifest, readme, options, icon})
            this.plugins.push( plugin )

        return plugin

    }

    before_run( plugin ) {
        window.Plugin      = new PluginAPIFactory( plugin )
    }

    async run( plugin ) {

        this.before_run( plugin )

        let index           = await ilse.filesystem.file.read.async( "plugins/" + plugin + "/main.js")

        let readme          = await ilse.filesystem.file.read.async( "plugins/" + plugin + "/readme.md")

        let manifest        = await ilse.filesystem.file.read.async( "plugins/" + plugin + "/manifest.json")
            manifest           = JSON.parse( manifest )

        let icon            = manifest.icon

        if( icon ) {
            let icon_path   = `plugins/${plugin}/${icon}`
            try {
                let img         = await ilse.filesystem.file.read.async( icon_path )
                var svg     = new Blob([img], { type: "image/svg+xml;charset=utf-8" })
                    icon        = URL.createObjectURL( svg )
            } catch( e ) {
                icon = require( "@/assets/images/letter-i.svg" )
            }

        } else {
            icon = require( "@/assets/images/letter-i.svg" )
        }

        let parsed_code = eval( index )

        let new_plugin = this.add({
            name: plugin,
            readme: readme,
            index: index,
            manifest: manifest,
            icon: icon,
            // options: { statistics: plugin_api.get_plugin_statistics() }
        })

        // BUGFIX
            // this.plugin_api = plugin_api
    }

    // Makes sure no global user has acces to other plugin scoped, only when they're created
    /*
    reset_global_plugin_api() {
        // window.Plugin = new PluginAPIFactory()
    }
    */

    async load() {

        let plugins = []
        try {
            plugins    = await this.ilse.filesystem.dir.list.async( `plugins/` )
            if( plugins.code ) plugins = []
        } catch( e ) {
            Messager.emit( "status-line", "set", "No plugins found" )
            plugins    = []
        }

        for( let plugin of plugins ) {

            let files = await this.ilse.filesystem.dir.list.async( `plugins/${plugin}` )

            // Plugin files
            for( let file of files ) {

                if( file === 'main.js' ) {
                    try {
                        await this.run( plugin )
                    } catch( e ) {
                        throw e
                        // Messager.emit( "status-line", "set", `Plugin ERROR: ${e}` )
                    }
                }

            }

        }

        Messager.emit( "~plugin-manager", "loaded" )

        // this.reset_global_plugin_api()
    }


}

export default PluginManager
