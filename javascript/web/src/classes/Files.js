const printf                        = console.log

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

export default class Files {

    constructor( filesystem, ilse ) {

        this.filesystem     = filesystem
        this.ilse           = ilse
        this.list           = []
        this.has_loaded     = false

        this.setup()
    }

    async setup() {
        this.listen()
    }

    async get_files() {
        let files         = await this.filesystem.file.get_all()
        printf( "files -> ", files )
        this.list = files
    }

    listen() {

        Messager.on( "~ilse", async (action, payload) => {

            if( action === "loaded" ) {
                this.get_files( payload )
            }

        })

    }
}
