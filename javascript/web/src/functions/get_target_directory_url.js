import printf                           from "@/functions/printf.js"

// ilse
    import ilse                         from "@/ilse.js"

// functions
    import is_dev                       from "@/functions/is_dev.js"
    import get_protocol                 from "@/functions/get_protocol.js"

export default function get_target_directory_url() {
    let target_directory = ilse.target_directories[0]
    return `${get_protocol()}${ilse.target_directories[0]}/`
}