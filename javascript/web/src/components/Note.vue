<template lang="pug" >
.note
    .flex( v-if="is_on" :style="options.style" @click="on_note_root_click" )

        p( v-if="!options.hide_bullet" slot="icon" :title="ilse.utils.get_human_readable_creation_date(inote.id)" @click.middle="on_note_middle_click" @click.right="on_note_right_click" @click.left="on_note_left_click" :id=" 'bullet-' + inote.id" ).paragraph-note ⚫

        // Edit Mode
        // input.editable( v-if="inote.is_editable" type="text" v-model="options.is_tagless ? inote.tagless : inote.content" :id="inote.id" @keydown="on_key_down($event, inote)" @blur="on_blur($event, inote)" @input="on_input" :placeholder="$t('note_placeholder')" @drop.prevent="add_file" @dragover.prevent @click="on_textarea_click($event, inote)" )

        div.editable( contentEditable v-if="inote.is_editable" :id="inote.id" @keydown="on_key_down($event, inote)" @blur="on_blur($event, inote)" :placeholder="$t('note_placeholder')" @drop.prevent="add_file" @dragover.prevent ) {{options.is_tagless ? inote.tagless : inote.content}}

        // show mode
        .markdown( v-show="!inote.is_editable" v-html="get_html(options.is_tagless ? inote.tagless : inote.content )" @click="on_focus($event, inote)" :id="inote.id" @drop.prevent="add_file" @dragover.prevent )

    .component-part( v-if="get_component()" )
        div( style="font-size: 1.5em; margin-left: 20px; padding: 0px; " ) ⚫
            Component.component-embed( :component="get_component()" :options="{ hide_bullet: true }" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Component                    from "@/components/Component.vue"

export default {

    name: "note",

    props: {
        component: { type: Object, required: false, },
        note: { type: Object, required: false, },
        options: { type: Object, required: false,
            default: function() {
                return {
                    style: "",
                    hide_bullet: false,
                    is_tagless: false,
                }
            }
        },
    },

    components: {
        Component,
    },

    data() {
        return {
            ilse: ilse,

            inote: this.note,

            // This is for the [note ref] and [file ref]
            is_on: false,
            last_char: "",
            search: "",
        }
    },

    methods: {

        get_component() {

            let tags = this.inote.get_tags()
                if( !tags.length ) return null

            let to_return
            tags.map( tag => {
                if( tag.split('/').length >= 1 && tag.split('/')[1] === "component"  ) {
                    let instance  = new ilse.classes.Component({ type: tag.split('/')[2], width: 12 })
                    to_return = instance
                }
            })

            return to_return

            /*
            // has tag = good, here's the component based on that
            let all = this.inote.get_tags()
            return null
            printf( "all -> ", all )
            if( all.indexOf("#i/component/") ) {
                printf( "HAS" )

            } else {
                printf( "HAS NOT " )
            }

            let tag  = tags[0]

            if( tag ) {
                let name      = tag.split("/")[2]
                let instance  = new ilse.classes.Component({ type: name, width: 12 })
                return instance
            }
            */

        },

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
                if( !file ) return

            let fileData    = new Blob( [file] )
            let arrayBuffer = await fileData.arrayBuffer() 
            const buffer    = Buffer.from( arrayBuffer  ,'binary' )
            let blob        = buffer
            let name        = file.name || Math.random().toString().replace("0.", "")

            await ilse.filesystem.file.write.async( ilse.path.join("second", name), blob )

            this.inote.focus()

            setTimeout( () => {
                this.inote.caret.add( ` ![[${name}]]` ) }, 100 )
        },

        // on_note_search_result_select( payload ) {
        on_note_search_result_select( type, text ) {

            let _this   = this
            let note    = this.inote

            // value = note.caret.insert( `((${text}))` )
            // value = note.caret.insert( `![[${text.replace(".md", "")}]]` )

            setTimeout( () => {

                this.inote.focus()
                let dom         = document.getElementById( note.id )

                // BUGFIX: For some reason after inserting "id+))" if we blur we'll lose and go back to "((" This fixes this issue by setting inote.content directly
                let is_note_ref = type === "note" && note.content.indexOf(text) === -1 
                let is_file_ref = type === "file" && note.content.indexOf( text.replace(".md", "") ) === -1 
                let value

                // _this.inote.focus() 
                if( is_note_ref ) _this.inote.content += ` ((${text}))`, dom 
                if( is_file_ref ) _this.inote.content += ` ![[${text.replace(".md", "")}]]`, dom 


                /*
                note.caret.set( note.caret.pos.start, note.caret.pos.end, dom )

                // TODO: 'insert' receives a dom, remove 'set-element', then find a way of persisting to the note.
                setTimeout( () => {

                    // BUGFIX: For some reason after inserting "id+))" if we blur we'll lose and go back to "((" This fixes this issue by setting inote.content directly
                    let is_note_ref = type === "note" && note.content.indexOf(text) === -1 
                    let is_file_ref = type === "file" && note.content.indexOf( text.replace(".md", "") ) === -1 
                    let value

                    _this.inote.focus() 

                    if( is_note_ref ) value = note.caret.insert( `((${text}))`, dom )
                    if( is_file_ref ) value = note.caret.insert( `![[${text.replace(".md", "")}]]`, dom )

                    // setTimeout( () => { _this.inote.focus() }, 1000 )

                    // this.inote.content = value
                    // this.resize_textarea()

                }, 100 )
                */

            }, 100 )


            // this.close_overlay( "search" )

        },

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

        /*
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
            // this.resize_textarea()
        },
        */

        get_html( content ) {

            // Empty note
            if( !content ) return "<NOTHING>"

            // === no Ref === //
            let ref                   = ilse.notes.get_references( content ) // TODO: Make this a notes function
                if( !ref ) return ilse.markdown.render( content ) // No note references, normal markdown.

            // === Refs === //
            let html = ilse.markdown.get_note_with_refs( content )
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

        listen_to_embed_keys() {

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

        },

        stop_listening_to_embed_keys() {
            ilse.keyboard.Mousetrap.unbind( "ctrl+space right-square-bracket")
            ilse.keyboard.Mousetrap.unbind( "ctrl+space (")
        },

        on_focus( event, inote ) {

            this.listen_to_embed_keys()

            // let shift = event.shiftKey
                // if( shift ) return

            // BUGFIX: No id nor content
            // let is_note_malformed = !inote.content || !inote.id
            let is_note_malformed = !inote.id
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
                    // this.resize_textarea()
                }, 50 )

                this.inote.is_editable = true

            } else {
                this.inote.is_editable = false
            }

        },

        on_blur( event, inote ) {

            // save(contentEditable)
            this.inote.content = event.target.innerText

            this.stop_listening_to_embed_keys()

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
            ilse.modals.open( "search", {mode: "embed", filter, is_markdown_mode_on: true, id: this.inote.id })
        },

        listen() {

            let _this = this

            Messager.on( "~search.vue", async ( action, payload ) => {

                if( action === "select" && this.inote.id === payload.target) this.on_note_search_result_select( payload.type, payload.text )
                if( action === "cancel" && this.inote.id === payload.target) {
                    setTimeout( () => { this.inote.focus(); _this.listen_to_embed_keys() }, 500 )
                }
            })

            Messager.on( "~note.vue", async ( action, payload ) => {
                // if( action === "open-search" && payload.target === _this.inote.id ) this.open_search( payload.type ) 
                if( action === "link-click" ) if( this.inote.id === payload.target ) _this.$emit( "on-link-click", { link: payload.link, event: payload.event, note: _this.inote } )
            })

            Messager.on( "~carret", async ( action, payload ) => {

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

/*
.textarea {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 10px;

    background: var( --background-color );
    color: var( --text-color );
    width: 100%;
    margin: 0 !important;
    padding: 0px !important;
    font-size: 1em;
    border: 1px solid transparent;
    line-height: 1;
    resize: none;
    height: 1em;
}
*/

/*
.textarea.editable {
    width:100%;
    direction:rtl;
    display:block;
    max-width:100%;
    line-height:1.5;
    padding:15px 15px 30px;
    border-radius:3px;
    border:1px solid #F7E98D;
    font:13px Tahoma, cursive;
    transition:box-shadow 0.5s ease;
    box-shadow:0 4px 6px rgba(0,0,0,0.1);
    font-smoothing:subpixel-antialiased;
    background:linear-gradient(#F9EFAF, #F7E98D);
    background:-o-linear-gradient(#F9EFAF, #F7E98D);
    background:-ms-linear-gradient(#F9EFAF, #F7E98D);
    background:-moz-linear-gradient(#F9EFAF, #F7E98D);
    background:-webkit-linear-gradient(#F9EFAF, #F7E98D);
}
*/

/*
.textarea {
    width: 100% !important;
    overflow: hidden;
    line-height:1;
    height: 30px !important;
    margin: 0 !important;
    padding: 0px !important;
    resize: none;
    font-size: 1em;
    margin-bottom: 6px;
    background: var( --background-color );
    color: var( --text-color );
}
*/

.editable:focus {
    outline: none;
}

input:focus{
    outline: none;
}

.editable {
    background: var( --background-color );
    color: var( --text-color );
    width: 100%;
    margin: 0 !important;
    padding: 0px !important;
    font-size: 1em;
    border: 1px solid transparent;
    height: fit-content; 
    width: fit-content;
}


.note .textarea {
    border-bottom: 1px solid var( --text-color );
}

.markdown {
    /*margin-bottom: 6px;*/
    min-width: 100px;
    width: fit-content;
    font-size: 1em;
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

.clear {
    height: 30px;
    clear: both;
}

</style>
