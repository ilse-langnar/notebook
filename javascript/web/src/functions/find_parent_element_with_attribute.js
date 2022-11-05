import printf                   from "@/functions/printf.js"

export default function find_parent_element_with_attribute( dom, attr ) {

    printf( "find_parent_element_with_attribute -> dom -> ", dom )

    let num = 0

    while( dom.parentNode ) {
        num++
        if( num >= 100 ) return null

        dom = dom.parentNode;

        if ( dom.getAttribute(attr) ) return dom.getAttribute(attr)
    }

    return null
}
