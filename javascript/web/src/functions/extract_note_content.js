import printf               from "@/functions/printf.js"

import get_note_depth       from "@/functions/get_note_depth.js"
import get_spaces_count     from "@/functions/get_spaces_count.js"

export default function extract_note_content( string, log = false ) {

    let content    = string.split(": ")
        content.shift() // remove id

    let normalized = content.join(": ")
    return normalized
}
