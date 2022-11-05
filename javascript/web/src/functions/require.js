import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// constants
    import SVG_TABLE                     from "@/constants/SVG_TABLE.js"

export default function require( name ) {
    return `data:image/svg+xml;base64,${SVG_TABLE[name]}`
}
