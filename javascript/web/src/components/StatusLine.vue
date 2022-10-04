<template lang="pug" >
.status-line.flex
    p.flexi {{ilse.target_directories[0]}}
    p.flexi {{ilse.commands.last_command.id}}
    p.flexi {{ilse.notes.list.length}}(notes)

    .flexi( v-if="is_typing_a_command" )
        img( :src="irequire.img('command.svg')" )
        p.is-pulled-left {{keys.join("")}}

    // p.flexi {{is_typing_a_command}}
    // p.flexi( :key="ilse.commands.is_typing_a_command" ) {{ilse.commands.is_typing_a_command}}
    // .flexi( :key="ilse.commands.is_typing_a_command" )
        // img( v-if="ilse.commands.is_typing_a_command" src="@/assets/images/tag.svg" style="width: 30px;" )
    // .flexi {{is_typing_a_command}}

</template>
<script>
// eslint-disable-next-line
const printf                                                    = console.log;

// Ilse
    import ilse             from "@/ilse.js"

export default {

    name: "StatusLine",

    data() {
        return {
            ilse: ilse,
            is_typing_a_command: false,
            keys: [],
        }
    },

    methods: {

        setup() {

            let _this = this
            Messager.on( "~commands", (action, payload) => {
                if( action === "exec" ) {
                    setTimeout( () => { _this.is_typing_a_command = false }, 100 )
                }
            })

            document.addEventListener( "keydown", event => {
                let is_ctrl_space = event.ctrlKey && event.key === " "

                if( event.key === "Escape" ) {
                    _this.is_typing_a_command = true
                    return
                }

                if( is_ctrl_space ) {
                    _this.is_typing_a_command = true
                    _this.keys = []
                }
                if( _this.is_typing_a_command ) _this.keys.push( event.key )
            })

        },

    },

    mounted() {
        this.setup()
    }

}
</script>
<style scoped>

.status-line {
    /* position: fixed;*/
    position: absolute; 
    bottom: 0px;
    width: 100%;
    height: 25px;
    background: var( --background-color );
    z-index: 0; 
}

</style>
