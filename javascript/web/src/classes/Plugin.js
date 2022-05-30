const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Plugin {

    constructor({ name, index, readme, manifest, options, icon }) {

        this.name       = name
        this.index      = index
        this.icon       = icon

        this.manifest   = manifest
        this.readme     = readme

        this.is_on      = options.is_on
        this.statistics = options.statistics

    }

    add_statistics() {

    }


}
