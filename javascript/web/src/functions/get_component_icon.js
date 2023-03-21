import printf                           from "@/functions/printf.js"

// ilse
    import ilse                         from "@/ilse.js"
    import string_to_html               from "@/functions/string_to_html.js"

export default function get_component_icon( name_or_dom_string ) {

    if( !name_or_dom_string ) return ilse.require("error-404.svg") // BUGFIX:

    let components     = ilse.components

    // let is_base64      = name_or_dom_string.indexOf( ";base64," ) !== -1 // in case of <div data-ilse-icon="base64..." > </div>
        // if( is_base64 ) return name_or_dom_string

    let is_dom_string = name_or_dom_string.indexOf( "<div" ) !== -1
        if( is_dom_string ) {
            let dom           = string_to_html( name_or_dom_string )
            let root          = dom.querySelector( "[data-component-id]" )
                if( !root ) return ilse.require("error-404.svg") // BUGFIX:
            let attr          = root.getAttribute( "data-ilse-icon" )
            return attr
        }

    let content       = components[name_or_dom_string]
    let dom           = string_to_html( content )

    let root          = dom.querySelector( "[data-component-id]" )
        if( !root ) return ilse.require("error-404.svg") // BUGFIX:

    let attr          = root.getAttribute( "data-ilse-icon" )

    return attr
}
