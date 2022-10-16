import printf                               from "@/classes/printf.js"


export default function get_note_references_from_string( content ) {

    if( content.indexOf("((") === -1 ) return []

    let chunks      = content.split(" ")
    let list        = []
    let regexp      = /[\s\S]*[(]\((.*)\)[)]/
    let match

    chunks.map( chunk => {
        match = chunk.match( regexp )
        if( match ) list.push( chunk )
    })

    return list
}
