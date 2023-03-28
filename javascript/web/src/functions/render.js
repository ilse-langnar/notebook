import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"
import keys                     from "@/functions/keys"
import get_uuid                 from "@/functions/get_small_unique_string_id.js"
import store                    from "@/functions/store.js"
import string_to_html           from "@/functions/string_to_html.js"
import html_to_string           from "@/functions/html_to_string.js"

export default function render( name, props = {}, source ) {

    printf( `(render.js) name: ${name} props: ${JSON.stringify(props)} source: ${source}` )

    console.time( "one" )
    let has_props        = !!keys(props).length
    // let id               = "id-" + get_uuid()
    let id               = "id-" + get_uuid()
        // if( has_props ) store( id, props )
        // if( has_props ) store( id, { props })
        if( has_props ) store( id, { props: props })

    if( /*options.stringify && */ has_props ) {
        props                = JSON.stringify( props )
        props                = props.replaceAll( "\"", "\'" )
    }
    console.timeEnd( "one" )

    // Idea string to HTML and then I pass  a string as x-data?

    console.time( "two" )
    let component_string = ilse.components[name]
    let HTML             = string_to_html( component_string )

    let root             = HTML.body.childNodes[0]
        // printf( "root -> ", root )
        // printf( "root.setAttribute -> ", root.setAttribute )
        // if( root ) root.setAttribute( "data-ilse-component-uuid", name )
    console.timeEnd( "two" )

    console.time( "three" )
    let dom              = HTML.querySelector('[x-data]') // ISSUE: This will automatically init the DOm, this is bad. I need a differentt data-ilse-props or somehting
    // printf( "dom -> ", dom )
    /* makes: api not $store.api */
        // let wrapper          = document.createElement("div")
        // wrapper.setAttribute( "x-data", "{ api: $store.api }" )
        // wrapper.addChildNode( dom )

        if( dom && has_props ) {
            dom.setAttribute( "x-data", `$store['${id}']` ) // Pass Props
        }

    let string           = html_to_string( HTML )
    console.timeEnd( "three" )
    printf( "\n\n\n" )
    return string
    // return second_string
}
