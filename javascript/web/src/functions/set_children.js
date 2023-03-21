import printf                           from "@/functions/printf.js"

export default function set_children( obj, note ) {

    if( !obj ) throw new Error( "set_children.js ERROR: set_children(<obj>, <string>) <obj> is missing!!" )

    note = note.content

    if( note.indexOf("#hidden/child") !== -1 ) {

        let chunks = note.split(" ")
        let tag

        chunks.map( chunk => {
            printf( "chunk -> ", chunk )

            if( chunk.indexOf("#hidden/child") !== -1 ) {

                let child_id  = note.split(": ")[0]
                let note_id   = chunk.replace("#hidden/child/", "").replaceAll("/","")

                if( obj[note_id] ) {
                    obj[note_id].push( child_id )
                } else {
                    obj[note_id] = [ child_id ]
                }

            }

        })
    }

    return null
}
