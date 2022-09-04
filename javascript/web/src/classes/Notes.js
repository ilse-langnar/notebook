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
        this.cache          = {}
        this.has_loaded     = false

        this._setup()
    }

    async _setup() {
        this.get_notes()
        this.demo()
        this.listen()
        this.watch_file()
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
                added.map( note => { this.add( note.split(":")[1] ) })
            };

        })

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

        await this.filesystem.file.write.async( "notes", file )

    }

    async demo() {

        let is_demo          = this.ilse.platform === "demo"
        if( is_demo ) {
            let dom = document.createElement( "div" )
                dom.id  = "db"
            let root = this.ilse.filesystem.file.read.async("/")
            printf( "root -> ", root )
        }

        // if( has_notes ) await this.filesystem.file.write.async( "notes", "" )

        // let demo_notes  = this.filesystem.filesystem.DEMO_NOTES

        // let demo_notes  = this.ilse.DEMO_NOTES
        // let len         = demo_notes.length

        // this.add_list( demo_notes )

        // this.add( `Click on the help button on top for the tutorial`, this.list.length, 0 )
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
        let instance

        notes.map( (note, index) => {
            instance = new this.ilse.classes.Note( note )
            if( instance.depth >= 1 ) {
                this.recursively_add_children( instance, index )
            }
            this.list.push( instance )
        })

        this._after_we_have_the_notes()

    }

    // splut
    get_note_parent_v2( note ) {

        // let index= list.indexOf( note )
        // let second_list = list.slice( index, list.length )

        let list        = this.list
        let index       = this.get_note_index( note )
        let second_list = list.slice( 0, index )

        // if( log ) second_list.map( item => { printf( "item.content -> ", item.content ) })
        // if( log ) printf( "second_list -> ", second_list )
        // if( log ) printf( "index -> ", index )

        // let len   = this.list.length
        let len     = second_list.length
        for (var i = len - 1; i >= 0; i--) {
            if( second_list[i].depth < note.depth ) return this.list[i]
            // if( this.list[i].depth < note.depth ) return this.list[i]
        }
        return null
    }

    // Get note parent?
    get_note_parent( note ) {

        let list   = this.list

        let len    = this.list.length
        for (var i = len - 1; i >= 0; i--) {
            // if( this.list[i].depth < note.depth ) return this.list[i]
            if( note.depth > this.list[i].depth ) return this.list[i]
            // if( second_list[i].depth < note.depth ) return this.list[i]
        }
        return null
    }

    recursively_add_children( instance, index ) {
        let parent = this.get_note_parent( instance )
            if( parent && parent.children ) parent.children.push( instance )
    }

    _after_we_have_the_notes() {
        this.has_loaded = true
        this._scan_tags()
        this._scan_links()
    }

    _scan_tags() {

        let tags        = []
        let has_no_scan = false

        for( const note of this.list ) {

            tags  = this.ilse.utils.extract_tags( note.content )

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
        let has_nickname

        // [ "20220122113043: Top [[Psycology Papers]]", "20220122113043: I have a new [[Idea]]" ]
        for( const note of notes ) {

            links              = this.ilse.utils.extract_tokens_by_delimiters( note.content,  /^\[\[.*/, /\]\]$/ ) // "Something to [[Write]]" -> [ "Write" ]

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
                        // printf( "link -> ", link )
                        exists         = await this.filesystem.file.exists.async( path.join("second" , link) )// link - > "Psycology Papers.md"
                    } catch( e ) {
                        exists = false
                    }

                // For [[ Example | Another Name ]]
                    has_nickname =  link.indexOf("|") !== -1
                        if( has_nickname ) return

                // Is an actual file, then create
                    if( !exists ) {
                        await this.filesystem.file.write.async( path.join("second" , link), link )
                    }

                Messager.emit( "~notes", "link", { link, note } )
            }
        }

        this.ilse.links.is_loading = false

        Messager.emit( "~notes", "loaded", this )

    }

    get_note_index( note  )  {

        let result = null
        this.list.map( ( _note, index ) => {
            if( note.id === _note.id ) result = index
        })

        return result

    }

    // ilse.notes.query_regexp( /<string>s?/ ) = for plurals, I might also use this in = References / .? <term> .?  / = for more iclusive query
    query_regexp( q = / / , limit = null ) {

        let name = "query-" + q

        // FEATURE: O(n)
            if( q === "" ) return this.list

        // FEATURE: Check name Queries( O(n) )
            if( ilse.cache.get(name) ) return ilse.cache.get(name)

        let has_match = false
        let result    = []
        let list      = this.list
        let reg_exp

        for( const note of list ) {

            // reg_exp   = new RegExp( `(${q})`, "ig" )
            // has_match = reg_exp.match( note.content )
            // has_match = q.match( note.content )
            has_match = note.content.match( q )
            // note.content = note.content.replace( new RegExp(`(${file})`, 'ig'), `[[${file}]]` )
                if( !has_match ) continue

            result.push( note )
        }

        // FEATURE: Setname
            ilse.cache.set(name, result)

        if( typeof(limit) === "number" ) {
            result.length = limit
            return result
        } else {
            return result
        }
    }

    query( q = "", limit = null ) {

        q = q.toLowerCase()
        let name = "query-" + q

        // FEATURE: O(n)
            if( q === "" ) return this.list

        // FEATURE: Check name Queries( O(n) )
            if( ilse.cache.get(name) ) return ilse.cache.get(name)

        let has_match = false
        let result    = []
        let list      = this.list

        for( const note of list ) {

            has_match = note.$raw.toLowerCase().indexOf( q ) !== -1
                if( !has_match ) continue

            result.push( note )
        }

        // FEATURE: Setname
            ilse.cache.set(name, result)

        if( typeof(limit) === "number" ) {
            result.length = limit
            return result
        } else {
            return result
        }
    }

    /*
    get_recursive( note, payload = [] ) {

        if( !note ) throw new Error( "Notes.js -> ERROR: note not foundk" )

        payload.push( note.content )

        printf( "note.children.length -> ", note.children.length )
        if( note.children.length ) {

            for( let child of note.children ) {
                // printf( "child.content -> ", child.content )
                payload.push( child.content )
                return this.get_recursive( child, payload )
            }

        } else {
            // printf( "payload -> ", payload )
            return payload
        }

    }
    */

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

    /*
    add( content, index = null, depth = 0 ) {
        if( index === null ) index = Number(this.list.length)
        printf( "index -> ", index )
        index = index - 1
        printf( "this.list.length -> ", this.list.length )
        printf( "this.list -> ", this.list )
        printf( "index -> ", index )
        printf( "\b" )

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
    */

    add( content, index = null, depth = 0, options = {} ) {

        let location         = 0
        // if( index === 0 || index === -1 ) location = 0
        if( index === null ) {
            if( this.list.length >= 1 ) {
                location = this.list.length - 1
            } else {
                location = 0
            }
        } else if( index === 0 ) {
             location = this.list.length
        } else {
            location = index
        }

        let time_id          = this.ilse.utils.get_unique_date_id() // 20220120155758
        let spaces           = this.ilse.utils.get_depth_spaces( depth )
        let note             = `${spaces}${time_id}: ${content}` // 20220120155758: Hello, World

        let instance         = new this.ilse.classes.Note( note )
            if( instance.depth >= 1 ) this.recursively_add_children( instance, location )

        if( location === 0 || location === -1 ) {
            this.list.push( instance )
        } else {
            this.list.splice( location, 0, instance )
        }

        Messager.emit( "~notes", "added", { note: instance, index: location, })

        if( options.debug ) debugger

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

    add_list( list ) {

        let number = this.ilse.utils.get_unique_date_id()
        let instance

        list.map( (item, index) => {
            // instance = new this.ilse.classes.Note( `${this.ilse.utils.get_depth_spaces(item.depth)}${number++}: ${item.content}` )
            if( index === 0 ) {
                item = `${ilse.utils.get_unique_date_id()}: ${item}`
                instance = new this.ilse.classes.Note( item )
                this.list.push( instance )
            } else {
                item = `    ${ilse.utils.get_unique_date_id()}: ${item}`
                instance = new this.ilse.classes.Note( item )
                this.list.push( instance )
            }
        })

    }

    /*
    // Removed resolved, have only last
    reference( text, last = "" ) {

        let link            = ilse.notes.get_note_reference( text )
            if( !link ) return `${last} \n\t ${text} `
        let link_content    = ilse.notes.query( link + ":")[0].content

        if( link ) {
            if( last ) {
                // last += `\n ${link_content}`
            } else {
                last += `${text} \n ${link_content} `
            }
        }

        let ref          = ilse.notes.get_note_reference( link_content )

        if( ref ) {
            let target_content  = ilse.notes.query( ref + ":")[0].content
            return this.reference( target_content, last )
        } else {
            return last
        }

    }
    */

    // 20220804160914: - [ ] #ilse Does note embed get its children too??? ![[Ilse]]  ((20220306102411))
    extract_note_references( string ) {

        let chunks      = string.split(" ")
        let references  = []
        let reference

        chunks.map( chunk => {
            reference = this.get_note_reference( chunk )
            if( reference ) references.push( reference )
        })

        return references
    }

    /*
    // 20220804160914: - [ ] #ilse Does note embed get its children too??? ![[Ilse]]  ((20220306102411))
    extract_file_references( string ) {

        let chunks      = string.split(" ")
        let references  = []
        let reference

        chunks.map( chunk => {
            reference = this.get_file_reference( chunk )
            if( reference ) references.push( reference )
        })

        return references
    }
    */

    get_file_references( string ) {


        let list       = ilse.utils.extract_tokens_by_delimiters( string, /\[\[*./, /\]\]/ )
        let to_return  = []
        let extention

        list.map( file => {
            if( file.indexOf(".") === -1 && file.indexOf("!") !== -1 ) to_return.push( file )
        })

        return to_return

        /*
        let chunks = string.split(" ")
        let has_opening_parenthesis
        let has_closing_parenthesis
        let has_both
        let ref
        let is
        let list = []
        printf( "chunks -> ", chunks )

        for( const chunk of chunks ) {

            printf( `chunk: ${chunk} list: ${JSON.stringify(list)}` )
            if( chunk.indexOf("![[") !== -1 ) {
                is = true
            }

            if( is ) list.push( chunk )

            if( chunk.indexOf("]]") !== -1 ) {
                list.push( chunk )
                is = false
            }

        }

        printf( "list.join(' ') -> ", list.join(' ') )
        printf( "\n\n" )

        let no_dup = list.
        return list

        // has_both                 = has_opening_parenthesis && has_closing_parenthesis
        // if( has_both ) ref = chunk.replace( " ", "" ).replace( "![[", "" ).replace( "]]", "" )
        // printf( "Notes.js -> get_file_reference -> string -> ", string )
        // if( ilse.files.list.indexOf( ref + ".md") !== -1 ) {
            // return null
        // } else {
            // return ref
        // }
        */
    }

    get_note_reference( string ) {

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
                // this.get_notes( payload )
            }

        })

    }
}
