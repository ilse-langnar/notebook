import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"

export default function get_note( id ) {
    return ilse.notes.list[id]
}
