import printf                   from "@/functions/printf.js"

export default function extract_markdown_tags( etext ) {

    if( !text ) return []
    if( !text.indexOf) return []
    if( text.indexOf("#") === -1 ) return []

    let reg_exp = /#[\w-]*,?[\s]*/
    // let reg_exp = /#[.*][\s]*/

    // let reg_exp = /#[\w-]*,?[\s]*/
    // let reg_exp = /#[\w-?\]*,?[\s]*/

    text        = text.replace( /[\n]+/g, " " )

    let words   = text.split(" ")
    let tags    = []
    let letters

    // Words
    for( let word of words ) {
        if( word.match(reg_exp) ) {

            letters = word.split("#")
            if( letters[1] !== "" ) {
                tags.push( word )
            }
        }
    }

    return tags
}
