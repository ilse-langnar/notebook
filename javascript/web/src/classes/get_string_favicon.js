import printf                           from "@/classes/printf.js"

import string_to_html                   from "@/classes/string_to_html.js"
import get_html_favicon                 from "@/classes/get_html_favicon.js"


export default function get_string_favicon( string ) {
    let html    = string_to_html( string )
    let favicon = get_html_favicon( html )
    return favicon
}
