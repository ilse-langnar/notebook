<template lang="pug" >

// .spreadsheet
    .wrapper( style="overflow: auto; " )
        input.input.centered( v-model="spreadsheet_name" placeholder="♰" title="Spreadsheet's Name" )
        table( style="margin: 0 auto; " )
            th( v-for="( column, index ) in table" :key="index"  style="margin-right: 0px;" )
                td  {{alphabet[index]}}
            tr( v-for="( column, index ) in 20" :key="'tr-' + index"  )
                p {{index}}
                td( v-for="( row, row_index ) in 26" :key=" 'row-' + row_index" ) 

                    input.input( v-if="!table[index][row_index] || typeof table[index][row_index] === 'string' " v-model="table[index][row_index]" style="border: 1px solid var( --text-color ); padding: 1px; margin-right: 2px; min-width: 100px; width: 100px; height: 23px; overflow: hidden;" @blur="on_input_blur($event, index, row_index)" @keydown.enter="on_input_keydown_enter($event, index, row_index)" )
                    ote( v-if="typeof table[index][row_index] === 'object' " :note="table[index][row_index]" :options="{ hideBullet: true, style: 'border: 1px solid var( --text-color ); padding: 1px; margin-right: 2px; min-width: 100px; width: 100px; height: 23px; overflow: hidden;', placeholder: 'NOTE', tagless: true }" )
                    // GhostNote( v-if="!table[index][row_index]" @on-enter="on_no_note_ghost_enter" @on-blur="on_no_note_ghost_blur" :options="{ hideBullet: true, style: 'border: 1px solid var( --text-color ); padding: 1px; margin-right: 2px; min-width: 100px; width: 100px; height: 23px; overflow: hidden;', placeholder: '' }" :payload="{ column: index, row: row_index }" )




.spreadsheet
    .wrapper( v-if="has_featched_spreadsheet_notes" )
        input.input.centered( v-model="spreadsheet_name" placeholder="♰" title="Spreadsheet's Name" )
        table( style="margin: 0 auto; " )
            th( v-for="( column, index ) in 26" :key="index"  style="margin-right: 0px;" )
                td( v-if="index !== 0" ) {{alphabet[index]}}
            tr( v-for="( column, index ) in columns" :key="'tr-' + index" )
                td {{index}}
                td( v-for="( item, row_index ) in column" :key=" 'row-' + row_index" style="margin-bottom: 0px; margin-top: 0px;" ) 

                    input.input( v-if="!item.note" v-model="item.text" style="border: 1px solid var( --text-color ); padding: 0px; margin-right: 0px; border-radius: 0px; min-width: 80px; width: 80px; height: 23px; overflow: hidden;" @blur="on_input_blur($event, index, row_index)" @keydown.enter="on_input_keydown_enter($event, index, row_index)" )

                    Note( v-else :title="JSON.stringify(item.note)" :note="item.note" :options="{ hideBullet: true, style: 'border: 1px solid var( --text-color );padding: 0px; margin-right: 2px; min-width: 80px; width: 80px; height: 23px; overflow: hidden;', placeholder: 'NOTE', is_tagless: true }" @on-blur="on_note_blur" )

        img( src="@/assets/images/plus.svg" style="width: 20px; cursor: pointer;" @click="add_new_column(columns)" )


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
            has_featched_spreadsheet_notes: false,

            columns: [ // Columns

                [ { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, ], // Row
                [ { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, ], // Row
                [ { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, ], // Row
                [ { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, ], // Row

                [ { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, ], // Row

            ],

            alphabet: [ "", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "W", "Z", ],
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

        add_new_column( columns ) {
            columns.push( [ { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, { text: "", note: null }, ] )
        },

        on_note_blur( payload ) {
            printf( "SpreadSheet -> on_note_blur -> payload -> ", payload )
            let note = payload.note
            printf( "before -> note.content -> ", note.content )
            note.content = `${note.tagless} ${note.get_tags().join("")}`
            printf( "after -> note.content -> ", note.content )
        },

        on_input_keydown_enter( event, column, row ) {

            // FIX
            let pcontent = event.target.value
                if( !pcontent ) return

            let content     = ` #i/spreadsheet/${this.spreadsheet_name}/${column}-${row} ${pcontent}`
            let depth       = 0
            let index       = ilse.notes.list.length 
            let new_note    = ilse.notes.add( content, index, depth )
        },

        on_input_blur( event, column, row ) {

            printf( "on_input_blur -> event ", event )
            printf( "on_input_blur -> column ", column )
            printf( "on_input_blur -> row ", row )

            // FIX
            let pcontent = event.target.value
                if( !pcontent ) return

            let content     = ` #i/spreadsheet/${this.spreadsheet_name}/${column}-${row} ${pcontent}`
            printf( "content -> ", content )
            let depth       = 0
            printf( "depth -> ", depth )
            let index       = ilse.notes.list.length 
            printf( "index -> ", index )
            let new_note    = ilse.notes.add( content, index, depth )
            printf( "new_note -> ", new_note )
        },

        /*
        on_no_note_ghost_enter( payload ) {


            // FIX
            let pcontent = event.target.value
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
        */

        init( name ) {
            let notes = ilse.notes.query( `#i/spreadsheet/${this.spreadsheet_name}` )
            let tags, chunks, coordinates, column, row
            notes.map( note => {
                tags = note.get_tags()
                tags.map( tag => {
                    chunks      = tag.split("/")
                    coordinates = chunks[chunks.length -1]
                    column      = Number( coordinates.split("-")[0] )
                    row         = Number( coordinates.split("-")[1] )
                    this.columns[column][row].note = note
                })

            })

            this.has_featched_spreadsheet_notes = true
        },

        setup() {
            setTimeout( () => { this.init( this.spreadsheet_name ) }, 1000 )
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

.spreadsheet .wrapper {
    overflow: auto;
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
    margin: 0;
    height: 10px !important;
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
    margin-bottom: 10px;
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
