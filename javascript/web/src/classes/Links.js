import printf                   from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Links {

    constructor() {

        this.links      = {}
        this.is_loading = true

        this.setup()
    }

    setup() {
        this.listen()
    }

    parse( payload ) {

        let link        = payload.link
        let note        = payload.note

        if( !this.links[link] ) this.links[link] = []

        let has_item_already = this.links[link].indexOf(note.id) !== -1
            if( !has_item_already ) this.links[link].push( note.id )

        Messager.emit( "~links", "new", { link, note })
    }

    listen() {

        Messager.on( "~notes", ( action, payload ) => {

            if( action === "link" ) {
                this.parse( payload )
            }

        })

    }

}
