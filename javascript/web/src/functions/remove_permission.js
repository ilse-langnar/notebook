import printf                       from "@/functions/printf.js"

import ilse                         from "@/ilse.js"

export default function remove_permission( item, permission ) {

    return false
    // if( !ilse.config('permissions') ) ilse.config('permissions', {})  // Make sure it exists
    // if( !ilse.config('permissions')[item] ) ilse.config('permissions')[item] = [] // make sure it exists

    // let index          = ilse.config('permissions')[item].indexOf(permission)
    // let has_permission = index !== -1

    // if( has_permission ) {
        // ilse.config('permissions')[item].splice( index, 1 )
        // if( !ilse.config('permissions')[item] ) delete ilse.config('permissions')[item]
    // }

    ilse.save()

    return item
}
