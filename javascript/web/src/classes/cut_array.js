const printf                    = console.log

import ilse                     from "@/ilse.js"

export default function cut_array( array, where ) {
    let copy = [...array]
    return copy.slice( where, copy.length )
}
