import printf                               from "@/functions/printf.js"

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

// functions
    import get_note_id                      from "@/functions/get_note_id.js"
    import get_unique_date_id               from "@/functions/get_unique_date_id.js"
    import extract_note_content             from "@/functions/extract_note_content.js"
    import get_note_2_object                from "@/functions/get_note_2_object.js"
    import get_note_depth                   from "@/functions/get_note_depth.js"
    import extract_tokens_by_regexp_delimiters   from "@/functions/extract_tokens_by_regexp_delimiters.js"
    import get_spaces_count                 from "@/functions/get_spaces_count.js"
    import map                              from "@/functions/map.js"
    import to_keys                          from "@/functions/keys.js"
    import has_string                       from "@/functions/has_string.js"
    // import get_note_children                from "@/functions/get_note_children.js"

    import values                           from "@/functions/values.js"
    import get_note_index                   from "@/functions/get_note_index.js"
    import extract_markdown_links_from_string     from "@/functions/extract_markdown_links_from_string.js"
    import cache                            from "@/functions/cache.js"
    import store                            from "@/functions/store.js"
    import fs                               from "@/functions/fs.js"

let global_ilse

// notes() notes("id") = get. notes("id", {}) = set. notes( "query" ). notes(/regexp_query/). to save: notes( notes() )
export default class Notes {
    constructor( _ilse ) {

        global_ilse         = _ilse

        this.list           = {}
        // this.cache          = {}
        this.children       = {}

        this.has_loaded     = false

        this._setup()
    }

    async _setup() {
        await this.load_local_notes()
        this.listen()
        // this.watch_file()
    }

    listen() {

        Messager.on( "~parse", payload => {

            let has_loaded_logged_user = payload.action === "loaded" && payload.target === "user"

            if( has_loaded_logged_user ) { // I'll take this value and add all of their notes to mine.
                let brains             = payload.value.brains

                map( values( brains ), async brain => {

                    let FS           = await ilse.parse.pull( "Filesystem", brain.id )
                    let remote_notes = get_note_2_object( FS.notes, brain.id )


                })
            }
        })

    }

    focus( id, time = 100 ) {

        document.activeElement.blur()

        setTimeout( () => {
            let dom = document.getElementById( `${id}-render` )
            if( dom ) {
                // TODO: Remove this
                Messager.emit( "~notes", "focus", { target: ilse.notes.list[id] } )
                dom.focus()
            }
        }, time )

    }

    watch_file() {

        if( !global_ilse.target_directories[0] ) return

        let _this = this

        // let has_note = ilse.fs.existsSync( "notes" )
        let has_note = ilse.fs.existsSync( "notes" )
            if( !has_note ) return

        ilse.fs.watch( "notes", async (file, one, two) => {

            let text    = await this.fs.readFileAsync( "notes" )
            let lines   = text.split("\n")
            let n_lines = lines.length
            let len     = to_keys( this.list ).length + 1

            printf( "lines[len] -> ", lines[len] )
            printf( "lines[len -1] -> ", lines[len -1] )

            printf( "lines[n_lines] -> ", lines[n_lines] )
            printf( "lines[n_lines -1] -> ", lines[n_lines -1] )


            // let item    = lines[len -1]
            // _this.add( extract_note_content(item) )

        })

    }

    // FEATURE: SPEED( around ~10x faster ). Makes sure that if a note has a [notes_id].after it should be moved to another position
    before_save() {

        let move_notes = store("move_notes")
            if( !move_notes.length ) return

        let keys = to_keys( this.list )

        let parent, child

        move_notes.map( item => {

            parent = item.parent
            child  = item.child

            let index       = keys.indexOf(parent) // cheap
                index           = index + 1

            let keyValues   = Object.entries( this.list )
                keyValues.splice( index, 0, [item, this.list[item] ] )

            this.list       = Object.fromEntries(keyValues)
        })

    }

    async save() {

        this.before_save()

        let keys = to_keys( this.list )

        let text_file = ""

        map( keys, key => {
            text_file += `${get_spaces_count(this.list[key].depth)}${this.list[key].id}: ${this.list[key].content}\n` // <spaces><id>: <content>
        })

        fs("/").writeFileSync( "notes", text_file )
        // this.fs.writeFileSync( "notes", text_file )
    }

    async load_local_notes() {

        printf( "global_ilse.target_directories[0] -> ",  global_ilse.target_directories[0] )
        if( !global_ilse.target_directories[0] && process.env.VUE_APP_TARGET === "ELECTRON" ) {
            this.list = []
            return
            // throw new Error( "Error: Notes.js You need to have a valid 'Target Directory' in order to get your notes." )
        }

        try {
            let dir         = global_ilse.target_directories[0]
            let textfile    =  fs("/").readFileSync( "notes", "utf-8" )
            printf( "### textfile -> ", textfile )
            this.list       = get_note_2_object( textfile, dir )
            printf( "### this.list -> ", this.list )
            global_ilse.loaded()
        } catch( e ) {
            printf( "EEEERRRORORR -> ", e )
            this.list       = []
            // let exists      = await this.fs.exists( "notes" )
            let exists      = await fs("/").exists( "notes" )
            global_ilse.loaded()
        }
    }

    // ilse.notes.query_regexp( /<string>s?/ ) = for plurals, I might also use this in = References / .? <term> .?  / = for more iclusive query
    query_regexp( q = / / , limit = null, log ) {

        let name = "query-" + q

        printf( "q -> ", q )
        if( q === "" ) return this.list // FEATURE: O(n) instant

        if( cache(global_ilse, name) ) return cache(global_ilse, name) // FEATURE: Check name Queries( O(n) )
        // if( ilse.cache.get(name) ) return ilse.cache.get(name) // FEATURE: Check name Queries( O(n) )

        let has_match = false
        let result    = []
        let reg_exp
        // let list      = values( this.list ) // TODO: make us of values
        let note, n

        if( limit === null ) {

            for( let id in this.list ) {
                note = this.list[id]
                n = `${note.id}: ${note.content}`
                has_match = n.match( q )
                    if( !has_match ) continue
                result.push( note.id )
            }

        }

        if( typeof limit === 'number' ) {

            let index
            for( let id in this.list ) {

                index++
                if( index >= limit ) {
                    cache(global_ilse, name, result) // FEATURE: Set Cache
                    return result
                }

                note = this.list[id]
                n = `${note.id}: ${note.content}`
                has_match = n.match( q )
                    if( !has_match ) continue
                result.push( note.id )
            }



        }

        /*
        list.map( note => {
            n = `${note.id}: ${note.content}`
            has_match = n.match( q )
            // has_match = `${note.id}: ${note.content}`.match( q )
                if( !has_match ) return
            result.push( note.id )
        })
        */

        // ilse.cache.set(name, result) // FEATURE: Set Cache
        cache(global_ilse, name, result) // FEATURE: Set Cache

        if( typeof(limit) === "number" ) {
            result.length = limit
            return result
        } else {
            return result
        }
    }

    // Call fn when match with id as arg
    progressive( q = "", fn ) {

        if( !q ) return []

        q = q.toLowerCase()
        let name = "query-" + q

        if( q === "" ) return

        // Has cache
        if( cache(global_ilse, name) ) {
            cache(global_ilse, name).map( item => {
                fn( item )
            })
            return
        }

        let has_match = false
        let result    = []
        let n, note

        for( let id in this.list ) {
            note = this.list[id]
            n    = `${note.id}: ${note.content.toLowerCase()}`
            has_match = n.indexOf( q ) !== -1
                if( !has_match ) continue
            result.push( note.id ) // For caching
            fn( note.id )
        }

        cache(global_ilse, name, result) // FEATURE: Setname
        return null
    }

    // Query notes: ilse.query("[[Example]]") or ilse.query("#example") or ilse.query("#biology/genetics") ilse.query("Intelligence/AI")
    query( q = "", limit = null, filter ) {

        if( !q ) return []

        // q = q.toLowerCase()
        let name = "query-" + q

        if( q === "" ) return this.list // FEATURE: O(n)

        if( cache(global_ilse, name) ) return cache(global_ilse, name) // FEATURE: Check name Queries( O(n) )

        let has_match = false
        let result    = []
        let n, note

        for( let id in this.list ) {
            note = this.list[id]
            // n    = `${note.id}: ${note.content.toLowerCase()}`
            n    = `${note.id}: ${note.content}`
            has_match = n.indexOf( q ) !== -1
                if( !has_match ) continue
            result.push( note.id )
        }

        cache(global_ilse, name, result) // FEATURE: Setname

        if( filter ) result = result.map( filter ).filter( e=>e )

        if( typeof(limit) === "number" ) {
            result.length = limit
            return result
        } else {
            return result
        }
    }

    // give me a content, a reference note and a depth and I'll add it correctly for you.
    // add_after( content, depth, note_id ) {
        // let index   = get_note_index( note_id )
        // return this.add( content, ++index, depth )
    // }

    // I don't even know how this works lmao. But it does.
    add( content, index = null, depth = 0, autofocus = false ) {

        let id      = get_note_id()
        let note    = {
            content: content,
            id:      id,
            depth:   depth,
            source:   global_ilse.target_directories[0],
        }


        if( index === null ) { // No index set, set normally
            this.list[id]  = note
        } else {
            let entries = Object.entries( this.list ) // Get
                entries.splice( index, 0, [ id, note ] ) // Add

            this.list = Object.fromEntries( entries ) // Set
        }

        Messager.emit( "~notes", { action: "added", id: id, index: index  })
        store("autosave", 60) // For view to autosave

        if( autofocus ) this.focus( id )

        return id
    }

    delete( id ) {
        delete this.list[id]
    }
}
