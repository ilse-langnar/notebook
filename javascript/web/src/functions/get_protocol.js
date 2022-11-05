import printf                       from "@/functions/printf.js"

import ilse                         from "@/ilse.js"

import is_dev                       from "@/functions/is_dev.js"
import get_build_target             from "@/functions/get_build_target.js"

export default function get_protocol() {

    let target      = get_build_target()
    let dev         = is_dev()

    let is_web      = target === "web"
    let is_quine    = target === "quine"
    let is_electron = target === "electron"

    if( is_web || is_quine ) {
        return `file://`
    }

    if( is_electron && dev ) {
        return `app://`
    }

    if( is_electron && !dev ) {
        return `atom://`
    }

    throw new Error( "get_protocol: something went wrong, either the build target is incorrect or the program can't access the environment(dev,prod)." )
}
