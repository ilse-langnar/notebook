<template lang="pug" >
.outline
    .loop( v-for="( item, index ) in inotes" :key="index" :style="get_note_style(item)" )
        Notes( :note="item" :key="index + key" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-link-click="on_note_link_click" )
        // Notes( :note="extract_note_id(item)" :key="index + key" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-link-click="on_note_link_click" )
        // p style: {{get_note_style(item)}}
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

        extract_note_id( string ) {
            return extract_note_id( string )
        },

        on_note_link_click( payload ) {

            if_else(
                payload.event.shiftKey,
                yes => add_component({ type: "file", props: { file: payload.link }, width: 12 }),
                no  => null
            )

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

        // extract id -> get index of said id, next(-1) -> get id again -> use this id to focus
        on_note_arrow_up( payload ) {
            delay( focus_on_note, get_note_id_from_index( get_note_index( payload.note.id ) - 1 ) , 0 )
        },

        // extract id -> get index of said id, next(+1) -> get id again -> use this id to focus
        on_note_arrow_down( payload ) {
            delay( focus_on_note, get_note_id_from_index( get_note_index( payload.note.id ) + 1 ) , 0 )
        },

        on_enter( payload ) {

            delay(
                focus_on_note, 
                ilse.notes.add_after( "",
                    payload.note.depth,
                    payload.note.id,
                ),
            10 )

        },

        on_tab( payload ) {
            set( ilse.notes.list, payload.note.id, { content: payload.note.content, id: payload.note.id, depth: ++payload.note.depth })
            this.key = Math.random()
            delay( focus_on_note, payload.note.id, 100 )
        },

        on_shift_tab( payload ) {
            set( ilse.notes.list, payload.note.id, { content: payload.note.content, id: payload.note.id, depth: --payload.note.depth })
            this.key = Math.random()
            delay( focus_on_note, payload.note.id, 100 )

        },

        listen() {

            Messager.on( "~notes", ( action, payload ) => {

                if( action === "added" ) {

                    let note        = payload.note
                    let index       = payload.index

                    if_else( is_inside( note, this.inotes ),
                        yes => null,
                        no  => {
                            if_else( index === null,
                                yes => {
                                    push( note, this.inotes ), // push( note, this.inotes ) appear not to be in sync. while The ones I receive are!
                                    delay( focus_on_note, note.id, 10 )
                                },
                                no  => {
                                    let list         = Object.keys(ilse.notes.list)
                                    let parent_id    = index === 0 ? list[0] : list[index - 1]
                                    let parent_index = this.inotes.indexOf( parent_id )
                                    this.inotes.splice( ++parent_index, 0, note )
                                    set( this, "key", Math.random() )
                                    delay( focus_on_note, note, 0 )
                                    return

                                }
                            )

                        }
                    )

                    // let has_already = is_inside( note, this.inotes )
                        // if( has_already ) return

                    /*
                    if( index === null ) {
                        push( note, this.inotes )
                    } else {

                        let list         = Object.keys(ilse.notes.list)

                        let id           = index === 0 ? list[0] : list[index - 1]
                        let parent       = ilse.notes.list[id]
                        printf( "parent -> ", parent )

                        let complete     = `${id}: ${parent}`
                        let parent_index = this.inotes.indexOf( complete )

                        this.inotes.splice( ++parent_index, 0, note )
                        this.key         = Math.random()
                        // I'm having problem with "depth" and erading old ones(with text)
                        // TODO: I'm out of sync with the real, This is when it's has been already added, But when I edit it here, it's not synced to the real
                    }
                    */
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
