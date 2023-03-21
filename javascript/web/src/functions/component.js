import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"
import render                   from "@/functions/render.js"

export default function component( id, props ) {

    let len = arguments.length

    if( len === 1 ) {
        return render( id, {} );
    }

    if( len === 2 && typeof(props) === "objects" ) {
        return render( id, props )
    }

    if( len === 2 && typeof(props) === "string" ) {

        props = `<div x-init="Messager.on('component-update'), id => { $el.setAttribute('x-html', api.component(id)) }" > ${props} </div>`
        ilse.components[id] = props

        setTimeout( () => {
            Messager.emit( "component-update", id )
        }, 100 )
    }

}
