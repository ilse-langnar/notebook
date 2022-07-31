const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Statistics {

    constructor( ilse ) {

        this.ilse       = ilse
        this.statistics = []

        this.setup()
    }

    async setup() {

        let text        = await this.ilse.filesystem.file.read.async( "statistics" )
            if( !text ) return

        let list        = text.split("\n")
            list            = list.filter( e => e ) // BUGFIX: Removes any "" item

        let id, brain, operation, time, item, seen, interest, tags, new_item

        list.map( (item, index) => {

            new_item = item.split(" ")
                id       = new_item.shift()
                id       = id.replace( ":", "" )

            new_item   = new_item.join(" ")

            brain      = new_item.split("/")[1]
            operation  = new_item.split("/")[2]
            time       = new_item.split("/")[3]
                if( typeof( time ) !== Number ) time = Number( time )
            item       = new_item.split("/")[4]

            seen       = new_item.split("/")[5]
                if( typeof( seen ) !== Number ) seen = Number( seen )

            interest   = new_item.split("/")[6]
                if( !interest ) interest = 1
                if( interest )  interest = Number( interest )

            tags       = new_item.split("/")[7]

            this.statistics.push({
                id,
                brain,
                operation,
                time,
                item,
                seen,
                interest,
                tags,
            })

        })

    }

    async save() {

        /*
        let keys = Object.keys(this.priorities)
        let list = []
        let number

        keys.map( key => {
            number = this.priorities[key]
            list.push( `${key}/${number}\n` )
        })

        let normalized_list = list.join("")
        await this.ilse.filesystem.file.set( "priorities", normalized_list )
        */
    }

}
