import printf                           from "@/functions/printf.js"

export default async function clipboard( text ) {
    let len = arguments.length

    if( len === 0 ) {
        return navigator.clipboard.readText()
    } else {
        return navigator.clipboard.writeText( text )
    }
}
