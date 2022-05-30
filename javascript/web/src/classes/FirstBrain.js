const printf                        = console.log

// Ilse
    import ilse                     from "@/ilse.js"

// Utils
    import Messager                 from "@/classes/Messager.js"

// Utils
    import path                     from "path"

export default class FirstBrain {

    constructor( ilse ) {

        this.ilse  = ilse
        this.queue = []

        this.setup()
    }

    get_last() {
        return this.queue[this.queue.length - 1]
    }

    async setup() {
        let text   = await this.ilse.filesystem.file.get( "queue" )
            this.queue = text.split("\n")
            this.queue = this.queue.filter( e => e ) // BUGFIX: Removes any "" item
        // this.shuffle()
    }

    async show_query( fn ) {

        let has_items = this.queue.length
        if( !has_items ) {
            ilse.notification.send( "Error", "There is nothing in your second brain!" )
            return
        }


        let result
        try {
            result      = await ilse.dialog.input( "First Brain Search", "Example: Cerebral Palsy or via tag: #medicine, double tags #medicine + #research" )
        } catch( e ) {
            throw e
        }

        let input  = result.input
        let list   = this.query( result.input )

        await ilse.dialog.listing( "Result", "Search Result", list, item => {
            fn(item)
        })
    }

    query( q = "" ) {

        let has_match = false
        let result    = []
        let list      = this.queue

        for( const item of list ) {

            has_match = item.indexOf( q ) !== -1
                if( !has_match ) continue

            result.push( item )
        }

        return result
    }

    write() {

    }

    read( item ) {
        // TODO: put it to last.

        let chunks = item.split("/")
            let name = chunks[0]

        let _path = ilse.target_directories[0]
            ilse.electron.ipc.send( "item",
                {
                    op: "read",
                    path: path.join( _path, "first", name )
                }
            )

    }

    read_first() {

        let has_items = this.queue.length
        if( !has_items ) {
            ilse.notification.send( "Error", "There is nothing in your second brain!" )
            return
        }

        // pop
            let first_item  = this.queue[0]
                this.queue.shift()

            this.queue.push( first_item )


        // Open
            let chunks = first_item.split("/")
                let name   = chunks[0]

            let _path  = ilse.target_directories[0]
            ilse.electron.ipc.send( "item",
                {
                    op: "read",
                    path: path.join( _path, "first", name )
                }
            )

        this.save()

    }

    remove() {

        let has_items = this.queue.length
        if( !has_items ) {
            ilse.notification.send( "Error", "There is nothing in your second brain!" )
            return
        }

        // pop
            let index      = this.queue.length - 1
            let last_item  = this.queue[index]
                this.queue.pop()


        // Open
            let chunks = last_item.split("/")
            let _path  = ilse.target_directories[0]
            ilse.electron.ipc.send( "item",
                {
                    op: "delete",
                    path: path.join( _path, "first", chunks[0] )
                }
            )

        this.save()
    }

    async shuffle() {

        let has_items = this.queue.length
        if( !has_items ) {
            ilse.notification.send( "Error", "There is nothing in your second brain!" )
            return
        }

        // Analyze
        let list             = await this.ilse.filesystem.dir.list( "first" )
        let normalized_list  = this.queue.map( item =>  { return item.split("/")[0] })
        let count            = 0
        let has_item

        for( const item of list ) {

            has_item = normalized_list.indexOf( item ) !== -1
            if( !has_item ) {
                count++
                this.queue.push(`${item}/1/`)
            }
        }

        // Shuffle
            this.queue = ilse.utils.shuffle_array( this.queue )
        ilse.notification.send( "Scanned", `Scanned: ${count} new items!` )

        this.save()
    }

    async save() {
        let array   = this.queue
        let queue   = array.join("\n")
        await this.ilse.filesystem.file.set( "queue", queue )
    }

    last() {

        let has_items = this.queue.length
        if( !has_items ) {
            ilse.notification.send( "Error", "There is nothing in your second brain!" )
            return
        }

        // pop
        let index      = this.queue.length - 1
        let last_item  = this.queue[index]

        // Open
        let chunks = last_item.split("/")
        let _path = ilse.target_directories[0]
        ilse.electron.ipc.send( "item",
            {
                op: "read",
                path: path.join( _path, "first", chunks[0] )
            }
        )
    }

    increase() {

        let has_items = this.queue.length
        if( !has_items ) {
            ilse.notification.send( "Error", "There is nothing in your second brain!" )
            return
        }

        let index       = this.queue.length - 1
        let item        = this.queue[index]

        let chunks      = item.split("/")
            let name        = chunks[0]
            let interest    = chunks[1]
                interest    = Number( interest )
            let topics      = chunks[2]


        // Feature: -5/5
        if( interest >= 5 ) return

        let reconstructed   = `${name}/${++interest}/${topics}`
            this.queue.pop()
            this.queue.push( reconstructed )
        this.save()
    }

    decrease() {

        let has_items = this.queue.length
        if( !has_items ) {
            ilse.notification.send( "Error", "There is nothing in your second brain!" )
            return
        }

        let index       = this.queue.length - 1
        let item        = this.queue[index]

        let chunks      = item.split("/")
            let name        = chunks[0]
            let interest    = chunks[1]
                interest    = Number( interest )
            let topics      = chunks[2]


        // Feature: -5/5
        if( interest <= -5 ) return

        let reconstructed   = `${name}/${--interest}/${topics}`
            this.queue.pop()
            this.queue.push( reconstructed )
        this.save()
    }

    async tag() {

        let has_items = this.queue.length
        if( !has_items ) {
            ilse.notification.send( "Error", "There is nothing in your second brain!" )
            return
        }

        let result
        try {
            result      = await ilse.dialog.input( "Topic", "Write the new topic: e.g #linguistics or multiple #linguistics,#math" )
        } catch( e ) {
            throw e
        }

        let input       = result.input
        let count       = input.split("#").length - 1

        let index       = this.queue.length - 1
        let item        = this.queue[index]
            this.queue.pop()

        let chunks      = item.split("/")
            let name        = chunks[0]
            let interest    = chunks[1]
            let topics      = chunks[2]

        if( topics ) {
            topics=`${topics},${input}`
        } else {
            topics=`${input}`
        }

        let reconstructed   = `${name}/${interest}/${topics}/`

        this.queue.push( reconstructed )

        this.save()
    }

}
