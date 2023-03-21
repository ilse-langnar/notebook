import printf                   from "@/functions/printf.js"

export default function get_random_array_elements( array, limit = 1 ) {

    if( !array ) throw new Error( "get_random_array_elements( Array(Array), Limit(Numer) ) Array is not defined" )

    let list   = []
    let random

    for( var i = 0; i < limit; i++ ) {
        random = array[Math.floor(Math.random()*array.length)]
        list.push( random )
    }
    return list
}
