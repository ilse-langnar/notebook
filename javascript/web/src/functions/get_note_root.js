import printf                           from "@/functions/printf.js"

import ilse                             from "@/ilse.js"

export default function get_note_root( note_id ) {

    let keys  = Object.keys(ilse.notes.list)

    let index = keys.indexOf( note_id )
        index     -= 1

    let values= Object.values(ilse.notes.list)
    let tick  = 0

    if( ilse.notes.list[note_id].depth === 0 ) { // No Parent
        return ilse.notes.list[note_id].id
    } else {

        while( true ) {
            if( tick >= 500 ) return null // BUGFIX: Avoid infinite loops.
            index -= 1
            tick++
            if( values[index].depth === 0 ) {
                return values[index].id
            }

        }

    }
}
