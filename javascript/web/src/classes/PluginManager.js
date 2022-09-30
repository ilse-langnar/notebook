const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Classes
    import PluginAPIFactory             from "@/classes/PluginAPIFactory.js"
    import Plugin                       from "@/classes/Plugin.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

// functions
    import string_to_html               from "@/classes/string_to_html.js"
    import create_window                from "@/classes/create_window.js"
    import html_to_string               from "@/classes/html_to_string.js"

class PluginManager {

    constructor( ilse ) {

        this.plugin_api = {}
        this.plugins    = []
        this.ilse       = ilse
        this.setup()
    }

    setup() {
        setTimeout( () => { this.load() }, 1000 )
    }

    async import_from_url( url, name = Math.random().toString() ) {

        // let response = await fetch( url )
        // printf( "response -> ", response )

        // var s   = document.createElement("script");
            // s.src   = url
            // s.id    = name;
            // // s.async = true;
            // s.type  = "text/javascript";

        // document.getElementsByTagName("head")[0].appendChild(s)
    }

    /*
    load() {
        let result = this.ilse.notes.query(`#i/plugin`)

        result.map( item => {
            this.run( item )
        })

    }
    */

    load() {
        // let list = ilse.filesystem.dir.list.sync( "plugins" )
        let list = ilse.filesystem.dir.list.sync( "/" )
        let HTMLs     = list.filter( item => item.indexOf(".html") !== -1 ) // needs to have .html

        HTMLs.map( plugin => { this.run( plugin ) })

    }

    async run( name ) {
        printf( "run -> name -> ", name )
        let file    = await ilse.filesystem.file.read.async( name  )
        let HTML    = string_to_html( file )

        let styles  = [...HTML.querySelectorAll( "style" )]
        // styles.map( style => { printf( "style.innerHTML -> ", style.innerHTML ) })

        let scripts = [...HTML.querySelectorAll( "script.ilse" )]

        scripts.map( script => {
            window.ilse = {
                Messager: Messager,

                components: {
                    create_window: create_window,
                },

                notify: ilse.notification.send.bind( ilse.notification ),

                keyboard: {
                    add: ilse.keyboard.add.bind( ilse.keyboard )
                },

                commands: {
                    add: ilse.commands.add_for_plugin.bind( ilse.commands )
                },

                load: function() {
                    let file    = ilse.filesystem.file.read.sync( name )
                    let HTML    = string_to_html( file )
                    let data    = HTML.getElementById( "data" ) ? HTML.getElementById( "data" ).innerText : {}
                    return JSON.parse(data)
                },

                dialog: {
                    info:    ilse.dialog.info.bind( ilse.dialog ),
                    confirm: ilse.dialog.confirm.bind( ilse.dialog ),
                    input:   ilse.dialog.input.bind( ilse.dialog ),
                    listing: ilse.dialog.listing.bind( ilse.dialog ),
                    close:   ilse.dialog.close.bind( ilse.dialog ),
                },

                save: function( json ) {

                    let string          = JSON.stringify( json )
                    let file            = ilse.filesystem.file.read.sync( name )

                    let HTML            = string_to_html( file ) // mount DOM from string
                        HTML.getElementById( "data" ).innerText = string // Change it

                    let updated_html    = html_to_string( HTML ) // return to string(Changed)

                    ilse.filesystem.file.write.sync( name , updated_html ) // Write

                    return json
                }

            }

            eval( script.innerHTML )
        })

        // setInterval( () => { Messager.emit( "plugin", { number: Math.random() } ) }, 2000 )

    }

    /*
    run( note ) {

        // let result = this.ilse.notes.query(`#i/plugin`)
        // let note   = result[0]
        let js      = ""

        note.children.map( _note => {
            js += _note.content + ";"
        })

        // window.ilse = new PluginAPIFactory( Math.random().toString().replace("0.", "") )
        window.ilse = {
            graph:  ilse.graph,
            tags: ilse.tags.tags,
            notification: ilse.notification,
            components: ilse.components,
            keyboard: {
                add: ilse.keyboard.add.bind(ilse.keyboard)
            },
            commands: {
                add: ilse.commands.add_for_plugin.bind(ilse.commands)
            },
            links: ilse.links.links,
            classes: ilse.classes,
            utils: ilse.utils,
            types: ilse.types,
        } // ilse

        eval( js )

    }
    */

    /*
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
    */

    /*
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
    */

    // Makes sure no global user has acces to other plugin scoped, only when they're created
    /*
    reset_global_plugin_api() {
        // window.Plugin = new PluginAPIFactory()
    }
    */

    /*
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
    */


}

export default PluginManager
