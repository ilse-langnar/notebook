const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Classes
    import Caret                        from "@/classes/Caret.js"

export default class note {

    constructor( note /*, source*/  ) {

        this.$raw        = note
        this.is_editable = false
        this.children    = []
        // this.source     = source

        this.depth       = note.substr( 0, note.indexOf(":") ).split("    ").length - 1 // Extract all "    " before ID

        this.id          = note
            this.id          = this.id.trim() // "    20220124102749" -> "20220124102749"
            this.id          = this.id.substr( 0, 14 ) // 20220124102749: This is the [[Writing]] -> 20220124102749
            this.id          = this.id.replace(":", "")
            if( this.id.length < 14 ) this.id = `${this.id}0` // BUGFIX

        this.content     = this.$raw
            this.content     = this.content.trim() // "    20220124102749: Example [[Writing]]" -> "20220124102749: Example [[Writing]]"
            // this.content     = this.content.substr( 16, note.length ) // 20220124102749: Example [[Writing]] -> : Example [[Writing]]
            this.content     = this.content.substr( this.content.indexOf(":") + 2, this.content.length )

        this.tags        = this.get_tags()
        this.tagless     = this.get_tagless(this.content)

        this.caret       = new Caret( this )
    }

    get_tagless( content ) {

        let chunks = content.split(" ")
        let final  = []
        let is_tag
        chunks.map( chunk => {
            is_tag = chunk.indexOf("#") !== -1
            if( !is_tag ) final.push(chunk)
        })

        return final.join(" ")
    }

    get() {

        let is_note_malformed = !this.content || !this.id
            if( is_note_malformed ) return ""

        let spaces = ilse.utils.get_depth_spaces( this.depth )
        let note = `${spaces}${this.id}: ${this.content.trim()}`
            if( this.id.length !== 14 ) {
                ilse.notification.send( "ERROR", `BAD FORMAT: ${note}`)
            }

        return note
    }

    // Change depth
    $depth( number = 1 ) {

        let depth           = this.depth
        let _number

        let is_negative     = depth + _number < 0 // 0 is the limit
            if( is_negative ) return null

        let is_move_right   = number > 0
        let note

        printf( "before -> this.$raw -> ", this.$raw )
        if( is_move_right ) {

            let spaces      = ilse.utils.get_depth_spaces( this.depth + number )
                note          = `${spaces}${this.id}: ${this.content}`
            printf( "note -> ", note )
                setTimeout( () => { this.focus() }, 100 )

            this.constructor( note  )
        } else {

            let spaces      = ilse.utils.get_depth_spaces( this.depth + number )
                note          = `${spaces}${this.id}: ${this.content}`
            printf( "note -> ", note )
                setTimeout( () => { this.focus() }, 100 )

            this.constructor( note )
        }

    }

    get_tags( query ) {

        let content = this.content
        let chunks  = content.split( " " )
        let tags    = []
        let has_tag_in_chunk

        chunks.map( chunk => {
            has_tag_in_chunk = chunk.indexOf("#") !== -1
                if( !has_tag_in_chunk ) return
            tags.push( chunk )
        })

        if( !query ) {
            return tags
        } else {
            let filtered = tags.filter( tag => { if( tag === query ) return tag })
            return filtered
        }
    }

    focus() {

        this.is_editable = true

        setTimeout( () => {
            let dom     = document.getElementById( this.id )
            if( dom ) dom.focus()
        }, 50 )

    }

}
