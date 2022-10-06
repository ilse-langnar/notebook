const printf                    = console.log

import ilse                     from "@/ilse.js"

export default function query( string ) {
    return ilse.notes.query( string )
}
