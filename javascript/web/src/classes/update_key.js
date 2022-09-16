const printf                    = console.log

import ilse                     from "@/ilse.js"

export default function update_key( name ) {
    ilse.keys[name] = Math.random()
    return ilse.keys[name]
}
