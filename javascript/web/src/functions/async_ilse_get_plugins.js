import printf                       from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

const path                       = require("path")

export default async function async_ilse_get_plugins( path_to_plugins ) {

    if( !path_to_plugins ) path_to_plugins = "plugins" + path.join("/")
    if( !ilse.target_directories[0] ) return

    let exists = await ilse.filesystem.dir.exists.async( path_to_plugins ) // BUGFIX: don't have plugin/ folder
        if( !exists ) return

    let files     = await ilse.filesystem.dir.list.async( path_to_plugins ) // get
    let html_list = files.filter( item => item.indexOf(".html") !== -1 ) // filter
    let len       = html_list.length
    let obj       = {} // to fill

    let file
    for( var i = 0; i < len; i++ ) {
        name            = html_list[i]
        file            = await ilse.filesystem.file.read.async( path_to_plugins + name )
        obj[name] = file
    }

    return obj

    // {
        // obj,
        // li,
    // }
}
