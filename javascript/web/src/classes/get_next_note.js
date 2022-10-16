import printf                   from "@/classes/printf.js"

import get_note_index           from "@/classes/get_note_index.js"
import get_note_id_by_index     from "@/classes/get_note_id_by_index.js"

export default function get_next_note( id ) {
    return get_note_id_by_index( get_note_index( id ) + 1)
}
