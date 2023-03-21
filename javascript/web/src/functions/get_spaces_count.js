export default function get_spaces_count( depth ) {

    if( depth === null || depth === undefined ) return ""

    if( depth === 0 ) return ""

    if( depth === 1 ) return "  "

    let spaces = ``
    // Depth
    for(let index = 0; index < depth; index++) {
        spaces  += "  "
    }

    return spaces
}
