const printf = console.log

export default function split_array_into_nth_legnth( source, size = 1 ) {

    var arrays = []
    let copy   = source

    while( copy.length > 0 ) {
        arrays.push( copy.splice(0, size) )
    }
    return arrays
}
