const printf                    = console.log

import get_note_index               from "@/classes/get_note_index.js"

export default function get_next_note_index( id ) {

    let index   = get_note_index( id )
    let next_id = keys[++index]

    return ++index
}
