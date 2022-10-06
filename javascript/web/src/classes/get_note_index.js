const printf                    = console.log

import ilse from "@/ilse.js"

export default function get_note_index( id ) {

    let keys    = Object.keys(ilse.notes.list)
    let index   = keys.indexOf(id)
     return index
}
