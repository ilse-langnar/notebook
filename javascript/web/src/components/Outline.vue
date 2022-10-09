<template lang="pug" >
// .outline
    .single-note( v-if="!path.length" )
        img.img( :src="irequire.img('arrow-narrow-left.svg')" style="width: 30px; cursor: pointer;" @click="on_left_arrow_click" )
        Outline( :notes="path" )

    .normal( v-if="path.length && path.join('').indexOf('[[') === -1 " )
        .loop( v-for="( item, index ) in inotes" :key="index" :style="get_note_style(item)" )
            Notes( :note="item" :key="index + key" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-link-click="on_note_link_click" @on-note-click="on_note_click" )

    p {{path}}
    .link( v-if="path.length && path.join('').indexOf('[[') !== -1 " )
         p FILE: 


.outline

    .path( v-if="!path.length" )
        .loop( v-for="( item, index ) in inotes" :key="index" :style="get_note_style(item)" )
            Notes( :note="item" :key="index + key" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-link-click="on_note_link_click" @on-note-click="on_note_click" )

    .single-note( v-else )
        img.img( :src="irequire.img('arrow-narrow-left.svg')" style="width: 30px; cursor: pointer;" @click="on_left_arrow_click" )
        Outline( :notes="path" )

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
    import Outline                      from "@/components/Outline.vue"
    import File                         from "@/components/File.vue"

// functions
    import move_array_item              from "@/classes/move_array_item.js"
    import get_spaces_count             from "@/classes/get_spaces_count.js"
    import extract_note_id              from "@/classes/extract_note_id.js"
    import extract_note_content         from "@/classes/extract_note_content.js"
    import get_note_index               from "@/classes/get_note_index.js"
    import delay                        from "@/classes/delay.js"
    import focus_on_note                from "@/classes/focus_on_note.js"
    import get_note_id_from_index       from "@/classes/get_note_id_from_index.js"
    import is_inside                    from "@/classes/is_inside.js"
    import get_note_depth               from "@/classes/get_note_depth.js"
    import if_else                      from "@/classes/if_else.js"
    import push                         from "@/classes/push.js"
    import set                          from "@/classes/set.js"
    import loop                         from "@/classes/loop.js"
    import add_component                from "@/classes/add_component.js"
    import add_array_item               from "@/classes/add_array_item.js"
    import get_index_of                 from "@/classes/get_index_of.js"

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
            path: [],
        }
    },

    components: {
        Notes,
        Note,
        Outline,
        File,
    },

    methods: {

        on_left_arrow_click() {
            this.path.shift()
        },

        on_note_click( payload ) {

            if_else(
                payload.event.shiftKey,
                yes => { this.path.push( payload.note ) },
                no  => null,
            )

            if_else(
                payload.button === "middle",
                yes => { delete ilse.notes.list[payload.note] },
                no  => null,
            )

        },

        extract_note_id( string ) {
            return extract_note_id( string )
        },

        on_note_link_click( payload ) {

            if_else(
                payload.event.shiftKey,
                yes => { this.path.push( payload.link ) },
                no  => null,
            )

            if_else(
                payload.event.ctrlKey,
                yes => add_component({ type: "file", props: { file: payload.link }, width: 12 }),
                no  => null
            )

            /*
            if_else(
                payload.event.ctrlKey,
                yes => { this.path += payload.link },
                no  => null,
            )
            */

        },

        get_note_style( id ) {

            let depth  = ilse.notes.list[id].depth
            if( depth === 0 ) return ""
            if( depth === 1 ) return `margin-left: 18px !important; `

            // let depth = ilse.notes.list[id]

            return if_else(
                depth >= 1,
                is      => `margin-left: ${18 * depth}px !important; `,
                is_not  => ''
            )

        },

        on_note_arrow_up( payload ) {
            delay( focus_on_note, get_note_id_from_index( get_note_index( payload.note.id ) - 1 ) , 0 )
        },

        on_note_arrow_down( payload ) {
            delay( focus_on_note, get_note_id_from_index( get_note_index( payload.note.id ) + 1 ) , 0 )
        },

        on_enter( payload ) {
            delay( focus_on_note, ilse.notes.add_after( "", payload.note.depth, payload.note.id,), 10 )
        },

        on_tab( payload ) {
            set( ilse.notes.list, payload.note.id, { content: payload.note.content, id: payload.note.id, depth: ++payload.note.depth })
            set( this, "key", Math.random() )
            delay( focus_on_note, payload.note.id, 100 )
        },

        on_shift_tab( payload ) {
            set( ilse.notes.list, payload.note.id, { content: payload.note.content, id: payload.note.id, depth: --payload.note.depth })
            set( this, "key", Math.random() )
            delay( focus_on_note, payload.note.id, 100 )

        },

        listen() {

            Messager.on( "~notes", ( action, payload ) => {

                if( action === "added" ) {

                    let note        = payload.note
                    let index       = payload.index

                    if_else( is_inside( note, this.inotes ), // has already
                        yes => null,
                        no  => {
                            if_else( index === null,
                                yes => { // added to the end, just push
                                    push( note, this.inotes ), 
                                    delay( focus_on_note, note, 10 )
                                },
                                no  => { // This will: find the newly added note's parent, then will check if said parent is rendered in the outline, will then add a child.
                                    let list         = Object.keys(ilse.notes.list)
                                    let parent_id    = index === 0 ? list[0] : list[index - 1]
                                    add_array_item( this.inotes, note,  get_index_of( this.inotes, parent_id ) + 1)
                                    set( this, "key", Math.random() )
                                    delay( focus_on_note, note, 0 )
                                    return

                                }
                            )

                        }
                    )
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
