import printf                   from "@/classes/printf.js"

import ilse                     from "@/ilse.js"

export default function get_note_id_by_index( index ) {
    let keys    = Object.keys( ilse.notes.list )
    return keys[index]
}
