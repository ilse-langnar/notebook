const printf = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// classes
    import MessagerFactory             from "@/classes/MessagerFactory.js"

// functions
    import create_window                from "@/classes/create_window.js"

export default function get_plugin_api( name ) {
    printf( "ilse -> ", ilse )

    const Messager = new MessagerFactory()

    const api = {

        // notes: ilse.notes : null,
        notes: null,

        command: function() {}, // todo
        autocomplete: function() {}, // todo
        text_expansion: function() {}, // todo

        messager: {
            on:   Messager.on.bind(Messager),
            emit: Messager.emit.bind(Messager),
        },

        clipboard: {
            // read:   ilse.clipboard.read ,
            // write:  ilse.clipboard.write,
        },

        fs: {
            existsSync:    null,
            exists:        null,
            readdir:       null,
            readdirSync:   null,
            readFile:      null,
            readFileSync:  null,
            writeFile:     null,
            writeFileSync: null,
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
            }.bind( ilse.commands ),
            run: ilse.commands.run.bind( ilse.commands ),
        },

        dialog: {
            info:    ilse.dialog.info.bind( ilse.dialog ),
            confirm: ilse.dialog.confirm.bind( ilse.dialog ),
            input:   ilse.dialog.input.bind( ilse.dialog ),
            listing: ilse.dialog.listing.bind( ilse.dialog ),
            close:   ilse.dialog.close.bind( ilse.dialog ),
        },

    }

    printf( "get_global_api -> api -> ", api )

    return api

}
