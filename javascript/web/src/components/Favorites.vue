<template lang="pug" >
.favorites


    img.extended( v-for="( item, index ) in get_favorites()" :key="index" :src="get_item_img(item)" style="cursor: pointer; width: 20px; margin-left: 3px; " @click="toggle_left_menu( $event, item.id, true )" )

    // .loop( v-for="( item, index ) in get_favorites()" ) 
        // Notes( :note="item.id" :options="{}" )
        // Outline( :notes="[item.id]" )

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
import printf                           from "@/classes/printf.js"

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
    import set                          from "@/classes/set.js"
    import has_string                   from "@/classes/has_string.js"
    import if_else                      from "@/classes/if_else.js"
    import get_index_of                 from "@/classes/get_index_of.js"
    import get_array_item_from_string   from "@/classes/get_array_item_from_string.js"
    import string_to_html               from "@/classes/string_to_html.js"

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

        get_item_img( item ) {

            let list           = item.content.split(" ")
            let html           = string_to_html( item.content )

            let icon           = html.querySelector("link[rel*='icon']") 
                if( icon ) return icon.getAttribute("href")
            return ilse.require( "point.svg" ) 

            /*
            if( img ) {
                printf( ">>>> img -> ", img )
                return img
            } else {
            }

            return if_else(
                has_custom_svg,
                yes => {
                    let chunks = item.content.split(" ")
                    let index  = get_index_of( chunks, "#i/svg/base64/" )

                    let base64 = chunks[++index]
                    return `data:image/svg+xml;base64,${base64}`
                },
                no  => { return ilse.require( "point.svg" ) },
            )
            */

        },

        toggle_left_menu( event, name, is_on ) {

            set( ilse, "is_left_sidebar_open", !ilse.is_left_sidebar_open )
            set( ilse, "left_sidebar", name )

            /*
            if( name === ilse.left_sidebar ) {
                set( ilse, "is_left_sidebar_open", false )
                return
            }


            if( ilse.left_sidebar && ilse.is_left_sidebar_open ) {
                ilse.left_sidebar = name
            } else {
                set( ilse, "is_left_sidebar_open", !ilse.is_left_sidebar_open )
                ilse.left_sidebar = name
            }
            */

        },

        get_embed_url( content ) {

            let url = extract_html_embeds( content )
                if( !url.length ) return ""

            return `${get_target_directory_url()}${url[0].replace("![[", "").replace("]]", "")}`
        },

        extract_html_embeds( string ) {
            return extract_html_embeds( string )
        },

        get_favorites() {
            let result = ilse.notes.query( '#favorite' ) 
            printf( "result -> ", result )
            return result
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
