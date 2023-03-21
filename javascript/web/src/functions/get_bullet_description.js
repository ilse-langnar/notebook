import printf                           from "@/functions/printf.js"

import ilse                             from "@/ilse.js"
import get_human_readable_creation_date from "@/functions/get_human_readable_creation_date.js"

export default function get_bullet_description( note_id, note ) {
    let string = get_human_readable_creation_date( note_id )
        string += " from(" + note.source + ")"

    return string
}
