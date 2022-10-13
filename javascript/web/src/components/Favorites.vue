<template lang="pug" >
.favorites

    .loop( v-for="( item, index ) in get_favorites()" ) 
        // Notes( :note="item.id" :options="{}" )
        Outline( :notes="[item.id]" )

        // details( v-if="item.content.indexOf('#open') === -1")
            embed( v-if="get_embed_url(item.content)" :src="get_embed_url(item.content)" scale="tofit" )

        // .closed( v-else )
            embed( v-if="get_embed_url(item.content)" :src="get_embed_url(item.content)" scale="tofit" )

        // Notes( v-else :note="item.id" :options="{}" )

        // .file-referencel( v-for="( file, file_reference_index ) in ilse.notes.get_file_references(item.content)" :keu="'file-reference-index' + index" )
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
    import Outline                      from "@/components/Outline.vue"

// functions
    import extract_html_embeds          from "@/classes/extract_html_embeds.js"
    import get_target_directory_url     from "@/classes/get_target_directory_url.js"

export default {

    name: "Favorites",

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        Notes,
        Outline,
    },

    methods: {

        get_embed_url( content ) {

            let url = extract_html_embeds( content )
                if( !url.length ) return ""

            return `${get_target_directory_url()}${url[0].replace("![[", "").replace("]]", "")}`
        },

        extract_html_embeds( string ) {
            return extract_html_embeds( string )
        },

        get_favorites() {
            return ilse.notes.query( '#favorite' ) 
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

.favorites {
    overflow: auto;
    padding: 2px; 
}

.favorites embed {
    width: 100%;
    height: 100%;
    resize: all;
}

</style>
