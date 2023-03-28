import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// constants
    import SVG_TABLE                     from "@/constants/SVG_TABLE.js"

export default function _require( name, literal) {

    if( literal ) {
        let o = require(name)
        return require(name)
    }

    return `data:image/svg+xml;base64,${SVG_TABLE[name]}`
}
