import printf                       from "@/functions/printf.js"

import ilse                         from "@/ilse.js"

export default function remove_permission( item, permission ) {

    // printf( "1" )
    if( !ilse.config.permissions ) ilse.configpermissions = {} // Make sure it exists
    // printf( "2" )
    if( !ilse.config.permissions[item] ) ilse.config.permissions[item] = [] // make sure it exists

    // printf( "3" )
    // printf( "ilse.config.permissions -> ", ilse.config.permissions )
    // printf( "ilse.config.permissions[item] -> ", ilse.config.permissions[item] )
    let index          = ilse.config.permissions[item].indexOf(permission)
    // printf( "4" )
    let has_permission = index !== -1
    // printf( "5" )

    if( has_permission ) {
        ilse.config.permissions[item].splice( index, 1 )
        if( !ilse.config.permissions[item] ) delete ilse.config.permissions[item]
    }

    ilse.config.save()

    return item
}
