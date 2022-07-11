<template lang="pug" >
.kanban
    input.input.board-name( v-model="board_name" )
    .wrapper
        .loop( v-for="( item, index ) in boards" :key="index" @drop.prevent="on_drop($event, item)" @dragenter.prevent @dragover.prevent draggable )
            input.input.centered( v-model="item.name" )
            img.is-pulled-right( src="@/assets/images/point.svg")
            .card( v-for="( card, card_index ) in item.cards" :key=" 'card-' + card_index" draggable @dragenter.prevent @dragover.prevent )
                input.input( v-model="card.content" )
            input.input( v-model="item.new_card" placeholder="Add a card ..." @keydown.enter="add_card(item, item.new_card)" )

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

    name: "Kanban",

    data() {
        return {
            ilse: ilse,
            board_name: "default",
            boards: [],
        }
    },

    components: {
        Note,
    },

    props: {
        component: { type: Object, required: false },
    },

    methods: {

        on_drop( event, item ) {
            printf( "on_drop -> event -> ", event )
            printf( "on_drop -> item -> ", item )
        },

        add_card( item, text ) {
            // this.boards.push({ id: Math.random(), name: name, cards })
            item.cards.push({ text })
            item.new_card = ""
        },

        add( name = "Random", cards = [] ) {
            this.boards.push({ id: Math.random(), name: name, cards })
        },

        // Notes -> [ Note, Note ]
        get_notes( name ) {
            let list = ilse.notes.list
            let notes= []
            let has_tags, has_kanban_tag, is_correct_name 

            list.map( note => {
                has_tags       = note.content.indexOf( "#" ) !== -1
                    if( !has_tags ) return
                has_kanban_tag = note.content.indexOf( "#i/kanban" ) !== -1
                    if( !has_kanban_tag ) return
                is_correct_name = note.content.indexOf( name ) !== -1
                    if( !is_correct_name ) return
                notes.push( note )
                
            })
            return notes
        },

        // Board Name -> [ Note, Note ]
        get_kanban_tags( name ) {

            let notes = this.get_notes( name )
            let tags  = []
            let kanban_tags = []
            let is_tag_kanban

            notes.map( note => {
                tags = note.get_tags() 
                tags.map( tag => {
                    is_tag_kanban = tag.indexOf( "i/kanban" ) !== -1
                        if( !is_tag_kanban ) return
                    kanban_tags.push({ note, tag })
                })
            })

            return kanban_tags
        },

        get_board_names() {

        },

        // Board Name -> [ { name: board_name_1, notes: [] }, { name: board_name_2, notes: [] } ]
        init( name ) {
            let tags   = this.get_kanban_tags( name )
            let obj    = {}
            let board_name 

            tags.map( tag => {
                board_name = tag.tag.split("/")[3]
                if( !obj[board_name] ) {
                    obj[board_name] = []
                    obj[board_name].push( tag.note )
                } else {
                    obj[board_name].push( tag.note )
                }

            })

            let values = Object.values( obj )
            let keys   = Object.keys( obj )

            keys.map( key => {
                this.add( key, obj[key] )
            })

            values.map( value => {
                printf( "value -> ", value )
            })

            printf( "obj -> ", obj )

            // let boards = []
            // let board_name

            // tags.map( tag => {
                // board_name = tag.split("/")[3]
                // boards.push( board_name )
            // })

            // boards.map( board => {
                // this.add( board )
            // })


        },

        setup() {
            this.init( this.board_name )
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.kanban .wrapper {
    display: flex;
    flex-direction: row;
}

.wrapper .loop {
    flex-basis: 18%;
    margin: 0 auto;
}

.kanban .wrapper .loop .input {
}

.kanban .wrapper .loop {
    height: 240px;
    margin-top: 1px;
    border-radius: var( --border-radius );
    box-shadow: #485361 0px 5px 15px;
}

.kanban .wrapper .loop input {
    width: 80%;
    background: transparent;
    border: none !important;
}

.kanban .wrapper .loop .card {
    margin: 5px;
}
         

.kanban .board-name {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
}

</style>
