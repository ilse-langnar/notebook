import printf                   from "@/functions/printf.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default function toggle( item, array ) {

    let index       = array.indexOf( item )
    let has_already = index!== -1

    if( has_already ) {
        // Remove
        array.splice( index, 1 )
    } else {
        // Add
        array.push( name )
    }

}
