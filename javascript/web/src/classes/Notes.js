import printf                               from "@/classes/printf.js"

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

// functions
    import get_note_id                      from "@/classes/get_note_id.js"
    import get_unique_date_id               from "@/classes/get_unique_date_id.js"
    import extract_note_id                  from "@/classes/extract_note_id.js"
    import extract_note_content             from "@/classes/extract_note_content.js"
    import get_note_depth                   from "@/classes/get_note_depth.js"
    import extract_tokens_by_regexp_delimiters   from "@/classes/extract_tokens_by_regexp_delimiters.js"
    import get_spaces_count                 from "@/classes/get_spaces_count.js"
    import map                              from "@/classes/map.js"
    import keys                             from "@/classes/keys.js"
    import values                           from "@/classes/values.js"
    import get_note_index                   from "@/classes/get_note_index.js"

export default class Notes {

    constructor( filesystem, ilse ) {

        this.filesystem     = filesystem
        this.ilse           = ilse

        this.list           = {}
        this.cache          = {}

        this.has_loaded     = false

        this._setup()
    }

    async _setup() {
        this.get_notes()
        // this.demo()
        // this.watch_file()
    }

    watch_file() {

        let _this = this
        this.ilse.filesystem.file.watch( "notes", async (file, one) => {

            window.lastClick2 = 0;

            if( 2000 > ( Date.now() - window.lastClickw ) ) {
            } else {
                window.lastClick2 = Date.now();

                let text  = await this.filesystem.file.read.async( "notes" )
                let lines = text.split("\n")

                let added = lines.slice( this.list.length-1, lines.length ).filter( e=>e )
                    if( !added.length ) return
                printf( "added -> ", added )

                let o = note.split(":")[1]
                printf( "o -> ", o )

                // added.map( note => this.add( note.split(":")[1] ) )

                // added.map( note => this.add( note.slice(note.content.indexOf(":")+1, note.length ) ) )
            };

        })

    }

    async save() {

        let text_file = ""

        map( keys(this.list), key => {
            if( !this.list[key] ) printf( "WRONG -> this.list[key] -> ", this.list[key] )
            text_file += `${get_spaces_count(this.list[key].depth)}${this.list[key].id}: ${this.list[key].content}\n` // <spaces><id>: <content>
        })

        await this.filesystem.file.write.async( "notes", text_file )
    }

    async get_notes() {
        printf( "@@@@ get_notes " )

        printf( "@@@@ get_notes 1" )
        let textfile         = await this.filesystem.file.read.async( "notes" )

            printf( "@@@@ get_notes 2" )
            if( !textfile ) {
                printf( "@@@@ get_notes 3" )
                this.list           = []
                ilse.loaded()
                return
            }

        printf( "@@@@ get_notes 4" )
        // Process note
        let notes      = textfile.split("\n")

        printf( "@@@@ get_notes 5" )
        notes.map( (note, index) => {

            if( !note ) return

            // this.list[ note.split(":")[0].trim().replace(":", "") ] = note
            this.list[extract_note_id(note)] = {
                content: extract_note_content( note ),
                id:      extract_note_id( note ),
                depth:   note.split("    ").length -1,
            }

            if( index === 1 ) printf( "this.list[extract_note_id(note)] -> ", this.list[extract_note_id(note)] )

        })

        printf( "@@@@ get_notes 7" )

        ilse.loaded()
    }

    // _after_we_have_the_notes() {
        // this._after_we_have_the_notes()
        // printf( ">>> Notes.js -> _after_we_have_the_notes -" )
        // this.has_loaded = true
        // ilse.loaded()
        // ilse.has_loaded = true
        // printf( "ilse.has_loaded -> ", ilse.has_loaded )
        // Messager.emit( "~ilse", "loaded", this )
        // ilse.has_loaded = true
        // this._scan_tags()
        // this._scan_links()
    // }

    // ilse.notes.query_regexp( /<string>s?/ ) = for plurals, I might also use this in = References / .? <term> .?  / = for more iclusive query
    query_regexp( q = / / , limit = null, log ) {

        printf( "Notes.js -> query_regexp" )

        let name = "query-" + q

        if( q === "" ) return this.list // FEATURE: O(n) instant

        if( ilse.cache.get(name) ) return ilse.cache.get(name) // FEATURE: Check name Queries( O(n) )

        let has_match = false
        let result    = []
        let reg_exp
        let list      = values( this.list ) // TODO: make us of values
        let n
        printf( "Object.values(this.list) -> ", Object.values(this.list) )
        printf( "Notes.js -> query_regexp -> this.list -> ", this.list )
        printf( "Notes.js -> query_regexp -> list -> ", list )

        list.map( note => {
            n = `${note.id}: ${note.content}`
            has_match = n.match( q )
                if( !has_match ) return
            result.push( note )
        })

        ilse.cache.set(name, result) // FEATURE: Set Cache

        if( typeof(limit) === "number" ) {
            result.length = limit
            return result
        } else {
            return result
        }
    }

    query( q = "", limit = null, log ) {

        q = q.toLowerCase()
        let name = "query-" + q

        if( q === "" ) return this.list // FEATURE: O(n)

        if( ilse.cache.get(name) ) return ilse.cache.get(name) // FEATURE: Check name Queries( O(n) )

        let has_match = false
        let result    = []
        let list      = values( this.list ) // TODO: make us of values
        let n

        list.map( note => {
            n = `${note.id}: ${note.content}`
            has_match = n.toLowerCase().indexOf( q ) !== -1
                if( !has_match ) return
            result.push( note )
        })

        ilse.cache.set(name, result) // FEATURE: Setname

        if( typeof(limit) === "number" ) {
            result.length = limit
            return result
        } else {
            return result
        }
    }

    // give me a content, a reference note and a depth and I'll add it correctly for you.
    add_after( content, depth, note_id ) {
        let index   = get_note_index( note_id )
        return this.add( content, ++index, depth )
    }

    add( content, index = null, depth = 0 ) {

        // let id               = get_note_id() // 20220120155758
        // let spaces           = this.ilse.utils.get_depth_spaces( depth )
        // let note             = `${spaces}${id}: ${content}` // 20220120155758: Hello, World
        let id      = get_note_id()
        let note             = {
            content: content,
            id:      id,
            depth:   depth,
        }


        if( index === null ) {
            this.list[id]  = note
        } else {
            let entries = Object.entries( this.list )
                entries.splice( index, 0, [ id, note ] ) // Add

            this.list = Object.fromEntries( entries ) // Set
        }

        Messager.emit( "~notes", "added", { note: id, index: index, })

        return id
    }

    delete( id ) {
        delete this.list[id]
    }
}
