const printf = console.log

export default function add_array_item( array, item, index ) {

    if( index === null ) {
        array.push( item )
    } else {
        array.splice( index, 0, item )
    }
    return array

}