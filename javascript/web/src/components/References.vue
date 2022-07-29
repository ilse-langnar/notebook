<template lang="pug" >
.references

    p.is-size-2.centered( v-if="refs && refs.length" ) {{ $t('references') }} ({{refs.length}}) {{ilse.links.is_loading ? '...' : ''}}
    p.is-size-4.centered( v-if="!refs || !refs.length" ) {{ $t('no_references') }}

    .loop( v-for="( ref, index ) in refs" :key="index" )
        // note( :note="get_note(ref)" )
        Notes( :note="get_note(ref)" @on-link-click="on_note_link_click" )

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
    },

    data() {
        return {
            ilse: ilse,
            refs: [],
        }
    },

    components: {
        Notes,
    },

    methods: {

        on_note_link_click( payload ) {

            let note           = payload.note
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

        get_note( ref ) {
            let note   = ilse.notes.query( ref )
            return note[0]
        },

        set_refs() {

            let file = this.file
                if( !file ) return null

            this.refs = ilse.links.links[ file ]

            return this.refs
        },

        setup() {
            this.set_refs()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
