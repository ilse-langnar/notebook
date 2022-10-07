const printf        = console.log

import get_note_depth       from "@/classes/get_note_depth.js"
import get_spaces_count     from "@/classes/get_spaces_count.js"

export default function extract_note_content( string, log = false ) {

    /*
    let chunks = string.split(" ")

    let i

    chunks.map( ( chunk, index ) => {
        if( chunks.indexOf("-") !== -1 && chunks.indexOf(":") !== -1 ) i = index
    })
    chunks.splice( i, 1 )

    if( log ) printf( "chunks -> ", chunks )

    let normalized = chunks.joins(" ")

    if( log ) printf( "normalized -> ", normalized )
*/

    let has_depth = string.indexOf("    ") !== -1
    // if( log ) printf( "extract_note_content -> has_depth -> ", has_depth )

    if( has_depth ) {
        // if( log ) printf( "extract_note_content -> 1 -> " )
        let chunks = string.split("    ")
        let depth  = string.split("    ").length - 1
        let spaces = get_spaces_count( depth )
        let cleaned= chunks.filter(e=>e)[0]
        let content= cleaned.split(": ")
            content.shift()
        let normalized= content.join(": ")

        return `${spaces}${normalized}`
    } else {

        // if( log ) printf( "extract_note_content -> 2 -> " )
        let content    = string.split(": ")
            content.shift() // remove id

        let normalized = content.join(": ")
        return normalized
    }

}
