const printf = console.log

import ilse from "@/ilse.js"

export default function has_permission( name, permission ) {

    printf( "has_permission.js -> name -> ", name )
    printf( "has_permission.js -> permission -> ", permission )
    printf( "ilse.config.permissions -> ", ilse.config.permissions )
    if( !ilse.config.permissions ) ilse.config.permissions = {} // Make sure it exists

    let has_name = ilse.config.permissions[name]
    printf( "has_name -> ", has_name )
        if( !has_name ) return false // Does not have name

    printf( "ilse.config.permissions[name] -> ", ilse.config.permissions[name] )
    let has_permission = ilse.config.permissions[name].indexOf( permission ) !== -1
    printf( "has_permission -> ", has_permission )
        if( !has_permission ) return false

    return true
}
