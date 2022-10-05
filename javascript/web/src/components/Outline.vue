<template lang="pug" >
.outline
    .loop( v-for="( item, index ) in inotes" :key="index" :style="get_note_style(item)" )
        Notes( :note="get_note(item)" :key="index + key" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" )

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
    import Note                         from "@/components/Note.vue"

// functions
    import extract_note_id              from "@/classes/extract_note_id.js"
    import move_array_item              from "@/classes/move_array_item.js"

export default {

    name: "Outline",

    props: {
        notes: { type: Array, required: false },
    },

    data() {
        return {
            ilse: ilse,
            inotes: this.notes,
            key: 0,
        }
    },

    components: {
        Notes,
        Note,
    },

    methods: {

        get_note( string ) {
            let instance = new ilse.classes.Note( string )
            return instance
        },

        get_note_style( note ) {

            let style = ``
            let real  = ilse.notes.list[note.split(':')[0].trim().replace(':', '')]
            let depth = real.split("    ").length
                if( depth >= 2 ) style += `margin-left: ${18 * depth}px !important; `

            return style
        },

        on_enter( payload ) {

            let note     = payload.note

            let original = ilse.notes.list[note.id]

            let depth    = original.split("    ").length
                if( depth > 0 ) depth -= 1 // bugfix
            printf( depth )

            let new_note = ilse.notes.add_after( "", depth, note )
            let id       = extract_note_id( new_note )

            setTimeout( () => {
                Messager.emit( "~note.vue", "focus", { target: id })
            }, 100 )
                // new_note.focus()
        },

        on_tab( payload ) {
            let note = payload.note
            let id   = note.raw.split(':')[0].trim().replace(':', '')
                ilse.notes.list[id] = `    ${[ilse.notes.list[note.id]]}`

            this.key = Math.random()
            setTimeout( () => {
                Messager.emit( "~note.vue", "focus", { target: id })
            }, 0 )
        },

        on_shift_tab( payload ) {
            let note = payload.note
            let id   = note.raw.split(':')[0].trim().replace(':', '')
                ilse.notes.list[id] = ilse.notes.list[id].replace("    ", "")

            this.key = Math.random()
            setTimeout( () => {
                Messager.emit( "~note.vue", "focus", { target: id })
            }, 0 )
        },

        listen() {

            Messager.on( "~notes", ( action, payload ) => {

                if( action === "added" ) {

                    let note        = payload.note
                    let index       = payload.index

                    let has_already = this.inotes.indexOf( note ) !== -1
                        if( has_already ) return

                    if( index === null ) {
                        this.inotes.push( note )
                    } else {

                        let list        = Object.keys(ilse.notes.list)
                        let parent_id   = index === 0 ? list[0] : list[index - 1]
                        let real_parent = ilse.notes.list[parent_id].replace( /\ \ \ \ /gi, "")
                        printf( "parentt -> ", real_parent )
                        let parent_index= this.inotes.indexOf( real_parent )
                        // I'm having problem with "depth" and erading old ones(with text)

                        // TODO: I'm out of sync with the real, This is when it's has been already added, But when I edit it here, it's not synced to the real
                        this.inotes.splice( ++parent_index, 0, note )
                        printf( "this.inotes -> ", this.inotes )
                        this.key = Math.random()
                    }
                }

            })

        },

        setup() {
            this.listen()

        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>
</style>
