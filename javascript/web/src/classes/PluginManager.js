import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

// functions
    import string_to_html               from "@/functions/string_to_html.js"
    import create_window                from "@/functions/create_window.js"
    import html_to_string               from "@/functions/html_to_string.js"
    import has_permission               from "@/functions/has_permission.js"
    import get_plugin_api               from "@/functions/get_plugin_api.js"
    import delay                        from "@/functions/delay.js"

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
        // delay( this.load, null )
    }

    load() {
        // let list = ilse.filesystem.dir.list.sync( "plugins" )
        let list      = ilse.filesystem.dir.list.sync( "/" )
        let HTMLs     = list.filter( item => item.indexOf(".html") !== -1 ) // needs to have .html

        HTMLs.map( plugin => { this.run( plugin ) })
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
            window.ilse = get_plugin_api( name, this.ilse )
            if( script.innerText ) {
                eval( script.innerText )
                this.list.push({name: name, code: script.innerText })
            }
        })

    }
}

export default PluginManager
