const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

class Modals {

    constructor() {

        this.list         = []

        this.setup()
    }

    setup() {
        this.listen()
    }

    has() {
        return !!this.list.length
    }

    add({ id, name, component, props }) {

        let modal = {
            id: id,
            name: name,
            component:  component,
            props: props,
        }

        this.list.push( modal )

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
            id: "create-app",
            name: "Create App",
            component: ilse.types.get( "create-app" ),
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
            props: {
                style: "width: 55%; height: 50%; "
            },
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

        // let first_brain = ilse.types.get( "first-brain" )
        // printf( ">>> first_brain -> ", first_brain )

        // this.add({
            // id: "first-brain",
            // name: "First Brain",
            // component: ilse.types.get( "first-brain" ),
            // props: {},
        // })

        this.add({
            id: "keyboard-shortcut",
            name: "Keyboard Shortcut",
            component: ilse.types.get( "keyboard-shortcut" ),
            props: {},
        })

        this.add({
            id: "importer",
            name: "Importer",
            component: ilse.types.get( "importer" ),
            props: {},
        })

        /*
        this.add({
            id: "search",
            name: "Search",
            component: ilse.types.get( "search" ),
            props: {
                // style: "width: 55%; height: 8%; position: fixed; top: 10%;"
            },
        })
        */

        this.add({
            id: "modals-modals",
            name: "ModalsModals",
            component: ilse.types.get( "modals-modals" ),
            props: {},
        })

        this.add({
            id: "make-extention",
            name: "MakeExtention",
            component: ilse.types.get( "make-extention" ),
            props: {},
        })

        this.add({
            id: "folders",
            name: "Folders",
            component: ilse.types.get( "folders" ),
            props: {},
        })

        this.add({
            id: "debugger",
            name: "Debugger",
            component: ilse.types.get( "debugger" ),
            props: {},
        })

        this.add({
            id: "digital-garden",
            name: "Digital Garden",
            component: ilse.types.get( "digital-garden" ),
            props: {},
        })

    }

    open( id, payload, on_close = null ) {
        printf( "Modals.js -> open -> id -> ", id )
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
