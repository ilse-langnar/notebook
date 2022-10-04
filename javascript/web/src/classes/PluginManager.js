const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

// functions
    import string_to_html               from "@/classes/string_to_html.js"
    import create_window                from "@/classes/create_window.js"
    import html_to_string               from "@/classes/html_to_string.js"
    import has_permission               from "@/classes/has_permission.js"
    import get_plugin_api               from "@/classes/get_plugin_api.js"

class PluginManager {

    constructor( ilse ) {

        this.plugin_api = {}
        this.plugins    = []
        this.list       = []
        this.ilse       = ilse
        this.setup()
    }

    setup() {
        setTimeout( () => { this.load() }, 1000 )
    }

    async import_from_url( url, name = Math.random().toString() ) {
    }

    load() {
        // let list = ilse.filesystem.dir.list.sync( "plugins" )
        let list = ilse.filesystem.dir.list.sync( "/" )
        let HTMLs     = list.filter( item => item.indexOf(".html") !== -1 ) // needs to have .html

        HTMLs.map( plugin => { this.run( plugin ) })

        this.set_global_plugin_api()
    }

    set_global_plugin_api() {
    }

    async run( name ) {
        let file    = await ilse.filesystem.file.read.async( name  )
        let HTML    = string_to_html( file )

        let styles  = [...HTML.querySelectorAll( "style#theme" )]
        styles.map( style => {
            if( style.innerText ) ilse.themes.render( style.innerText, name )
        })

        let scripts = [...HTML.querySelectorAll( "script#plugin" )]

        scripts.map( script => {
            window.ilse = get_plugin_api( name )
            if( script.innerText ) {
                eval( script.innerText )
                this.list.push({name: name, code: script.innerText })
            }
        })

    }
}

export default PluginManager
