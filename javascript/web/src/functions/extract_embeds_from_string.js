import printf                                          from "@/functions/printf.js"

import extract_tokens_by_regexp_delimiters             from "@/functions/extract_tokens_by_regexp_delimiters.js"

export default function extract_embeds_from_string( string ) {

    let list       = extract_tokens_by_regexp_delimiters( string, /\[\[*./, /\]\]/ )
    let to_return  = []
    let extention

    list.map( file => {
        // if( file.indexOf(".") === -1 && file.indexOf("!") !== -1 ) to_return.push( file )
        if( file.indexOf(".html") !== -1 && file.indexOf("![[") !== -1 ) to_return.push( file )
    })

    return to_return
}
