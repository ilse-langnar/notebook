import printf                   from "@/functions/printf.js"

// f
    import extract_note_id                  from "@/functions/extract_note_id.js"
    import extract_note_content             from "@/functions/extract_note_content.js"

// Takes a string and returns a special note object with their IDs as keys like: { "id1": { "depth": 1, "content": "...", "id": "id..." }, "id2": {}}
export default function note_string_to_object( string ) {

    if( !string ) throw new Error( `Error: note_string_to_object( string ) <string> is empty` )

    // Process note
    let notes      = string.split("\n")
    let obj        = {}

    notes.map( (note, index) => {

        if( !note ) return

        obj[extract_note_id(note)] = {
            content: extract_note_content( note ),
            id:      extract_note_id( note ),
            depth:   note.split("    ").length -1,
        }

    })

    return obj
}
