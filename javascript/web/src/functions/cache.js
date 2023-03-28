import printf                       from "@/functions/printf.js"

export default function cache( obj, name, value, half_life = 1000 * 60 ) {

    if( !obj ) throw new Error( "cache() cannot work without arguments!" )
    if( !name ) throw new Error( "cache() cannot work with only the name" )

    let len      = arguments.length
    let is_read  = len === 2
    let is_write = len === 3

    if( is_read ) {
        if( !obj.cache ) obj.cache = {}
        return obj.cache[name]
    }

    if( is_write ) {
        obj.cache[name] = value
        setTimeout( () => { delete obj.cache[name] }, half_life )
        return obj.cache[name]
    }

}
