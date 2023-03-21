import printf                   from "@/functions/printf.js"

export default function set_dom_x_attr_data() {

    let string_props     = JSON.stringify( props )
    let normalized_props = string_props.replaceAll( "\"", "'" )

    let dom              = document.getElementById( id )
    if( dom ) dom.setAttribute( "x-data", normalized_props )

    return dom
}
