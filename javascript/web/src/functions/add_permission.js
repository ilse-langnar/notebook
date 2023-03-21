import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"

export default function add_permission( name, permission ) {

    return false

    // if( !ilse.config('permissions') ) ilse.config('permissions', {})  // Make sure it exists
    // if( !ilse.config('permissions')[name] ) ilse.config('permissions')[name] = [] // make sure it exists

    // ilse.config('permissions')[name].push( permission )

    // ilse.config('permissions')[name] = [...new Set(ilse.config('permissions')[name])] // Remove dups

    // ilse.config.save()

    return name
}
