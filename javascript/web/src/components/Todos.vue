<template lang="pug" >
.tag-todo( :key="key" )
    .centered
        input.input( v-model="filter" )
        img( src="@/assets/images/question-mark.svg" style="width: 20px; cursor: pointer; vertical-align: middle;" :title="Object.keys(ilse.tags.tags)" )
    br
    .loop( v-for="( note, index ) in ilse.notes.query( '- [ ] ' + filter )" :key="index" )
        Note( :note="note" @on-blur="on_note_blur" )
    // .loop( v-for="( tag, index ) in Object.keys(ilse.tags.tags)" :key="index" )
        p {{tag}}
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

export default {

    name: "Todos",

    data() {
        return {
            ilse: ilse,
            key: 0,
            filter: "",
        }
    },

    components: {
        Note,
    },

    methods: {

        on_note_blur( payload ) {
            // this.key = Math.random()
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
