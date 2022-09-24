const printf = console.log

import get_small_unique_string_id from "@/classes/get_small_unique_string_id.js"

export default function get_note_string_id( num = 1 ) {

    let id = ""
    let list = Array(num)
    list.map( item => {
        id += get_small_unique_string_id()
    })

    printf( "id -> ", id )
    return
}
