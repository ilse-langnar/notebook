const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Options {

    constructor( ) {
        this.list   = []
        this.setup()
    }

    setup() {

        this.add({
            id: "calendar",
            name: "Calendar",
            description: "Description",
            command: function() { printf( "Hello" ) },
            icon: "calendar.svg",
        })

    }

    add({ id, name, description, command, icon }) {

        let option = {
            id,
            name,
            description,
            command,
            icon,
        }

        this.list.push( option )

        return option
    }

}
