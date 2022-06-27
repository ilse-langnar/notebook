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

    has() {
        return !!this.modals.length
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

        this.add({
            id: "types",
            name: "Types",
            component: ilse.types.get( "types" ),
            props: {
                style: `background: var( --background-color ); color: var( --text-color );`
            },
        })

        this.add({
            id: "help",
            name: "Help",
            component: ilse.types.get( "help" ),
            props: { },
        })

        this.add({
            id: "command-pallet",
            name: "Command Pallet",
            component: ilse.types.get( "command-pallet" ),
            props: { },
        })

        this.add({
            id: "first-brain-config",
            name: "First Brain Config Modal",
            component: ilse.types.get( "first-brain-config" ),
            props: { },
        })

        this.add({
            id: "type-selection",
            name: "Type Selection",
            component: ilse.types.get( "type-selection" ),
            props: {},
        })

        this.add({
            id: "first-brain",
            name: "First Brain",
            component: ilse.types.get( "first-brain" ),
            props: {},
        })

        this.add({
            id: "keyboard-shortcut",
            name: "Keyboard Shortcut",
            component: ilse.types.get( "keyboard-shortcut" ),
            props: {},
        })

    }

    open( id, payload, on_close = null ) {
        setTimeout( () => { Messager.emit( "modals.vue", "open", {target: id, payload: payload, on_close }) }, 100 )
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
