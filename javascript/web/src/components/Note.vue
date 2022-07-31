<template lang="pug" >
.note.flex( v-if="is_on" :style="options.style" @click="on_note_root_click" )

    p( v-if="!options.hideBullet" slot="icon" :title="ilse.utils.get_human_readable_creation_date(inote.id)" @click.middle="on_note_middle_click" @click.right="on_note_right_click" @click.left="on_note_left_click" :id=" 'bullet-' + inote.id" ).paragraph-note ⚫

    // Edit Mode
    textarea.textarea( v-if="inote.is_editable" v-model="options.is_tagless ? inote.tagless : inote.content" :id="inote.id" @keydown="on_key_down($event, inote)" @blur="on_blur($event, inote)" @input="on_input" :placeholder="$t('note_placeholder')" @drop.prevent="add_file" @dragover.prevent @click="on_textarea_click($event, inote)" )

    // show mode
    .markdown( v-show="!inote.is_editable" v-html="get_html(options.is_tagless ? inote.tagless : inote.content )" @click="on_focus($event, inote)" :id="inote.id" @drop.prevent="add_file" @dragover.prevent )




    // Search, both bullets/files
    // .search-overlay( v-if="is_search_overlay_on" style="" )
        // Search.centered( :width="100" :should-autofocus="true" :filter="search_filter" @on-result-select="on_note_search_result_select" @on-esc="close_focus_then_resize('search')" @on-blur="close_focus_then_resize('search')" )

    // Options Lisp
    // .options-overlay( v-if="is_options_overlay_on" style="" )
        Options.centered( :width="100" :should-autofocus="true" @on-result-select="on_note_search_result_select" @on-esc="close_focus_then_resize('options')" @on-blur="close_focus_then_resize('options')" )


</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "note",

    props: {
        component: { type: Object, required: false, },
        note: { type: Object, required: false, },
        options: { type: Object, required: false,
            default: function() {
                return {
                    style: "",
                    hideBullet: false,
                    is_tagless: false,
                }
            }
        },
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
        }
    },

    methods: {

        on_note_root_click( event ) {
            let note = this.note
            this.$emit( "on-note-click", {note, event})
        },

        on_textarea_click( event, note ) {

            if( !note.content ) note.content += "EMPTY"
            // let dom = document.getElementById( note.id )
            // printf( ">>> dom -> ", dom )
            // this.is_editable = !this.is_editable
            // document.activeElement.blur()
            // this.inote.is_editable = true
            // dom.focus()
            // printf( "this.is_editable -> ", this.is_editable )
        },

        async add_file( event ) {

            let file        = event.dataTransfer.files[0] 

            let fileData    = new Blob( [file] )
            let arrayBuffer = await fileData.arrayBuffer() 
            const buffer    = Buffer.from( arrayBuffer  ,'binary' )
            let blob        = buffer

            await ilse.filesystem.file.write.async( ilse.path.join("second", file.name), blob )

            this.inote.focus()

            setTimeout( () => {
                this.inote.caret.add( ` ![[${file.name}]]` ) }, 100 )
        },

        // on_note_search_result_select( payload ) {
        on_note_search_result_select( type, text ) {

            let _this   = this
            let note    = this.inote
            printf( ">>>>on_note_search_result_select -> " )

            setTimeout( () => {

                this.inote.focus()

                note.caret.set( note.caret.pos.start, note.caret.pos.end )

                setTimeout( () => {
                    // BUGFIX: For some reason after inserting "id+))" if we blur we'll lose and go back to "((" This fixes this issue by setting inote.content directly
                    let value

                    printf( "type -> ", type )
                    printf( "note.content -> ", note.content )
                    printf( "text -> ", text )
                    if( type === "note" && note.content.indexOf(text) === -1 ) {
                        value = note.caret.insert( `((${text}))` )
                    } else if( type === "file" && note.content.indexOf( text.replace(".md", "") ) === -1 ) {
                        value = note.caret.insert( `![[${text.replace(".md", "")}]]` )
                    }

                    setTimeout( () => { note.focus(); _this.resize_textarea() }, 1 )

                    _this.set_content( value )

                    setTimeout( () => { _this.inote.focus() }, 100 )
                }, 100 )

            }, 100 )

            // this.close_overlay( "search" )

        },

        set_content( value ) {
            this.inote.content = value
            this.resize_textarea()
            // this.inote.focus()
        },

        /*
        open_overlay( name ) {
            // if( name === "search" ) this.is_search_overlay_on   = true
            if( name === "search" ) ilse.modals.open( "search", {type: "embed", id: this.inote.id}, function(note) { printf( "LLLL", note ) } )
            if( name === "options" ) this.is_options_overlay_on = true
            this.last_char     = ""
        },
        */

        /*
        close_overlay( name ) {
            if( name === "search" ) this.is_search_overlay_on   = false
            if( name === "options" ) this.is_options_overlay_on = false
            this.last_char     = ""
            // this.inote.focus()
        },
        */

        on_note_left_click( event ) {
            this.$emit( "on-note-left-click", this.note )
        },

        on_note_right_click() {
            this.$emit( "on-note-right-click", this.note )
        },

        on_note_middle_click() {
            this.$emit( "on-note-middle-click", this.note )
        },

        // get_human_readable_creation_date( id ) {
            // return ilse.utils.get_human_readable_creation_date(id)
            /*
            if( !id ) return ""

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
            */
        // },

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
                    // this.open_overlay( "options" )
                    return
                }

            // let is_note_search = char === "(" && this.last_char === "("
            // if( is_note_search ) {
                // this.inote.caret.get() 
                // this.open_overlay( "search" )
            // }

            this.last_char = char
            // === on (( open search === //

            Messager.emit( "~note", "change", { note: this.inote })

            // ilse.notes.save()
            this.resize_textarea()
        },

        get_html( content ) {

            // Empty note
            if( !content ) return "<NOTHING>"

            // === no Ref === //
            let ref                   = ilse.notes.get_references( content ) // TODO: Make this a notes function
                if( !ref ) return ilse.markdown.render( content ) // No note references, normal markdown.

            // === Refs === //
            let html = ilse.markdown.get_blockquote( content )
            return html

            /*
            let text   = ilse.notes.reference( .content ) 
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

            let _this = this

            ilse.keyboard.Mousetrap.bindGlobal( "ctrl+space (", function(event){
                printf( "ok boomer" )
                event.preventDefault()
                _this.open_search( "notes" )
            })


            ilse.keyboard.Mousetrap.bindGlobal( "ctrl+space right-square-bracket", function(event){
                event.preventDefault()
                _this.open_search( "files" )
            })

            // let shift = event.shiftKey
                // if( shift ) return

            // BUGFIX: No id nor content
            let is_note_malformed = !inote.content || !inote.id
                if( is_note_malformed ) return ""

            // FEATURE: Checkbox
            let clicked_on_a_checkbox = event.target.type === "checkbox"
            if( clicked_on_a_checkbox ) {
                this.inote.content = this.inote.content.replace( "- [ ]", "- [x]" )
                ilse.notes.save()
                return
            }

            // :?????
            if( this.inote.id === inote.id ) {

                // BUGFIX: don't need to click on note twice to actually focus on it.
                setTimeout( ( )  => {
                    let dom = document.getElementById( inote.id )
                    if( dom ) dom.focus()
                    this.resize_textarea()
                }, 50 )

                this.inote.is_editable = true

            } else {
                this.inote.is_editable = false
            }

        },

        on_blur( event, inote ) {

            ilse.keyboard.Mousetrap.unbind( "ctrl+space right-square-bracket")
            ilse.keyboard.Mousetrap.unbind( "ctrl+space (")

            if( inote.id === this.inote.id ) {
                // Blur
                this.inote.is_editable = false

                // Says we have blurred
                this.$emit( "on-blur", { event: event, note: inote })

                // ??
                Messager.emit( "~note.vue", "blur", {note: this.inote})

                // Save
                ilse.notes.save()
            }

        },

        // TODO: Take selected text, if [ then wrap the text around
        on_key_down( event, inote ) {

            let is_ctrl  = event.ctrlKey
            let is_shift = event.shiftKey
            let is_alt   = event.altKey
            let is_meta  = event.metaKey
            let key      = event.key

            let selection= ilse.utils.get_selection()
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

            // let is_file_search = char === "[" && shift
            let char           = event.key
            // let is_file_search = char === "{" && is_shift
            // if( is_file_search ) {
                // this.open_search()
            // }

        },

        open_search( filter = "all" ) {
            this.inote.caret.get() 
            printf( "Note.vue -> open_search -> type ", filter )
            ilse.modals.open( "search", {mode: "embed", filter, is_markdown_mode_on: true, id: this.inote.id} )
        },

        listen() {

            let _this = this

            Messager.on( "~search.vue", async ( action, payload ) => {
                if( action === "select" && this.inote.id === payload.target) this.on_note_search_result_select( payload.type, payload.text )
            })

            Messager.on( "~note.vue", async ( action, payload ) => {
                // if( action === "open-search" && payload.target === _this.inote.id ) this.open_search( payload.type ) 
                if( action === "link-click" ) if( this.inote.id === payload.target ) _this.$emit( "on-link-click", { link: payload.link, event: payload.event, note: _this.inote } )
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
    height: 30px !important;
    margin: 0 !important;
    padding: 0px !important;
    resize: none;
    font-size: 1em;
    margin-bottom: 6px;
    background: var( --background-color );
    color: var( --text-color );
}

.note .textarea {
    border-bottom: 1px solid var( --text-color );
}

.markdown {
    margin-bottom: 6px;
    width: fit-content;
}

.paragraph-note {
    margin-top:   -5px;
    text-align:   center;
    cursor:       pointer;
    color:        #a3a3a3;
    color:        var(--text-color);
    /*font-size:    1pc;*/
    font-size: 1.5em;
    cursor:       pointer;
}

</style>
