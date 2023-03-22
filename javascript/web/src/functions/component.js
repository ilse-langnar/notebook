import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"
import render                   from "@/functions/render.js"

// export default function component( id, props = {} ) {
export default function component( id, props ) {

    // printf( "(component.js) -> id -> ", id )
    // printf( "(component.js) -> props -> ", props )

    let len = arguments.length
    // printf( ">>>> len -> ", len )
    // printf( "typeof(props) -> ", typeof(props) )

    if( len === 0 ) return ilse.components

    if( len === 1 ) {
        // printf( "(component.js)(getting) len === 1" )
        let result = render( id, props );
        // printf( "result -> ", result )
        return result
    }

    if( len === 2 && typeof(props) === "object" ) {
        // printf( "(component.js)(getting with param) len === 2" )
        let result = render( id, props )
        // printf( "result -> ", result )
        return result
    }

    if( len === 2 && typeof(props) === "string" ) {
        // printf( "(component.js)(setting) len === 2" )

        props = `<div x-init="Messager.on('component-update'), id => { $el.setAttribute('x-html', api.component(id)) }" > ${props} </div>`
        ilse.components[id] = props

        setTimeout( () => {
            Messager.emit( "component-update", id )
        }, 100 )
    }

}
