import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"

export default function add_permission( name, permission ) {

    if( !ilse.config.permissions ) ilse.configpermissions = {} // Make sure it exists
    if( !ilse.config.permissions[name] ) ilse.config.permissions[name] = [] // make sure it exists

    // let has_already = ilse.config.permissions[name].indexOf( permission ) !== -1 // has already?
        // if( has_already ) return

    printf( "adding permission -> ", permission )
    ilse.config.permissions[name].push( permission )

    ilse.config.permissions[name] = [...new Set(ilse.config.permissions[name])] // Remove dups

    ilse.config.save()

    return name
}
