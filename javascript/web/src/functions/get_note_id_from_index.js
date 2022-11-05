const printf                    = console.log

import ilse                     from "@/ilse.js"

export default function get_note_id_from_index( index ) {
    let keys    = Object.keys( ilse.notes.list )
    let id      = keys[index]
    return id
}
