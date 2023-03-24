import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                                 from "@/ilse.js"

// config() = get
// config({}) = set
export default function config( ilse, file ) {

    if( file ) { // set
        let string = JSON.stringify( file, null, 4)
        printf( "set -> string -> ", string )
        ilse.filesystem.file.write.sync( "config.json", string )
    } else { // get

        let exists = ilse.filesystem.file.exists.sync( "config.json" )
            if( !exists ) return {}

        let string = ilse.filesystem.file.read.sync( "config.json" )
        let json

        if( string === "{}" ) {

            json = { // BUGFIX: Don't allow 'empty' config
                tabs: {
                    list: [
                        {
                            id:"main.html",
                            name: "Main Tab",
                            icon: ilse.require("icon.svg"),
                            components: [
                                {
                                    id: "daily-notes.html",
                                    name: "Daily Notes",
                                    is_selected: true,
                                    is_on: true,
                                    props: { days: [] }
                                }
                            ],
                            is_selected: true,
                        }
                    ] // list
                } // tabs
            }
        } else {
            json   = JSON.parse( string )
        }

        return json
    }

}
