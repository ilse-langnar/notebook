<template lang="pug" >
.note.flex( v-if="is_on" )
    p( slot="icon" :title="get_human_readable_creation_date(inote.id)" @click.middle="on_note_middle_click" @click.right="on_note_right_click" @click.left="on_note_left_click" ).paragraph-note ⚫

    // edit mode
    textarea.textarea(  v-if="inote.is_editable || !inote.content" v-model="inote.content" :id="inote.id" @keydown="on_key_down($event, inote)" @blur="on_blur($event, inote)" @input="on_input" placeholder="New" )

    // show mode
    .markdown( v-show="!inote.is_editable" v-html="get_html(inote)" @click="on_focus($event, inote)" style="1px solid green;" :id="inote.id" @drop.prevent="add_file" @dragover.prevent )





    // Search, both bullets/files
    .search-overlay( v-if="is_search_overlay_on" style="" )
        Search.centered( :width="100" :should-autofocus="true" :filter="search_filter" @on-result-select="on_note_search_result_select" @on-esc="close_focus_then_resize('search')" @on-blur="close_focus_then_resize('search')" )

    // Options Lisp
    .options-overlay( v-if="is_options_overlay_on" style="" )
        Options.centered( :width="100" :should-autofocus="true" @on-result-select="on_note_search_result_select" @on-esc="close_focus_then_resize('options')" @on-blur="close_focus_then_resize('options')" )


</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Search                       from "@/components/Search.vue"
    import Options                      from "@/components/Options.vue"

export default {

    name: "note",

    props: {
        component: { type: Object, required: false, },
        note: { type: Object, required: false, },
    },

    components: {
        Search,
        Options,
    },

    data() {
        return {
            ilse: ilse,

            inote: this.note,

            // This is for the [note ref] and [file ref]
            is_on: false,
            is_search_overlay_on: false,
            is_options_overlay_on: false,
            last_char: "",
            search: "",
            search_filter: "all",
        }
    },

    methods: {

        close_focus_then_resize( overlay ) {

            printf( "close_focus_then_resize -> overlay -> ", overlay )
            this.close_overlay( overlay )

            let note = this.inote
            printf( "note -> ", note )

            setTimeout( () => {
                note.focus()
                this.resize_textarea()
            }, 200 )
        },

        async add_file( event ) {

            let file        = event.dataTransfer.files[0] 

            let fileData    = new Blob( [file] )
            let arrayBuffer = await fileData.arrayBuffer() 
            const buffer    = Buffer.from( arrayBuffer  ,'binary' )
            let blob        = buffer

            await ilse.filesystem.file.set( ilse.path.join("second", file.name), blob )

            this.inote.focus()

            setTimeout( () => {
                this.inote.caret.add( ` ![[${file.name}]]` ) }, 100 )
        },

        on_note_search_result_select( payload ) {

            printf( "payload -> ", payload )

            let is_note = payload.note_id
            let is_file = payload.file

            let note = this.inote

            let _this = this
            setTimeout( () => {
                this.inote.focus()

                note.caret.set( note.caret.pos.start, note.caret.pos.end )

                setTimeout( () => {
                    // BUGFIX: For some reason after inserting "id+))" if we blur we'll lose and go back to "((" This fixes this issue by setting inote.content directly
                    let value

                    if( is_note ) {
                        value = note.caret.insert( `${payload.note_id}))` )
                    } else if( is_file ) {
                        value = note.caret.insert( `${payload.file.replace(".md", "")}]]` )
                    }

                    setTimeout( () => { note.focus(); _this.resize_textarea() }, 1 )

                    _this.set_content( value )
                }, 100 )

            }, 100 )
            this.close_overlay( "search" )
        },

        set_content( value ) {
            this.inote.content = value
            this.resize_textarea()
                    // this.inote.focus()
        },

        open_overlay( name ) {
            if( name === "search" ) this.is_search_overlay_on   = true
            if( name === "options" ) this.is_options_overlay_on = true
            this.last_char     = ""
        },

        close_overlay( name ) {
            if( name === "search" ) this.is_search_overlay_on   = false
            if( name === "options" ) this.is_options_overlay_on = false
            this.last_char     = ""
            // this.inote.focus()
        },

        on_note_left_click() {
            this.$emit( "on-note-left-click", this.note )
        },

        on_note_right_click() {
            this.$emit( "on-note-right-click", this.note )
        },

        on_note_middle_click() {
            this.$emit( "on-note-middle-click", this.note )
        },

        get_human_readable_creation_date( id ) {

            // BUGFIX: Normalize, if is child of another note remove the spaces
                id = id.trim()

            let year        = id.substr( 0, 4 )
            let month       = id.substr( 4, 2 )
            let day         = id.substr( 6, 2 )
            let hour        = id.substr( 8, 2 )
            let seconds     = id.substr( 10, 2 )

            let date_string = ilse.utils.convert_from_date_unique_id_to_daily_note_format( id)
                date_string     += `(${hour}:${seconds})`

            return date_string
        },

        resize_textarea() {
            let dom     = document.getElementById( this.inote.id )
                if( !dom )  return ""

            dom.style.height = "auto"
            // dom.style.height = (dom.scrollHeight - 30 ) + "px"
             dom.style["max-height"] = dom.scrollHeight + "px"
            dom.style.height = dom.scrollHeight + "px"

            setTimeout( () => { dom.focus() }, 100 )
        },

        // BUGFIX: textarea's height is dynamic
        on_input( event ) {

            // === on (( open search === //
            let char       = event.data
                if( !char )  {
                    // this.close_overlay()
                    return
                }

            let is_list = char === "/" && this.last_char === "/"
                if( is_list ) {
                    this.open_overlay( "options" )
                    return
                }

            let is_note_search = char === "(" && this.last_char === "("
            if( is_note_search ) {
                this.inote.caret.get() 
                this.search_filter = "notes" // Search only for notes
                this.open_overlay( "search" )
            }

            let is_file_search = char === "[" && this.last_char === "["
            if( is_file_search ) {
                this.inote.caret.get() 
                this.search_filter = "files" // Search only for files
                this.open_overlay( "search" )
            }



            this.last_char = char
            // === on (( open search === //

            Messager.emit( "~note", "change", { note: this.inote })

            // ilse.notes.save()
            this.resize_textarea()
        },

        get_html( inote ) {

            // Empty note
            if( !inote.content ) return " "

            // === no Ref === //
            let ref                   = ilse.notes.get_references( inote.content ) // TODO: Make this a notes function
                if( !ref ) return ilse.markdown.render( inote.content ) // No note references, normal markdown.

            // === Refs === //

            let html = ilse.markdown.get_blockquote( inote.content )
            printf( "html -> ", html )
            return html

            /*
            let text   = ilse.notes.reference( inote.content ) 
            let chunks = text.split("\n")

            printf( "chunks -> ", chunks )
            let final  = "<blockquote>"
            for( const [index, chunk] of chunks.entries() ) {
                if( index === 0 ) {
                    final += `<p> ${chunk} </p>`
                } else {
                    final += `<blockquote style="margin-left: ${index * 10}px"> ${chunk} </blockquote>`
                }
            }
            final += "</blockquote>"
            return final
                return ilse.markdown.render( text )
            */
        },

        on_focus( event, inote ) {

            // BUGFIX: 
            let is_note_malformed = !inote.content || !inote.id
                if( is_note_malformed ) return ""

            // FEATURE: Checkbox
            let clicked_on_a_checkbox = event.target.type === "checkbox"
            if( clicked_on_a_checkbox ) {
                this.inote.content = this.inote.content.replace( "- [ ]", "- [x]" )
                return
            }

            // :?????
            if( this.inote.id === inote.id ) {

                // BUGFIX: don't need to click on note twice to actually focus on it.
                setTimeout( ( )  => {
                    let dom = document.getElementById( inote.id )
                        dom.focus()
                    this.resize_textarea()
                }, 50 )

                this.inote.is_editable = true

            } else {
                this.inote.is_editable = false
            }

        },

        on_blur( event, inote ) {

            // this.resize_textarea()
            // Messager.emit( "~note.vue", "blurred", inote )

            if( inote.id === this.inote.id ) {
                this.inote.is_editable = false
                this.$emit( "on-blur", {
                    event: event,
                    note: inote
                })

                Messager.emit( "~note.vue", "blur", {note: this.inote})
                // Messager.emit( "~note", "change", { note: this.inote })
                ilse.notes.save()

            }

        },

        get_selection() {

            /*
            var selectedText = '';

            // window.getSelection
            if( window.getSelection ) {
                selectedText = window.getSelection();
            } else if(document.getSelection ) { // document.getSelection
                selectedText = document.getSelection()
            } else if( document.selection ) { // document.selection
                selectedText = document.selection.createRange().text
            } else {
                return
            }
            printf( "selectedText -> ", selectedText )
            // To write the selected text into the textarea
            return selectedText
            */



            /*
            let range = ""
            if( window.getSelection ) {  // all browsers, except IE before version 9
                range = window.getSelection ();
            } else {
                // Internet Explorer
                if( document.selection.createRange ) range = document.selection.createRange()
            }
            printf( "@@@ range -> ", range )

            return range
            */


            // printf( "window.getSelection() -> ", window.getSelection() )
            // printf( "window.document.getSelection() -> ", window.document.getSelection() )
            // printf( "window.document.selection -> ", window.document.selection )

            if( window.getSelection ) {
                return window.getSelection().toString()
            } 

            if( window.document.getSelection ) {
                return window.document.getSelection().toString()
            } 

            if( window.document.selection ) {
                return window.document.selection.createRange().text
            }

            return "";
        },

        // TODO: Take selected text, if [ then wrap the text around
        on_key_down( event, inote ) {

            let is_ctrl  = event.ctrlKey
            let is_shift = event.shiftKey
            let is_alt   = event.altKey
            let is_meta  = event.metaKey
            let key      = event.key

            let selection= this.get_selection()
            let is_wrap  = key === "[" && selection

            if( is_wrap ) {
                event.preventDefault()
                this.inote.content =  this.inote.content.replace( selection, `[[${selection}]]` )
                return
            }

            // ESC
            if( key  === "Escape" && !is_ctrl && !is_shift ) {
                event.preventDefault()
                this.$emit( "on-esc", { note: inote, event })
            }

            // Enter
            if( key  === "Enter" && !is_ctrl && !is_shift ) {
                event.preventDefault()
                this.$emit( "on-enter", { note: inote, event })
            }

            // Ctrl+Enter
            if( key === "Enter" && !is_shift && is_ctrl ) { // Ctrl+Shift+Enter
                event.preventDefault()
                this.$emit( "on-ctrl-enter", { note: inote, event })
            }

            if( key === "Delete" && !is_ctrl && is_shift ) {
                this.$emit( "on-ctrl-shift-delete", { note: inote, event })
            }

            // Multiple lines
            if( key === "Enter" && is_shift && !is_ctrl ) { }

            // Tab
            if( key === "Tab" && !is_shift && !is_ctrl ) {
                this.$emit( "on-tab", { note: inote, event })
                event.preventDefault()
            }

            // Shift-Tab
            if( key === "Tab" && is_shift && !is_ctrl ) {
                event.preventDefault()
                this.$emit( "on-shift-tab", { note: inote, event })
            }

            // Arrow up
            if( key === "ArrowUp" && !is_shift && !is_ctrl && !is_alt ) {
                this.$emit( "on-arrow-up", { note: inote, event })
            }

            // Arrow down
            if( key === "ArrowDown"  && !is_shift && !is_ctrl && !is_alt ) {
                this.$emit( "on-arrow-down", { note: inote, event })
            }

        },

        listen() {

            let _this = this
            Messager.on( "~note.vue", async ( action, payload ) => {

                // Listen to note.vue
                if( action === "link-click" ) {

                    /*if( ilse.tried_too_fast )  {
                        // setTimeout( () => { ilse.tried_too_fast = false }, 500 )
                        return
                    }
                    ilse.tried_too_fast = true

                    setTimeout( () => { ilse.tried_too_fast = false }, 500 )
                    */
                    // printf( "link-click" )
                    // Messager.emit( "~note.vue", "clicked", { link: payload.link, event: payload.event, note: this.inote } )

                    if( !ilse.lastCalled ) ilse.lastCalled = 0

                    _this.once  = function() {

                        let now = new Date().getTime()
                        if( 1000 > (now - ilse.lastCalled) ) return

                        ilse.lastCalled = now

                        _this.$emit( "on-link-click", { link: payload.link, event: payload.event, note: _this.inote } )
                    }
                    _this.once()

                }
            })

        },

        set_note_from_component() {

            // TODO Document
            let is_from_dynamic_component  = this.$props.component 
                if( !is_from_dynamic_component ) {
                    this.is_on = true
                    return
                }

            let component   = this.$props.component

            let props       = this.$props.component.props

            let note      = props.note
                this.inote    = note

            this.is_on      = true

        },

        setup() {
            // this.add_mutator_listener() 
            // setTimeout( () => { this.resize_textarea() }, 100 )
            this.set_note_from_component()
            this.listen()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>

.note {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 20px;
    font-size: 1em;
}

.textarea {
    width: 100% !important;
    overflow: hidden;

    min-height: 20px;
    height: 20px;
    max-height: 20px;

    margin: 0 !important;
    padding: 0px !important;
    resize: none;

    font-size: 1em;
    margin-bottom: 6px;
    background: var( --background-color );
    color: var( --text-color );
}

.markdown {
    width: 100%;
    margin-bottom: 6px;
}

.paragraph-note {
    margin-top:   -5px;
    text-align:   center;
    cursor:       pointer;
    color:        #a3a3a3;
    color:        var(--text-color);
    font-size:    24px;
}

.link {
    color: #5ec7b8;
}

.link:hover {
    text-decoration: underline;
}

.tag {
    color: #d3d3d3;
    color: #698b99;
}

.cloze-deletion {
    color: gray;
}

.separator {
    width: 100%;
    border: 1px solid #000;
}

.highlight {
    background: yellow;
    background-color: var( --text-color );
    color: var( --background-color );
    padding: 2px;
    margin: 4px;
    border-radius: var( --border-radius );
}

.strike-through {
    text-decoration: line-through;
}

.img {
    display: block;
}

.todo {
    padding: 5px;

}

.video {
    display: block;
    clear: both;
}

.audio {
    display: block;
    clear: both;
}

input[type="checkbox"] {
    height:1em;
    width:1em;
    cursor:pointer;
    position:relative;
    -webkit-transition: .10s;
    border-radius:4em;
    background-color:red;
}

blockquote {
    padding: 5px;
    border-left: 4px solid #bdbdbd;
    border-radius: 4px;
    margin-left: 10px;
    background-color: #ededed;

    /*background-color: var( --text-color );
    color: var( --background-color );*/

    border-left: 4px solid var( --text-color );
    color: var( --text-color );
    background: var( --background-color );
    margin-left: auto;
}

code {
    background-color: #ededed;
    color: #000000;
    padding: 0.25em 0.5em 0.25em;
    border-radius: 4px;
    font-family: CodeFire, CodeFira, monospace;
}

.note-reference {
    color: #4f4f90;
}


.search-overlay, .options-overlay {
    /*transform: translate( 50%, 0);*/
    position: absolute;
    background: var( --background-color );
    color: var( --text-color );
    z-index: 30;
    width: 40%;
    height: 20vh;
    margin-top: 20px;
}

</style>
