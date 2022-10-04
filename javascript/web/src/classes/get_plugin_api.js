const printf = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// functions
    import string_to_html               from "@/classes/string_to_html.js"
    import create_window                from "@/classes/create_window.js"
    import html_to_string               from "@/classes/html_to_string.js"
    import has_permission               from "@/classes/has_permission.js"

export default function get_plugin_api( name ) {

    const api = {

        // Messager: Messager,

        notes: has_permission( name, 'notes' )  ? ilse.notes  : null,

        fs: {
            existsSync:    has_permission( name, 'read' )  ? ilse.filesystem.file.exists.sync  : null,
            exists:        has_permission( name, 'read' )  ? ilse.filesystem.file.exists.async : null,
            readdir:       has_permission( name, 'read' )  ? ilse.filesystem.dir.list.async    : null,
            readdirSync:   has_permission( name, 'read' )  ? ilse.filesystem.dir.list.sync     : null,
            readFile:      has_permission( name, 'read' )  ? ilse.filesystem.file.read.async   : null,
            readFileSync:  has_permission( name, 'read' )  ? ilse.filesystem.file.read.sync    : null,
            writeFile:     has_permission( name, 'write' ) ? ilse.filesystem.file.read.sync    : null,
            writeFileSync: has_permission( name, 'write' ) ? ilse.filesystem.file.read.sync    : null,
        },

        dom: function(HTML) { // We have limited what the plugin can do to the DOM. But here's the function you want to do your DOM transformations
            // TODO:
        },

        components: {
            create_window: create_window,
        },

        notify: ilse.notification.send.bind( ilse.notification ),

        keyboard: {
            add: ilse.keyboard.add.bind( ilse.keyboard )
        },

        commands: {
            // add: ilse.commands.add_for_plugin.bind( ilse.commands )
            add: function( args ) {

                args.props.is_plugin = true
                args.props.source    = name

                ilse.commands.add( args )
            }.bind( ilse.commands )
        },

        load: function() {
            let file    = ilse.filesystem.file.read.sync( name )
            let HTML    = string_to_html( file )
            let data    = HTML.getElementById( "data" ) ? HTML.getElementById( "data" ).innerText : {}
            return JSON.parse(data)
        },

        dialog: {
            info:    ilse.dialog.info.bind( ilse.dialog ),
            confirm: ilse.dialog.confirm.bind( ilse.dialog ),
            input:   ilse.dialog.input.bind( ilse.dialog ),
            listing: ilse.dialog.listing.bind( ilse.dialog ),
            close:   ilse.dialog.close.bind( ilse.dialog ),
        },

        save: function( json ) {

            let string          = JSON.stringify( json )
            let file            = ilse.filesystem.file.read.sync( name )

            let HTML            = string_to_html( file ) // mount DOM from string
                HTML.getElementById( "data" ).innerText = string // Change it

            let updated_html    = html_to_string( HTML ) // return to string(Changed)

            ilse.filesystem.file.write.sync( name , updated_html ) // Write

            return json
        }

    }

    return api

}
