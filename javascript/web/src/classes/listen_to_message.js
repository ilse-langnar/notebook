import printf                   from "@/classes/printf.js"

import Messager                 from "@/classes/Messager.js"

export default function listen_to_message( origin, action ) {

    Messager.on( origin, payload => {
        action( payload )
    })

}
