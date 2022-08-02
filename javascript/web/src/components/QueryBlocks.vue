<template lang="pug" >
.query-blocks( :key="search_result.length" )
    .centered( style="margin: 0 auto; width: 30%;" )
        .flex.inputs( style="display: flex; flex-wrap: wrap; " )
            input.input( v-model="query_string" placeholder="🔎" @keydown="on_search_keydown" )
            input.input.range( type="range" v-model="width" min="0" max="99" @input="rangevalue.value=value")
            p {{width}} / {{search_result.length}}
    .wrap( style="display: flex; flex-wrap: wrap;  " )
        .no-result( v-if="!search_result.length" )
            p {{$t('no_results_found_for')}} {{query_string}}
        .note( v-for="( note, index ) in search_result" :key="index" )
            // p note: {{get_note_style(note)}}
            Note( :note="note" :style="get_note_style(note)" :options="{ hide_bullet: true, style: '' }" )
            // br
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Note                         from "@/components/Note.vue"

export default {

    name: "QueryBlocks",

    data() {
        return {
            ilse: ilse,
            query_string: "",
            search_result: [],
            width: 99,
            list: [],
        }
    },

    props: {
        component: { type: Object, required: false, },
    },

    components: {
        Note,
    },

    methods: {

        get_note_style() {
            let style = `width: ${this.width}%; margin: 10px !important;`
            // let style = `display: block; width: 200px; height: auto; overflow: hidden; margin: 10px !important;`
            return style 
        },

        on_key_down_enter( event ) {

            let is_shift_pressed  = event.shiftKey
            let is_ctrl_pressed   = event.ctrlKey
            printf( "on_key_down_enter -> event -> ", event )
            this.search()
        },

        reset_search() {
            this.search_result = []
        },

        search() {
            this.reset_search()

            let query               = this.query_string
                if( !query ) return

            let file_result    = []
            let has_file_match = false

            for( const item of ilse.notes.list ) {
                has_file_match = item.content.indexOf( query ) !== -1
                if( has_file_match ) {
                    this.search_result.push( item )
                }
            }



            // === notes === //
                // let note_list     = ilse.notes.list.map( note => {
                    // return {
                        // content: note.content,
                        // type: "note",
                        // id: note.id,
                    // }
                // })

            // Search
                // let note_result    = []
                // let has_note_match = false

                // for( const item of note_list ) {
                    // has_note_match = item.content.indexOf( query ) !== -1
                    // if( has_note_match && (/*Filter*/ this.filter === "notes" || this.filter === "all" ) ) this.search_result.push( item )
                // }

            // === notes === //
            // this.can_search = false
        },

        on_search_keydown( event ) {

            let key               = event.key
            let is_shift_pressed  = event.shiftKey
            let is_ctrl_pressed   = event.ctrlKey
            printf( "on_search_keydown -> event" )

            if( key === "Enter" ) {
                printf( "ENTER" )
                this.on_key_down_enter( event )
            }

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

.query-blocks .input {
    display: block;
    text-align: left;
}

.query-blocks .flex .input {
    margin-left: 10px;
    justify-content: space-around;
}

.query-blocks .inputs {
    margin: 0 auto;
}

.query-blocks .centered .range {
    width: 30%;
    color: red;
}

.note .textarea {
    /*width: 95vw !important;*/
    width: 70vw !important;
    min-height: 50px;
    height: fit-content;
}

</style>
