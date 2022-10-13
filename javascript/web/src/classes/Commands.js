const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

// functions
    import is_dev                       from "@/classes/is_dev.js"
    import create_window                from "@/classes/create_window.js"
    import get_target_directory_url     from "@/classes/get_target_directory_url.js"
    import html_to_string               from "@/classes/html_to_string.js"
    import get_plugin_api               from "@/classes/get_plugin_api.js"
    import has                          from "@/classes/has.js"
    import if_else                      from "@/classes/if_else.js"

class Commands {

    // TODO: ask-delete-this-component/tab/container -> this -> focused
    // TODO: Increase component width -> set-component-width -> set-component
    constructor( ilse ) {
        this.ilse         = ilse
        this.commands     = []
        this.last_command = {}
        this.setup()
    }

    setup() {
        this.set_default_commands()
    }

    add_for_plugin({  id, name, icon, source, description, fn, props = {} }) {
        props.is_plugin = true
        props.source    = source
        this.add({ id, name, icon, description, fn, props })
    }


    add({ id, name, icon, description, fn, props = {} }) {

        props.is_plugin = !!props.is_plugin

        if( props.is_plugin ) {
            icon = icon ? icon : "plugin.svg"
        } else {
            icon = icon ? icon : "command.svg"
        }

        let command = {
            id: id,
            icon: icon,
            fn: fn,
            description: description,
            name: name,
            props: props,
        }

        // Check for duplicates
            let id_list = this.commands.map( command => {
                return command.id
            }).filter( e => e )

            let is_duplicated = id_list.indexOf(id) !== -1
            // dup, don't add
                if( is_duplicated ) return null

        // If not dup, then push
        this.commands.push( command )

        return command
    }

    resolve_name( name ) {

        let selected
        this.commands.map( command => {
            if( command.name === name ) {
                selected = command
                return
            }
        })

        return selected
    }

    get( id ) {

        let commands = this.commands

        for( let command of commands ) {
            if( command.id === id ) return command
        }

        return null
    }

    // USE: let payload = args[0]
    run( id, ...args ) {

        if( !id ) throw new Error( "Commands.js -> run(<id>) <id> is not defined, it should be a string with the id of the command " )

        let command = this.get( id )
        if( command.props.is_plugin ) window.ilse = get_plugin_api( command.props.source )

        if( command && command.fn ) {
            command.fn( args )
        }

        this.last_command = { id, args }
        Messager.emit( "~commands", "exec", id )

    }

    // get_command_shortcuts("read-first-brain") -> [ "command+space v k" ]
    get_command_shortcuts( id ) {

        let list  = ilse.keyboard.keys
        let found = []

        list.map( item => {
            if( item.command === id ) found.push( item.combo )
        })

        return found
    }

    add_components_commands() {

        let _this = this
        let components = this.ilse.types.types

        components.map( component => {

            this.commands.push({

                id: `open-${component.name}`,
                icon: "tech-box.svg",
                fn: function() {
                    let _component = _this.ilse.types.get( component.id )
                        ilse.components.push( _component )
                },
                description: `Will open: ${component.name}`,
                name: `Open: ${component.name}`,

            })

        })

    }

    set_default_commands() {

        let _this    = this

        let commands = [

            {
                id: "void",
                icon: "mood-empty.svg",
                fn: function() { },
                description: "Void",
                name: "Void",
                props: {},
            },

            {
                id: "open-command-pallet-modal",
                fn: function() {
                    ilse.modals.open( "command-pallet" )
                },
                description: "Open Command Pallet Modal",
                name: "Open Command Pallet Modal",
                props: {},
            },

            {
                id: "autocomplete",
                fn: function() {
                    printf( "autocomplete" )
                    let dom = document.activeElement
                        printf( "dom -> ", dom )
                },
                description: "Autocomplete for common names.",
                name: "Autocomplete",
                props: {},
            },

            {
                id: "create-app",
                fn: function() {
                    ilse.modals.open( "create-app" )
                },
                description: "Create App for ilse",
                name: "Create App",
                props: {},
            },

            {
                id: "repeat-last-command",
                fn: function() {
                    _this.run( _this.last_command.id, _this.last_command.args )
                },
                description: "Will repeat the last command with all of its arguments",
                name: "Repeat Last Command",
                props: {},
            },

            {
                id: "open-modal-of-bad-notes",
                fn: function() {
                    // TODO
                },
                description: "Open Command Pallet Modal",
                name: "Open Command Pallet Modal",
                props: {},
            },

            {
                id: "toggle-dark-mode",
                icon: "moon-stars.svg",
                fn: function() {
                    ilse.config.dark = !ilse.config.dark
                    ilse.config.save()
                },
                description: "Will turn on if it's off, and off if it's on",
                name: "Toggle Dark Mode",
                props: {},
            },

            {
                id: "open-keyboard-shortcuts-modal",
                icon: "keyboard.svg",
                fn: function() {
                    ilse.modals.open( "keyboard-shortcut" )
                },
                description: "Will open modal with the list of shortcuts",
                name: "Open Keyboard Shortcuts Modal",
                props: {},
            },

            {
                id: "open-types-selection",
                icon: "letter-t.svg",
                fn: function() {
                    ilse.modals.open( "type-selection" )
                },
                description: "Will open a modal with a list of <Types>",
                name: "Open Type Selection",
                props: {},
            },

            {
                id: "save",
                icon: "save.svg",
                fn: function() {
                    ilse.save()
                },
                description: "Will save: bullets, config etc.",
                name: "Save",
                props: {},
            },

            {
                id: "reload-plugins",
                icon: "moon-stars.svg",
                fn: function() {
                    ilse.plugin_manager.load()
                    ilse.notification.send( "Reloaded", "Plugins Reloaded" )
                },
                description: "Will re-load all plugins",
                name: "Reload Plugins",
                props: {},
            },

            /*
            {
                id: "first-brain-read",
                fn: function() {
                    ilse.brains.first.read_first()
                },
                description: "Will read an item from first brain",
                name: "First Brain: Read",
                props: {},
            },

            {
                id: "first-brain-shuffle",
                fn: function() {
                    ilse.brains.first.shuffle()
                },
                description: "Will shuffle your queu",
                name: "First Brain: Shuffle",
                props: {},
            },

            {
                id: "first-brain-open-last",
                fn: function() {
                    ilse.brains.first.last()
                },
                description: "Will open the last time",
                name: "First Brain: Open Last",
                props: {},
            },

            {
                id: "first-brain-increase",
                fn: function() {
                    ilse.brains.first.increase()
                },
                description: "Will increase interest interet on last item",
                name: "First Brain: Increase",
                props: {},
            },

            {
                id: "first-brain-decrease",
                fn: function() {
                    ilse.brains.first.decrease()
                },
                description: "Will decrease interest interet on last item",
                name: "First Brain: Decrease",
                props: {},
            },
            */

            {
                id: "open-help-modal",
                icon: "lifebuoy.svg",
                fn: function() {
                    ilse.modals.open( "help" )
                },
                description: "Will open the help modal",
                name: "Open Help Modal",
                props: {},
            },

            {
                id: "open-configuration-modal",
                icon: "settings.svg",
                fn: function() {
                    ilse.modals.open( "configuration" )
                },
                description: "Will open the configuration modal",
                name: "Open Configuration Modal",
                props: {},
            },

            /*
            {
                id: "open-first-brain-modal",
                fn: function() {
                    ilse.modals.open( "first-brain" )
                },
                description: "Will open the all-in-one first-brain modal",
                name: "Open First Brain Modal",
                props: {},
            },
            */

            {
                id: "new-note",
                icon: "point.svg",
                fn: async function() {
                    let payload = await ilse.dialog.input( "New note", "Content:" )
                    let input   = payload.input
                    let index   = ilse.notes.list.length
                        ilse.notes.add( input )
                },
                description: "Will open a prompt for a new note",
                name: "New Note",
                props: {},
            },

            {
                id: "add-new-line",
                fn: async function() {
                    printf( "Command.js -> void:add-new-line" )
                },
                description: "Add new line",
                name: "Add New Line",
                props: {},
            },

            {
                id: "open-textarea-search",
                fn: async function() {

                    let dom = document.activeElement
                        if( !dom ) return

                    let id = dom.id
                        if( !id ) return
                    let note = ilse.notes.query( `${id}: ` )[0]
                    Messager.emit( "~note.vue", "open-search", { target: note.id, type: "files" } )

                },
                description: "",
                name: "Open Textarea Search",
                props: {},
            },

            {
                id: "open-note-search",
                fn: async function() {

                    let dom = document.activeElement
                        if( !dom ) return

                    let id = dom.id
                        if( !id ) return

                    let note = ilse.notes.query( `${id}: ` )[0]

                    Messager.emit( "~note.vue", "open-search", { target: note.id, type: "notes" } )

                },
                description: "",
                name: "Open Textarea Search",
                props: {},
            },


            /*
            {
                id: "first-brain-tag-add",
                fn: async function() {
                    ilse.brains.first.tag()
                },
                description: "Add a tag to the last item on your first brain",
                name: "First Brain: Add Tag",
                props: {},
            },

            {
                id: "first-brain-tag-remove",
                fn: async function() {
                    ilse.brains.first.tag()
                },
                description: "Remove a tag to the last item on your first brain",
                name: "First Brain: Remove Tag",
                props: {},
            },
            */

            {
                id: "toggle-resize-mode",
                fn: async function() {
                    ilse.config.is_resize_mode_on = !ilse.config.is_resize_mode_on
                    ilse.config.save()
                    setTimeout( () => { window.location.reload() }, 1000 )
                },
                description: "Toggle Resize Mode",
                name: "Toggle Resize Mode",
                props: {},
            },

            {
                id: "set-default-mode",
                icon: "logo.svg",
                fn: async function() {

                    if_else(
                        not(
                            has( ilse.modes, "ilse" )
                        ),
                        yes => {
                            ilse.modes.push( "ilse" )
                            ilse.config.modes = [ "ilse" ]
                            ilse.config.save()
                        }
                    )

                },
                description: "Set Default Mode",
                name: "Set Default Mode",
                props: {},
            },



            {
                id: "open-search-modal",
                icon: "lupe.svg",
                fn: async function() {
                    ilse.is_search_on = !ilse.is_search_on
                    printf( "ilse.is_search_on -> ", ilse.is_search_on )
                },
                description: "Open Search Modal",
                name: "Open Search Modal",
                props: {},
            },

            {
                id: "open-modal-list",
                fn: async function() {
                    ilse.modals.open( "modals-modals" )
                },
                description: "List of all modals",
                name: "Open Modal List",
                props: {},
            },

            {
                id: "toggle-zen-mode",
                icon: "yin-yang.svg",
                fn: async function() {
                    // ilse.config.is_zen  = !ilse.config.is_zen
                    // ilse.is_zen         = !ilse.config.is_zen
                    ilse.is_zen = ilse.config.is_zen = !ilse.config.is_zen
                    ilse.config.save()
                },
                description: "Will toggle zen mode",
                name: "Toggle Zen Mode",
                props: {},
            },

            {
                id: "rotate-theme",
                fn: async function() {
                    // let themes =ilse.notes.query('#i/theme/')
                },
                description: "Go to the next theme available",
                name: "Rotate theme",
                props: {},
            },

            {
                id: "reset-theme",
                fn: async function() {
                    ilse.themes.apply_default_theme()
                },
                description: "Will reset the theme to the default theme",
                name: "Reset Theme",
                props: {},
            },

            {
                id: "open-make-extention-modal",
                fn: async function() {
                    ilse.modals.open("make-extention")
                },
                description: "Open make extention modal",
                name: "Open Make Extention Modal",
                props: {},
            },

            {
                id: "import-plugin-from-url",
                icon: "packge-import.svg",
                fn: async function() {
                    let payload = await ilse.dialog.input( "Import Plugin", "url:" )
                    let url     = payload.input
                    ilse.plugin_manager.import_from_url( url )
                },
                description: "Import Plugin from URL",
                name: "Import Plugin from URL",
                props: {},
            },

            {
                id: "toggle-left-sidebar",
                fn: async function() {
                    // ilse.is_left_sidebar_open = !ilse.is_left_sidebar_open
                    ilse.left_sidebar = "default"
                },
                description: "Toggle Left Sidebar",
                name: "Toggle Left Sidebar",
                props: {},
            },

            {
                id: "toggle-right-sidebar",
                fn: async function() {
                    ilse.is_right_sidebar_open = !ilse.is_right_sidebar_open
                },
                description: "Toggle Right Sidebar",
                name: "Toggle Right Sidebar",
                props: {},
            },

            {
                id: "print-keys",
                fn: async function() {
                    printf( "ilse.keyboard -> ", ilse.keyboard )
                },
                description: "Printf Keys",
                name: "Printf Keys",
                props: {},
            },

            {
                id: "insert-random-text",
                fn: async function() {
                    const dom       = document.activeElement
                    dom.innerText  += `<button onclick="alert('Hello, World')" > Hello, World </button>`
                    // dom.onkeypress = function(){ return false }
                },
                description: "Printf Keys",
                name: "Printf Keys",
                props: {},
            },

            /*
            {
                id: "open-drawing-board",
                fn: async function() {

                    // let url
                    // if( is_dev() ) {
                        // url = `app://${ilse.target_directories[0]}/signature-pad.html`
                    // } else {
                        // url = `atom://${ilse.target_directories[0]}/signature-pad.html`
                    // }

                    create_window({ title: "Simple Draw", html: "signature-pad.html" })

                    // let frame   = ilse.frame.create({
                        // title: 'Draw',
                        // appearanceName: 'yosemite',//Now preset is selectable from  'yosemite','redstone','popup'
                        // left: 200, top: 200, width: 600, height: 400,
                        // movable: true,//Enable to be moved by mouse
                        // resizable: true,//Enable to be resized by mouse
                        // // html: `<iframe src="${url}" style="width: 100%; height: 100%; overflow: hidden; "> </iframe>`
                        // url: url,
                    // })

                    // frame.show()
                },
                description: "Will Open a drawing board for you to draw",
                name: "Open Drawing Board",
                props: {},
            },
            */

            {
                id: "open-website-on-window",
                fn: async function() {

                    let clip    = await ilse.clipboard.read()
                    let is_url  = clip && clip.indexOf("http") !== -1 || clip.indexOf("ftp://") !== -1 || clip.indexOf("file://") !== -1
                    let url

                    if( clip && is_url ) {
                        url = clip
                    } else {
                        let payload = await ilse.dialog.input( "Query", "Type:" )
                        url         = payload.input
                    }

                    create_window({ title: "Browse", url: url })

                },
                description: "Will open a new query windows based on your choice.",
                name: "Open new Query",
                props: {},
            },

            {
                id: "open-external-website-on-window",
                fn: async function() {
                    let payload   = await ilse.dialog.input( "Query", "Type:" )
                    let full_path = payload.input
                    create_window({ title: `${full_path}(Website)`, external: true, url: full_path })
                },
                description: "Will open a new query windows based on your choice(External).",
                name: "Open External Website",
                props: {},
            },

            {
                id: "open-html-on-window",
                fn: async function() {

                    let payload   = await ilse.dialog.input( "Query", "Type:" )
                    let full_path = payload.input
                    create_window({ title: `${full_path}(HTML)`, url: full_path })

                },
                description: "Will open a new query windows based on your choice.",
                name: "Open HTML",
                props: {},
            },

            {
                id: "open-vim",
                fn: async function() {
                    printf( "open vim" )
                    create_window({ title: "Vim", id: "ll", html: `vim/index.html` })
                },
                description: "Will open vim in a floating window",
                name: "Open Vim",
                props: {},
            },

            {
                id: "focus-quick-search",
                fn: async function() {
                    let dom   = document.getElementById( "quick-search" )
                    if( dom ) {
                        dom.focus()
                        setTimeout( () => { dom.value = "" }, 1 )
                    }
                },
                description: "Focus Quick Search",
                name: "Focus Quick Search",
                props: {},
            },

            {
                id: "copy-image-path",
                fn: async function() {

                    // document.body.style.cursor = "crosshair !important"
                    document.body.style.cursor = "crosshair";


                    document.body.addEventListener( "click", on_click )
                    async function on_click( event ) {


                        printf( "event.target -> ", event.target )
                        printf( "event.target -> ", event.target.tagName)
                        if( event.target.tagName === "IMG" ) {
                            printf( "tagname -> ", event.target )
                            printf( "tagname -> ", event.target.src )
                            await ilse.clipboard.write( event.target.src )
                            ilse.notification.send( "Copied", event.target.src )
                        }
                        document.body.style.cursor = "auto"
                        document.body.removeEventListener( "click", on_click )
                    }

                },
                description: "Click on a image to get it's full path",
                name: "Copy Image Path",
                props: {},
            },

            {
                id: "open-random-note",
                fn: async function() {
                    let random= notes[Math.floor(Math.random()*notes.length)]
                },
                description: "Will open a random note",
                name: "Open Random Note",
                props: {},
            },

            {
                id: "open-new-query",
                fn: async function() {

                    // dialog
                    let payload = await ilse.dialog.input( "Query", "Type:" )
                    let input   = payload.input

                    let frame   = ilse.frame.create({
                        title: 'Query',
                        left: 200, top: 200, width: 320, height: 220,
                        movable: true,//Enable to be moved by mouse
                        resizable: true,//Enable to be resized by mouse
                        url: `app://${ilse.target_directories[0]}/html-table.html`,//URL to display in iframe
                        // html: '<div id="my_element" style="padding:10px;font-size:12px;color:darkgray;">Contents of window</div>'
                    })

                    frame.show()

                },
                description: "Will open a new query windows based on your choice.",
                name: "Open new Query",
                props: {},
            },

            {
                id: "check-clipboard",
                fn: async function() {

                    let string
                    try {
                        string         = await ilse.clipboard.read()
                    } catch( e ) {}

                    if( !string ) {
                        this.is_on = false
                        return
                    }

                    let is_importing   = string.indexOf("#i/theme/") !== -1 || string.indexOf("#i/plugin/") !== -1 || string.indexOf("#i/template/") !== -1
                    if( !is_importing ) {
                        this.is_on = false;
                        return
                    }

                    ilse.modals.open( "importer" )
                },
                description: "Check Clipboard",
                name: "Check Clipboard",
                props: {},
            },

            {
                id: "export-quine",
                icon: "plant.svg",
                fn: async function() {
                    printf( "export-quine: TODO" )
                    /*
                    let o = await fetch("https://raw.githubusercontent.com/ilse-langnar/notebook/dev/javascript/quine/index.html")
                    printf( "o -> ", o )
                    let text = await o.text()
                    printf( "text -> ", text )

                    let filesystem = {
                        "/": {
                            "notes": "",
                            "queue": "",
                            "statistics": "",
                            "priorities": "",
                            "config.json": JSON.stringify( ilse.config.get_normalized_config() ),
                            "second/": { },
                            "first/": { },
                            ".trash/": { },
                            "plugins/": { },
                        }
                    }
                    printf( "filesystem -> ", filesystem )

                    text = text.replace( "<div id=\"app\"> </div>", `<div id="app"> </div>
                    <div id="db">
                        ${JSON.stringify(filesystem)}
                    </div>
                    `)
                    printf( "text -> ", text )

                    ilse.utils.download_text( text, "index.html" )
                    */
                },
                description: "Export Quine",
                name: "Export Quine",
                props: {},
            },


            /*
            {
                id: "aaaa",
                fn: async function() {
                    // let result
                    // let text
                    // const els  = [...document.getElementsByTagName('script')];
                    // let list   =[]
                    // els.map( item => { list.push( item ) })

                    // let res  = await fetch({url: "https://github.com/ilse-langnar/notebook/releases/download/1.1.2/index.html", mode: "no-cors"})
                    // let text = await res.text()
                    // printf( "text -> ", text )


                    let html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title> Ilse Langnar's Notebook</title>
    </head>
    <body>
        <div id="app"> </div>
        @@1
        @@2
    </body> `


                    let index = 0
                    function printScriptTextContent(script)
                    {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET",script.src)
                            xhr.onreadystatechange = function () {
                                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                                    if( index === 1 ) html = html.replace( "@@1", `<script> ${xhr.responseText} </script> `)
                                    if( index === 2 ) html = html.replace( "@@2", `<script> ${xhr.responseText} </script> ` )
                                    index++
                                    if( index === 2 ) ilse.utils.download_text( html.replace("@@2", `<script> ${xhr.responseText} </script> `), "index.html" )
                                }

                            };
                        xhr.send();

                    }

                    Array.prototype.slice.call(document.querySelectorAll("script[src]")).forEach(printScriptTextContent);

                    // ilse.utils.download_text( text, "index.html" )

                    printf( "list -> ", list )
                    let first   = await fetch( list[0].src )
                    printf( "first -> ", first )
                    let second  = await fetch( list[1].src )

                    let first_text       = await first.text()
                    let second_text      = await second.text()

                    let html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title> Ilse Langnar's Notebook</title>
    </head>
    <body>
        <div id="app"> </div>
        <script> ${first_text} </script>
        <script> ${second_text} </script>
    </body>
</html> `


                },
                description: "aaaaa",
                name: "Aaaaa",
                props: {},
            }, */

        ]


        let icon
        commands.map( command => {
            this.add({
                id: command.id,
                name: command.name,
                icon: command.icon,
                description: command.description,
                fn: command.fn,
                props: command.props
            })
        })

        this.add_components_commands()
    }

}

export default Commands
