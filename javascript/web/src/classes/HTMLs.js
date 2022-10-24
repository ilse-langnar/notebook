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
