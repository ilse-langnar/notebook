<template lang="pug" >
.quick-search

    // .flex
        img.flexi( :src="irequire.img('lupe.svg')"    )
        input.flexi.input.search( v-model="query" list="list" @keydown.enter="search = query" @keydown.esc="search = '' " )

    input.flexi.input.search( v-model="query" list="list" @keydown.enter="search = query" @keydown.esc="search = '' " )
    .search-result( v-if="search && query" style="" )
        Notes( v-for="( item, index ) in ilse.notes.query( search )" :key="index" :note="item" :options="{}" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// components
    import Notes                        from "@/components/Notes.vue"

export default {

    name: "QuickSearch",

    data() {
        return {
            ilse: ilse,
            query: "",
            search: "",
        }
    },

    components: {
        Notes,
    },

    watch: {

        query( search ) {

            // if( search.length === 0 || search.length === 1 )
            let _this = this
            clearTimeout( this.timeout )

            this.timeout = setTimeout( () => {
                _this.query = search
            }, 1500 )
        },

    },

    methods: {

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.search {
    margin-left: 10px !important;
    border: 0 !important;
}

.search-resultt {
    position: absolute;
    top: 90px;
    left: 0%;
    width: 80%;
    border: 1px solid #000;
    background: #fff;
    overflow: hidden;
    height: 80vh;
    z-index: 5;
    overflow-y: scroll;
    resize: right; 
}

</style>
