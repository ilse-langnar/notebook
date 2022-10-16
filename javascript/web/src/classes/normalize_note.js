import printf           from "@/classes/printf.js"

import ilse             from "@/ilse.js"
import get_spaces_count from "@/classes/get_spaces_count.js"

export default function normalize_note( id ) {

    let content    = ilse.notes.list[id]
    let len        = content.split("    ").length
    let spaces     = get_spaces_count( len )
    let normalized = `${spaces}${id}: ${content}`

    return normalized
}
