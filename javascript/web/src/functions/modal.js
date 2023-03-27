import printf                   from "@/functions/printf.js"

import Messager                 from "@/classes/Messager.js"
import ilse                     from "@/ilse.js"
import get_uuid                 from "@/functions/get_small_unique_string_id.js"

export default function modal( content, styles = {} ) {

    let id   = get_uuid()

    let item = {
        is_modal: true,
        id: id,
        html: `
            <div style="width: 100vw; height: 100vh; background: rgba( 255, 255, 255, 0.3 ); z-index: 3; width: 100%; height: 100%; position: fixed; transform: translate( -50%, -50% ); left: 50%; top: 50%; "  >

                <div id="${id}" style="z-index: 5; opacity: 1; position: fixed; left: 50%; top: 50%; transform: translate( -50%, -50% ); width: ${ styles.width || '90%' }; height: ${ styles.height || 'fit-content' }; max-height: 80%; overflow: auto; border-radius: var( --border-radius ); color: var( --secondary ); background: var( --primary ); padding: 5px; text-align: center; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important; " >
                    ${content}
                </div>

            </div>
            `
    }

    ilse.stack.push( item )

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
