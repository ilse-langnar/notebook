const printf                        = console.log

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

// Node.js
    const path                              = require("path")

export default class Notes {

    constructor( filesystem, ilse ) {

        this.filesystem     = filesystem
        this.ilse           = ilse
        this.list           = []
        this.has_loaded     = false

        this._setup()
    }

    async _setup() {
        this.listen()
        this.watch_file()
        this._auto_save()
    }

    add_default() {

        let has_any_nore = this.list.length
            if( has_any_nore ) return

        let time_id          = this.ilse.utils.get_unique_date_id() // 20220120155758
        let spaces           = this.ilse.utils.get_depth_spaces( 0 )
        let note           = `${spaces}${time_id}: Hello, World` // 20220120155758: Hello, World

        let instance         = new this.ilse.classes.Note( note )
            this.list.push( instance )
    }

    _auto_save() {
        // setTimeout( () => { this.save() }, 1000 * 5/*every 5 minutes*/ )
    }

    // Watches notes for more or less notes.
    async watch_file() {

        // let one_minute   = 1 /*minutes*/ * 60 /*second*/ * 1000 /*miliseconds*/
        let thirty_seconds = 30 /*second*/ * 1000 /*miliseconds*/
        let len            = this.list.length
        let text
        let notes
        let has_new_notes
        let depth

        setInterval( async () => {
            len            = this.list.length
            text           = await this.filesystem.file.get( "notes" )
            notes          = text.split("\n")
            has_new_notes  = notes.length !== len

            if( has_new_notes ) {
                let new_notes_negative_index = len - notes.length
                let new_items                = notes.slice( --new_notes_negative_index ).filter( e=>e )
                let has_new_items            = new_items.length

                if( has_new_items ) {

                    new_items.map( item => {
                        // depth = ilse.utils.get_depth_spaces( item.split("    ") )
                        printf( "item -> ", item )
                        this.add( item, this.list.length, 0 )
                    })

                    // Messager.emit( "~notes", "reload" ) // Problem: We'll try scrolling with that bread moment of no notes, which
                }
            }

        }, thirty_seconds )

    }

    async save( avoid_saving = false ) {

        let normalized = this.list.join("\n")
        let file       = ""
        let notes    = this.list
        let is_last    = false
        let $note

        let index = 0
        for( const note of notes ) {
            index++

            is_last = index === notes.length -1

            $note =  note.get()
                if( !$note ) continue

            file += note.get() + "\n"
        }

        if( avoid_saving ) return

        await this.filesystem.file.set( "notes", file )

    }

    async create_notes_if_not_there() {

        let _this            = this
        let is_demo          = this.ilse.platform === "demo"
        let has_z            = await this.filesystem.file.exists( "notes" )

        let time_id          = ilse.utils.get_unique_date_id() // 20220120155758
        let note           = `${time_id}: "Hello, World2"` // 20220120155758: Hello, World
        let notes          = ""

        if( is_demo ) {

            if( has_z ) await this.filesystem.file.set( "notes", "" )
            let demo_notes  = this.filesystem.filesystem.DEFAULT_NOTES
            let len         = demo_notes.length

            this.add( `Click on the help button on top for the tutorial`, this.list.length, 0 )

        } else {
            if( has_z ) return
            note           = `${time_id}: "Hello, World"` // 20220120155758: Hello, World
            await this.filesystem.file.set( "notes", note )
        }

    }

    async get_notes() {

        // BUGFIX: if no 'notes', create it and give a hello, world note.
        await this.create_notes_if_not_there()

        let textfile         = await this.filesystem.file.get( "notes" )

            if( !textfile ) {
                this.list           = []
                this._after_we_have_the_notes()
                return
            }

        // Process note
        let notes      = textfile.split("\n")
        let instance
        let is_child
        let copy

        let index = 0
        for( const note of notes ) {
            index++

            instance = new ilse.classes.Note( note )
                if( instance.depth >= 1 ) this.recursively_add_children( instance, index )
                this.list.push( instance )
        }

        this._after_we_have_the_notes()

    }

    recursively_add_children( instance, index ) {

        let item        = this.list[Number(--index)]
        let has_item    = item && item.children.length
            if( !has_item ) return

        this.list[Number(--index)].children.push( instance )
    }

    _after_we_have_the_notes() {
        this.add_default()
        this.has_loaded = true
        this._scan_tags()
        this._scan_links()
    }

    _scan_tags() {

        let tags        = []
        let has_no_scan = false

        for( const note of this.list ) {

            tags  = ilse.utils.extract_tags( note.content )

            has_no_scan = tags.indexOf( "#!scan" ) !== -1 || tags.indexOf( "#!" ) !== -1  || tags.indexOf( "#!!!" ) !== -1
                if( has_no_scan ) continue // Don't scan tags if we have either: #!scan #! or #!!!( #!! only block link scanning, while #!!! blocks both links AND tag scanning )

            for( const tag of tags ) {
                // printf( "tag -> ", tag )
                Messager.emit( "~notes", "tag", { tag, note })
            }
        }

    }

    // Create file for links: I need to write a [[Psycology Paper]] -> does "Psycology Paper.md" exists?
    async _scan_links() {

        let notes            = this.list
        let links
        let exists
        let is_media

        // [ "20220122113043: Top [[Psycology Papers]]", "20220122113043: I have a new [[Idea]]" ]
        for( const note of notes ) {

            links              = ilse.utils.extract_tokens_by_delimiters( note.content,  /^\[\[.*/, /\]\]$/ ) // "Something to [[Write]]" -> [ "Write" ]

            // [ [ "[[Javascript]]", "[[Psycology Papers]]" ] ]
            for( let link of links ) {

                // BUGFIX: Don't process : ![[img.png]] ![[music.mp4]] as a link
                    is_media = ilse.utils.has_media_extention( link )
                    if( is_media ) continue //skip

                // Nroamlize [[Psycology Papers]] -> Psycology\ Papers.md
                    link = link.replace( "[[", "" ).replace( "]]", "" ) // "[[Psycology Papers]]" -> "Psycology Papers"
                    link = link + ".md" // "Psycology Papers" -> "Psycology Papers.md"
                    link = link.trim() // " Psycology Papers .md" -> "Psycology Papers.md"

                // if not exists, create
                    try {
                        // printf( "link -> ", link )
                        exists         = await this.filesystem.file.exists( path.join("second" , link) )// link - > "Psycology Papers.md"
                    } catch( e ) {
                        exists = false
                    }

                    if( !exists ) {
                        await this.filesystem.file.set( path.join("second" , link), link )
                    }

                Messager.emit( "~notes", "link", { link, note } )
            }
        }

        ilse.links.is_loading = false

        Messager.emit( "~notes", "loaded", this )

    }

    query( q = "" ) {

        let has_match = false
        let result    = []
        let list      = this.list

        // printf( "-----> this.list -> ", this.list )
        for( const note of list ) {

            has_match = note.$raw.indexOf( q ) !== -1
                if( !has_match ) continue

            result.push( note )
        }

        return result
    }

    // Get a note's index( probabily for child insertion )
    get_index( id ) {
        let is_equal

        let index = 0
        for( const item of this.list ) {
            index++

            is_equal = item.id === id
            // if( is_equal ) return index
            if( is_equal )  {
                return this.list.indexOf(item)
                // return index
            }
        }

    }

    // give me a content, a reference note and a depth and I'll add it correctly for you.
    add_after( content, depth, note ) {
        let index   = this.get_index( note.id )
        return this.add( content, ++index, depth )
    }

    add( content, index, depth = 0 ) {

        let time_id          = ilse.utils.get_unique_date_id() // 20220120155758
        let spaces           = ilse.utils.get_depth_spaces( depth )
        let note             = `${spaces}${time_id}: ${content}` // 20220120155758: Hello, World

        let instance         = new ilse.classes.Note( note )
            if( instance.depth >= 1 ) this.recursively_add_children( instance, index )

            this.list.splice( index, 0, instance )

        let after
        index = Number(index)
        if( index === 0  ) {
            after = this.list[0]
        } else {
            after = this.list[index - 1]
        }

        Messager.emit( "~notes", "added", {
            note: instance,
            // after: this.list[ Number( index - 1 ) ]
            after: after,
        })

        return instance
    }

    delete( note ) {

        let has_match   = false
        let id          = note.id
        let has_deleted = false
        let deleted_notes
        let has_found

        this.list.map(( item, index ) => {
            has_found = id === item.id
                if( has_found ) deleted_notes = this.list.splice( index, 1 )
        })

        has_deleted = deleted_notes

        if( has_deleted ) {
            Messager.emit( "~notes", "deleted", deleted_notes[0] )
            return deleted_notes
        } else {
            throw new Error( `ERROR: notes.js: could not deleted note: ${note} maybe it's not there already? maybe a sync problem?` )
        }
    }

    get_references( string ) {

        let chunks = string.split(" ")
        let has_opening_parenthesis
        let has_closing_parenthesis
        let has_both
        let ref

        for( const chunk of chunks ) {

          has_opening_parenthesis  = chunk.indexOf( "((" ) !== -1
          has_closing_parenthesis  = chunk.indexOf( "))" ) !== -1

          has_both                 = has_opening_parenthesis && has_closing_parenthesis
          if( has_both ) ref = chunk.replace( " ", "" ).replace( "((", "" ).replace( "))", "" )

        }

        return ref
    }

    listen() {

        Messager.on( "~ilse", async (action, payload) => {

            if( action === "loaded" ) {
                this.get_notes( payload )
            }

        })

    }
}
