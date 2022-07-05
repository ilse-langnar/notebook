<template lang="pug" >
.spreadsheet
    .wrapper( style="overflow: auto; " )
        input.input.centered( v-model="spreadsheet_name" placeholder="♰" title="Spreadsheet's Name" )
        table( style="margin: 0 auto; " )
            th( v-for="( column, index ) in table" :key="index"  style="margin-right: 0px;" )
                td  {{column[0]}}
            tr( v-for="( column, index ) in 20" :key="'tr-' + index"  )
                p {{index}}
                td( v-for="( row, row_index ) in 26" :key=" 'row-' + row_index" ) 
                    // p 1: {{!!table[index][1].length}}
                    // p LL
                    Note( v-if="table[index][1][row_index]" :key="table[index][1].length" :note="table[index][1][row_index]" :options="{ hideBullet: true, style: 'border: 1px solid var( --text-color ); padding: 1px; margin-right: 2px; min-width: 100px; width: 100px; height: 23px; overflow: hidden;', placeholder: '' }" )
                    GhostNote( v-else :key="table[index][1].length" @on-enter="on_no_note_ghost_enter" @on-blur="on_no_note_ghost_blur" :options="{ hideBullet: true, style: 'border: 1px solid var( --text-color ); padding: 1px; margin-right: 2px; min-width: 100px; width: 100px; height: 23px; overflow: hidden;', placeholder: '' }" :payload="{ column: index, row: row_index }" )
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
    import GhostNote                    from "@/components/GhostNote.vue"

export default {

    name: "SpreadSheet",

    data() {
        return {
            ilse: ilse,
            spreadsheet_name: "default",
            table: [
                [ "", [] ],
                [ "A", [] ],
                [ "B", [] ],
                [ "C", [] ],
                [ "D", [] ],
                [ "E", [] ],
                [ "F", [] ],
                [ "G", [] ],
                [ "H", [] ],
                [ "I", [] ],
                [ "J", [] ],
                [ "K", [] ],
                [ "L", [] ],
                [ "M", [] ],
                [ "N", [] ],
                [ "O", [] ],
                [ "P", [] ],
                [ "Q", [] ],
                [ "R", [] ],
                [ "S", [] ],
                [ "T", [] ],
                [ "U", [] ],
                [ "V", [] ],
                [ "X", [] ],
                [ "Y", [] ],
                [ "W", [] ],
                [ "Z", [] ],
            ],
        }
    },

    props: {
        component: { type: Object, required: false, },
    },

    components: {
        Note,
        GhostNote,
    },

    methods: {

        on_no_note_ghost_enter( payload ) {

            // FIX
            let pcontent = payload.content
                payload     = payload.payload

            let column      = payload.column
            let row         = payload.row

            let content     = ` #i/spreadsheet/${this.spreadsheet_name}/${column}-${row} ${pcontent}`

            let depth       = 0
            let index       = ilse.notes.list.length 
            let new_note    = ilse.notes.add( content, index, depth )
            this.table[column][1][row] = new_note
                // new_note.focus()
        },

        on_no_note_ghost_blur( payload ) {

            // FIX
            let pcontent = payload.content
                payload     = payload.payload

            let column      = payload.column
            let row         = payload.row

            let content     = ` #i/spreadsheet/${this.spreadsheet_name}/${column}-${row} ${pcontent}`

            let depth       = 0
            let index       = ilse.notes.list.length 
            let new_note    = ilse.notes.add( content, index, depth )
            this.table[column][1][row] = new_note
                // new_note.focus()
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style >

.spreadsheet .textarea {
    width: 400px;
}

.spreadsheet {
    width: 96vw;
    margin: 10px;
    overflow: hidden;
}

.spreadsheet table {
    overflow: auto;
    height: 100px !important;
    width: 100px;
}

.spreadsheet table tr {
    padding: 0;
}

.spreadsheet table tr td {
    width: 80px;
    height: 20px;
}

.spreadsheet table tr p  {
    color: var( --text-color );
}

.spreadsheet table th td  {
    color: var( --text-color );
}

.spreadsheet .clear {
    height: 50px;
    clear: both;
}

.spreadsheet .input.centered {
    display: block;
    text-align: left;
}

</style>
