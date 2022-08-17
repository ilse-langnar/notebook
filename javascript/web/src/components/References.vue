<template lang="pug" >
.references

    p.is-size-5 References

    // details
        summary.is-size-2.centered 

    // .flex
        .linked( v-if="is_linked && ilse.notes.query( '[[' + file.replace('.md', '') + ']]' ).length " )
            p.is-size-2.centered( v-if="" ) &#10656; {{ $t('linked_references') }} {{ilse.notes.query( '[[' + file.replace('.md', '') + ']]' ).length}}
        .unlinked( v-if="!is_linked && ilse.notes.query( ' ' + file.replace('.md', '') + ' ' ).length " )
            p.is-size-2.centered( v-else-if="" ) &#10656; {{ $t('unlinked_references') }} ({{ilse.notes.query( file.replace('.md', '') + ' ' ).length}})

        // p.is-size-4.centered( v-else ) &#10656; {{ $t('no_references') }} 
        // img( v-if="!is_linked" :src="irequire.img('brackets.svg')"      style="cursor: pointer; width: 20px; "      :title="$t('show_linked_references')" @click="is_linked = !is_linked" )
        // img( v-if="is_linked" :src="irequire.img('brackets-off.svg')"      style="cursor: pointer; width: 20px; " :title="$t('show_unlinked_references')" @click="is_linked=!is_linked" )

    details
        summary Linked References({{ilse.notes.query( '[[' + file.replace('.md', '') + ']]' ).length}})

        .linked
            .loop( v-for="( item, index ) in ilse.notes.query( '[[' + file.replace('.md', '') + ']]' )" :key="index" )
                Notes( :note="item" @on-link-click="on_note_link_click" )

    details
        summary Unlinked References({{ilse.notes.query( ' ' + file.replace('.md', '') + ' ' ).length}})
        .un-linked
            .loop( v-for="( item, index ) in ilse.notes.query( ' ' + file.replace('.md', '') + ' ' )" :key="index" )
                .flex
                    Notes( :note="item" @on-link-click="on_note_link_click" )
                    button( @click="link(item)" ) Link

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
