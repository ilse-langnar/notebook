<template lang="pug" >
.command-pallet

    input.input( v-model="input" autofocus ref="command_pallet" @keydown.escape="turn_off" @keydown.enter="on_keydown_enter" @blur="on_blur" @input="on_input" @focus="on_focus" )

    .columns
        .column.is-3
            p.is-size-6 {{search_result.length}} / {{ilse.commands.commands.length || 0}} ({{Math.floor(search_result.length * 100 / ilse.commands.commands.length)}}%)
        .column.is-2
            span Navigation: 
                strong ↑↓ 
        .column.is-3
            span Run: 
                strong ↪ 
        .column.is-3
            p Quit: 
                strong ESC

    .item( v-if="!search_result.length" v-for="( command, index ) in ilse.commands.commands" @click="run_command(command.name)" )

        .columns
            .column.is-6
                p.is-pulled-left {{command.name}}

            .column.is-3
                .is-pulled-left.source( v-if="get_command_by_name(command.name) && get_command_by_name(command.name).props" ) {{get_command_by_name(command.name).props.source}} 

            .column.is-2
                kbd.is-pulled-right.shortcut( v-if="get_shortcut_by_name(command.name)" ) {{get_shortcut_by_name(command.name)}}

    br

    .item( v-if="search_result.length" v-for="( result, index ) in search_result" @click="run_command(result.target)" )

        .columns
            .column.is-6
                p.is-pulled-left {{result.target}}

            .column.is-3
                kbd.is-pulled-left.source( v-if="get_command_by_name(result.target) && get_command_by_name(result.target).props" ) {{get_command_by_name(result.target).props.source}} 

            .column.is-2
                p.is-pulled-right.shortcut( v-if="get_shortcut_by_name(result.target)" :title="result.target" ) {{get_shortcut_by_name(result.target)}}
    br

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

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

        focus() {

            try {
                this.$refs.command_pallet.focus()
            } catch( e ) {

            }

        },

        run_command( name ) {

            let command = this.get_command_by_name(name)
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

            for( let key of keys ) {

                for( let bind of key.bindings ) {
                    if( bind.command === command_id )  return key.combo
                }
            }

            return null

        },

        get_shortcut_by_name( name ) {

            let command     = this.get_command_by_name(name)
            let id          = command.id
            let shortcut    = this.get_command_shortcut( id )

            return shortcut
        },

        on_focus() {
            // ilse.keyboard.set_mode("Normal")
        },

        turn_off() {
        },

        on_keydown_enter() {
            this.search()
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
