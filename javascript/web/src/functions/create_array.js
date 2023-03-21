import printf                   from "@/functions/printf.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default function create_array( len, fill_with = 0 ) {

    let array = []
    for( var i = 0; i < len; i++ ) {
        array.push( fill_with )

    }
    return array
}
