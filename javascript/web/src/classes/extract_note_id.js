const printf        = console.log

export default function extract_note_id( string ) {
    let id = [string.split(':')[0].trim().replace(':', '')]
    if( id.length ) return id[0]
    return id
}
