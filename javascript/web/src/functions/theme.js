import printf                           from "@/functions/printf.js"

import ilse                             from "@/ilse.js"
import string_to_html                   from "@/functions/string_to_html.js"

export default function theme( id, style ) {

    // theme( id )
    if( !style ) {
        let applied_styles = document.querySelectorAll( "[data-ilse-theme]" )

        for( var i = 0; i < applied_styles.length; i++ ) {
            if( applied_styles[i].getAttribute("data-ilse-theme") === id ) return applied_styles[i]
        }

    } else {

        let dom           = document.createElement( "style" )
            dom.textContent   = style
            dom.id            = id
            dom.setAttribute( "data-ilse-theme", id )

        document.body.appendChild( dom )
    }

}
