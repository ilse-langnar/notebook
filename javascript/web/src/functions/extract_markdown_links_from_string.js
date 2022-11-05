import printf                                from "@/functions/printf.js"

import extract_tokens_by_regexp_delimiters   from "@/functions/extract_tokens_by_regexp_delimiters.js"

// "Something to [[Write]]" -> [ "Write" ]
export default function extract_markdown_links_from_string( string ) {
    let list  = extract_tokens_by_regexp_delimiters( string,  /^\[\[.*/, /\]\]$/ )
    return list
}
