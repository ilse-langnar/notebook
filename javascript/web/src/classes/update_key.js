const printf                    = console.log

import ilse                     from "@/ilse.js"

export default function update_key( context ) {
    context.key = Math.random()
    // ilse.keys[name] = Math.random()
    // return ilse.keys[name]
}
