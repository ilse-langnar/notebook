<template lang="pug" >
.outline
    .loop( v-for="( item, index ) in inotes" :key="index" :style="get_note_style(item)" )
        Notes( :note="item" :key="index + key" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-link-click="on_note_link_click" )

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

        on_note_link_click( payload ) {

            /*
            let file             = payload.link
            let event            = payload.event
            let is_shift         = event.shiftKey
            let is_ctrl          = event.ctrlKey

            if_else(
                payload.event.shiftKey,
                yes => add_component({ type: "file", props: { file }, width: 12 }),
                no  => null
            )
            */

            if_else(
                payload.event.shiftKey,
                yes => add_component({ type: "file", props: { file: payload.link }, width: 12 }),
                no  => null
            )

            /*
            if( is_shift ) {
                let component   = ilse.types.get( "file" )
                component.props = { file }
                ilse.components.push( component )
            }

            if( is_ctrl ) {
                let component   = ilse.types.get( "graph" )
                component.props = { file }
                ilse.components.push( component )
            }
            */

        },

        get_note_style( note ) {

            let depth  = get_note_depth( extract_note_id( note ) ) 

            return if_else(
                depth >= 2,
                is      => `margin-left: ${18 * depth}px !important; `,
                is_not  => ''
            )


            // let depth = get_note_depth( extract_note_id( note ) ) 
            // if( depth >= 2 ) return `margin-left: ${18 * depth}px !important; `
            // return ''
        },

        // extract id -> get index of said id, next(-1) -> get id again -> use this id to focus
        on_note_arrow_up( payload ) {

            delay( focus_on_note, 
                get_note_id_from_index( 
                    get_note_index( 
                        extract_note_id( payload.note ) 
                    ) - 1 // previous
                )
            , 0 )

        },

        // extract id -> get index of said id, next(+1) -> get id again -> use this id to focus
        on_note_arrow_down( payload ) {

            delay( focus_on_note, 
                get_note_id_from_index( 
                    get_note_index( 
                        extract_note_id( payload.note ) 
                    ) + 1 // next 
                )
            , 0 )

        },

        on_enter( payload ) {


            let depth = get_note_depth(extract_note_id(payload.note))
            printf( "Outline.vue -> on_enter -> depth -> ", depth )
            delay(
                focus_on_note, 
                ilse.notes.add_after( "",
                    get_note_depth(extract_note_id(payload.note)),
                    extract_note_id(payload.note)
                ),
            10 )


            // let content  = extract_note_content(note)
            // let original = ilse.notes.list[id]
            // let spaces   = get_spaces_count( note.split("    ").length - 1)
            // let complete = `${id}: ${content}`
            // let lindex   = this.inotes.indexOf( complete )

            /*
            let note     = payload.note
            let id       = extract_note_id(note)
            let depth    = note.split("    ").length
            printf( "note -> ", note )
            printf( "depth -> ", depth )
            printf( "id -> ", id )
            let new_note = ilse.notes.add_after( "", depth, id )
            printf( "new_note -> ", new_note )

            let new_note_id = extract_note_id( new_note )
            printf( "new_note_id -> ", new_note_id )

            // this.key = Math.random()

            setTimeout( () => {
                Messager.emit( "~note.vue", "focus", { target: new_note_id })
            }, 10 )
            */


            // let parent_index = this.inotes.indexOf( note )

            /*
            let note     = payload.note
            let original = ilse.notes.list[note.id]
            let parent_index = this.inotes.indexOf( note )

            let depth    = original.split("    ").length
            printf( "before -> depth -> ", depth )
                if( depth > 0 ) depth -= 1 // bugfix
            printf( "after -> depth -> ", depth )


            let new_note = ilse.notes.add_after( "", depth, note )

            let id       = extract_note_id( new_note )

            setTimeout( () => {
                Messager.emit( "~note.vue", "focus", { target: id })
            }, 100 )
            */

        },

        on_tab( payload ) {

            set( ilse.notes.list, extract_note_id(payload.note), `    ${ilse.notes.list[extract_note_id(payload.note)]}` )
            set( this, "key", Math.random() )
            delay( focus_on_note, extract_note_id(payload.note), 0)
        },

        on_shift_tab( payload ) {

            set( ilse.notes.list, extract_note_id(payload.note), ilse.notes.list[extract_note_id(payload.note)].replace("    ", "") )
            set( this, "key", Math.random() )
            delay( focus_on_note, extract_note_id(payload.note), 0)
        },

        listen() {

            Messager.on( "~notes", ( action, payload ) => {

                if( action === "added" ) {

                    let note        = payload.note
                    let index       = payload.index

                    let has_already = is_inside( note, this.inotes )
                        if( has_already ) return

                    if( index === null ) {
                        push( note, this.inotes )
                    } else {

                        let list         = Object.keys(ilse.notes.list)

                        let id           = index === 0 ? list[0] : list[index - 1]
                        let parent       = ilse.notes.list[id]
                        let complete     = `${id}: ${parent}`
                        let parent_index = this.inotes.indexOf( complete )

                        this.inotes.splice( ++parent_index, 0, note )
                        this.key         = Math.random()
                        // I'm having problem with "depth" and erading old ones(with text)
                        // TODO: I'm out of sync with the real, This is when it's has been already added, But when I edit it here, it's not synced to the real
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
