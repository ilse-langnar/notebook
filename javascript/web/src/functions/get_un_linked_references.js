import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"

export default function get_un_linked_references( file ) {
    let r          = `[^\\[\\[](${file.replace(".md", "")})[^\\]\\]]` // file, but without the [[]]
    let reg_exp    = new RegExp( r, "ig" )
    let result     = ilse.notes.query_regexp( reg_exp )
    return result
}
