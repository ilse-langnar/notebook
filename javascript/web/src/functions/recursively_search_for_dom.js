import printf                           from "@/functions/printf.js"

export default function recursively_search_for_dom( dom, attribute ) {

    let counter = 0
    while( 1 ) {
        if( !dom.parentNode ) return null
        if( dom.getAttribute(attribute) ) return dom
        dom = dom.parentNode
        if( counter >= 100 ) return null // Safe
    }

}
