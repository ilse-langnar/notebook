<template lang="pug" >
.outline
    // .loop( v-for="( item, index ) in notes.filter( e=>e.depth === 0 )" :key="index" )
        Notes( :note="item" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" )

    ul
        li( v-for="( item, index ) in notes" :key="index" )
            // p( contentEditable @keydown="on_keydown($event, item)" ) {{item.content}}

            p.collapsed( v-if="item.is_collapsed" :id=" 'bullet-' + item.id" ) &#8277;

            // textarea.input( v-show="item.is_editable" :id="item.id" v-model="item.content" @blur="on_blur( $event, item )" )
            .edit( contentEditable v-show="item.is_editable" :id="item.id" @keydown="on_keydown($event, item)" @blur="on_blur($event, item)" :placeholder="$t('note_placeholder')" ) {{item.content}}

            .html( v-show="!item.is_editable" v-html="get_html(item)" @click="on_focus($event, item)" :id="item.id" )



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

export default {

    name: "Outline",

    props: {
        notes: { type: Array, required: false },
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        Notes,
        Note,
    },

    methods: {

        on_focus( event, note ) {

            let has_task = note.content.indexOf("- [ ]" ) !== -1 || note.content.indexOf("- [x]" ) !== -1 

            // FEATURE: Checkbox
            let clicked_on_a_checkbox = event.target.type === "checkbox"
            if( clicked_on_a_checkbox ) {
                this.inote.content = this.inote.content.replace( "- [ ]", "- [x]" )
                ilse.notes.save()
                return
            }

            document.activeElement.blur()

            note.is_editable = true

            let dom = document.getElementById( note.id )
                if( !dom ) return
            setTimeout( () => { dom.focus() }, 1 )

            if( has_task ) {
                var clickEvent  = document.createEvent("MouseEvents")
                clickEvent.initEvent( 'dblclick', true, true )
                dom.dispatchEvent(clickEvent)
                setTimeout( () => { dom.focus() }, 1 )
            }


        },

        get_html( note ) {
            let normalized      = ilse.markdown.render( note.content )
            return normalized
        },

        on_blur( event, note ) {

            document.activeElement.blur()

            note.content     = event.target.innerText
            note.is_editable = false
        },

        on_keydown( event, item ) {

            printf( "Outline -> on_keydown -> event -> ", event  )
            printf( "Outline -> on_keydown -> item -> ", item  )

            event.preventDefault()

            let is_shift = event.shiftKey

            if( is_shift ) {
                item.depth -= 1
            } else {
                item.depth += 1
            }
            printf( "item.depth -> ", item.depth )

            // item.$depth(1)
            if( event.key === "Tab" && item.depth > -1 ) {
                // item.style              = `margin-left: ${item.depth * 30}px;`
                event.srcElement.style  = `margin-left: ${item.depth * 10}px;`
                // item.key                = Math.random()
            }
        },

        on_keydown_tab( event ) {
            printf( "Outline.vue -> on_keydown_tab -> event -> ", event )
        },

        on_enter( payload ) {
            printf( "Outline.vue -> payload -> ", payload )

            let note     = payload.note
            let new_note = ilse.notes.add_after( "", note.depth, note )
                new_note.focus()
        },

        on_tab() {

        },

        on_shift_tab() {

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


</style>
