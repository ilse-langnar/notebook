const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Cache {

    constructor() {
        this.cache = {}
    }

    set( key, value ) {
        this.cache[key] = value
    }

    get( key ) {
        return this.cache[key]
    }

    clean( key ) {
        delete this.cache[key]
    }

    clear() {
        this.cache = {}
    }

}
