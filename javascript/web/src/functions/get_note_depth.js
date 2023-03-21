import printf                       from "@/functions/printf.js"

import ilse                         from "@/ilse.js"

export default function get_note_depth( id ) {
    let real  = ilse.notes.list[id].content
    let depth = real.split("  ").length - 1
    // let depth = real.split("    ").length
    return depth
}
