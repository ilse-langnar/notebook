const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Classes
    import PluginAPIFactory             from "@/classes/PluginAPIFactory.js"
    import Plugin                       from "@/classes/Plugin.js"

// Utils
    import Messager                     from "@/classes/Messager.js"


class PluginManager {

    constructor() {

        this.plugin_api = {}
        this.plugins    = []

    }

    get( plugin_name ) {

        let plugins = this.plugins

        for( let plugin of plugins ) {

            if( plugin.name === plugin_name ) return plugin

        }

        return null

    }

    add({ name, index, readme, manifest, options = { is_on: false } }) {

        let plugin = new Plugin({ name, index, manifest, readme, options })

        this.plugins.push(plugin)

        return plugin

    }

    async run( plugin ) {

        window.Plugin = new PluginAPIFactory( plugin )

            // let index          = import( target_directory + "/.ilse/plugins/" + plugin + "/main.js" ).then( l => {
        let index          = await ilse.filesystem.file.get( ".ilse/plugins/" + plugin + "/main.js")
        let manifest       = await ilse.filesystem.file.get( ".ilse/plugins/" + plugin + "/manifest.json")
        let readme         = await ilse.filesystem.file.get( ".ilse/plugins/" + plugin + "/readme.md")

        printf( "PluginManager -> plugin -> ", plugin )
        printf( "PluginManager -> readme -> ", readme )

        // BUGFIX: Only parse 'front-end' plugin, ignore the 'back-end' ones.
        if( manifest.type !== 'front-end' ) return

        let parsed_code = eval( index )

        this.add({
            name: plugin,
            readme: readme,
            index: index,
            manifest: manifest,
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
            plugins    = await ilse.filesystem.dir.list( `.ilse/plugins/` )
            if( plugins.code ) plugins = []
        } catch( e ) {
            Messager.emit( "status-line", "set", "No plugins found" )
            plugins    = []
        }

        for( let plugin of plugins ) {

            let files = await ilse.filesystem.dir.list( `.ilse/plugins/${plugin}` )

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
