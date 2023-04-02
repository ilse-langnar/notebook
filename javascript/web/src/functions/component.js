import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"
import render                   from "@/functions/render.js"

// export default function component( id, props = {} ) {
export default function component( id, props = {} ) { // get: component("id") get with props: component("id", {}) set: component("id", "<div> .... </div>")

    let len = arguments.length

    if( len === 0 ) return ilse.components

    if( len === 1 ) {
        let result = render( id, props );
        return result
    }

    if( /* allow more arguments like source*/ len > 1 && typeof(props) === "object" ) {
        let result = render( id, props )
        return result
    }

    if( /* allow more arguments like source*/ len > 1 && typeof(props) === "string" ) {

        props = `<div x-init="Messager.on('component-update'), id => { $el.setAttribute('x-html', api.component(id)) }" > ${props} </div>`
        ilse.components[id] = props

        setTimeout( () => {
            Messager.emit( "component-update", id )
        }, 100 )
    }

}
