import printf                     from "@/classes/printf.js"

import get_small_unique_string_id from "@/classes/get_small_unique_string_id.js"

export default function get_note_string_id( num = 1 ) {

    let id = ""

    for( var i = 0; i < num; i++ ) {
        id += get_small_unique_string_id()
    }

    return id
}
