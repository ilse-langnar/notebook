import printf                       from "@/functions/printf.js"

// give me a note I'll give you the config equivalent for that config.
export default function note_to_config( note ) {

    let normalized       = note.split(" ")
        normalized.shift()
        normalized.shift()
        normalized       = normalized.join(" ")

    let config               = JSON.parse( normalized )
        config               = JSON.parse( config )

    return config
}
