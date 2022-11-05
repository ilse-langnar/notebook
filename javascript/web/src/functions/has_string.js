import printf                           from "@/functions/printf.js"

export default function has_string( string, target ) {

    if( string.indexOf( target ) !== -1 ) {
        return true
    } else {
        return false
    }

}
