<template lang="pug" >
.command-pallet

    input.input( v-model="input" autofocus ref="command_pallet" @keydown.escape="turn_off" @keydown.enter="on_keydown_enter" @blur="on_blur" @input="on_input" @focus="on_focus" )

    .flex
        .mitem
            p.is-size-6 {{search_result.length}} / {{ilse.commands.commands.length || 0}} ({{Math.floor(search_result.length * 100 / ilse.commands.commands.length)}}%)
        .mitem
            span Navigation: 
                strong ↑↓ 
        .mitem
            span Run: 
                strong ↪ 
        .mitem
            p Quit: 
                strong ESC
    br

    .flex( v-if="!search_result.length" v-for="( command, index ) in ilse.commands.commands" @click="on_item_click($event, command)" )
        h1.is-size-1( v-if=" search_result === 0" ) No Results ):

        .item
            p.is-pulled-left {{command.name}}
            kbd.is-pulled-right( v-if="get_shortcut_by_name(command.name)" ) {{get_shortcut_by_name(command.name)}}

        // .loop( v-for="( shortcut, shortcut_index ) in ilse.commands.get_command_shortcut(command.id)" :key="'shortcut-' + shortcut_index")
            p {{shortctu}}

        // .column.is-3
            .is-pulled-left.source( v-if="get_command_by_name(command.name) && get_command_by_name(command.name).props" ) {{get_command_by_name(command.name).props.source}} 

        // .column.is-2
            kbd.is-pulled-right.shortcut( v-if="get_shortcut_by_name(command.name)" ) {{get_shortcut_by_name(command.name)}}

    br

    .flex( v-if="search_result.length" v-for="( result, index ) in search_result" @click="on_item_click($event, get_command_by_name(result.target) )" )
        p.is-pulled-left.item {{result.target}}

        // .column.is-3
            kbd.is-pulled-left.source( v-if="get_command_by_name(result.target) && get_command_by_name(result.target).props" ) {{get_command_by_name(result.target).props.source}} 

        // .column.is-2
            p.is-pulled-right.shortcut( v-if="get_shortcut_by_name(result.target)" :title="result.target" ) {{get_shortcut_by_name(result.target)}}
    br

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                     from "@/ilse.js"

export default {

    name: "CommandPallet",

    components: {
    },

    data() {
        return {
            ilse: ilse,
            timeout: {},

            input: "",
            search_result: [],
        }
    },

    watch: {

        input( input ) {
            if( input === "" ) this.search()

            let _this = this
            clearTimeout( this.timeout )
            this.timeout = setTimeout( () => {
                _this.search()
            }, 1000 )
        },

    },

    methods: {

        on_item_click( event, command ) {

            let shift = event.shiftKey
            command.fn()
                // this.run_command( command )

            if( !shift ) ilse.modals.close() // FEATURE: hold shift for not to close.
        },

        focus() {

            try {
                this.$refs.command_pallet.focus()
            } catch( e ) {

            }

        },

        run_command( name ) {

            let command = this.get_command_by_name( name )
            let id      = command.id

            ilse.commands.run( id )
        },

        get_command_by_name( name ) {

            let commands = ilse.commands.commands

            for( let command of commands ) {
                if( command.name === name ) return command
            }

            return null

        },

        get_command_shortcut( command_id ) {

            let keys = ilse.keyboard.keys
            let combo=null

            keys.map( key => {
                if( key.command === command_id ) combo = key.combo
            })

            return combo

        },

        get_shortcut_by_name( name ) {

            printf( "get_shortcut_by_name -> name -> ", name )
            let command     = this.get_command_by_name(name)
            printf( "get_shortcut_by_name -> command -> ", command )
            let id          = command.id
            printf( "get_shortcut_by_name -> id -> ", id )
            let shortcut    = this.get_command_shortcut( id )
            printf( "get_shortcut_by_name -> shortcut -> ", shortcut )

            return shortcut
        },

        on_focus() {
            // ilse.keyboard.set_mode("Normal")
        },

        turn_off() {
        },

        on_keydown_enter( event ) {

            let has_result          = !!this.search_result.length
            let ctrl                = event.ctrlKey
            let number_of_result    = this.search_result.length

            // TODO: Fix this, if only one result, automatically search
            if( has_result ) {
                let first_result = this.search_result[0].target
                this.run_command( first_result )
                ilse.modals.close()
            } else {

                this.search()

                if( ctrl ) { // Instant Search
                    setTimeout( () => {
                        let first_result = this.search_result[0].target
                        this.run_command( first_result )
                        ilse.modals.close()
                    }, 10 )
                }
            }

        },

        on_blur() {
        },

        search() {

            /*
            let _this = this
            let timeout 
            clearTimeout( timeout )
            timeout = setTimeout( () => {
            }, 1000 )
            */

            let input           = this.input

            let list            = ilse.commands.commands.map( command => { return command.name }).filter( e=>e )

            let result          = ilse.utils.fuzzy_search( input, list )

            this.search_result = result
        },

        on_input() {
        },

        setup() {
            this.focus()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.flex .column {
    margin-left: 30px;
}

.flex .item {
    margin: 0 auto;
}

.item {
}

.flex .mitem {
    margin: 0 auto;
}

.flex .item {
    border: 1px solid var( --text-color );
    width: 100%;
    margin-bottom: 5px;
    border-radius: var( --border-radius );
    padding: 3px;
    cursor: pointer;
}

.flex .item:hover {
    background: var( --text-color );
    color: var( --background-color );
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
}

input.input {
    background: var( --background-color );
    color: var( --text-color );
    border: 1px solid var( --text-color );
    width: 100%;
}

strong  {
    color: var( --text-color );
}

</style>
