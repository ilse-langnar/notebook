import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"

export default function cut_array( array, where ) {
    let copy = [...array]
    return copy.slice( where, copy.length )
}
