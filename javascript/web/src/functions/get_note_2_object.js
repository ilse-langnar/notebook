import printf                               from "@/functions/printf.js"

// Ilse
    import ilse                             from "@/ilse.js"

// f
    import extract_note_id                  from "@/functions/extract_note_id.js"
    import extract_note_content             from "@/functions/extract_note_content.js"

// Takes a string and returns a special note object with their IDs as keys like: { "id1": { "depth": 1, "content": "...", "id": "id..." }, "id2": {}}
export default function get_note_2_object( string, source ) {

    if( !string ) throw new Error( `Error: get_note_2_object( string ) <string> is empty` )

    // Process note
    let notes      = string.split("\n")
    let obj        = {}
    let content, id

    let index      = 0
    notes.map( (note, index) => {


        index++
        if( !note ) return

        content    =  extract_note_content( note )

        let chunks  = note.split(":")
        let id_part = chunks[0]
        obj[extract_note_id(note)] = {
            content: content,
            id:      extract_note_id( note ),
            // depth:   note.split("  ").length -1, // This should only take '  ' from the id part no?
            depth:   id_part.split("  ").length -1,
            source:  source,
        }
    })

    return obj
}
