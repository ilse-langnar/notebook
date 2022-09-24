<template lang="pug" >
// .edit-note( :style="get_root_style( note ? note : component.props.note )" )
.edit-note
    Notes( :note="ilse.notes.query(component.props.note+ ':' )[0]" @on-note-left-click="on_note_left_click" @on-enter="on_enter" @on-ctrl-enter="on_ctrl_enter" @on-ctrl-shift-delete="on_ctrl_shift_delete" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-arrow-up="on_arrow_up" @on-arrow-down="on_arrow_down" @on-link-click="on_note_link_click")
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Note                         from "@/components/Note.vue"
    import GhostNote                    from "@/components/GhostNote.vue"
    import EditNote                     from "@/components/EditNote.vue"
    import Notes                        from "@/components/Notes.vue"

// functions
    import get_unique_date_id           from "@/classes/get_unique_date_id.js"

export default {

    name: "EditNote",

    props: {
        component: { type: Object, required: false, },
        note: { type: Object, required: false, }
    },

    components: {
        Notes,
        Note,
        GhostNote,
        EditNote,
    },

    data() {
        return {
            ilse: ilse,
            notes: [],
        }
    },

    methods: {

        on_note_left_click( payload ) {

            let note        = payload.note
            let event       = payload.event
            let is_shift    = event.shiftKey
            let is_ctrl     = event.ctrlKey

            if( is_shift ) {
                let component = new ilse.classes.Component({ type: "mind-map", width: 12, props: { note: note } })
                    ilse.components.push( component )
            }

            if( is_ctrl ) {
                let component = new ilse.classes.Component({ type: "memex", width: 12, props: { note: note } })
                    ilse.components.push( component )
            }

        },

        get_root_style( note ) {
            let is_root = note.depth === 0
            let style   = ``
                if( is_root ) style += `width: 80%; margin: 0 auto; `

            return style
        },

        // Control the margins
        get_note_style( note ) {

            // let style = `display: flex;`
            let style = ``
                if( note.depth ) style += `margin-left: ${18 * note.depth}px !important; `

            return style
        },

        get_note( id ) {
            let query_result = ilse.notes.query( `${id}:` )[0]
            return query_result
        },

        on_ghost_note_enter( payload ) {

            let content         = payload.content
            let has_text        = !!content
                if( !has_text ) return

            let time_id         = get_unique_date_id() // 20220120155758
            let note          = new ilse.classes.Note( `${time_id}: ${content}`)
                this.notes.push( note )
        },

        on_ghost_note_blur( payload ) {

            let content         = payload.content
            let has_text        = !!content
                if( !has_text ) return

            let time_id         = get_unique_date_id() // 20220120155758
            let note          = new ilse.classes.Note( `${time_id}: ${content}`)
                this.notes.push( note )
        },

        on_note_link_click( payload ) {

            let note           = payload.note
            let file             = payload.link
            let event            = payload.event

            let is_shift         = event.shiftKey
                if( !is_shift ) return

            let is_file_markdown = !(file.indexOf(".mp4") !== -1 || file.indexOf(".png") !== -1 || file.indexOf(".jpg") !== -1 || file.indexOf(".jpeg") !== -1 || file.indexOf(".gif") !== -1 || file.indexOf(".svg") !== -1 || file.indexOf(".mp4") !== -1 || file.indexOf(".webm") !== -1 || file.indexOf(".mp3") !== -1 || file.indexOf(".ogg") !== -1 || file.indexOf(".wav") !== -1)
                // if( is_file_markdown ) file += ".md"

            let component = new ilse.classes.Component({ type: "file", width: 8, props: { file }})
                ilse.components.push( component )
        },

        // Control the margins
        get_note_style( note ) {

            let style = ``
                if( note.depth ) style += `margin-left: ${7 * note.depth}px; `

            return style
        },

        // TODO: BUG: When we type enter we correctly add the note but it's not rendered corretly, also setting the depth is problematic k
        on_enter( payload ) {

            let note = payload.note
            let depth  = note.depth
            let new_note = ilse.notes.add_after( "", depth, note )
                new_note.focus()

            setTimeout( () => { ilse.save() }, 1000 )
        },


        /*
        on_enter( payload ) { 
                printf( "EditNote.vue -> on_enter -> payload -> ", payload )
            let note   = payload.note
                printf( "EditNote.vue -> on_enter -> note -> ", note )
            let depth  = note.depth
                printf( "EditNote.vue -> on_enter -> depth -> ", depth )
            // ilse.notes.add_after( "", depth, note )
            let index = ilse.notes.list.indexOf(note)
                ilse.notes.add( "", ++index )
            // setTimeout( () => { ilse.save() }, 1000 )
        },
        */

        on_ctrl_enter( payload ) {
            let note = payload.note
            let depth  = note.depth
                ilse.notes.add_after( "", ++depth, note )
        },

        on_ctrl_shift_delete() {
        },

        on_tab( payload ) {
            payload.note.$depth( 1 )
        },

        on_shift_tab( payload ) {
            payload.note.$depth( -1 )
        },

        on_arrow_up() {
            // XXX
        },

        on_arrow_down() {
            // XXX
        },

        set_note_from_component() {

            let is_from_dynamic_component  = this.$props.component 
                if( !is_from_dynamic_component ) {
                    this.is_on = true
                    return
                }

            let component   = this.$props.component
            let props       = this.$props.component.props
            let note      = props.note
                this.notes.push( note )

            printf( "note.children -> ", note.children )
            let has_children = note.children  && note.children.length
                if( has_children )  {

                    for( const child of note.children ) {
                        this.notes.push( child )
                    }

                }

            this.is_on      = true

        },

        listen() {

            Messager.on( "~notes", (action, payload) => {

                if( action === "added" ) {

                    printf( "~notes -> action -> ", action )
                    printf( "~notes -> payload -> ", payload )
                    let after       = payload.after
                    printf( "after -> ", after )
                    let new_note    = payload.note
                    printf( "new_note -> ", new_note )

                    printf( "this.notes -> ", this.notes )

                    // let index = 0 
                    // for( const note of this.notes ) {
                        // index++

                        // if( note.id !== after.id ) continue

                        // this.notes.splice( ++index, 0, new_note )
                        // new_note.focus() 
                            // return
                    // } // for 

                }

            })

        },

        check_component() {
            if( !this.component ) {
                this.notes.push( this.note )
            } else {
                this.set_note_from_component()
            }
        },

        setup() {
            this.check_component()
            this.listen()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.edit-note {
}

</style>
