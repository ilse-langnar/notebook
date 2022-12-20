import printf                       from "@/functions/printf.js"

// give me a note I'll give you the config equivalent for that config.
export default function config_object_to_note( object ) {
    let note = `#config ${JSON.stringify(object)}`
    return note
}
