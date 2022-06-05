const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

class componentTypes {

    constructor() {

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

        /*
        this.add({
            id: "spaced-repetition",
            name: "Spaced Repetition",
            description: "",
            type: "vue",
            component: require("@/components/Plugins/SpacedRepetition.vue"),
            props: {
                is_internal: true,
            }
        })
        */
        /*
        this.add({
            id: "help",
            name: "Help",
            description: "",
            type: "vue",
            component: require("@/components/Help.vue"),
            props: {
                is_internal: true,
            }
        })
        */
        /*
        this.add({
            id: "links",
            name: "Links",
            description: "",
            type: "vue",
            component: require("@/components/Links/Links.vue"),
            props: {
                is_internal: true,
            }
        })
        */

        /*
        this.add({
            id: "templates",
            name: "Templates",
            description: "",
            type: "vue",
            component: require("@/components/Templates/Templates.vue"),
            props: {
                is_internal: true,
            }
        })
        */

        /*
        this.add({
            id: "themes",
            name: "Themes",
            description: "",
            type: "vue",
            component: require("@/components/Themes.vue"),
            props: {
                is_internal: true,
            }
        })
        */

        /*
        this.add({
            id: "link-statistics",
            name: "Link Statistics",
            description: "",
            type: "vue",
            component: require("@/components/Links/Links-Statistics.vue"),
            props: {
                is_internal: true,
            }
        })
        */

        /*
        this.add({
            id: "link-references",
            name: "Link References",
            description: "",
            type: "vue",
            component: require("@/components/Links/Links-References.vue"),
            props: {
                is_internal: true,
            }
        })
        */

        /*
        this.add({
            id: "plugin-menu",
            name: "Plugin Menu",
            description: "",
            type: "vue",
            component: require("@/components/Menu/Plugin.vue"),
            props: {
                is_internal: true,
            }
        })
        */

        // .container.is-2( @click="run_command('ask-for-new-component-name')" )
            // p.is-size-7( v-if="ilse.component && ilse.component.props && ilse.component.props.file" :title="ilse.component.props.file" ) {{ilse.component.props.file}}


        // .container.is-2( @click="run_command('toggle-right-sidebar')" )
            // p.is-size-7( v-if="ilse.component && ilse.component.props && ilse.component.props.file" ) ({{get_file_links().length}} 🔗  )  ( {{get_file_backlinks().length}} ⋘  )

        // .container.is-4
            // p.is-size-7( :title="ilse.status_line.history" ) {{ilse.status_line.status}}

        this.add({
            id: "daily-notes",
            name: "Daily Notes",
            description: "",
            img: require("@/assets/images/calendar.svg"),
            type: "vue",
            component: require("@/components/DailyNotes.vue"),
            props: {
                is_internal: true,
            }
        })

        /*
        this.add({
            id: "right-sidebar",
            name: "Right Sidebar",
            description: "",
            img: require("@/assets/images/calendar.svg"),
            type: "vue",
            component: require("@/components/RightSidebar.vue"),
            props: {
                is_internal: true,
            }
        })
        */

        this.add({
            id: "empty",
            name: "Empty",
            description: "",
            img: require("@/assets/images/calendar.svg"),
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
            img: require("@/assets/images/network.svg"),
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
            img: require("@/assets/images/command.svg"),
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
            img: require("@/assets/images/lupe.svg"),
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
            img: require("@/assets/images/lupe.svg"),
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
            img: require("@/assets/images/lupe.svg"),
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
            img: require("@/assets/images/lupe.svg"),
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
            img: require("@/assets/images/lupe.svg"),
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
            img: require("@/assets/images/atom.svg"),
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
            img: require("@/assets/images/atom.svg"),
            type: "vue",
            component: require("@/components/EditNote.vue"),
            props: {
                is_internal: true,
                note: {},
            }
        })

        this.add({
            id: "interest-repetition",
            name: "Interest Repetition",
            description: "Better Learning",
            img: require("@/assets/images/atom.svg"),
            type: "vue",
            component: require("@/components/InterestRepetition.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "configuration",
            name: "Configuration",
            description: "Change Configurations",
            img: require("@/assets/images/settings.svg"),
            type: "vue",
            component: require("@/components/Configuration.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "statistics",
            name: "Statistics",
            description: "See Statistics",
            img: require("@/assets/images/report.svg"),
            type: "vue",
            component: require("@/components/Statistics.vue"),
            props: {
                is_internal: true,
            }
        })

        this.add({
            id: "types",
            name: "Types",
            description: "See and set types",
            img: require("@/assets/images/letter-t.svg"),
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
            img: require("@/assets/images/letter-t.svg"),
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
            img: require("@/assets/images/letter-t.svg"),
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
            img: require("@/assets/images/letter-i.svg"),
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
            img: require("@/assets/images/letter-i.svg"),
            type: "vue",
            component: require("@/components/FirstBrain.vue"),
            props: {
                is_internal: true,
            }
        })

    }

    get( id ) {

        let types = this.types

        for( const type of types ) {

            if( type.id === id ) {
                // printf( `FOUND: ${id} -> type -> `, type )
                return type
            }
        }

        return null

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
