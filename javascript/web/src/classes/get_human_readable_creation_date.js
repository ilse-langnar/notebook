const printf = console.log

import yyyymmddhhss_to_pretty       from "@/classes/yyyymmddhhss_to_pretty.js"

export default function get_human_readable_creation_date( id ) {

    if( !id ) return ""

    // BUGFIX: Normalize, if is child of another note remove the spaces
    id = id.trim()

    let year        = id.substr( 0, 4 )
    let month       = id.substr( 4, 2 )
    let day         = id.substr( 6, 2 )
    let hour        = id.substr( 8, 2 )
    let seconds     = id.substr( 10, 2 )
    let uuid        = id.substr( 12, 20 ).replace("-", "")

    let date_string = yyyymmddhhss_to_pretty( id )
        date_string     += `${hour}:${seconds}`
        date_string     += `(${uuid})`

    return date_string
}
