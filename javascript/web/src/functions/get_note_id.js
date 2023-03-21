import printf                           from "@/functions/printf.js"

import get_note_string_id               from "@/functions/get_note_string_id.js"
import get_unique_date_id               from "@/functions/get_unique_date_id.js"


export default function get_note_id() {
    let id   = get_note_string_id(2)
    let date = get_unique_date_id()

    return `${date}${id}`
}
