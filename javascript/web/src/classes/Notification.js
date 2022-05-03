const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"


class Notification {

    constructor() {
        this.items = []
        // this.send({ title: "Title", text: "Description" })
    }

    send(title, text, options = { theme: "is-dark", light: true, time: 3000 } ) {

        let item = {
            title,
            text,
            options,
        }

        this.items.push( item )

        this.delete_after_time( item )

        return item
    }

    delete_after_time( item ) {

        let time  = item.options.time
        setTimeout( () => { this.remove( item ) }, item.options.time )
    }

    remove( item ) {
        let index = this.items.indexOf( item )
            this.items.splice( index, 1 )
    }

    listen() {

        Messager.on( "notification", ( action, value ) => {

        })

    }

}

export default Notification
