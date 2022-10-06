<template lang="pug" >
.note
    .flex( :style="options.style" :class=" is_dragging_over ? 'dragging-over' : '' " )

        .bullet( v-if="!options.hide_bullet" )
            p.collapsed( v-if="options.is_collapsed" :title="get_human_readable_creation_date(id)" @click="on_bullet_click" @dbclick="on_bullet_db_click" :id=" 'bullet-' + id" ) &#8277;
            p.expanded( v-if="!options.is_collapsed" :title="get_human_readable_creation_date(id)" @click="on_bullet_click" @dbclick="on_bullet_db_click" :id=" 'bullet-' + id" ) &bull;

        .edit( contentEditable v-if="options.is_editable" :id="id" @keydown="on_key_down($event)" @blur="on_blur($event)" :placeholder="$t('note_placeholder')" @drop.prevent="add_file" :style="get_fit_content_style(content)" ) {{content}}

        .html( v-show="!options.is_editable" v-html="markdown_to_html(content)" @click="on_focus($event)" :id="id" @drop.prevent="add_file" :style="get_fit_content_style(content)" )

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
    import extract_note_id              from "@/classes/extract_note_id.js"
    import extract_note_content         from "@/classes/extract_note_content.js"
    import get_normalized_note          from "@/classes/get_normalized_note.js"
    import get_special_normalized_note  from "@/classes/get_special_normalized_note.js"
    import markdown_to_html             from "@/classes/markdown_to_html.js"
    import if_else                      from "@/classes/if_else.js"
    import set                          from "@/classes/set.js"

    import get_human_readable_creation_date from "@/classes/get_human_readable_creation_date.js"
    import get_note_depth               from "@/classes/get_note_depth.js"
    import get_spaces_count             from "@/classes/get_spaces_count.js"

export default {

    name: "Note",

    props: {
        component: { type: Object, required: false, },
        // note: { type: Object, required: false, },
        note: { type: String, required: false, },
        options: { type: Object, required: false,
            default: function() {
                return {
                    hide_bullet: false,
                    is_tagless: false,
                    read_only: false,
                    is_editable: false,
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

            content: extract_note_content( this.note ),
            id:      extract_note_id( this.note ),

            inote: this.note,

            // is_on: false, // This is for the [note ref] and [file ref] TODO: REMOVE THIS
        }
    },

    methods: {

        get_human_readable_creation_date( string ) {
            return get_human_readable_creation_date( string )
        },

        get_fit_content_style( content ) {

            let embeds = extract_embeds_from_string( content )

            return if_else(
                embeds.length,
                is      => `width: 100%; `,
                is_not  => ''
            )
        },

        /*
        get_dom() {
            let dom = event.srcElement.parentNode
            if( !dom.getAttribute("data-unique-id") ) dom = dom.parentNode
            if( !dom.getAttribute("data-unique-id") ) dom = dom.parentNode

            return dom
        },
        */

        on_drop( event ) {

            // let dom          = this.get_dom()
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
            let drag_index = ilse.notes.list.indexOf( dragging )


            // Remove background Style
            this.reset_drag_n_drop()
        },

        reset_drag_n_drop() {
            this.is_dragging_over   = false
            ilse.dragging           = ""
        },

        on_bullet_click() {

            // if( this.inote.children.length && event.button === 0 ) this.inote.is_collapsed = !this.inote.is_collapsed

            let button
            if( event.button === 0 ) button = "left"
            if( event.button === 2 ) button = "right"
            if( event.button === 1 ) button = "middle"

            this.$emit( "on-note-click", { note: this.note, event: event, button: button })
        },

        on_bullet_db_click() {
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

            // this.inote.focus()

            setTimeout( () => {
                this.inote.caret.add( ` ![[${name}]]` ) }, 100 )
        },

        markdown_to_html( content ) {
            return markdown_to_html( content )
        },

        on_focus( event ) {

            if( this.options.read_only ) return

            // FEATURE: Checkbox
            let clicked_on_a_checkbox = event.target.type === "checkbox"
            if( clicked_on_a_checkbox ) {
                this.content = this.content.replace( "- [ ]", "- [x]" )
                // ilse.notes.save()
                return
            }

            this.focus( this.id )
        },

        focus( id ) {

            this.options.is_editable = true

            setTimeout( () => {
                let dom = document.getElementById( id )
                if( dom ) dom.focus()
            }, 10 )
            // this.inote.focus()
        },

        // BUG: Focusin on a note does not blue others
        on_blur( event, inote ) {

            // save(contentEditable)
            this.content             = event.target.innerText // inline save
            this.options.is_editable = false

            let depth  = get_note_depth( this.id )
            printf( "depth -> ", depth )
            let spaces = get_spaces_count( depth )
            printf( "spaces -> ", spaces  )

            printf( "before(real) -> ", ilse.notes.list[this.id])
            ilse.notes.list[this.id] = `${spaces}${this.content}`
            printf( "after(real) -> ", ilse.notes.list[this.id])

            // printf( "ilse.notes.list[this.id] -> ", ilse.notes.list[this.id] )

            // printf( "this.content -> ", this.content )
            // let special       = get_special_normalized_note( this.id )
            // printf( "special -> ", special )
            // printf( "before -> ilse.notes.list[this.id] -> ", ilse.notes.list[this.id] )
            // ilse.notes.list[this.id] = special
            // printf( "after -> ilse.notes.list[this.id] -> ", ilse.notes.list[this.id] )

            // printf( "before -> ", ilse.notes.list[this.id])
            // printf( "after -> ", ilse.notes.list[this.id])
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
                let normalized = get_normalized_note( this.id )
                this.$emit( "on-enter", { note: normalized, event })
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
                let normalized = get_normalized_note( this.id )
                this.$emit( "on-tab", { note: normalized, event })
                event.preventDefault()
            }

            // Shift-Tab
            if( key === "Tab" && is_shift && !is_ctrl ) {
                event.preventDefault()
                let normalized = get_normalized_note( this.id )
                this.$emit( "on-shift-tab", { note: normalized, event })
            }

            // Arrow up
            if( key === "ArrowUp" && !is_shift && !is_ctrl && !is_alt ) {
                let normalized = get_normalized_note( this.id )
                this.$emit( "on-arrow-up", { note: normalized, event })
            }

            // Arrow down
            if( key === "ArrowDown"  && !is_shift && !is_ctrl && !is_alt ) {
                let normalized = get_normalized_note( this.id )
                this.$emit( "on-arrow-down", { note: normalized, event })
            }

            let char           = event.key
        },

        listen() {

            let _this = this

            /*
            Messager.on( "~search.vue", async ( action, payload ) => {

                // if( action === "select" && this.inote.id === payload.target) this.on_note_search_result_select( payload.type, payload.text )
                if( action === "cancel" && this.inote.id === payload.target) {
                    setTimeout( () => { this.inote.focus(); _this.listen_to_embed_keys() }, 500 )
                }
            })
            */

            Messager.on( "~note.vue", async ( action, payload ) => {
                if( action === "focus" ) if( this.id === payload.target ) this.focus( payload.target ) 
                if( action === "link-click" ) if( this.id === payload.target ) {
                    printf( "Note.vue -> You clicked on a link " )
                    _this.$emit( "on-link-click", { link: payload.link, event: payload.event, note: _this.inote } )
                }
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

            // this.$watch( ilse.notes.list[this.note], e => { printf( ">>>>> e -> ", e ) })
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
    /*border-bottom: 1px solid var( --text-color );*/
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
