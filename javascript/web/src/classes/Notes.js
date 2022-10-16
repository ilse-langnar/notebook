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

        let textfile         = await this.filesystem.file.read.async( "notes" )

            if( !textfile ) {
                this.list           = []
                this._after_we_have_the_notes()
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

            if( index === 1 ) printf( "this.list[extract_note_id(note)] -> ", this.list[extract_note_id(note)] )

        })

        this._after_we_have_the_notes()
    }

    // splut
    get_note_parent_v2( note ) {

        let list        = this.list
        let index       = get_note_index( note )
        let second_list = list.slice( 0, index )

        let len     = second_list.length
        for (var i = len - 1; i >= 0; i--) {
            if( second_list[i].depth < note.depth ) return this.list[i]
        }
        return null
    }

    // Get note parent?
    get_note_parent( note ) {

        let list   = this.list

        let len    = this.list.length
        for (var i = len - 1; i >= 0; i--) {
            if( note.depth > this.list[i].depth ) return this.list[i]
        }
        return null
    }

    add_parent( note ) {
        let id     = note.split(":")[0].trim().replace(":", "")
        let parent = this.list[id]
        let list   = Object.values(this.list)
        let index  = list.indexOf(parent)
            if( parent && parent.children ) parent.children.push( id )
    }

    _after_we_have_the_notes() {
        this.has_loaded = true
        // this._scan_tags()
        // this._scan_links()
    }

    _scan_tags() {

        let tags        = []
        let has_no_scan = false
        let list        = Object.values( this.list )

        list.map( note => {

            tags  = this.ilse.utils.extract_tags( note )

            has_no_scan = tags.indexOf( "#!scan" ) !== -1 || tags.indexOf( "#!" ) !== -1  || tags.indexOf( "#!!!" ) !== -1
            if( has_no_scan ) return

            tags.map( tag => {
                Messager.emit( "~notes", "tag", { tag, note })
            })

        })
    }

    // Create file for links: I need to write a [[Psycology Paper]] -> does "Psycology Paper.md" exists?
    async _scan_links() {

        let notes            = this.list
        let links
        let exists
        let is_media
        let has_nickname

        // [ "20220122113043: Top [[Psycology Papers]]", "20220122113043: I have a new [[Idea]]" ]
        for( const note of notes ) {

            // links              = this.ilse.utils.extract_tokens_by_delimiters( note.content,  /^\[\[.*/, /\]\]$/ ) // "Something to [[Write]]" -> [ "Write" ]
            links              = extract_tokens_by_regexp_delimiters( note.content,  /^\[\[.*/, /\]\]$/ ) // "Something to [[Write]]" -> [ "Write" ]

            // [ [ "[[Javascript]]", "[[Psycology Papers]]" ] ]
            for( let link of links ) {

                // BUGFIX: Don't process : ![[img.png]] ![[music.mp4]] as a link
                    is_media = this.ilse.utils.has_media_extention( link )
                    if( is_media ) continue //skip

                // Nroamlize [[Psycology Papers]] -> Psycology\ Papers.md
                    link = link.replace( "[[", "" ).replace( "]]", "" ) // "[[Psycology Papers]]" -> "Psycology Papers"
                    link = link + ".md" // "Psycology Papers" -> "Psycology Papers.md"
                    link = link.trim() // " Psycology Papers .md" -> "Psycology Papers.md"

                // if not exists, create
                    try {
                        exists         = await this.filesystem.file.exists.async( link )// link - > "Psycology Papers.md"
                    } catch( e ) {
                        exists = false
                    }

                // For [[ Example | Another Name ]]
                    has_nickname =  link.indexOf("|") !== -1
                        if( has_nickname ) return

                // Is an actual file, then create
                    // if( !exists ) {
                        // await this.filesystem.file.write.async( link, link )
                    // }

                Messager.emit( "~notes", "link", { link, note } )
            }
        }

        this.ilse.links.is_loading = false

        Messager.emit( "~notes", "loaded", this )

    }

    /*
    // Like query() but return the index
    query_index( q, limit = null ) {

        // FEATURE: O(n) instant
            if( q === "" ) return []

        let result    = []
        let list      = this.list
        let has_match = false
        let index

        list.map( (note, index) => {
            has_match = note.indexOf(q) !== -1
                if( !has_match ) return
            result.push( index )
        })

        if( typeof(limit) === "number" ) {
            result.length = limit
            return result
        } else {
            return result
        }
    }
    */

    // ilse.notes.query_regexp( /<string>s?/ ) = for plurals, I might also use this in = References / .? <term> .?  / = for more iclusive query
    query_regexp( q = / / , limit = null, log ) {

        let name = "query-" + q

        if( q === "" ) return this.list // FEATURE: O(n) instant

        if( ilse.cache.get(name) ) return ilse.cache.get(name) // FEATURE: Check name Queries( O(n) )

        let has_match = false
        let result    = []
        let reg_exp
        let list      = Object.values( this.list ) // TODO: make us of values
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
        let list      = Object.values( this.list ) // TODO: make us of values
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

    add_list( list ) {

        /*
        let instance

        list.map( (item, index) => {
            if( index === 0 ) {
                item = `${get_note_id()}: ${item}`
                instance = new this.ilse.classes.Note( item )
                this.list.push( instance )
            } else {
                item = `    ${get_note_id()}: ${item}`
                instance = new this.ilse.classes.Note( item )
                this.list.push( instance )
            }
        })
        */

    }

}
