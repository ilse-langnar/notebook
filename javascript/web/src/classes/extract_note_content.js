const printf        = console.log

export default function extract_note_content( string, log = false ) {

    let content    = string.split(": ")
        content.shift() // remove id
    // Problem: sometimes, we have different levels

    if( log ) printf( "content -> ", content )
    let normalized = content.join(": ")
    if( log ) printf( "normalized -> ", normalized )

    return normalized
}
