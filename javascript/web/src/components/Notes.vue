<template lang="pug" >
.notes
    Note( :note="note" )
    .loop( v-for="( item, index ) in note.children" :key="index" :style="get_note_style(item)" )
        // Note( :note="item" )
        Notes( :note="item" )

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
        Note,
        Notes,
    },

    methods: {

        // Control the margins
        get_note_style( note ) {

            // let style = `display: flex;`
            let style = ``
                if( note.depth ) style += `margin-left: ${20 * note.depth}px !important; `

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

</style>
