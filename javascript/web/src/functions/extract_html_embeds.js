import printf                              from "@/functions/printf.js"

import extract_tokens_by_regexp_delimiters from "@/functions/extract_tokens_by_regexp_delimiters.js"

export default function extract_html_embeds( string ) {
    return extract_tokens_by_regexp_delimiters( string, /\!?\[\[/, /\]\]/ ).filter( e => e.indexOf( ".html" ) !== -1 )
}
