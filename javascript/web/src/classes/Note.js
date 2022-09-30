const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Classes
    import Caret                        from "@/classes/Caret.js"

// functions
    import move_array_item              from "@/classes/move_array_item.js"

export default class note {

    constructor( note /*, source*/  ) {

        // BUGFIX: Sometimes before the ID there's a single space.
        if( note[0] === " " && note[1] !== " " ) note = note.replace(/\ /, "")

        this.raw         = note

        this.is_editable = false
        this.is_collapsed= false

        this.children    = []

        this.depth       = note.substr( 0, note.indexOf(":") ).split("    ").length - 1 // Extract all "    " before ID

        this.id          = this.get_id( note )

        this.content     = this.get_content( note )

        this.tags        = this.get_tags()
        this.tagless     = this.get_tagless(this.content)

        this.caret       = new Caret( this )
    }

    // Add to notes.list
    add_child( note, options = {} ) {

        // Add to notes
            let index = options.ilse.notes.list.indexOf( this )
            // options.ilse.notes.add( note.content, ++index, ++this.depth, { debug: false } )

        // Add to self
            this.children.push( note )
        // if( options.debug ) debugger;

        // Messager.emit( "~notes", "added", { note: note, index: index })

    }

    get_content( note ) {

        let content = note
            content     = content.trim()
            content     = content.substr( content.indexOf(":") + 2, content.length )
        return content
    }

    get_id( note ) {

        let id      = note.trim()
            id          = id.substr( 0, 23 ) // 20220124102749: This is the [[Writing]] -> 20220124102749
            id          = id.replace( ":", "" )

        if( id.length < 23 ) console.error( `ERROR: Wrong ID: id -> ${id}, len: ${id.lenght} expected: 23: (${id.length - 23}) ${JSON.stringify(this)}` )

        return id
    }

    move( index ) {

        try {
            let current_index = ilse.notes.list.indexOf(this)
            move_array_item( ilse.notes.list, current_index, index )
        } catch( e ) {
            debugger;
        }

        this.children.map( child => {
            // child.move( ++index )
        })

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

        chunks.map( chunk => {
            if( chunk[0] === "!" && chunk[1] === "[" && chunk[2] === "[") list.push( chunk )
        })

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
        let id = this.id
        if( id.length !== 23 ) {
            printf( `len: ${id.length} id: ${id} ` )
            printf( "this.raw -> ", this.raw )
        }

        let spaces = ilse.utils.get_depth_spaces( this.depth )
        // printf( "spaces -> ", spaces )
        let note   = `${spaces}${id}: ${this.content.trim()}`
            // if( id.length !== 23 ) {
                // ilse.notification.send( "ERROR", `BAD FORMAT: ${note}`)
            // }

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
            printf( "is_move_right -> true -> spaces -> ", spaces )
                note          = `${spaces}${this.id}: ${this.content}`
            printf( "is_move_right -> true -> note -> ", note )
                setTimeout( () => { this.focus() }, 100 )

            // this.constructor( note  )
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
