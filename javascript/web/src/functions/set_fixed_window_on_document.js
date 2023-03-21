import printf                              from "@/functions/printf.js"

import ilse                                 from "@/ilse.js"
import Messager                             from "@/classes/Messager.js"

import store                                from "@/functions/store.js"

export default function set_fixed_window_on_document( html, x, y, options = {
    width: '400px',
    height: '400px'
}) {

    let item = {
        id:   "fixed-" + Math.random().toString().replace("0.", ""),
        html: `
        <div style="background: #fff; border: 1px solid #000; position: fixed; left: ${x}px; top: ${y}px; width: ${options.width}; height: ${options.height}; " >
            <img class="is-pulled-right" style="width: 20px; cursor: pointer;" @click="api.get('stack').pop();" :src="api.require('x.svg')" />
            <hr>
            ${html}
        </div>`
    }

    // ilse.stack.push( item )

    let api = store( "api" )
        api.get('stack').push( item )
        store( "api", api )

    return new Promise((resolve, reject) => {

        Messager.on( "~ilse", ( action, payload ) => {

            if( action === "fixed-window-done" && id === payload.id ) {

                let api = store( "api" )
                api.get('stack').pop()
                store( "api", api )

                // ilse.stack.pop()
                resolve( payload)
            } else if ( action === "rejected" && id === payload.id ){

                let api = store( "api" )
                api.get('stack').pop()
                store( "api", api )

                // ilse.stack.pop()
                reject( payload )
            } else {
                reject( id )
            }

        })
    })

}

/*
import printf                   from "@/functions/printf.js"

import Messager                 from "@/classes/Messager.js"
import ilse                     from "@/ilse.js"
import get_uuid                 from "@/functions/get_small_unique_string_id.js"
import store                    from "@/functions/store.js"

export default function modal( content, x, y, options = { width: "400px", height: "400px" } ) {

    let id   = get_uuid()

    let item = {
        is_modal: true,
        id: id,
        html: `
            <div style="background: #fff; border: 1px solid #000; position: fixed; left: ${x}px; top: ${y}px; width: ${options.width}; height: ${options.height}; "  >
                <img class="is-pulled-right" style="width: 20px; cursor: pointer;" @click="api.stack.pop(); console.log('api.stack -> ', api.stack);" :src="api.require('x.svg')" />
                <hr/>

                <div id="${id}" style="z-index: 5; opacity: 1; position: fixed; left: 50%; top: 50%; transform: translate( -50%, -50% ); width: ${ options.width || '90%' }; height: ${ options.height || 'fit-content' }; max-height: 80%; overflow: auto; border-radius: var( --border-radius ); color: var( --text-color ); background: var( --background-color ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; " >
                    ${content}
                </div>

            </div>
            `
    }

    printf( "item -> ", item )

    let api = store("api")
        api.stack.push( item )
    store( "api", api )

    return new Promise((resolve, reject) => {

        Messager.on( "~ilse", ( action, payload ) => {

            if( action === "modal-done" && id === payload.id ) {
                ilse.stack.pop()
                resolve( payload.input)
            } else if ( action === "rejected" && id === payload.id){
                ilse.stack.pop()
                reject( id )
            } else {
                reject( id )
            }

        })
    })
}
*/
