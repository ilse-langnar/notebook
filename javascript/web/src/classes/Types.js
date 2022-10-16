import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

class componentTypes {

    constructor( ilse ) {

        this.ilse                       = ilse
        // Init
            this.types                  = []

        // Init
            this.add_default_component_types()
            this.listen()
            this.loaded()
    }

    loaded() {
        // Messager.emit( "~component-types", "loaded", this )
    }

    add_default_component_types() {

        this.add({
            id: "outline",
            name: "Outline",
            description: "Outline",
            img: this.ilse.require("menu.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Outline.vue"),
            props: {
                is_internal: true,
                is_hidden: true,
            }
        })

        this.add({
            id: "create-app",
            name: "Create app",
            description: "Create HTML Apps for ilse.",
            img: this.ilse.require("menu.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/CreateApp.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "daily-notes",
            name: "Daily Notes",
            description: "",
            img: this.ilse.require("calendar.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/DailyNotes.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "command-pallet",
            name: "Command Pallet",
            description: "",
            img: this.ilse.require("command.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/CommandPallet.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "file",
            name: "File",
            description: "",
            img: this.ilse.require("file.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/File.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "left-sidebar",
            name: "Left Sidebar",
            description: "",
            img: this.ilse.require("menu.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/LeftSidebar.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "note",
            name: "Note",
            description: "A note editor for a note and its children",
            img: this.ilse.require("point.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Note.vue"),
            props: {
                is_internal: true,
                note: {},
            }
        })

        this.add({
            id: "configuration",
            name: "Configuration",
            description: "Change Configurations",
            img: this.ilse.require("settings.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Configuration.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "help",
            name: "Help",
            description: "Help",
            img: this.ilse.require("question-mark.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Help.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "search",
            name: "Search",
            description: "Search notes and files",
            img: this.ilse.require("lupe.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Search.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "right-sidebar",
            name: "RightSidebar",
            description: "Right Sidebar is the component thatt embeds inside the right sidebar",
            img: this.ilse.require("arrow-narrow-right.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/RightSidebar.vue"),
            props: {
                is_internal: true,
            }
        })

    }

    get( id ) {

        let types     = this.types
        let to_return = null

        types.map( type => {
            // if( type.id === id ) printf( "type -> ", type )
            if( type.id === id ) to_return = type
        })

        return to_return

    }

    // add({ id, name, type, mode, make_into, img, component, props, }) {
    add( type ) {

        // BUGCATCH:
            let already_exists = !!this.get( type.id )
            if( already_exists) throw new Error( `A component type with id ${type.id} already exists!!` )
        type.key = Math.random().toString().replace( "0.", "" )

        /*
        let struct = {
            id: id,
            name: name,
            type: type,
            mode: mode,
            img: img,
            make_into: make_into,
            props: props,
            component: component,
        }
        */

        // Add
        this.types.push( type )

        return type

    }

    listen() {

    }

}

export default componentTypes
