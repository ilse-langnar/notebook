const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

class Modals {

    constructor() {

        this.modals         = []

        this.setup()
    }

    setup() {
        this.listen()
    }

    add({ id, name, component, props }) {

        let modal = {
            id: id,
            name: name,
            component:  component,
            props: props,
        }

        this.modals.push( modal )

        return modal

    }

    async add_default( ilse ) {

        this.add({
            id: "test",
            name: "name",
            component: ilse.types.get( "test" ),
            props: {},
        })

        this.add({
            id: "empty",
            name: "name",
            component: ilse.types.get( "empty" ),
            props: {},
        })

        this.add({
            id: "configuration",
            name: "Configuration",
            component: ilse.types.get( "configuration" ),
            props: {
                style: `background: var( --background-color ); color: var( --text-color );`
            },
        })

        printf( "ilse.types.get('types') -> ", ilse.types.get('types') )

        this.add({
            id: "types",
            name: "Types",
            component: ilse.types.get( "types" ),
            props: {
                style: `background: var( --background-color ); color: var( --text-color );`
            },
        })

    }

    open( id, payload ) {
        printf( "open -> id, payload -> ", id, payload )
        Messager.emit( "modals.vue", "open", { target: id, payload: payload } )
    }

    close() {
        Messager.emit( "modals.vue", "close" )
    }

    listen() {

        Messager.on( "~ilse", (action, payload) => {

            if( action === 'loaded' ) {
                this.add_default( payload )

            }

        })

        Messager.on( "modals", (action, payload) => {

            if( action === 'create' ) {
            }

        })

    }

}

export default Modals
