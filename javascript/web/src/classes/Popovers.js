const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

class Popovers {

    constructor() {
        this.items      = []
        this.setup()
    }

    setup() {
        this.listen()
    }

    add_default( ilse ) {

        this.ilse  = ilse
        this.types = ilse.types


        // let component      = ilse.types.get( "test" )


        this.add({
            id: "test",
            name: "Test",
            width: 500,
            position: "bottom",
            activation_event: "click",
            type: "test",
        })

    }

    add({ id, name, width, type, activation_event }) {

        let component      = new this.ilse.classes.Component({
            type: type
        })

        let item        = {
            id,
            name,
            width,
            activation_event,
            component,

        }

        this.items.push( item )

        return item
    }

    listen() {

        Messager.on( "~ilse", ( action, payload ) => {

            if( action === 'loaded' ) {
                this.add_default(payload)
            }

        })

    }

}

export default Popovers
