const printf                        = console.log

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

export default class Embeds {

    constructor( ilse ) {


        this.list = []

        // if( ilse.config.embeds ) this.hash = ilse.config.embeds
        this.add_default()

    }

    add_default() {

        this.list.push({
            id: "todos",
            fn: function( list ) {

                let limit
                let query
                let result

                // {{todo/[[Gauss]]}}
                if( list.length === 2 )  {
                    limit = 1000
                    query = list[1]
                    result= ilse.notes.query( `- [ ]`, limit )
                }

                // {{todo/2/#ilse}}
                if( list.length === 3 ) {
                    limit = list[1]
                    query = list[2]
                    result= ilse.notes.query( `- [ ]`, limit )
                }

                printf( "result -> ", result )
                result = result.map( e=>e.content )

                return `<span> ${result.join(",")}</span>`
            }
        })

        this.list.push({
            id: "word-count",
            fn: function( list ) {
                let id   = list[1]
                let note = ilse.notes.query( `${id}: ` )[0]
                let len  = note.content.length
                if( id ) {
                    // let content = ilse.notes.get_recursive(note)
                    // printf( ">>>>> content -> ", content )
                    return `<span> <button title="${note.content}" > Words(${note.id}): ${len} </button> </span>`
                } else {
                    return `<span> Please Provide ID: </span>`
                }
            }
        })



    }

    get( id ) {

        let to_return
        this.list.map( item => {
            if( id === item.id ) to_return = item
        })

        return to_return
    }

}
