import printf                           from "@/classes/printf.js"

// Ilse
    // import ilse                         from "@/ilse.js"

// classes
    // import MessagerFactory             from "@/classes/MessagerFactory.js"
    import Messager                     from "@/classes/Messager.js"

// functions
    import string_to_html               from "@/classes/string_to_html.js"
    import create_window                from "@/classes/create_window.js"
    import html_to_string               from "@/classes/html_to_string.js"
    import add_component                from "@/classes/add_component.js"
    // import has_permission               from "@/classes/has_permission.js"

function has_permission( name, permission, ilse ) {

    if( !ilse.config.permissions ) ilse.config.permissions = {} // Make sure it exists

    let has_name = ilse.config.permissions[name]
        if( !has_name ) return false // Does not have name

    let has_permission = ilse.config.permissions[name].indexOf( permission ) !== -1
        if( !has_permission ) return false

    return true
}

export default function get_plugin_api( name, ilse ) {

    // const Messager = new MessagerFactory()

    // Messager.on( "message", payload => {
        // printf( "get_plugin_api -> payload -> ", payload )
    // })

    // printf( "htmls -> ilse.htmls -> ", ilse.htmls)
    // printf( "ilse.notes -> ", ilse.notes )
    // printf( " name === 'global' -> ", name === 'global' )

    const api = {

        htmls: ilse.htmls,

        store: ilse.store,

        core: ilse.hash,

        info: {
            platform: ilse.platform,
            version:  ilse.env.VUE_APP_VERSION,
            env:      ilse.env,
        },

        languages: ilse.constants.SUPPORTED_LANGUAGES,

        keys: ilse.keyboard.keys,

        plugins: ilse.plugin_manager.list,

        markdown: ilse.markdown,
        add_component: add_component,

        // notes: name === "global" ? ilse.notes.list : (has_permission( name, 'notes', ilse )  ? ilse.notes : null),
        query: ilse.notes.query.bind( ilse.notes ),

        command: function() {}, // todo
        autocomplete: function() {}, // todo
        text_expansion: function() {}, // todo

        require: ilse.require,

        fetch: {
            json: async function( url ) {
                let res     = await fetch( url )
                let json    = await res.json()
                return json
            },
            text: async function( url ) {
                let res     = await fetch( url )
                let text    = await res.text()
                return text
            },
        },

        Messager: Messager,

        // io: {
            // in:   Messager.on.bind( Messager ),
            // out:  Messager.emit.bind( Messager ),
        // },

        clipboard: {
            read:   has_permission( name, 'clipboard', ilse )  ? ilse.clipboard.read  : null,
            write:  has_permission( name, 'clipboard', ilse )  ? ilse.clipboard.write : null,
        },

        fs: {
            existsSync:    has_permission( name, 'read', ilse )  ? ilse.filesystem.file.exists.sync  : null,
            exists:        has_permission( name, 'read', ilse )  ? ilse.filesystem.file.exists.async : null,
            readdir:       has_permission( name, 'read', ilse )  ? ilse.filesystem.dir.list.async    : null,
            readdirSync:   has_permission( name, 'read', ilse )  ? ilse.filesystem.dir.list.sync     : null,
            readFile:      has_permission( name, 'read', ilse )  ? ilse.filesystem.file.read.async   : null,
            readFileSync:  has_permission( name, 'read', ilse )  ? ilse.filesystem.file.read.sync    : null,
            writeFile:     has_permission( name, 'write', ilse ) ? ilse.filesystem.file.read.sync    : null,
            writeFileSync: has_permission( name, 'write', ilse ) ? ilse.filesystem.file.read.sync    : null,
        },

        dom: name === "global" ? null : function(HTML) { // We have limited what the plugin can do to the DOM. But here's the function you want to do your DOM transformations
            // TODO:
        },

        components: {
            create_window: create_window,
        },

        notify: ilse.notification.send.bind( ilse.notification ),

        keyboard: {
            add: ilse.keyboard.add.bind( ilse.keyboard ),
        },

        commands: {
            add: function( args ) {

                args.props.is_plugin = true
                args.props.source    = name

                ilse.commands.add( args )
            }.bind( ilse.commands ),

            list: ilse.commands.commands,
            run: ilse.commands.run.bind( ilse.commands ),
        },

        dialog: {
            info:    ilse.dialog.info.bind( ilse.dialog ),
            confirm: ilse.dialog.confirm.bind( ilse.dialog ),
            input:   ilse.dialog.input.bind( ilse.dialog ),
            listing: ilse.dialog.listing.bind( ilse.dialog ),
            close:   ilse.dialog.close.bind( ilse.dialog ),
        },

        load:  name === "global" ? null : function() {
            let file    = ilse.filesystem.file.read.sync( name )
            let HTML    = string_to_html( file )
            let data    = HTML.getElementById( "data" ) ? HTML.getElementById( "data" ).innerText : {}
            return JSON.parse(data)
        },

        save: name === "global" ? null  : function( json ) {

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
