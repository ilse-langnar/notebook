import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// HTML
    // import info                         from "@/html/dialog-info.html"
    // import input                        from "@/html/dialog-input.html"
    // import confirm                      from "@/html/dialog-confirm.html"

let info, input, confirm

export default class Dialog {

    constructor( ilse ) {
        this.list = []

        info    = ilse.components['info']
        input   = ilse.components['input']
        confirm = ilse.components['confirm']
    }

    // Show the "info" dialog. returns a promised that is resolved when the user cliks on "cancel", "ok" or "cancel"(background-click)
    async info( title = "Title", description = "Description" ) {

        let normalized = info
            .replace( "$title", title )
            .replace( "$description", description )

        ilse.stack.push({ id: "dialog-info-" + Math.random(), html: normalized })

        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {

                if( action === "done" && id === payload.id ) {
                    ilse.remove( id )
                    resolve( true )
                } else if ( action === "rejected" && id === payload.id){
                    ilse.remove( id )
                    reject( false )
                } else {
                    reject( false )
                }

            })
        })

    }

    // Show the "confirm" dialog. returns a promised that is resolved when the user cliks on "cancel", "confirm" or "cancel"(background-click)
    async confirm( title = "Title", description = "Description" ) {

        let html = confirm
            .replace( "$title", title )
            .replace( "$description", description )

        let id   = "dialog-confirm-" + Math.random()
            ilse.stack.push({ id: id, html: html })

        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {

                if( action === "done" && id === payload.id ) {
                    ilse.remove( id )
                    resolve( true )
                } else if ( action === "rejected" && id === payload.id){
                    ilse.remove( id )
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
            ilse.stack.push({ id: id, html: html })

        return new Promise((resolve, reject) => {

            Messager.on( "~dialog.vue", ( action, payload ) => {


                if( action === "done" && id === payload.id ) {
                    ilse.remove( id )
                    resolve( payload.input)
                } else if ( action === "rejected" && id === payload.id){
                    ilse.remove( id )
                    reject( id )
                } else {
                    reject( id )
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

    }

}
