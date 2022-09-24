const printf                        = console.log


// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Libraries/Depedencies
    import Mousetrap                    from "mousetrap"

    import 'mousetrap'
    import "@/assets/js/mousetrap-global-bind.min.js"
    import "@/assets/js/mousetrap-record.min.js"

// functions
import set_caret_to_end_on_content_editable_element from "@/classes/set_caret_to_end_on_content_editable_element.js"

let dom_write_target
class KeyboardShortcut  {

    constructor( ilse ) {
        this.ilse      = ilse
        this.Mousetrap = Mousetrap

        Mousetrap.bindGlobal( "ctrl+f", (event, combo ) => { event.preventDefault(); ilse.electron.ipc.send( "ctrl+f" ) }, 'keydown' )
        // Mousetrap.bindGlobal( "ctrl+space", (event, combo ) => { let dom = document.activeElement printf( "dom -> ", dom ) }, 'keydown' )

        this.setup()
    }

    setup() {
        this.set_key_codes()
        this.add_default_key_codes()
        this.set_default_keys()
        this.bind_keys()
        this.bind_ctrl_space_to_stop_textbox()
    }

    // When writing, C-SPC should stop inputting into the textbox and capture them to be a command!
    bind_ctrl_space_to_stop_textbox() {

        Messager.on( "~commands", (action, payload) => {
            if( action === "exec" && dom_write_target ) this.turn_writing_on()
        })

        document.addEventListener( "keydown", event => {

            let is_ctrl_space = event.ctrlKey && event.key === " "

            if( is_ctrl_space ) this.turn_writing_off()

            // BUGFIX: You'll have 2 seconds to write the commands, otherwise, things will go normal again
                setTimeout( () => { this.turn_writing_on() }, 2000 )
        })

    }

    turn_writing_off() {
        dom_write_target            = document.activeElement
        dom_write_target.onkeypress = function(){ return false }
    }

    turn_writing_on() {
        dom_write_target.onkeypress = function() { return true }
        set_caret_to_end_on_content_editable_element( dom_write_target )
    }

    set_key_codes() {

        // Special Codes
        this.key_codes             = {
            221:    "right-square-bracket",
            46:     "delete",
            191:    "slash",
            /*57:     "opening-parenthesis",*/
            9:      "tab",
        }

    }

    set_default_keys() {

        // if( this.ilse.config.keys ) {
            // printf( "!!!!!! this.ilse.config.keys -> ", this.ilse.config.keys )
            // this.keys = this.ilse.config.keys
            // return
        // }

        this.keys = [
            // { combo: "ctrl+space", command: "new-note" },
            { combo: "ctrl+space shift+a", command: "open-command-pallet-modal" },
            { combo: "ctrl+enter", command: "new-note" },
            // { combo: "ctrl+.", command: "new-note" },
            /*{ combo: "ctrl+s", command: "save" },*/
            { combo: "ctrl+p", command: "open-command-pallet-modal", prevent_default: true },
            // { combo: "s", command: "note-search" },
            // { combo: "f", command: "file-search" },
            // { combo: "A", command: "Add Component" },
            { combo: "ctrl+v", command: "check-clipboard" },
            { combo: "ctrl+space s s", command: "open-search-modal" },
            { combo: "ctrl+space c f", command: "a" },
            { combo: "shift+enter", command: "void:add-new-line" },
            { combo: "ctrl+space shift+l", command: "list-projects" },

            { combo: "ctrl+space v m", command: "open-note-on-a-mind-map" },
            { combo: "ctrl+space i d", command: "toggle-dark-mode" },
            { combo: "ctrl+space i z", command: "toggle-zen-mode" },

            { combo: "ctrl+space i l", command: "toggle-left-sidebar" },
            { combo: "ctrl+space i e", command: "open-make-extention-modal" },
            { combo: "ctrl+space i p i", command: "import-plugin-from-url" },

            { combo: "ctrl+space v t", command: "open-note-on-a-table-pan" },
            { combo: "ctrl+space v shift+m", command: "open-note-on-a-memex" },

            { combo: "ctrl+space tab", command: "toggle-left-sidebar" },
            { combo: "ctrl+space shift+tab", command: "toggle-right-sidebar" },

            // { combo: "shift+/", command: "open-help" }, // ctrl-shift-/ = ctrl-?

            { combo: "ctrl+(", command: "void" },
            { combo: "ctrl+space .", command: "void" },


            { combo: "ctrl+space shift+f", command: "open-file" },

            /*{ combo: "ctrl+space right-square-bracket", command: "open-search-modal" },*/
            /*{ combo: "opening-parenthesis", command: "open-search-modal" },*/

            { combo: "ctrl+space b t a", command: "first-brain-tag-add" },
            { combo: "ctrl+space b t r", command: "first-brain-tag-remove" },
            { combo: "ctrl+space c c c", command: "insert-random-text" },

            // { combo: "ctrl+space ", command: "first-brain-tag-remove" },
        ]

        // this.make_child_reveal_bind()

    }

    // recursive_add( tree, list ) {

        // if( !list[0] ) return

        // if( tree[list[0]] )

        // list.shift()
        // tree[list[0]] = { "list": Array.from(list) }
        // this.recursive_add( tree, list )
    // }

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

    get_joined_keys( list ) {

        let tree = []
        let split, joined

        list.map( item => {
            item.combo = this.get_normalized_combo( item )
            split = item.combo.split("")
            joined = split.join("").replace(/\ /gi, "")
            tree.push( joined )
        })

        return tree
    }

    // See who is is a command and who has children = no children then it's a command = children = parent(should bind) , I need a list of either children or parents
    make_child_reveal_bind() {
        let parent_keys = this.get_parent_keys()

        this.Mousetrap.handleKey = function( one, two ) {
        }

        parent_keys.map( key => {

            document.addEventListener( "keydown", event => {

            })

            // Mousetrap.bind( key, (event, combo ) => {
                // printf( ">> KeyboardShortcut -> combo -> ", combo )
                // printf( ">> KeyboardShortcut -> event -> ", event )
            // })

        })

    }

    get_parent_keys() {

        let list   = this.get_flattened_keys( this.keys )
        let obj = {}

        list.map( item => {

            if( item.length >= 2 ) {

                item.pop()
                if( !obj[item.join(" ")] ) {
                    obj[item.join(" ")] = 1
                } else {
                    obj[item.join(" ")]++
                }
            }

        })

        return Object.keys( obj )

    }

    // For Plugins
    add_key_code( code, key_name ) {

        this.key_codes[code] = key_name
        this.Mousetrap.addKeycodes(this.key_codes)
    }

    add_default_key_codes() {
        this.Mousetrap.addKeycodes( this.key_codes )
    }

    add( combo, command, options = { prevent_default: true } ) {

        let has_missing_options = !combo || !command
            if( has_missing_options ) throw new Error( "ERROR: KeyboardShortcut.js -> add() -> add(combo, command, options?) -> add('ctrl+shift+d', 'add-new-note', { prevent_default: false })" )

        let key = {
            combo,
            command,
            options,
        }

        this.keys.push( key )
        this.bind_key( key )
    }

    // matches a-z
    is_letter(str) {
        return str.length === 1 && str.match(/[a-zA-Z]/i);
    }

    // [ SPC R  ] -> [space shift+r]
    get_normalized_combo( key ) {

        let combo = key.combo
        let list  = combo.split(" ")
        let static_list = list

        static_list.map( (item, index) => {

            // printf( "item -> ", item )
            let is_latin = this.is_letter(item)
            let should_go = item.indexOf("shift") !== -1
            if( should_go ) {
                // printf( "should go ok..." )
                // list.splice( index, 1, "shift+" + _key.toLowerCase() )
                list.splice( index, 1, item.split("+")[1].toUpperCase() )
            }

        })

        /*
        // Uppercase -> shift+<key>
        let index
        for( let _key of static_list ) {
            printf( "static_list -> ", static_list )
            index++

            let is_latin = this.is_letter(_key)
            // printf( "is_latin -> ", is_latin )
            // printf( "_key.indexOf('shift') -> ", _key.indexOf('shift') )
            // let should_go = is_latin && _key.indexOf("shift") !== -1
            let should_go = _key.indexOf("shift") !== -1
            printf( "should_go -> ", should_go )
            // if( is_latin && _key.toUpperCase() === _key ) {
            if( should_go ) {
                printf( "before -> list -> ", list )
                list.splice( index, 1, "shift+" + _key.toLowerCase() )
                printf( "after -> list -> ", list )
            }
        }
        */

        let normalized_list = list.join(" ")
        // printf( "normalized_list -> ", normalized_list )

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
            ilse.commands.run( key.command )
        }, 'keydown' )

    }

    bind_keys() {

        let _this   = this
        let keys    = this.keys || []

        keys.map( key => {
            this.bind_key( key )
        })

        // for( let key of keys ) { this.bind_key( key ) }

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
