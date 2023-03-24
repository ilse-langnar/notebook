import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// constants
    import SVG_TABLE                     from "@/constants/SVG_TABLE.js"

export default function _require( name, literal) {
    printf( "require.js -> name -> ", name, literal, require )
    if( literal ) {
        let o = require(name)
        printf( "##o -> ", o )
        return require(name)
    }
    return `data:image/svg+xml;base64,${SVG_TABLE[name]}`
}
