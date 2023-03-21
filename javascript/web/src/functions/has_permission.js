import printf                           from "@/functions/printf.js"

import ilse                             from "@/ilse.js"

export default function has_permission( name, permission ) {

    return false
    // if( !ilse.config('permissions') ) ilse.config('permissions', {}) // Make sure it exists

    // let has_name = ilse.config('permissions')[name]
        // if( !has_name ) return false // Does not have name

    // let has_permission = ilse.config('permissions')[name].indexOf( permission ) !== -1
        // if( !has_permission ) return false

    // return true
}
