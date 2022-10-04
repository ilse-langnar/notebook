<template lang="pug" >
.favorites

    details
        summary Files
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


    .loop( v-for="( item, index ) in get_favorites()" ) 

        .file-referencel( v-for="( file, file_reference_index ) in ilse.notes.get_file_references(item.content)" :keu="'file-reference-index' + index" )
            details
                summary {{file.split("|")[1].replace("]]", "")}}
                .loopl( v-if="note.content.indexOf('#favorite') === -1 " v-for="( note, ref_index ) in ilse.notes.query(  file.split('|')[0].replace( '![[', '') )" :key="'search' + ref_index" ) 
                    Notes( :note="note" :options="{}" )


</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Component
    import Notes                        from "@/components/Notes.vue"

export default {

    name: "Favorites",

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        Notes,
    },

    methods: {

        get_favorites() {
            let list = ilse.notes.query( '#favorite' ) 
            return list
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
