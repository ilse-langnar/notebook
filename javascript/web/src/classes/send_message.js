import printf                   from "@/classes/printf.js"

import Messager                 from "@/classes/Messager.js"

export default function send_message( origin, payload ) {
    printf( "send_message -> origin -> ", origin )
    Messager.emit( origin, payload )
}
