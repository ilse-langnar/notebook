const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Tags {

    constructor() {

        this.tags = {}

        this.setup()
    }

    setup() {
        this.listen()
    }

    parse( payload ) {

        let tag             = payload.tag
        let note          = payload.note

        let has_tag_already = false
        let parts           = tag.split('/')

        if( parts.length === 1 ) {

            has_tag_already = this.tags[tag]

            if( !has_tag_already ) this.tags[tag] = []
            this.tags[tag].push( note.id )
        }

        let is_css_snippet = tag === "#i/css"
            if( is_css_snippet ) Messager.emit( "~tags", "new", { type: "css-snippet", note } )

    }

    listen() {

        Messager.on( "~notes", ( action, payload ) => {

            if( action === "tag" ) { // TODO: call this "tag" event a "scan"
                this.parse( payload )
            } else if( action === 'added' ) {

                let tags        = ilse.utils.extract_tags( payload.note.content )
                printf( "payload.note.content -> ", payload.note.content )
                printf( "tags -> ", tags )
                for( const tag of tags ) {
                    this.parse({ note: payload.note, tag })
                }
            }

        })

    }

}
