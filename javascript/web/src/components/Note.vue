<template lang="pug" >
.note
    .flex( :style="options.style" :class=" is_dragging_over ? 'dragging-over' : '' " )

        .bullet( v-if="!options.hide_bullet" )
            p.collapsed( v-if="options.is_collapsed" :title="get_human_readable_creation_date(note)" @click="on_bullet_click" @click.middle="on_bullet_click" @dbclick="on_bullet_db_click" :id=" 'bullet-' + note" ) &#8277;
            p.expanded( v-if="!options.is_collapsed" :title="get_human_readable_creation_date(note)" @click="on_bullet_click" @click.middle="on_bullet_click" @dbclick="on_bullet_db_click" :id=" 'bullet-' + note" ) &bull;

        .edit( contentEditable v-if="options.is_editable" :id="note" @keydown="on_key_down($event)" @blur="on_blur($event)" :placeholder="$t('note_placeholder')" @drop.prevent="add_file" :style="get_fit_content_style(note)" ) {{ilse.notes.list[note].content}}

        .html( v-show="!options.is_editable" v-html="markdown_to_html(note)" @click="on_focus($event)" :id="note" @drop.prevent="add_file" :style="get_fit_content_style(note)" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Notes                        from "@/components/Notes.vue"
    import Note                         from "@/components/Note.vue"
    import File                         from "@/components/Note.vue"

// Constants
    import HTML_TEMPLATE                from "@/classes/HTML_TEMPLATE.js"

// functions
    import get_human_readable_creation_date from "@/classes/get_human_readable_creation_date.js"
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
    import get_note_depth               from "@/classes/get_note_depth.js"
    import get_spaces_count             from "@/classes/get_spaces_count.js"
    import and                          from "@/classes/and.js"
    import same                         from "@/classes/same.js"
    import not                          from "@/classes/not.js"
    import is                           from "@/classes/is.js"
    import prevent_default              from "@/classes/prevent_default.js"

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
        Notes,
        Note,
        File,
    },

    data() {
        return {
            ilse: ilse,
            is_dragging_over: false,
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
            printf( "Note.vue -> on_bullet_click -> " )

            // if( this.inote.children.length && event.button === 0 ) this.inote.is_collapsed = !this.inote.is_collapsed

                printf( "1" )
            let button
            if( event.button === 0 ) button = "left"
                printf( "2" )
            if( event.button === 2 ) button = "right"
                printf( "3" )
            if( event.button === 1 ) button = "middle"

                printf( "4" )
            this.$emit( "on-note-click", { note: this.note, event: event, button: button })
        },

        on_bullet_db_click() {
            this.$emit( "on-bullet-db-click", { note: this.note, event: event, button: button })
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

        markdown_to_html( id ) {
            printf( "Note.vue -> markdown_to_html -> id -> ", id )
            printf( "ilse.notes.list[id] -> ", ilse.notes.list[id] )
            return markdown_to_html( ilse.notes.list[id].content )
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

            this.focus( this.note )
        },

        focus( id ) {
            this.options.is_editable = true

            setTimeout( () => {
                let dom = document.getElementById( id )
                if( dom ) dom.focus()
            }, 10 )

        },

        // BUG: Focusin on a note does not blue others
        on_blur( event, inote ) {
            this.options.is_editable = false
            ilse.notes.list[this.note].content = event.target.innerText // inline save
            ilse.notes.save()
        },

        // TODO: Take selected text, if [ then wrap the text around
        on_key_down( event, inote ) {

            let is_ctrl  = event.ctrlKey
            let is_shift = event.shiftKey
            let key      = event.key

            // Wrap: Writing = [[Writing]]
            if_else( 
                and( same( key, "["), is( get_clipboard() ) ),
                yes => {
                    prevent_default( event )
                    set( ilse.notes.list[this.note], "content", ilse.notes.list[this.note].content.replace( get_clipboard(), `[[${get_clipboard()}]]` ) )
                },
            )

            // esc(Escape)
            if_else( 
                and( same( key, "Escape" ), not(is_ctrl), not(is_shift) ),
                yes => {
                    prevent_default( event )
                    this.$emit( "on-esc", { note: ilse.notes.list[this.note], event })
                },
            )

            // enter
            if_else( 
                and( same( key, "Enter" ), not(is_ctrl), not(is_shift) ),
                yes => {
                    prevent_default( event )
                    this.$emit( "on-enter", { note: ilse.notes.list[this.note], event })
                },
            )

            // ctrl+enter
            if_else( 
                and( same( key, "Enter" ), is(is_ctrl), not(is_shift) ),
                yes => {
                    prevent_default( event )
                    this.$emit( "on-ctrl-enter", { note: ilse.notes.list[this.note], event })
                },
            )

            // ctrl+shift-delete
            if_else( 
                and( same( key, "Delete" ), is(is_ctrl), is(is_shift) ),
                yes => {
                    prevent_default( event )
                    this.$emit( "on-ctrl-shift-delete", { note: ilse.notes.list[this.note], event })
                },
            )

            // shift+enter: Add artificial newline
            if_else( 
                and( same( key, "Enter" ), not(is_ctrl), is(is_shift) ),
                yes => {
                    prevent_default( event )
                },
            )

            // tab
            if_else( 
                and( same( key, "Tab" ), not(is_ctrl), not(is_shift) ),
                yes => {
                    prevent_default( event )
                    this.$emit( "on-tab", { note: ilse.notes.list[this.note], event })
                },
            )

            // shift-tab
            if_else( 
                and( same( key, "Tab" ), not(is_ctrl), is(is_shift) ),
                yes => {
                    prevent_default( event )
                    this.$emit( "on-shift-tab", { note: ilse.notes.list[this.note], event })
                },
            )

            // up/down
            if_else( 
                and( same( key, "ArrowUp" ), not(is_ctrl), not(is_shift) ),
                yes => {
                    prevent_default( event )
                this.$emit( "on-arrow-up", { note: ilse.notes.list[this.note], event })
                },
            )

            if_else( 
                and( same( key, "ArrowDown" ), not(is_ctrl), not(is_shift) ),
                yes => {
                    prevent_default( event )
                this.$emit( "on-arrow-down", { note: ilse.notes.list[this.note], event })
                },
            )

        },

        listen() {

            let _this = this

            Messager.on( "~note.vue", async ( action, payload ) => {
                if( action === "focus" ) if( this.note === payload.target ) this.focus( payload.target ) 
                if( action === "link-click" ) if( this.note === payload.target ) {
                    _this.$emit( "on-link-click", { link: payload.link, event: payload.event, note: ilse.notes.list[_this.note] } )
                }
                if( action === "blur-all" ) { this.is_editable = false }
            })

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
                // this.inote    = note

            this.is_on      = true

        },

        setup() {
            printf( "this.$props -> ", this.$props )
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

input:focus{
    outline: none;
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

.html ul {
    padding: 0;
}

</style>
