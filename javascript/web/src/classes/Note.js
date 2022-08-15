const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Classes
    import Caret                        from "@/classes/Caret.js"

export default class note {

    constructor( note /*, source*/  ) {

        // BUGFIX: Sometimes before the ID there's a single space.
        // if( note[0] === " " && note[1] !== " " ) note = note.split("").shift().join("")
        if( note[0] === " " && note[1] !== " " ) note = note.replace(/\ /, "")
            // note = note.trim()

        this.$raw        = note
        this.is_editable = false
        this.is_collapsed= false
        this.children    = []
        // this.source     = source

        this.depth       = note.substr( 0, note.indexOf(":") ).split("    ").length - 1 // Extract all "    " before ID

        this.id          = note
            this.id          = this.id.trim() // "    20220124102749" -> "20220124102749"
            this.id          = this.id.substr( 0, 14 ) // 20220124102749: This is the [[Writing]] -> 20220124102749
            this.id          = this.id.replace(":", "")
            this.id          = this.id.replace(" ", "0")
            // if( this.id.length < 14 ) this.id = `${this.id}0` // BUGFIX
            if( this.id.length < 14 ) this.id = this.id.replace( /\ /g, "0" )

        this.content     = this.$raw
            this.content     = this.content.trim() // "    20220124102749: Example [[Writing]]" -> "20220124102749: Example [[Writing]]"
            // this.content     = this.content.substr( 16, note.length ) // 20220124102749: Example [[Writing]] -> : Example [[Writing]]
            this.content     = this.content.substr( this.content.indexOf(":") + 2, this.content.length )

        this.tags        = this.get_tags()
        this.tagless     = this.get_tagless(this.content)

        this.caret       = new Caret( this )
    }

    // Add to notes.list
    add_child( note, options = {} ) {
        printf( "Note.js -> add_child -> options -> ", options )

        // Add to notes
            let index = options.ilse.notes.list.indexOf( this )
            printf( "ilse -> ", ilse )
            printf( "ilse.notes -> ", ilse.notes )
            // options.ilse.notes.add( note.content, ++index, ++this.depth, { debug: false } )

        // Add to self
            this.children.push( note )
        // if( options.debug ) debugger;

        // Messager.emit( "~notes", "added", { note: note, index: index })

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

    get_file_references() {

        if( this.content.indexOf("![[") === -1 ) return []

        let words = this.content.split(" ")
        words.map( word => {

        })

        // let regexp      = /^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/
        // let chunks      = this.content.split(" ")
        // let arr         = regexp.exec(this.content)
        // printf( "arr -> ", arr )
        // return arr[1]
        // let list        = []
        // let regexp      = /^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/
        let match

        printf( "chunks -> ", chunks )
        chunks.map( chunk => {
            // printf( "chunk[0] -> ", chunk[] )
            if( chunk[0] === "!" && chunk[1] === "[" && chunk[2] === "[") list.push( chunk )
            // match = chunk.match( regexp )
            // if( match ) list.push( chunk )
        })

        printf( "list -> ", list )

        return list
    }

    get_note_references() {

        if( this.content.indexOf("((") === -1 ) return []

        let chunks      = this.content.split(" ")
        let list        = []
        let regexp      = /[\s\S]*[(]\((.*)\)[)]/
        let match

        chunks.map( chunk => {
            match = chunk.match( regexp )
            if( match ) list.push( chunk )
        })

        return list
    }

    get() {

        let is_note_malformed = !this.content || !this.id
            if( is_note_malformed ) return ""

        let spaces = ilse.utils.get_depth_spaces( this.depth )
        let note = `${spaces}${this.id.replace(" ", "0")}: ${this.content.trim()}`
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

        if( is_move_right ) {

            let spaces      = ilse.utils.get_depth_spaces( this.depth + number )
                note          = `${spaces}${this.id}: ${this.content}`
                setTimeout( () => { this.focus() }, 100 )

            this.constructor( note  )
        } else {

            let spaces      = ilse.utils.get_depth_spaces( this.depth + number )
                note          = `${spaces}${this.id}: ${this.content}`
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
        }, 10 )
        // }, 50 )

    }

}
