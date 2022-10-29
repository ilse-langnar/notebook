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
    async info( title = "Title", description = "Description" ) {

        let normalized = info
            .replace( "$title", title )
            .replace( "$description", description )

        let id         = "dialog-info-" + Math.random()
            ilse.htmls.modal( id, html )

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

    // Show the "confirm" dialog. returns a promised that is resolved when the user cliks on "cancel", "confirm" or "cancel"(background-click)
    async confirm( title = "Title", description = "Description" ) {

        let html = confirm
            .replace( "$title", title )
            .replace( "$description", description )

        let id   = "dialog-confirm-" + Math.random()
            ilse.htmls.modal( id, html, { width: "30%", height: "30%" })

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
            ilse.htmls.modal( id, html, { width: "30%", height: "30%" })

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
