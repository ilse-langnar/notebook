<template lang="pug" >
.notes( v-if="note" )
    // component( :is="require('@/components/Note.vue').default" :note="note" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-click="on_note_click" )

    Note( :note="note" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-click="on_note_click" :options="options" :style="get_note_style(note)" )

    // button.button( @click="show_children" )
    .children( v-if="!options.is_collapsed" :key="options.key" )
        .loop( v-for="( item, index ) in get_note_children( note )" :key="index" :style="get_note_style(item)" )
            Notes( :note="item" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-click="on_note_click" :options="options" )
            // Note( :note="item" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-click="on_note_click" :options="options" )

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

// functions
    import get_note_children            from "@/classes/get_note_children.js"
    import if_else                      from "@/classes/if_else.js"

export default {

    name: "Notes",

    props: {
        // note: { type: Object, required: false, },
        note: { type: String, required: false, },
        options: { type: Object, required: false, default: function() {
                return {
                    prevent_depth_margin: false,
                    key: 0,
                    hide_bullet: false,
                    is_tagless: false,
                    read_only: false,
                    is_editable: false,
                    is_collapsed: false,
                }
            }
        },
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        Notes,
        Note,
    },

    methods: {

        show_children() {
            printf( "get_note_children( this.note ) -> ", get_note_children( this.note ) )
        },

        get_note_children( id ) {
            return get_note_children( id )
        },

        on_note_click( payload ) {
            printf( "Notes.vue -> payload -> ", payload )


            printf( "before -> this.options.is_collapsed -> ", this.options.is_collapsed )
            if( payload.button === "middle" ) this.options.is_collapsed = !this.options.is_collapsed
            printf( "after -> this.options.is_collapsed -> ", this.options.is_collapsed )

            this.$emit( "on-note-click", payload )
        },

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

        get_note_style( id ) {

            if( !id || !ilse.notes.list[id] ) return ""

            let depth  = ilse.notes.list[id].depth
            if( depth === 0 ) return ""
            if( depth === 1 ) return `margin-left: 18px !important; `

            return if_else(
                depth >= 1,
                is      => `margin-left: ${18 * depth}px !important; `,
                is_not  => ''
            )

        },

        /*
        // Control the margins
        get_note_style( note ) {

            // FEATURE: Some components want a flat notes
            if( this.options.prevent_depth_margin ) return

            // let style = `display: flex;`
            let style = ``

            // TODO: The bigger 'depth' is, the lower margin I'll give.
            let divider = Math.pow( 2, note.depth - 1)
            let final = 21 * note.depth / divider
            if( note.depth )            style += `margin-left: ${final}px !important; `

            return style
        },
        */

        check_for_collapse_tag() {
            // if( this.note && this.note.content.indexOf("#!c") !== -1 )  this.options.is_collapsed = true
        },

        setup() {
            this.check_for_collapse_tag()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.notes .loop {
}

.children {

}

.left-border {
    border-left: 1px solid #999; 
    margin: 5px;
    border: 1px solid #000;
}

.two {
    border-left: 1px solid red; 
}

</style>
