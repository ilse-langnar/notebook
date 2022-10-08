const printf                    = console.log

import ilse                     from "@/ilse.js"
import get_spaces_count         from "@/classes/get_spaces_count.js"

export default function get_special_normalized_note( id ) {

    let content     = ilse.notes.list[id]
    let spaces      = get_spaces_count( content.split("    ").length - 1)
    let normalized  = `${spaces}${content}`

    return normalized
}