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
            component: require("@/components/TopMenu.vue"),
            props: {
                is_internal: true,
                is_hidden: true,
            }
        })

        this.add({
            id: "daily-notes",
            name: "Daily Notes",
            description: "",
            img: this.ilse.irequire.img("calendar.svg"),
            type: "vue",
            component: require("@/components/DailyNotes.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "empty",
            name: "Empty",
            description: "",
            img: this.ilse.irequire.img("circle-0.svg"),
            type: "vue",
            component: require("@/components/Empty.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "graph",
            name: "Graph",
            description: "",
            img: this.ilse.irequire.img("network.svg"),
            type: "vue",
            component: require("@/components/Graph.vue"),
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
            component: require("@/components/CommandPallet.vue"),
            props: {
                is_internal: true,
            }
        })

        /*
        this.add({
            id: "search-files",
            name: "Search Files",
            description: "",
            img: this.ilse.irequire.img("lupe.svg"),
            type: "vue",
            component: require("@/components/Search.vue"),
            props: {
                is_internal: true,
            }
        })
        */

        this.add({
            id: "test",
            name: "Test",
            description: "",
            img: this.ilse.irequire.img("test-pipe.svg"),
            type: "vue",
            component: require("@/components/Test.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "tags",
            name: "tags",
            description: "",
            img: this.ilse.irequire.img("hash.svg"),
            type: "vue",
            component: require("@/components/Tags.vue"),
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
            component: require("@/components/Types.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "knowledge-tree",
            name: "KnowledgeTree",
            description: "Knowledge Tree",
            img: this.ilse.irequire.img("tree.svg"),
            type: "vue",
            component: require("@/components/KnowledgeTree.vue"),
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
            component: require("@/components/Types.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "first-brain",
            name: "First Brain",
            description: "Study, Remember, Think and more",
            img: this.ilse.irequire.img("school.svg"),
            type: "vue",
            component: require("@/components/FirstBrain.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "mind-map",
            name: "Mind Map",
            description: "Mind Map",
            img: this.ilse.irequire.img("map.svg"),
            type: "vue",
            component: require("@/components/MindMap.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "keyboard-shortcut",
            name: "Keyboard Shortcut",
            description: "List of keys and what commands they invoke",
            img: this.ilse.irequire.img("keyboard.svg"),
            type: "vue",
            component: require("@/components/KeyboardShortcut.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "memex",
            name: "Memex",
            description: "View Mode",
            img: this.ilse.irequire.img("table.svg"),
            type: "vue",
            component: require("@/components/Memex.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "org-chart",
            name: "Org Chart",
            description: "Org Chart",
            img: this.ilse.irequire.img("tree.svg"),
            type: "vue",
            component: require("@/components/OrgChart.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "table-pan",
            name: "Table Pan",
            description: "It's like a mind map bot downwards",
            img: this.ilse.irequire.img("hand-click.svg"),
            type: "vue",
            component: require("@/components/TablePan.vue"),
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
            component: require("@/components/TextFile.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "query-blocks",
            name: "Query Blocks",
            description: "A list of items",
            img: this.ilse.irequire.img("square.svg"),
            type: "vue",
            component: require("@/components/QueryBlocks.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "spreadsheet",
            name: "Spreadsheet",
            description: "A spreadsheet",
            img: this.ilse.irequire.img("table.svg"),
            type: "vue",
            component: require("@/components/Spreadsheet.vue"),
            props: {
                is_internal: true,
            }
        })


        this.add({
            id: "kanban",
            name: "kanban",
            description: "Kanban Board",
            img: this.ilse.irequire.img("layout-board.svg"),
            type: "vue",
            component: require("@/components/Kanban.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "calendar",
            name: "Calendar",
            description: "Calendar",
            img: this.ilse.irequire.img("calendar.svg"),
            type: "vue",
            component: require("@/components/Calendar.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "favorites",
            name: "Favorites",
            description: "Favorites",
            img: this.ilse.irequire.img("star.svg"),
            type: "vue",
            component: require("@/components/Favorites.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "todos",
            name: "Todos",
            description: "List of notes with '- [ ]' in them ",
            img: this.ilse.irequire.img("square.svg"),
            type: "vue",
            component: require("@/components/Todos.vue"),
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
            component: require("@/components/Importer.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "write",
            name: "Wrtie",
            description: "Write Something (:",
            img: this.ilse.irequire.img("writing.svg"),
            type: "vue",
            component: require("@/components/Write.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "draw",
            name: "Draw",
            description: "Draw",
            img: this.ilse.irequire.img("photo.svg"),
            type: "vue",
            component: require("@/components/Draw.vue"),
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
            component: require("@/components/ModalsModals.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "make-extention",
            name: "MakeExtention",
            description: "Make themes, plugins, css snippets, commands and others extentions.",
            img: this.ilse.irequire.img("square.svg"),
            type: "vue",
            component: require("@/components/MakeExtention.vue"),
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
            component: require("@/components/RandomNote.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "left-sidebar",
            name: "LeftSidebar",
            description: "Left Sidebar is the component thatt embeds inside the left sidebar",
            img: this.ilse.irequire.img("arrow-narrow-left.svg"),
            type: "vue",
            component: require("@/components/LeftSidebar.vue"),
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
            component: require("@/components/RightSidebar.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "folders",
            name: "Folders",
            description: "Select which folder ilse will work with",
            img: this.ilse.irequire.img("folders.svg"),
            type: "vue",
            component: require("@/components/Folders.vue"),
            props: {
                is_internal: true,
            }

        })

        this.add({
            id: "dashboard",
            name: "Dashboard",
            description: "Dashboard: Summary of everything",
            img: this.ilse.irequire.img("dashboard.svg"),
            type: "vue",
            component: require("@/components/Dashboard.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "debugger",
            name: "Debugger",
            description: "Debugger: For Devs",
            img: this.ilse.irequire.img("dashboard.svg"),
            type: "vue",
            component: require("@/components/Debugger.vue"),
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
            if( type.id === id ) to_return = type
        })

        return to_return

    }

    add({ id, name, type, img, component, props }) {

        // BUGCATCH:
            let already_exists = !!this.get(id)
            if( already_exists) throw new Error( `A component type with id ${id} already exists!!` )

        let component_type = {
            id: id,
            name: name,
            type: type,
            img: img,
            props: props,
            component: component,
        }

        // Add
        this.types.push( component_type )

        return component_type

    }

    listen() {

    }

}

export default componentTypes
