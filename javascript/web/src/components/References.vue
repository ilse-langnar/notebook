<template lang="pug" >
.references
    .has( v-if="query_linked(file) && query_linked(file).length" )

        p.is-size-5 References

        details
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
        h1.centered No References

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

export default {

    name: "References",

    props: {
        file: { type: String, required: false, },
        options: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
            refs: [],
            is_linked: true,
        }
    },

    components: {
        Notes,
    },

    methods: {

        query_linked( file ) {
            let result     = ilse.notes.query(`[[${file}]]`)
            return result
        },

        query_unlinked( file ) {
            let r = `[^\\[\\[](${file})[^\\]\\]]` // file, but without the [[]]
            let reg_exp    = new RegExp( r, "ig" )
            let result     = ilse.notes.query_regexp( reg_exp )
            return result
        },

        link( note ) {
            let file = this.file.replace(".md", "")
            // note.content = note.content.replace( file, '[[' + file + ']]' )
            note.content = note.content.replace( new RegExp(`(${file})`, 'ig'), `[[${file}]]` )
        },

        on_note_link_click( payload ) {

            let note             = payload.note
            let file             = payload.link
            let event            = payload.event
            let is_shift         = event.shiftKey
            let is_ctrl          = event.ctrlKey

            let is_file_markdown = !(file.indexOf(".mp4") !== -1 || file.indexOf(".png") !== -1 || file.indexOf(".jpg") !== -1 || file.indexOf(".jpeg") !== -1 || file.indexOf(".gif") !== -1 || file.indexOf(".svg") !== -1 || file.indexOf(".mp4") !== -1 || file.indexOf(".webm") !== -1 || file.indexOf(".mp3") !== -1 || file.indexOf(".ogg") !== -1 || file.indexOf(".wav") !== -1)
                if( is_file_markdown ) file += ".md"

            // <=======> Shift <=======> //
            if( is_shift ) {
                let component = new ilse.classes.Component({ type: "file", width: 8, props: { file }})
                    ilse.components.push( component )
            }
            // <=======> Shift <=======> //

            // <=======> Ctrl <=======> //
            if( is_ctrl ) {
                let component = new ilse.classes.Component({ type: "graph", width: 8, props: { file }})
                    ilse.components.push( component )
            }
            // <=======> Ctrl <=======> //

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
