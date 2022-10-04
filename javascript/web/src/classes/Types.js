const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Classes
    import IlseRequire                  from "@/classes/IlseRequire.js"

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
            id: "top-menu",
            name: "Top Menu",
            description: "Top Menu",
            img: this.ilse.irequire.img("menu.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/TopMenu.vue"),
            props: {
                is_internal: true,
                is_hidden: true,
            }
        })

        this.add({
            id: "create-app",
            name: "Create app",
            description: "Create HTML Apps for ilse.",
            img: this.ilse.irequire.img("menu.svg"),
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
            img: this.ilse.irequire.img("calendar.svg"),
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
            img: this.ilse.irequire.img("command.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/CommandPallet.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "test",
            name: "Test",
            description: "",
            img: this.ilse.irequire.img("test-pipe.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Test.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "file",
            name: "File",
            description: "",
            img: this.ilse.irequire.img("file.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/File.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "menu",
            name: "Menu",
            description: "",
            img: this.ilse.irequire.img("menu.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Menu.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "note",
            name: "Note",
            description: "A note editor for a note and its children",
            img: this.ilse.irequire.img("point.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Note.vue"),
            props: {
                is_internal: true,
                note: {},
            }
        })

        this.add({
            id: "edit-note",
            name: "Edit Note",
            description: "Edit a single note",
            img: this.ilse.irequire.img("edit.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/EditNote.vue"),
            props: {
                is_internal: true,
                note: {},
            }
        })

        this.add({
            id: "configuration",
            name: "Configuration",
            description: "Change Configurations",
            img: this.ilse.irequire.img("settings.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Configuration.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "types",
            name: "Types",
            description: "See and set types",
            img: this.ilse.irequire.img("letter-t.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Types.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "help",
            name: "Help",
            description: "Help",
            img: this.ilse.irequire.img("question-mark.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Help.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "type-selection",
            name: "Type Selection",
            description: "List of all of your types",
            img: this.ilse.irequire.img("hand-click.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Types.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "text-file",
            name: "Text File",
            description: "Text File",
            img: this.ilse.irequire.img("file.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/TextFile.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "importer",
            name: "Importer",
            description: "Importers themes, documents, flashcards, css snippets, components plugins and more.",
            img: this.ilse.irequire.img("urgent.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Importer.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "search",
            name: "Search",
            description: "Search notes and files",
            img: this.ilse.irequire.img("lupe.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Search.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "modals-modals",
            name: "ModalsModal",
            description: "A list of all the modals available",
            img: this.ilse.irequire.img("square.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/ModalsModals.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "random-note",
            name: "RandomNote",
            description: "Get a random note, a random note from query or a random note from a file",
            img: this.ilse.irequire.img("dice-3.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/RandomNote.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "right-sidebar",
            name: "RightSidebar",
            description: "Right Sidebar is the component thatt embeds inside the right sidebar",
            img: this.ilse.irequire.img("arrow-narrow-right.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/RightSidebar.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "digital-garden",
            name: "Digital Garden",
            description: "Host your own Digital Garden",
            img: this.ilse.irequire.img("square.svg"),
            type: "vue",
            mode: "inline",
            component: require("@/components/Digital Garden.vue"),
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
