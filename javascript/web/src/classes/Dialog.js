const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Dialog {

    constructor() {
        this.list = []
        this.setup()
    }

    setup() {
    }

    _done( payload, resolve, reject ) {

        let is_ok       = payload.button === "ok"
            if( is_ok ) resolve( payload )

        let is_cancel   = payload.button === "cancel"
            if( is_cancel ) reject( payload )
    }

    // Show the "info" dialog. returns a promised that is resolved when the user cliks on "cancel", "ok" or "cancel"(background-click)
    info( title = "Title", description = "Description" ) {

        let info = {
            title,
            type: "info",
            description,
            id: Math.random().toString().replace( ".", "" ),
        }

        this.list.push( info )

        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {

                let is_done = action === "done"
                let is_id_ok= payload.id === info.id

                if( is_done && is_id_ok ) {
                    this._done( payload, resolve, reject )
                }

            })
        })
    }

    // Show the "confirm" dialog. returns a promised that is resolved when the user cliks on "cancel", "confirm" or "cancel"(background-click)
    async confirm( title = "Title", description = "Description" ) {

        let confirm = {
            title,
            type: "confirm",
            description,
            id: Math.random().toString().replace( ".", "" ),
        }

        this.list.push( confirm )

        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {

                let is_done = action === "done"
                let is_id_ok= payload.id === confirm.id

                if( is_done && is_id_ok ) {
                    this._done( payload, resolve, reject )
                }

            })
        })
    }

    async input( title = "Title", description = "Description" ) {

        let input = {
            title,
            type: "input",
            description,
            id: Math.random().toString().replace( ".", "" ),
        }

        this.list.push( input )

        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {

                let is_done   = action     === "done"
                let is_id_ok  = payload.id === input.id

                if( is_done && is_id_ok ) {
                    this._done( payload, resolve, reject )
                }

            })
        })
    }

    listing( title = "Title", description = "Description", list = [ ], fn ) {

        if( !fn ) throw new Error( "ERROR: Dialog.js -> listeing -> fn is not defined ilse.dialog.listing('title', 'description', [], function(){} )" )

        let input = {
            title,
            type: "list",
            description,
            id: Math.random().toString().replace( ".", "" ),
            list,
        }

        this.list.push( input )

        // Magic
        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {

                let is_done   = action     === "done"
                let is_id_ok  = payload.id === input.id

                if( is_done && is_id_ok ) {
                    fn( payload.item )
                    this._done( payload, resolve, reject )
                }

            })
        })
    }

    close( id ) {

        let list = this.list
        let match


        list.map( (item, index) => {
            match = id === item.id
                if( !match ) return
            this.list.splice( index, 1 )
        })

        /*
        let index
        for( const [index, item] of list ) {
            index++

            match = id === item.id
                if( !match ) continue
            this.list.splice( index, 1 )

        }
        */

    }


}
