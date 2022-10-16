import printf                   from "@/classes/printf.js"

import ilse                     from "@/ilse.js"
import get_note                 from "@/classes/get_note.js"
import same                     from "@/classes/same.js"

export default function is_note_child( id ) {

    let note = get_note( id )

    if( same(note.depth, 0 ) ) {
        return false
    } else {
        return true
    }

}
