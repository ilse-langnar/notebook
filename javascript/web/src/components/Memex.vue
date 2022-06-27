<template lang="pug" >
.memex( v-if="selected && selected.id" :key="selected.id" )
    // input.input.centered( style="display: block; margin: 0 auto; margin-top: 20px; " )
    .flex.centered( style="width: 90%; margin-top: 20px;" )

        .parents( style="width: 20%;" )
            .has_parent( v-if="ilse.notes.get_note_parent_v2( selected )" )
                // p ::: {{ilse.notes.get_note_parent_v2( selected )}}
                Note( v-if="ilse.notes.get_note_parent_v2( selected )" :note="ilse.notes.get_note_parent_v2( selected )" :options="{ hideBullet: true }" @on-note-click="on_parent_click(selected)" )
            .no_parent( v-else )
                p No Parent

        .main( style="width: 60%; height: fit-content; " )
            // button.button.slick-button( @click="show_info" ) Show Info
            h2( v-if="selected && selected.id" ) {{selected.id}}
            Note( v-if="selected" :note="selected" :options="{ hideBullet: true }" @on-enter="on_enter" )

            .has_references( v-if="ilse.notes.query(selected.id + ':' ).length > 1" )
                .referneces( v-for="( ref, index) in ilse.notes.query(selected.id + ':' )" :key="'ref-' + index")
                    p {{ref.id}}
            .no_references( v-else )
                p No References

        .children( style="width: 20%;" )
            .has_children( v-if="selected.children && selected.children.length" )
                .children( v-for="( _note, index ) in selected.children" :key="index" style="z-index: 100; overflow: hidden; margin-bottom: 10px; border: 1px solid var(--text-color); border-radius: var( --border-radius );" )
                    Note( :note="_note" :options="{ hideBullet: true }" @on-note-click="on_note_click" style="margin-bottom: 100px;")
            .no_children( v-if="!selected.children && selected.children.length" )
                p No children
    // .centered-note

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
    import RecursiveNote                from "@/components/RecursiveNote.vue"

export default {

    name: "Memex",

    data() {
        return {
            ilse: ilse,
            selected: { id: "id" },
        }
    },
    components: {
        Note,
        RecursiveNote,
    },

    props: {
        component: { type: Object, required: false },
    },

    methods: {

        on_enter( payload ) {

            // let note     = payload.note
            // let depth    = payload.note.depth
            // let new_note = ilse.notes.add_after( "", depth, note )
            let content          = "New Note"
            printf( "on_enter -> payload -> ", payload )
            let depth            = payload.note.depth + 1
            printf( "depth -> ", depth )

            let time_id          = ilse.utils.get_unique_date_id() // 20220120155758
            let spaces           = ilse.utils.get_depth_spaces( depth + 1 )
            let note             = `${spaces}${time_id}: ${content}` // 20220120155758: Hello, World
            let instance         = new ilse.classes.Note( note )
                payload.note.children.push( instance )
                instance.focus()
        },

        show_info() {
            printf( "this.selected -> ", this.selected )
            printf( "this.selected.children -> ", this.selected.children )
        },

        on_parent_click( note ) {
            let parent      = ilse.notes.get_note_parent_v2( note )
                this.selected   = parent
        },

        on_note_click( payload ) {
            printf( "@@@@@ Memex.vue -> on_note_click -> payload -> ", payload )
            this.selected = payload.note
            // let note = ilse.notes.query( payload.note.id + ":" )[0]
            // printf( ">>> note -> ", note )
            // if( note ) this.selected = note

            // this.selected = payload.note
        },

        setup() {
            let component   = this.$props.component
            let note        = component.props.note
            this.selected = note
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.memex .note {
    border-radius: var( --border-radius );
    padding: 20px;
    /*box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;*/
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.flex.centered div {
    margin: 10px;
}

</style>
