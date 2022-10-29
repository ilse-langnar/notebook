const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// HTMLs
    import HTML_HELP                    from "@/classes/HTML_HELP.js"
    import HTML_SEARCH                  from "@/classes/HTML_SEARCH.js"
    import HTML_CONFIGURATION           from "@/classes/HTML_CONFIGURATION.js"
    import HTML_MARKETPLACE             from "@/classes/HTML_MARKETPLACE.js"
    import HTML_COMMAND_PALLET          from "@/classes/HTML_COMMAND_PALLET.js"
    import HTML_REFERENCES              from "@/classes/HTML_REFERENCES.js"

export default class HTMLs {

    constructor() {
        this.list = []
    }

    get( id ) {

        let to_return = null

        this.list.map( item => {
            if( item.id === id ) to_return = item
        })

        return to_return
    }

    modal( id, content, options = { left: "50%", top: "%50%", width: "30%", height: "25%", overflow: "hidden" }) {
        printf( "1" )

        let item = {
            id: id,
            html: `
            <div id="${id}" style="z-index: 2; position: fixed; left: 50%; top: 50%; transform: translate( -50%, -50% ); width: 50%; height: 50%; overflow: hidden; color: var( --text-color ); background: var( --background-color ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; " >
                <img class="is-pulled-right" style="width: 20px; cursor: pointer;" onclick="ilse.htmls.list.shift(); let id = this.parentNode.parentNode.id; window.ilse.Messager.emit('~dialog.vue', 'rejected', { id: id })" :src="window.ilse.require('x.svg');" />
                ${content}
            </div>
            `
        }
        printf( "2" )

        this.list.push( item )

        printf( "3" )

        return item
    }

    test() {
        // this.add( "help", HTML_HELP )
        // printf( "HTML_SEARCH -> ", HTML_SEARCH )
        // this.add( "configuration", HTML_CONFIGURATION )
        // this.add( "marketplace",  HTML_MARKETPLACE )
        // this.add( "command-pallet", HTML_COMMAND_PALLET )
        printf( "Adding ..." )
        this.add( "references", HTML_REFERENCES )
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
