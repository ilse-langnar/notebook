<template lang="pug" >

// .kanban
    input.input.board-name( v-model="board_name" )
    .wrapper
        .loop( v-for="( item, index ) in boards" :key="index" @drop.prevent="on_drop" @dragenter.prevent @dragover.prevent )
            input.input.centered( v-model="item.name" )
            img.is-pulled-right( :src="irequire.img('point.svg')")
            .card( v-for="( card, card_index ) in item.cards" :key=" 'card-' + card_index" draggable @dragenter.prevent @dragover.prevent style="border: 1px solid #000;" )
                input.input( v-model="card.tagless" @blur="on_input_blur(card)" @keydown.enter="on_input_enter(card)" )
            input.input( v-model="item.new_card" placeholder="Add a card ..." @keydown.enter="add_card(item, item.new_card)" )

.kanban
    input.input.board-name( v-model="board_name" )
    .wrapper
        .loop( v-for="( item, index ) in boards" :key="index" @dragenter.prevent @dragover.prevent )
            .card( v-for="( card, card_index ) in item.cards" :key=" 'card-' + card_index" draggable @dragenter.prevent @dragover.prevent @drop.prevent="on_drop($event, card, item)" style="height: auto; " )
                input.input.centered( v-if="card_index === 0" v-model="item.name" )

                // img.is-pulled-right( v-if="card_index === 0" :src="irequire.img('point.svg')")

                Note( :note="card" :options="{ 'is_tagless': true, 'hide_bullet': true, style: 'padding: 4px; font-size: 14px;' }" )

                // input.input( v-if="card_index === item.cards.length - 1" v-model="item.new_card" placeholder="Add a card ..." @keydown.enter="add_card(item, item.new_card)" )
            input.input.card( v-model="item.new_card" placeholder="Add a card ..." @keydown.enter="add_card(item, item.new_card)" style="width: 95%;" )
    br


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
            obj: {},
        }
    },

    components: {
        Note,
    },

    props: {
        component: { type: Object, required: false },
    },

    methods: {

        on_input_enter( item ) {
            this.set_content_to_tagless_plus_tags( item )
            document.activeElement.blur()
        },

        on_input_blur( item ) {
            this.set_content_to_tagless_plus_tags( item )
        },

        set_content_to_tagless_plus_tags( item ) {
            item.content  = `${item.tagless} ${item.get_tags().join(" ")}`
        },


        on_drop( event, note, item ) {
            let name = note.get_tags()[0]
            let new_board = item.name
            note.content.replace( `#i/kanban/${this.board_name}/${name}`, `#i/kanban/${this.board_name}/${new_board}` )
        },

        add_card( item, text ) {
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

        // Board Name -> [ { name: board_name_1, notes: [] }, { name: board_name_2, notes: [] } ]
        init( name ) {
            // Can I use "query"?
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

.kanban {
}

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
    height: fit-content;
}

.kanban .wrapper .loop input {
    width: 80%;
    background: transparent;
    border: none !important;
}

.kanban .wrapper .loop .card {
    margin: 5px;
    background: var( --background-color );
    color: var( --text-color );
    border-radius: var( --border-radius );
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
         

.kanban .board-name {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
}

.kanban input.input.board-name {
    background: transparent;
    border: 0 !important;
    color: var( --text-color );
    background: var( --background-color );
}

</style>
