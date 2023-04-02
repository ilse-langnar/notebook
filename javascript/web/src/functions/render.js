import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"
import keys                     from "@/functions/keys"
import get_uuid                 from "@/functions/get_small_unique_string_id.js"
import store                    from "@/functions/store.js"
import string_to_html           from "@/functions/string_to_html.js"
import html_to_string           from "@/functions/html_to_string.js"

export default function render( name, props = {}, source ) {

    let has_props        = !!keys(props).length
    let id               = "id-" + get_uuid()
        if( has_props ) store( id, { props: props })

    if( /*options.stringify && */ has_props ) {
        props                = JSON.stringify( props )
        props                = props.replaceAll( "\"", "\'" )
    }

    let component_string = ilse.components[name]
        component_string = component_string.replace( `data-ilse-props`, `x-data="$store['${id}']"` )

    if( !component_string ) return `<span> Could not find component named ${name}. ): </span>`

    return component_string
}
