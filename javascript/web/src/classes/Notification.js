import printf                   from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Constants
    import notification                 from "@/classes/HTML_NOTIFICATION.js"


class Notification {

    constructor() {
        this.items = []
        // this.send({ title: "Title", text: "Description" })
    }

        // this.items.push( item )
    send( title, text, options = { theme: "is-dark", type: "normal", time: 3000, on_close: null, on_cancel: null }) {

        /*
        let item = {
            title,
            text,
            type:       options.type,
            theme:      options.theme,
            time:       options.time,
            on_close:   options.on_close  || function(){},
            on_cancel:  options.on_cancel || function(){},
        }
        */

        let id   = "notification-" + Math.random()
        let html = notification
            .replace( "$title", title )
            .replace( "$description", text )

        ilse.htmls.add( id, html )
        setTimeout( () => { ilse.htmls.remove( id ) }, options.time )
        return id
    }

    delete_after_time( item ) {

        let time  = item.time
        setTimeout( () => {
            this.remove( item )
            item.on_close( item ) // natural on_close call
        }, item.time )
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
