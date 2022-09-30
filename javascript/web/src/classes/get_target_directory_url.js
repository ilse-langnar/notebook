const printf = console.log

// ilse
    import ilse                         from "@/ilse.js"

// functions
    import is_dev                       from "@/classes/is_dev.js"
    import get_protocol                 from "@/classes/get_protocol.js"

export default function get_target_directory_url() {
    return `${get_protocol()}${ilse.target_directories[0]}/`
}
