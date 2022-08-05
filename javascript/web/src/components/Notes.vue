<template lang="pug" >
.notes
    // Note( :note="note" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-left-click="on_note_left_click" @on-note-middle-click="on_note_middle_click(note)" @on-note-right-click="on_note_right_click"  )

    component( :is="require('@/components/Note.vue').default" :note="note" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-left-click="on_note_left_click" @on-note-middle-click="on_note_middle_click(note)" @on-note-right-click="on_note_right_click"  )

    .loop( v-for="( item, index ) in note.children" :key="index" :style="get_note_style(item)" )
        Notes( :note="item" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-left-click="on_note_left_click" @on-note-middle-click="on_note_middle_click(note)" @on-note-right-click="on_note_right_click"  )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    // import Note                         from "@/components/Note.vue"
    import Notes                        from "@/components/Notes.vue"

export default {

    name: "Notes",

    props: {
       note: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        // Note,
        Notes,
    },

    methods: {

        on_enter( payload ) {
            this.$emit( "on-enter", payload )
        },

        on_tab( payload ) {
            this.$emit( "on-tab", payload )
        },

        on_shift_tab( payload ) {
            this.$emit( "on-shift-tab", payload )
        },

        on_note_link_click( payload ) {
            this.$emit( "on-link-click", payload )
        },

        on_note_esc() {
            this.$emit( "on-esc" )
        },

        on_note_arrow_up( payload ) {
            this.$emit( "on-arrow-up", payload )
        },

        on_note_arrow_down( payload ) {
            this.$emit( "on-arrow-down", payload )
        },

        on_note_left_click( payload ) {
            this.$emit( "on-left-click", payload )
        },

        on_note_middle_click( payload ) {
            this.$emit( "on-middle-click", payload )
        },

        on_note_right_click( payload ) {
            this.$emit( "on-right-click", payload )
        },

        // Control the margins
        get_note_style( note ) {

            // let style = `display: flex;`
            let style = ``
                if( note.depth ) style += `margin-left: ${15 * note.depth}px !important; `

            return style
        },

        setup() {

        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.notes .loop {
    border-left: 1px solid var( --text-color );
}


</style>
