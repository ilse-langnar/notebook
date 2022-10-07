const printf = console.log

export default function add_array_item( array, item, index ) {

    if( index === null ) {
        array.splice( index, 0, item )
    } else {
        array.push( item )
    }
    return array

}
