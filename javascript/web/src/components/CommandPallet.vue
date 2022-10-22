<template lang="pug" >
.command-pallet

    .flex
        img( :src="ilse.require('command.svg')" style="width: 23px; margin-bottom: 6px; " )
        input.input( v-model="input" autofocus ref="command_pallet" @keydown.escape="turn_off" @keydown.enter="on_keydown_enter" )
        img( :src="ilse.require('question-mark.svg')" style="width: 20px; margin-bottom: 6px; " )

    .flex
        .mitem
            p.is-size-6 {{search_result.length}} / {{ilse.commands.commands.length || 0}} ({{Math.floor(search_result.length * 100 / ilse.commands.commands.length)}}%)
        .mitem
            span {{$t('navigation')}}: 
                strong ↑↓ 
        .mitem
            span {{$t('run')}}: 
                strong ↪ 
        .mitem
            p {{$t('quit')}}: 
                strong ESC
    br

    .flex( v-for="( command, index ) in search_result.length ? search_result : ilse.commands.commands" @click="ilse.commands.run(command.id); ilse.modals.close()" )
         .item
             .is-pulled-left
                img( v-if="command.icon" :src="ilse.require(command.icon)" style="width: 17px; position: relative; top: 5px;  margin-right: 5px; " :title="command.icon" )
                span {{command.name}}
                span.description.is-size-7 &nbsp; &nbsp; &nbsp; {{command.description}} 
             .shortcut.is-pulled-right( v-if="get_shortcut_by_name(command.name)" )
                 span( v-if="get_shortcut_by_name(command.name)" ) {{get_shortcut_by_name(command.name).replace("ctrl+space", "")}}
    br

</template>
<script>
// eslint-disable-next-line
import printf                       from "@/classes/printf.js"

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
            command.fn()
            if( !event.shiftKey ) ilse.modals.close() // FEATURE: hold shift for not to close.
        },

        focus() {

            try {
                this.$refs.command_pallet.focus()
            } catch( e ) {

            }

        },

        get_command_by_name( name ) {

            let commands = ilse.commands.commands

            for( let command of commands ) {
                if( command.name === name ) return command
            }

            return null

        },

        get_command_shortcut( id ) {

            let keys = ilse.keyboard.keys
            let _keys = this.ilse.config.keys

            let combo

            keys.map( key => {
                if( key.command === id ) combo = key.combo
            })

            return combo

        },

        get_shortcut_by_name( name ) {

            let command     = this.get_command_by_name(name)
            let id          = command.id
            let shortcut    = this.get_command_shortcut( id )

            return shortcut
        },

        turn_off() {

        },

        on_keydown_enter( event ) {

            let has_result          = !!this.search_result.length
            let ctrl                = event.ctrlKey
            let number_of_result    = this.search_result.length

            if( has_result ) {
                ilse.commands.run( this.search_result[0].id )
                ilse.modals.close()
            } else {
                this.search()
            }

        },

        search() {

            let input           = this.input.toLowerCase()
            let list            = ilse.commands.commands
            let command_name

            let result          = list.map( command => {
                command_name = command.name.toLowerCase()
                if( command && command_name.search(input) !== -1 ) return command
            }).filter( e=>e )

            this.search_result = result
 
            return
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

.command-pallet {
    z-index: 100 !important;
    overflow: hidden;
}

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
    width: 100%;
    margin-bottom: 5px;
    border-radius: var( --border-radius );
    padding: 3px;
    cursor: pointer;
    height: 35px;
}

.flex .item:hover {
    background: var( --text-color );
    color: var( --background-color );
    border-radius: var( --border-radius );
}

input.input {
    background: var( --background-color );
    color: var( --text-color );
    width: 100%;
    border: 0 !important;
}

strong  {
    color: var( --text-color );
}

</style>
