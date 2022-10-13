const printf                            = console.log

export default function has_string( string, target ) {

    if( string.indexOf( target ) !== -1 ) {
        return true
    } else {
        return false
    }

}
