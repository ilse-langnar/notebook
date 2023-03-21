import printf                   from "@/functions/printf.js"

import Alpine                   from 'alpinejs'

export default function render( key, value, reactive ) {

    let len       = arguments.length
    let is_getter = len === 1

    if( is_getter ) {
        let payload = Alpine.store( key )
        return payload

    } else {


        if( reactive ) {

            return Alpine.store( key, {
                value: value,
                init() {
                    Alpine.effect( () => {
                        let v = this.value
                    })

                }
            })

        } else {
            return Alpine.store( key, value)
        }

    }
}
