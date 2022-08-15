<template lang="pug" >
.notes( v-if="note" )
    component( :is="require('@/components/Note.vue').default" :note="note" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-click="on_note_click" :options="options" )
    
    .children( v-show="!note.is_collapsed" :class="note.children.length ? 'one' : ''" :key="note.children.length + options.key" )
        .loop( v-for="( item, index ) in note.children" :key="index" :style="get_note_style(item)" )
            Notes( :note="item" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-click="on_note_click" :options="options" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    // import Note                         from "@/components/Note.vue"
    import Notes                        from "@/components/Notes.vue"

export default {

    name: "Notes",

    props: {
        note: { type: Object, required: false, },
        options: { type: Object, required: false, default: function() {
            return {
                key: 0,
            }
        } },
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        // Note,
        Notes,
    },

    methods: {

        on_note_click( payload ) {
            this.$emit( "on-note-click", payload )
        },

        on_enter( payload ) {
            this.$emit( "on-enter", payload )
        },

        // TODO: BUG: When we type enter we correctly add the note but it's not rendered corretly, also setting the depth is problematic k
        /*
        on_enter( payload ) {

            let note     = payload.note
            let depth    = note.depth
            let new_note = ilse.notes.add_after( "", depth, note )
                new_note.focus()
        },
        */

        on_tab( payload ) {
            this.$emit( "on-tab", payload )
        },

        on_shift_tab( payload ) {
            this.$emit( "on-shift-tab", payload )
        },

        on_note_link_click( payload ) {
            this.$emit( "on-link-click", payload )
        },

        on_note_esc() {
            this.$emit( "on-esc" )
        },

        on_note_arrow_up( payload ) {
            this.$emit( "on-arrow-up", payload )
        },

        on_note_arrow_down( payload ) {
            this.$emit( "on-arrow-down", payload )
        },

        // Control the margins
        get_note_style( note ) {

            // let style = `display: flex;`
            let style = ``
                if( note.depth )            style += `margin-left: ${13 * note.depth}px !important; `

            return style
        },

        listen() {

            Messager.on( "~notes", (action, payload) => {

                if( action === "added" ) {

                    /*
                    let index       = payload.index
                    let after       = index === 0 ? ilse.notes.list[0] : ilse.notes.list[index - 1]
                    let new_note    = payload.note

                    // we're adding the nore after ours
                    if( after.id === this.note.id ) {

                        let parent      = ilse.notes.get_note_parent_v2(payload.note)
                            if( !parent ) return
                        let note_index  = parent.children.indexOf( after )

                        parent.children.splice( ++note_index, 0, new_note )
                            new_note.focus()
                            // parent.[note_index].notes.splice( ++note_index, 0, new_note )

                    }
                    */

                    /*
                    if( payload.index === ilse.notes.list.indexOf(this.note) -1 ) {

                        let parent          = ilse.notes.get_note_parent_v2(payload.note)
                            if( !parent ) return

                        let index       = payload.index
                        let new_note    = payload.note
                            // new_note.depth = this.note.depth
                        let after       = index === 0 ? ilse.notes.list[0] : ilse.notes.list[index - 1]

                            // BUGFIX: ?
                            // new_note.depth = after.depth

                        printf( `new_note.depth: ${new_note.depth} after.depth: ${after.depth} this.note.depth: ${this.note.depth}` )

                        let note_index  = parent.children.indexOf( after )
                        printf( `index: ${index} new_note: ${new_note} note_index: ${note_index}` )
                        printf( "after -> ", after )
                        // printf( "note_index -> ", note_index )
                        // printf( "before -> parent.children.length -> ", parent.children.length )
                        parent.children.splice( ++note_index, 0, new_note )
                        // printf( "after -> parent.children.length -> ", parent.children.length )
                            payload.note.focus()

                            // this.days[day_index].notes.splice( ++note_index, 0, new_note )


                        // parent.children.map( (child, _index) => {
                            // printf( `content: ${child.content} index: ${index} _index: ${_index}` )
                        // })
                        // parent.children.splice( index, 0, payload.note )
                        // parent.children.push( payload.note )
                        // printf( "parent.children -> ", parent.children )
                        // printf( "parent.children[index].content -> ", parent.children[index].content )
                        // printf( "parent.children[++index].content -> ", parent.children[++index].content )
                        // parent.children.splice( parent.children.length, 1,  )

                        // parent.children.splice( ++index, 0 )
                    }
                    */

                    /*
                    let new_note_index  = payload.index
                    let new_note        = payload.note
                    // let index           = ilse.notes.list.indexOf( this.note )
                    let index           = ilse.notes.get_note_index( this.note ) - 1
                    // let after           = new_note_index === 0 ? ilse.notes.list[0] : ilse.notes.list[new_note_index - 1]

                    if( new_note_index === index )  {
                        let parent          = ilse.notes.get_note_parent_v2(this.note)
                        printf( "this.note.content -> ", this.note.content )
                        printf( "parent -> ", parent )
                        let inject_index = this.note.children.indexOf(this.note) + 1
                        // parent.children.splice( inject_index, 0, new_note )
                        parent.children.push( new_note )
                        printf( "new_note -> ", new_note )
                        new_note.focus()
                        // this.note.children.splice( inject_index, 0, new_note )
                        // this.note.children.push( new_note )
                    }
                    */

                    // if( parent.id === this.note.id ) {
                        // this.note.children.push( new_note )
                        // new_note.focus()
                    // }
                    // printf( `after: ${after.id} parent: ${parent.id} this: ${this.note.id}` )


                    // if( new_note_index === index ) {
                        // let after_index     = parent.children.indexOf( after ) + 1
                        // printf( "after_index -> ", after_index )
                        // printf( "after -> ", after )
                        // parent.children.slice( insert_index, 0, new_note )
                    // }

                    /*
                    let new_note_index  = payload.index
                    let new_note        = payload.note
                    let index           = ilse.notes.get_note_index( this.note ) - 1
                    let after           = new_note_index === 0 ? ilse.notes.list[0] : ilse.notes.list[new_note_index - 1]

                    if( new_note_index === index ) {
                        let parent = ilse.notes.get_note_parent_v2(new_note)
                        if( parent ) {
                            printf( "children -> ", parent.children )
                            printf( "new_note -> ", new_note )
                            // parent.children.slice( parent.children.indexOf(this.note), 0, new_note )
                            let insert_index = parent.children.indexOf( after )
                            printf( "insert_index -> ", insert_index )
                            parent.children.slice( insert_index, 0, new_note )
                            // parent.children.push( insert_index, 0, new_note )
                            new_note.focus()
                        }
                        // this.note.children.slice( ++index, 0, new_note )
                    }
                    */

                    return

                    // let after       = index === 0 ? ilse.notes.list[0] : ilse.notes.list[index - 1]

                    // let parent = ilse.notes.get_note_parent( after )
                    // printf( ">> parent -> ", parent )

                    // let _index      = this.note.children.indexOf( after )
                    if( after.id === this.note.id ) {
                        // this.note.children.slice( ++_index, 0, new_note )
                        // this.note.children.push( new_note )

                        // ilse.notes.list.slice( index, 0, new_note  )
                    }
                }

            })

        },

        check_for_collapse_tag() {
            if( this.note.content.indexOf("#!c") !== -1 )  this.note.is_collapsed = true
        },

        setup() {
            this.check_for_collapse_tag()
            this.listen()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.notes .loop {
}


.one {
    border-left: 1px solid #999; 
    margin: 5px;
}

.two {
    border-left: 1px solid red; 
}

</style>
