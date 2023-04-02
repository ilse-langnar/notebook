import printf                   from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Libraries/Depedencies
    import Mousetrap                    from "mousetrap"

    import 'mousetrap'
    import "@/assets/mousetrap-global-bind.min.js"
    import "@/assets/mousetrap-record.min.js"

// functions
    import set_caret_to_end             from "@/functions/set_caret_to_end_on_content_editable_element.js"
    import map                          from "@/functions/map.js"
    import if_else                      from "@/functions/if_else.js"
    import same                         from "@/functions/same.js"
    import trim                         from "@/functions/trim.js"
    import remove_text                  from "@/functions/remove_text.js"
    import first_letter                 from "@/functions/first_letter.js"
    import clean_list                   from "@/functions/clean_list.js"
    import push                         from "@/functions/push.js"
    import store                        from "@/functions/store.js"
    import is_letter                    from "@/functions/store.js"

let dom_write_target
class KeyboardShortcut  {

    constructor( ilse ) {
        this.Mousetrap = Mousetrap
        this.last_key  = ""
        this.history   = []
        // Special Codes
        this.key_codes = {
            221:    "right-square-bracket",
            46:     "delete",
            191:    "slash",
            /*57:     "opening-parenthesis",*/
            9:      "tab",
        }
        this.Mousetrap.addKeycodes( this.key_codes )

        this.setup()
    }

    setup() {
        this.bind_electron_ctrl_f()
        this.set_default_keys()
        this.bind_keys()
        this.bind_ctrl_space_to_stop_textbox()
        this.listen()
    }

    listen() {

        Messager.on( "~keyboard", key => {

            if( key === "esc" ) {

                printf( "ilse.stack -> ", ilse.stack )
                printf( "store(api) -> ", store("api").stack )
                ilse.stack.map( (item, index) => {
                    ilse.stack.splice( index, 1 )
                })

            }

        })

        Messager.on( "~ilse", payload => {

            // if( payload === "loaded" ) { // I'll load the new keybindings here:

                // let keys = ilse.notes.query( "#i/key" )
                // let content

                // map( keys, id => {
                    // content = ilse.notes.list[id]
                    // printf( ">>> ilse.notes -> ", ilse.notes )
                    // printf( ">>> ilse.notes.list -> ", ilse.notes.list )
                    // printf( ">>> ilse.notes.list[id] -> ", ilse.notes.list[id] )
                    // printf( ">>> content -> ", content )
                    // printf( ">>> id -> ", id )
                    // printf( ">>> ilse -> ", ilse )
                    // let shortcut = content.split("/")[2].replace("C", "ctrl+space").replaceAll( "-" ," ")
                    // let command  = content.split("/")[3].replaceAll( " ", "" )
                    // this.add( shortcut, command, ["Internal"] )
                // })

            // }

        })

    }

    bind_electron_ctrl_f() {
        Mousetrap.bindGlobal( "ctrl+f", (event, combo ) => { event.preventDefault(); ilse.electron.ipc.send( "ctrl+f" ) }, 'keydown' )
    }

    bind_ctrl_space_to_stop_textbox() { // When writing, C-SPC should stop inputting into the textbox and capture them to be a command!

        Messager.on( "~commands", (action, payload) => {
            if( action === "exec" && dom_write_target ) this.turn_writing_on()
        })

        document.addEventListener( "keydown", event => {

            let is_ctrl_space = event.ctrlKey && event.key === " "
                // if( is_ctrl_space ) Messager.emit( "~keyboard",  "C-SPC" )

            // History
            this.history.push( event.key )
            this.last_key     = event.key

            let is_esc        = event.key === "Escape"
                if( is_esc ) Messager.emit( "~keyboard", "esc" )

            Messager.emit( "~keyboard", event.key )

            if( is_ctrl_space ) {
                let dom          = document.activeElement
                let should_block = dom.tagName === "INPUT" || dom.tagName === "TEXTAREA" || dom.tagName === "DIV" && dom.id.indexOf("-") !== -1 // BUGFIX: when inside a textarea/input we should still work but not add any key
                if( should_block ) {
                    this.turn_writing_off()
                    setTimeout( () => { this.turn_writing_on() }, 2000 ) // BUGFIX: You'll have 2 seconds to write the commands, otherwise, things will go normal again
                }

            }

        })

    }

    turn_writing_off() {
        dom_write_target            = document.activeElement
        dom_write_target.onkeypress = function(){ return false }
        dom_write_target            = null
    }

    turn_writing_on() {
        if( !dom_write_target ) return

        dom_write_target.onkeypress = function() { return true }
        dom_write_target.focus()
        set_caret_to_end( dom_write_target )
    }

    set_default_keys() {

        this.keys = [

            // Special
                { combo: "ctrl+tab",            command: "go-to-next-tab",              category: "Special", prevent_default: true },
                { combo: "ctrl+shift+t",        command: "create-new-tab",              category: "Special", prevent_default: true },
                { combo: "ctrl+t",              command: "create-new-tab",              category: "Special", prevent_default: true },
                // { combo: "ctrl+n",              command: "create-new-component",        category: "Special", prevent_default: true },
                { combo: "ctrl+e",              command: "create-new-component",        category: "Special", prevent_default: true },
                { combo: "ctrl+w",              command: "close-active-component",      category: "Special", prevent_default: true },
                { combo: "ctrl+s",              command: "open-notes-search-modal",     category: "Search",  prevent_default: true },
                { combo: "ctrl+e",              command: "search-selection-for-links",  category: "Search",  prevent_default: true },
                { combo: "ctrl+space space",    command: "flywheel",                    category: "Search",  prevent_default: true },
                { combo: "ctrl+o",              command: "test",                        category: "Search",  prevent_default: true },


                { combo: "ctrl+enter",          command: "new-note",                    category: "Special" },
                { combo: "alt+enter",           command: "append-new-note",             category: "Special" },
                { combo: "ctrl+p",              command: "open-command-pallet-modal",   category: "Special", prevent_default: true },
                { combo: "shift+enter",         command: "void:add-new-line",           category: "Special" },
                { combo: "ctrl+(",              command: "void",                        category: "Special" },
                { combo: "ctrl+.",              command: "repeat-last-command",         category: "Special" },
                { combo: "ctrl+space shift+/",  command: "new-note",                    category: "Special" },
                // { combo: "ctrl+space tab", command: "autocomplete",         category: "Special" },

            // a

            // b
                // { combo: "ctrl+space b b",   command: "open",         category: "Search", prevent_default: true },
                { combo: "ctrl+space b t a",    command: "first-brain-tag-add",    category: "Internal" }, // delete
                { combo: "ctrl+space b t r",    command: "first-brain-tag-remove", category: "Internal" }, // delete

            // c
                { combo: "ctrl+space c c",      command: "open-calendar-on-modal", category: "Internal"  }, // delete
                // { combo: "ctrl+space b b",   command: "open",         category: "Search", prevent_default: true },

            // d

            // e

            // f
                { combo: "ctrl+space f f",      command: "focus-quick-search", category: "Internal" },

            // g

            // h

            // i
                { combo: "ctrl+space i d",      command: "toggle-dark-mode",          category: "Internal" },
                { combo: "ctrl+space i z",      command: "toggle-zen-mode",           category: "Internal" },
                { combo: "ctrl+space i l",      command: "toggle-left-sidebar",       category: "Internal" },
                { combo: "ctrl+space i e",      command: "open-make-extention-modal", category: "Internal" },
                { combo: "ctrl+space i p i",    command: "import-plugin-from-url",    category: "Internal" },
                { combo: "ctrl+space i f f",    command: "open-folders-modal",        category: "Internal" },

            // j

            // k

            // l

            // m
                { combo: "ctrl+space m d", command: "set-default-mode", category: "Modes" },

            // n

            // o

            // p

            // q
                { combo: "ctrl+space q n", command: "open-new-query", category: "Query" },

            // r
                { combo: "ctrl+space r r", command: "open-random-note", category: "Random" },

            // s
                { combo: "ctrl+space t t",       command: "open-all-components",             category: "Search", prevent_default: true },
                { combo: "ctrl+space s o",       command: "open-search-in-outline",          category: "Search", prevent_default: true },
                { combo: "ctrl+space s f f",     command: "open-search-fs-files-modal",      category: "Search", prevent_default: true },
                { combo: "ctrl+space s c f",     command: "open-conceptual-functions-modal", category: "Search", prevent_default: true },
                { combo: "ctrl+space s t",       command: "open-todos-modal",                category: "Search", prevent_default: true },
                { combo: "ctrl+space s g",       command: "open-glyph-search",               category: "Search", prevent_default: true },
                { combo: "ctrl+space s w w",     command: "open-website-on-window",          category: "Search", prevent_default: true },
                { combo: "ctrl+space s w e",     command: "open-external-website-on-window", category: "Search", prevent_default: true },
                { combo: "ctrl+space s h",       command: "open-html-on-window",             category: "Search", prevent_default: true },
                { combo: "ctrl+space s v",       command: "open-vim",                        category: "Search", prevent_default: true },
                { combo: "ctrl+space s r r",     command: "open-random-notes",               category: "Search", prevent_default: true },
                { combo: "ctrl+space s r i i",   command: "open-random-notes-images",        category: "Search", prevent_default: true },

            // t

            // u

            // v
                { combo: "ctrl+space v t", command: "open-note-on-a-table-pan",     category: "Visualization" },
                { combo: "ctrl+space v shift+m", command: "open-note-on-a-memex",   category: "Visualization" },
                { combo: "ctrl+space v m", command: "open-note-on-a-mind-map",      category: "Visualization" },
            // x

            // w
                { combo: "ctrl+space w u", command: "open-website-via-url",      category: "Web" },

            // z

        ]

    }

    //  [ { combo: "ctrl+space b t a", command: "ll" } ] = [ "ctrlspacev", "ctrlspacevae" ]
    get_flattened_keys( list ) {
        let tree = []
        let split, joined

        // Problem: the seco
        list.map( item => {
            item.combo = this.get_normalized_combo( item )
            split = item.combo.split(" ")
            tree.push( split )
        })

        return tree

    }

    // For Plugins
    // add_key_code( code, key_name ) {
        // this.key_codes[code] = key_name
        // this.Mousetrap.addKeycodes(this.key_codes)
    // }

    add( combo, command, category, options = { prevent_default: true } ) {

        let has_missing_options = !combo || !command
            if( has_missing_options ) throw new Error( "ERROR: KeyboardShortcut.js -> add() -> add(combo, command, options?) -> add('ctrl+shift+d', 'add-new-note', { prevent_default: false })" )

        let key = {
            combo,
            command,
            category,
            options,
        }

        this.keys.push( key )

        this.bind_key( key )
    }

    // [ SPC R  ] -> [space shift+r]
    get_normalized_combo( key ) {

        let combo         = key.combo
        let list          = combo.split(" ")
        let static_list   = list

        static_list.map( (item, index) => {

            let is_latin  = is_letter(item)
            let should_go = item.indexOf("shift") !== -1
            if( should_go ) {
                // printf( "should go ok..." )
                // list.splice( index, 1, "shift+" + _key.toLowerCase() )
                list.splice( index, 1, item.split("+")[1].toUpperCase() )
            }

        })

        let normalized_list = list.join(" ")

        return normalized_list
    }

    unbind_key( key ) {

        // SPC -> space, R = shift+r, <number> => special
            let normalized_combo = this.get_normalized_combo( key )

        this.Mousetrap.unbind( normalized_combo )
    }

    bind_key( key ) {

        let combo = this.get_normalized_combo( key )

        // Mousetrap.bindGlobal( combo, (event, combo ) => {
        this.Mousetrap.bindGlobal( combo, (event, combo ) => {
            if( key.prevent_default ) event.preventDefault()
            ilse.commands.run( key.command, { event, combo, key } )
        }, 'keydown' )

    }

    bind_keys() {

        let _this   = this
        let keys    = this.keys || []

        keys.map( key => {
            this.bind_key( key )
        })

    }

    async record() {

        return new Promise((resolve, reject) => {

            this.Mousetrap.record(function(sequence) {

                try {
                    resolve( sequence )
                } catch( e ) {
                    reject( e )
                }

            })

        })
    }

}

export default KeyboardShortcut
