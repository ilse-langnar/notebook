const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"
    // import electron                     from "electron"

// Node.js
    const path                          = require("path")

let electron

export default class Priorities {

    constructor( ilse ) {

        this.ilse       = ilse
        this.priorities = {}

        this.setup()
    }

    async setup() {

        let text        = await this.ilse.filesystem.file.get( "priorities" )
        let list        = text.split("\n")
            list            = list.filter( e => e ) // BUGFIX: Removes any "" item

        let name, number

        list.map( item => {

            name    =  item.split("/")[0]
            number  =  item.split("/")[1]

            this.priorities[name] = Number(number)
        })

    }

    async save() {

        let keys = Object.keys(this.priorities)
        let list = []
        let number

        keys.map( key => {
            number = this.priorities[key]
            list.push( `${key}/${number}\n` )
        })

        let normalized_list = list.join("")
        await this.ilse.filesystem.file.set( "priorities", normalized_list )
    }

}
