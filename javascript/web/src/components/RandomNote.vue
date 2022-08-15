<template lang="pug" >
.random-note
    .flex
        input.input( v-model="query" placeholder="#todo, #work, #today" @keydown.enter="key = Math.random()" )
        input.input( v-model="num" type="number" min="1" max="100" style="width: 10%;" )
    .loop( v-for="( item, index ) in get_random_note(query)" :key="index + key" )
        // Notes( :note="get_random_note(query)" :key="key" )

        Notes( :note="item" )
        // Note( :note="item" :key="key" )

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

    name: "RandomNote",

    props: {
    },

    components: {
        Notes,
        Note,
    },

    data() {
        return {
            ilse: ilse,
            key: 0,
            num: 1,
            query: "",
        }
    },

    methods: {

        get_random_note( query ) {
            let result   = ilse.notes.query( query )
            let shuffled = ilse.utils.shuffle_array( result )
            let sized    = shuffled.slice( 0, this.num )
            return sized
            // let random   = shuffled[0]
            // return random
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

.random-note input {
    width: fit-content;
    display: block;
    margin: 0 auto;
    background: var( --background-color );
    color: var( --text-color );
}

</style>
