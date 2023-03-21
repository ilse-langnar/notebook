import printf                           from "@/functions/printf.js"

export default function cut_string( string, beg, end ) {
    string = string.split("")
    string = string.splice( beg, end )
    string = string.join("")
    return string
}
