import printf                   from "@/functions/printf.js"

import query                    from "@/functions/query.js"

export default function get_linked_references( file ) {
    return query(`[[${file.replace(".md", "")}]]`, null, true ).map( e => e.id )
}
