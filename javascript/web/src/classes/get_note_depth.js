const printf        = console.log

import ilse                         from "@/ilse.js"

export default function get_note_depth( id ) {
    let real  = ilse.notes.list[id]
    let depth = real.split("    ").length - 1
    return depth
}
