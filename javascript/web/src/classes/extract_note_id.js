import printf                           from "@/classes/printf.js"

export default function extract_note_id( string ) {
    let id = string.split(': ')[0].trim().replace(':', '')
    return id
}
