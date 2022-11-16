import printf                               from "@/functions/printf.js"

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

// functions
    import get_note_id                      from "@/functions/get_note_id.js"
    import get_unique_date_id               from "@/functions/get_unique_date_id.js"
    import extract_note_id                  from "@/functions/extract_note_id.js"
    import extract_note_content             from "@/functions/extract_note_content.js"
    import get_note_depth                   from "@/functions/get_note_depth.js"
    import extract_tokens_by_regexp_delimiters   from "@/functions/extract_tokens_by_regexp_delimiters.js"
    import get_spaces_count                 from "@/functions/get_spaces_count.js"
    import map                              from "@/functions/map.js"
    import keys                             from "@/functions/keys.js"
    import values                           from "@/functions/values.js"
    import get_note_index                   from "@/functions/get_note_index.js"
    import extract_markdown_links_from_string     from "@/functions/extract_markdown_links_from_string.js"

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
        await this.get_notes()
        await this.scan_links()
        // this.demo()
        // this.watch_file()
    }

    async scan_links() {

        let links
        let list  = Object.values( this.list )

        list.map( item => {

            if( item.content.indexOf("[[") === -1 ) return

            links = extract_markdown_links_from_string( item.content )

            if( links.length ) {

                links.map( link => {
                    if( !ilse.links.links[link] ) ilse.links.links[link] = []
                    ilse.links.links[link].push( item.id )
                })
            }

        })

        // set
        ilse.links.entries = Object.entries(ilse.links.links).sort( (first,second) => {  return second[1].length - first[1].length })

    }

    focus( id, time = 100 ) {

        setTimeout( () => {
            let dom = document.getElementById( id )
            if( dom ) {
                Messager.emit( "~notes", "focus", { target: ilse.notes.list[id] } )
                dom.focus()
            }
        }, time )

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

                let o = note.split(":")[1]

                // added.map( note => this.add( note.split(":")[1] ) )

                // added.map( note => this.add( note.slice(note.content.indexOf(":")+1, note.length ) ) )
            };

        })

    }

    async save() {

        printf( "save ... 1" )
        let text_file = ""

        printf( "save ... 2" )
        map( keys(this.list), key => {
            text_file += `${get_spaces_count(this.list[key].depth)}${this.list[key].id}: ${this.list[key].content}\n` // <spaces><id>: <content>
        })
        printf( "save ... 3" )

        await this.filesystem.file.write.async( "notes", text_file )
    }

    async get_notes() {

        if( !this.ilse.target_directories[0] ) return

        let textfile

        try {
            textfile         = await this.filesystem.file.read.async( "notes" )
        } catch( e ) {
            this.list           = []
            await this.filesystem.file.write.async( "notes", "" )
            ilse.loaded()
            return
        }

        // Process note
        let notes      = textfile.split("\n")

        notes.map( (note, index) => {

            if( !note ) return

            // this.list[ note.split(":")[0].trim().replace(":", "") ] = note
            this.list[extract_note_id(note)] = {
                content: extract_note_content( note ),
                id:      extract_note_id( note ),
                depth:   note.split("    ").length -1,
            }

        })

        ilse.loaded()
    }

    // ilse.notes.query_regexp( /<string>s?/ ) = for plurals, I might also use this in = References / .? <term> .?  / = for more iclusive query
    query_regexp( q = / / , limit = null, log ) {

        let name = "query-" + q

        if( q === "" ) return this.list // FEATURE: O(n) instant

        if( ilse.cache.get(name) ) return ilse.cache.get(name) // FEATURE: Check name Queries( O(n) )

        let has_match = false
        let result    = []
        let reg_exp
        let list      = values( this.list ) // TODO: make us of values
        let n

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
            printf( "index -> ", index )

            printf( ">>> Notes.js -> add_after -> content -> ", content )
            printf( ">>> Notes.js -> add_after -> depth -> ", depth )
            printf( ">>> Notes.js -> add_after -> note_id -> ", note_id )

        let o = this.add( content, ++index, depth )
        printf( ">>>> o -> ", o )
        return o
    }

    add( content, index = null, depth = 0 ) {

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

        Messager.emit( "~notes", "added", { target: id, index: index, })

        return id
    }

    delete( id ) {
        delete this.list[id]
    }
}
