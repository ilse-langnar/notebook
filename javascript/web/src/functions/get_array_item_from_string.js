import printf                           from "@/functions/printf.js"

export default function get_array_item_from_string( array, string ) {

    let len = array.length
    let to_return

    array.map( (item, index) => {
        if( item.indexOf(string) !== -1 ) to_return = item
    })
    printf( "---- to_return -> ", to_return )

    return to_return
}
