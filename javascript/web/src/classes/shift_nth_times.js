
const printf                    = console.log

export default function shift_nth_times( array, times ) {

    let copy = [...array]
    for( var i = 0; i < times; i++ ) {
        copy.shift()
    }

    return copy
}
