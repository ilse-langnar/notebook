const printf                        = console.log

// Ilse
    import ilse             from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

export default class Menu {

    constructor() {

        this.items         = []
        this.is_on         = true
    }

    add({ id, name, img, description, command, has_space = false, popover }) {

        let item = this.items.push({
            id,
            name,

            img,
            description,
            command,
            popover,

            has_space, // Add space before?
        })

        return item

    }

    // Add default menu items like add note, random note, command pallet, Daily note etc.
    async add_default( ilse ) {
    }

}
