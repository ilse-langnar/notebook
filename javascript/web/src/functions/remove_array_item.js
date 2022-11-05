import printf                           from "@/functions/printf.js"

export default function remove_array_item( array, item ) {
    let index = array.indexOf( item )
    array.splice( index, 1 )

    return array
}
