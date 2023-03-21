import printf                   from "@/functions/printf.js"

import get_note_index           from "@/functions/get_note_index.js"
import get_note_id_by_index     from "@/functions/get_note_id_by_index.js"

export default function get_next_note( id ) {
    return get_note_id_by_index( get_note_index( id ) + 1)
}
