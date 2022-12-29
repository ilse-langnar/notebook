import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// functions
    import extract_markdown_tags        from "@/functions/extract_markdown_tags.js"

export default class Tags {

    constructor() {

        this.tags = {}

        this.setup()
    }

    setup() {
        // this.listen()
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
                printf( "action -> tab -> payload -> ", payload )
                this.parse( payload )
            } else if( action === 'added' ) {

                let tags        = extract_markdown_tags( payload.note.content )
                for( const tag of tags ) {
                    this.parse({ note: payload.note, tag })
                }
            }

        })

    }

}
