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

    send( title, text, {
        theme    = "is-dark",
        type     = "normal",
        time     = 3000,
        on_close = null,
        on_cancel= null }) {

        printf( "1" )

        printf( "theme -> ", theme )
        printf( "type -> ", type )
        printf( "time -> ", time )
        printf( "on_close -> ", on_close )
        printf( "on_cancel -> ", on_cancel )

        let item = {
            title,
            text,

            type,
            theme,
            time,
            on_close,
            on_cancel,
        }
        printf( "@@@@ item -> ", item )
        printf( "2" )

        this.items.push( item )
        printf( "3" )

        this.delete_after_time( item )
        printf( "4" )

        return item
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
