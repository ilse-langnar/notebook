const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// const clipboardy                   = require( 'clipboardy')

export default class Clipboard {

    constructor() {

        // Main
            this.current        = {}
            this.history        = []
    }

    set( value ) {
        this.current = value
            this.history.push( this.current )
    }

    async write( content ) {
        // clipboardy.write( content )
        return navigator.clipboard.writeText( content )
    }

    async read() {
        // return clipboardy.read()
        return navigator.clipboard.readText()
    }

}
