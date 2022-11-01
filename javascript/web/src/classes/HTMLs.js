const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// functions
    import string_to_html               from "@/classes/string_to_html.js"
    import html_to_string               from "@/classes/html_to_string.js"

export default class HTMLs {

    constructor() {
        this.list = []
        this.listen()
    }

    listen() {

        Messager.on( "~keyboard", payload => {

            if( payload.action === "keydown" && payload.key === "esc" ) {

                this.list.map( (item, index) => {
                    if( item.is_modal ) this.list.splice( index, 1 )
                })

            }

        })
    }

    get( id ) {

        let to_return = null

        this.list.map( item => {
            if( item.id === id ) to_return = item
        })

        return to_return
    }

    async modal( content, options = {} ) {

        let id   = Math.random().toString()

        let item = {
            is_modal: true,
            id: id,
            html: `
            <div id="${id}" style="z-index: 2; position: fixed; left: ${options.left || "50%" }; top: ${options.top || "50%" }; transform: translate( -50%, -50% ); width: ${options.width || "50%" }; height: ${options.height || "50%" }; overflow: ${options.overflow || "hidden" }; color: var( --text-color ); background: var( --background-color ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; " >
                <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift(); let id = this.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'rejected', { id: id })" :src="window.ilse.require('x.svg');" />
                ${content}
            </div>
            `
        }

        this.list.push( item )

        return new Promise((resolve, reject) => {

            Messager.on( "~ilse", ( action, payload ) => {

                if( action === "modal-done" && id === payload.id ) {
                    ilse.htmls.remove( id )
                    resolve( payload.input)
                } else if ( action === "rejected" && id === payload.id){
                    ilse.htmls.remove( id )
                    reject( id )
                } else {
                    reject( id )
                }

            })
        })

    }

    test() {
        // this.add( "help", HTML_HELP )
        // printf( "HTML_SEARCH -> ", HTML_SEARCH )
        // this.add( "configuration", HTML_CONFIGURATION )
        // this.add( "marketplace",  HTML_MARKETPLACE )
        // this.add( "command-pallet", HTML_COMMAND_PALLET )
        // printf( "Adding ..." )
        // this.add( "references", HTML_REFERENCES )
    }

    render( name, props = {} ) {

        printf( "render -> ", name )

        let id               = Math.random().toString()
            printf( "id -> ", id )

        let string_props     = JSON.stringify( props )
            printf( "string_props -> ", string_props )

        let normalized_props = string_props.replaceAll( "\"", "'" )
            printf( "normalized_props -> ", normalized_props )

        // Idea string to HTML and then I pass  a string as x-data?
        let html             = ilse.components[name]

        let HTML             = string_to_html( html )
            printf( "HTML -> ", HTML )

        let dom              = HTML.querySelector('[x-data]')
            if( dom ) dom.setAttribute( "x-data", normalized_props )
        return html_to_string( HTML )
    }

    add( id, html ) {
        let obj = { id, html }
        this.list.push( obj )
        return obj
    }

    remove( id ) {
        printf( "remove -> id -> ", id )

        let to_return = null
        let component = this.get( id )

        if( component )  {
            let index  = this.list.indexOf( component )
            if( index !== -1 ) to_return = this.list.splice( index, 1 )
        }

        return to_return

    }

}
