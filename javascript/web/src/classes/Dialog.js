import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"
    import info                         from "@/classes/HTML_DIALOG_INFO.js"
    import input                        from "@/classes/HTML_DIALOG_INPUT.js"
    import confirm                      from "@/classes/HTML_DIALOG_CONFIRM.js"

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

        let normalized = info
            .replace( "$title", title )
            .replace( "$description", description )

        ilse.htmls.add( "dialog-info-" + Math.random(), normalized )

    }

    // Show the "confirm" dialog. returns a promised that is resolved when the user cliks on "cancel", "confirm" or "cancel"(background-click)
    async confirm( title = "Title", description = "Description" ) {

        let html = confirm
            .replace( "$title", title )
            .replace( "$description", description )

        let id   = "dialog-confirm-" + Math.random()

        ilse.htmls.add( id, html )

        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {

                if( action === "done" && id === payload.id ) {
                    ilse.htmls.remove( id )
                    resolve( true )
                } else if ( action === "rejected" && id === payload.id){
                    ilse.htmls.remove( id )
                    reject( false )
                } else {
                    reject( false )
                }

            })
        })

    }

    async input( title = "Title", description = "Description" ) {

        let html = input
            .replace( "$title", title )
            .replace( "$description", description )
        let id   = "dialog-input-" + Math.random()

        ilse.htmls.add( id, html )

        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {


                if( action === "done" && id === payload.id ) {
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
