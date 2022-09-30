<template lang="pug" >
.note
    .flex( v-if="is_on" :style="options.style" :class=" is_dragging_over ? 'dragging-over' : '' " )

        .bullet( v-if="!options.hide_bullet" )
            p.collapsed( v-if="inote.is_collapsed" :title="ilse.utils.get_human_readable_creation_date(inote.id)" @click.middle="on_bullet_middle_click" @click.right="on_bullet_right_click" @click.left="on_bullet_left_click" @dbclick="on_bullet_db_click" :id=" 'bullet-' + inote.id" ) &#8277;
            p.expanded( v-if="!inote.is_collapsed" :title="ilse.utils.get_human_readable_creation_date(inote.id)" @click.middle="on_bullet_middle_click" @click.right="on_bullet_right_click" @click.left="on_bullet_left_click" @dbclick="on_bullet_db_click" :id=" 'bullet-' + inote.id" ) &bull;

        // edit
        // .edit( contentEditable v-if="inote.is_editable" :id="inote.id" @keydown="on_key_down($event, inote)" @blur="on_blur($event, inote)" :placeholder="$t('note_placeholder')" @drop.prevent="add_file" @dragover.prevent ) {{options.is_tagless ? inote.tagless : inote.content}}

        .edit( contentEditable v-if="inote.is_editable" :id="inote.id" @keydown="on_key_down($event, inote)" @blur="on_blur($event, inote)" :placeholder="$t('note_placeholder')" @drop.prevent="add_file" :style="get_fit_content_style(inote)" ) {{options.is_tagless ? inote.tagless : inote.content}}

        // show
        // .html( v-show="!inote.is_editable" v-html="get_html(inote)" @click="on_focus($event, inote)" :id="inote.id" @drop.prevent="add_file" @dragover.prevent :data-unique-id="inote.id" draggable @dragover="is_dragging_over = true" @dragleave="is_dragging_over = false" @dragend="is_dragging_over = false" @drop="on_drop" @drag="ilse.dragging = inote.id" )

        .html( v-show="!inote.is_editable" v-html="get_html(inote)" @click="on_focus($event, inote)" :id="inote.id" @drop.prevent="add_file" :data-unique-id="inote.id" :style="get_fit_content_style(inote)" )

    // .file-reference( v-for="( item, index ) in ilse.notes.get_file_references(inote.content)" )
        details
            // summary {{item}}
            summary 
            .no-name( v-if="item.indexOf('|') === -1" )
                .loop( v-for="( i, index_2 ) in ilse.notes.query( item.replace('![[', '').replace( ']]', '' ) ) " :key=" 's' + index_2")
                    Notes( v-if="inote.id !== i.id" :note="i" )
            .with-name( v-else )
                summary {{item.split("|")[1].replace("]]", "")}}
                .loopl( v-for="( note, ref_index ) in ilse.notes.query( item.split('|')[0].replace( '![[', '') )" :key="'search' + ref_index" ) 
                    Notes( v-if="inote.id !== note.id" :note="note" :options="{}" )

    // .note-references( v-if="inote.get_note_references()" style="" )
        .note-reference( v-for="( item, index ) in ilse.notes.extract_note_references(inote.content)" )
            // Notes( :note="ilse.notes.query(item + ':')[0]" )
            Notes( :note="ilse.notes.query(item + ':')[0]" )



    .component-part( v-if="get_component()" )
        div( style="font-size: 1.5em; margin-left: 20px; padding: 0px; " ) ⚫
            // Component.component-embed( :component="get_component()" :options="{ hide_bullet: true }" )

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
    import Notes                        from "@/components/Notes.vue"
    import Note                         from "@/components/Note.vue"
    import File                         from "@/components/Note.vue"

// Constants
    import HTML_TEMPLATE                from "@/classes/HTML_TEMPLATE.js"

// functions
    import yyyymmddhhss_to_pretty       from "@/classes/yyyymmddhhss_to_pretty.js"
    import get_clipboard                from "@/classes/get_clipboard.js"
    import extract_embeds_from_string   from "@/classes/extract_embeds_from_string.js"

export default {

    name: "Note",

    props: {
        component: { type: Object, required: false, },
        note: { type: Object, required: false, },
        options: { type: Object, required: false,
            default: function() {
                return {
                    style: "",
                    bullet_1: "&bull;",
                    hide_bullet: false,
                    is_tagless: false,
                    read_only: false,
                }
            }
        },
    },

    components: {
        Component,
        Notes,
        Note,
        File,
    },

    data() {
        return {
            ilse: ilse,
            is_dragging_over: false,

            inote: this.note,

            // This is for the [note ref] and [file ref]
            is_on: false,
        }
    },

    methods: {

        get_fit_content_style( note ) {

            let style  = ``
            let embeds = extract_embeds_from_string( note.content )
            if( embeds.length ) style += `width: 100%;`

            return style
        },

        get_dom() {
            let dom = event.srcElement.parentNode
            if( !dom.getAttribute("data-unique-id") ) dom = dom.parentNode
            if( !dom.getAttribute("data-unique-id") ) dom = dom.parentNode

            return dom
        },

        on_drop( event ) {

            let dom          = this.get_dom()
            let id           = dom.getAttribute( "data-unique-id" )

            // For UI
            let drop         = ilse.notes.query( `${id}: ` )[0]
            let dragging     = ilse.notes.query( `${ilse.dragging}: ` )[0]

                // BUGFIX: we need to have the drop's depth + 1
                dragging.depth   = drop.depth + 1

                // BUGFIX: 
                if( drop.id === dragging.id ) ilse.dragging = ""

                // Will update Notes.vue(UI) given that :key="note.children.length"
                drop.children.push( dragging )

            // For actual list(of objects)
            let drop_index = ilse.notes.list.indexOf( drop )
                printf( "drop_index -> ", drop_index )
            let drag_index = ilse.notes.list.indexOf( dragging )
                printf( "drag -> ", drag_index )


            // Remove background Style
            this.reset_drag_n_drop()
        },

        reset_drag_n_drop() {
            this.is_dragging_over   = false
            ilse.dragging           = ""
        },
 
        on_bullet_right_click( event ) {

            if( this.inote.children.length && event.button === 0 ) this.inote.is_collapsed = !this.inote.is_collapsed
            this.$emit( "on-note-click", { note: this.note, event: event, button: "right" })
            return

            let button
            if( event.button === 0 ) button = "left"
            if( event.button === 2 ) button = "right"
            if( event.button === 1 ) button = "middle"

            this.$emit( "on-note-click", { note: this.note, event: event, button: button })
        },

        on_bullet_left_click( event ) {
            this.$emit( "on-note-click", { note: this.note, event: event, button: "left" })
        },

        on_bullet_db_click( event ) {
            printf( "on_bullet_db_click -> event -> ", event )
        },

        on_bullet_middle_click() {
            this.$emit( "on-note-click", { note: this.note, event: event, button: "middle" })
        },

        get_query( note ) {

            let tags = note.get_tags()
            let to_return

            tags.map( tag => {
                if( tag.indexOf("query") !== -1 ) to_return = tag.split("/")[2]
            })

            return to_return
        },

        get_component() {

            let tags = this.inote.get_tags()
                if( !tags.length ) return null

            let to_return
            tags.map( tag => {
                if( tag.split('/').length >= 1 && tag.split('/')[1] === "component"  ) {
                    // let instance  = new ilse.classes.Component({ type: tag.split('/')[2], width: 12 })
                    let instance  = ilse.types.get( tag.split('/')[2] )
                        to_return     = instance
                }
            })

            return to_return
        },

        on_textarea_click( event, note ) {
            if( !note.content ) note.content += "EMPTY"
        },

        async add_file( event ) {

            if( this.options.read_only ) return

            let file        = event.dataTransfer.files[0] 
                if( !file ) return

            let fileData    = new Blob( [file] )
            let arrayBuffer = await fileData.arrayBuffer() 
            const buffer    = Buffer.from( arrayBuffer  ,'binary' )
            let blob        = buffer
            let name        = file.name || Math.random().toString().replace("0.", "")

            await ilse.filesystem.file.write.async( name, blob )

            this.inote.focus()

            setTimeout( () => {
                this.inote.caret.add( ` ![[${name}]]` ) }, 100 )
        },

        // on_note_search_result_select( payload ) {
        on_note_search_result_select( type, text ) {

            let _this   = this
            let note    = this.inote

            setTimeout( () => {

                this.inote.focus()
                let dom         = document.getElementById( note.id )

                // BUGFIX: For some reason after inserting "id+))" if we blur we'll lose and go back to "((" This fixes this issue by setting inote.content directly
                let is_note_ref = type === "note" && note.content.indexOf(text) === -1 
                let is_file_ref = type === "file" && note.content.indexOf( text.replace(".md", "") ) === -1 
                let value

                if( is_note_ref ) _this.inote.content += ` ((${text}))`, dom 
                if( is_file_ref ) _this.inote.content += ` ![[${text.replace(".md", "")}]]`, dom 
            }, 100 )


        },

        get_html( note ) {

            let content         = this.options.is_tagless ? note.tagless : note.content
                let normalized      = ilse.markdown.render( content )

            return normalized
        },

        listen_to_embed_keys() {

            let _this = this

            ilse.keyboard.Mousetrap.bindGlobal( "ctrl+space (", function(event){
                event.preventDefault()
                ilse.modals.open( "search", { mode: "embed", filter: "notes", is_markdown_mode_on: true, id: _this.inote.id })
            })


            ilse.keyboard.Mousetrap.bindGlobal( "ctrl+space right-square-bracket", function(event){
                event.preventDefault()
                ilse.modals.open( "search", { mode: "embed", filter: "files", is_markdown_mode_on: true, id: _this.inote.id })
            })

        },

        stop_listening_to_embed_keys() {
            ilse.keyboard.Mousetrap.unbind( "ctrl+space right-square-bracket")
            ilse.keyboard.Mousetrap.unbind( "ctrl+space (")
        },

        on_focus( event, inote ) {

            if( this.options.read_only ) return

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

            // Blur all others
            printf( "on_focus -> blurring everything" )
            Messager.emit( "~note.vue", "blur-all" )

            // Correct
            if( this.inote.id === inote.id ) {

                // BUGFIX: don't need to click on note twice to actually focus on it.
                setTimeout( ( )  => {
                    let dom = document.getElementById( inote.id )
                    if( dom ) dom.focus()
                    // this.resize_textarea()
                }, 10 )

                this.inote.is_editable = true

            } else {
                this.inote.is_editable = false
            }


        },

        // BUG: Focusin on a note does not blue others
        on_blur( event, inote ) {

            printf( "Note.vue -> on_blur -> inote -> ", inote.content )

            // save(contentEditable)
            this.inote.content = event.target.innerText

            this.stop_listening_to_embed_keys()

            if( inote.id === this.inote.id ) {
                // Blur
                this.inote.is_editable = false

                // Says we have blurred
                this.$emit( "on-blur", { event: event, note: inote })

                // ??
                // Messager.emit( "~note.vue", "blur", {note: this.inote})

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
            let is_space = key === " "

            let selection= get_clipboard()
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

            let char           = event.key
        },

        open_search( filter = "all" ) {
            // this.inote.caret.get() 
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
                if( action === "blur-all" ) {
                    this.is_editable = false
                }
            })

            Messager.on( "~carret", async ( action, payload ) => { })

        },

        // ??
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
    /*border: 1px solid #000;
    margin-bottom: 10px !important;*/
}

.edit:focus {
    outline: none;
    border-bottom: 1px solid var( --text-color );
}

.editable:focus {
    outline: none;
}

input:focus{
    outline: none;
}

.editable {
    /*background: var( --background-color );*/
    background: transparent;
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

.edit, .html {
    /*margin-bottom: 6px;*/
    min-width: 100px;
    width: fit-content;
    font-size: 1em;
    user-select: text;
    /*width: -webkit-fill-available;*/
    /*border: 1px solid #000;*/
    min-height: 26px;
}

.bullet p {
    margin-top:   -5px;
    text-align:   center;
    cursor:       pointer;
    color:        #a3a3a3;
    color:        var( --text-color );
    font-size: 1.5em;
    cursor:       pointer;
}

.clear {
    height: 30px;
    clear: both;
}

.note .bullet p {
    margin-right: 7px;
    width: 10px;
    height: 10px;
}

.note .bullet p.collapsed {
    font-size: 0.9em;
    margin-right: 5px;
    margin-top: 2px;
}

.dragging-over {
    background: var( --secondary-background-color );

}

</style>
