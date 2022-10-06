<template lang="pug" >
.references( :key="key" )
    .has

        span.loop( v-for="( item, index ) in get_related_links( file )" :key="index" style="margin: 5px; ") {{item}}

        br( style="clear: both;" )
        br

        p.is-size-5 References

        details( v-if="query_linked(file) && query_linked(file).length" open )
            summary Linked References({{query_linked(file).length}})

            .linked
                .loop( v-for="( item, index ) in query_linked(file)" :key="index" )
                    Notes( :note="item" @on-link-click="on_note_link_click" )

        details( v-if="query_linked(file) && query_linked(file).length" )
            summary Unlinked References({{query_unlinked(file).length}})
            .un-linked
                .loop( v-for="( item, index ) in query_unlinked(file)" :key="index" )
                    .flex
                        Notes( :note="item" @on-link-click="on_note_link_click" )
                        button( @click="link(item)" ) Link

    .not( v-if="!query_linked(file) || !query_linked(file).length" )
        h1.centered No References({{file}})

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

// functions
    import query                        from "@/classes/query.js"
    import extract_note_id              from "@/classes/extract_note_id.js"
    import set                          from "@/classes/set.js"
    import if_else                      from "@/classes/if_else.js"
    import add_component                from "@/classes/add_component.js"
    import extract_markdown_links_from_string  from "@/classes/extract_markdown_links_from_string.js"
    import remove_duplicates_from_array from "@/classes/remove_duplicates_from_array.js"

export default {

    name: "References",

    props: {
        file: { type: String, required: false, },
        options: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
            key: 0,
        }
    },

    components: {
        Notes,
    },

    methods: {

        get_related_links( file ) {
            return remove_duplicates_from_array(extract_markdown_links_from_string(this.query_linked(file).join(" ") ) )
        },

        remove_duplicates_from_array( array ) {
            return remove_duplicates_from_array( array )
        },

        extract_markdown_links_from_string( string ) {
            return extract_markdown_links_from_string( string )
        },

        query_linked( file ) {
            return query(`[[${file.replace(".md", "")}]]`, null, true )
        },

        query_unlinked( file ) {
            let r          = `[^\\[\\[](${file.replace(".md", "")})[^\\]\\]]` // file, but without the [[]]
            let reg_exp    = new RegExp( r, "ig" )
            let result     = ilse.notes.query_regexp( reg_exp )
            printf( "query_unlinked -> ", result )
            return result
        },

        link( note ) {

            set( ilse.notes.list, extract_note_id( note ), note.replace( new RegExp(`(${this.file.replace(".md", "")})`, 'ig'), `[[${this.file.replace(".md", "")}]]` ) )

            // printf( "ilse.notes.list[extract_note_id(note)] -> ", extract_note_id(note), ilse.notes.list[extract_note_id(note)] )
            
            // printf( "before -> ilse.notes.list[extract_note_id(note)] -> ", ilse.notes.list[extract_note_id(note)] )
            // set( ilse.notes.list, extract_note_id( note ), "Example 222" )

            // set( this, "key", Math.random() )

            // printf( "after -> this.ilse.list[extract_note_id(note)] -> ", this.ilse.list[extract_note_id(note)] )

            // printf( "references.vue -> link -> note -> ", note )
            // set( note, "content", note.content.replace( new RegExp(`(${file.replace(".md", "")})`, 'ig'), `[[${file.replace(".md", "")}]]` ))
            // extract_note_id( note )
            // let file = this.file.replace(".md", "")
            // note.content = note.content.replace( new RegExp(`(${file})`, 'ig'), `[[${file}]]` )
        },

        on_note_link_click( payload ) {

            if_else(
                payload.event.shiftKey,
                yes => add_component({ type: "file", props: { file: payload.link }, width: 12 }),
                no  => null
            )

        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>
details:focus {
    outline: mode;
}

details summary:focus {
    outline: none;
}

.un-linked button  {
    height: 20px;
    width: 30px;

}


</style>
