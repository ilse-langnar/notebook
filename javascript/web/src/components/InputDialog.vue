<template lang="pug" >
.dialog

    .loop( v-for=" (dialog, index) in ilse.dialog.list" )

        .shadow( v-show="dialog.type === 'input' " @click="on_shadow_click($event, dialog)" )
            .dialog-wrapper( @click="on_dialog_click" )
                .dialog
                    p.is-size-3.centered.title {{dialog.title}}
                    p.is-size-6.centered.description {{dialog.description}}
                    // input.input( v-model="input" placeholder="..." ref="input-dialog-input" @keydown.enter="ok(dialog)" @keydown.esc="cancel(dialog)" )
                    // textarea.input( v-model="input" placeholder="..." ref="input-dialog-input" @keydown.enter="ok(dialog)" @keydown.esc="cancel(dialog)" )
                    textarea.input( v-model="input" placeholder="..." ref="input-dialog-input" @keydown="on_keydown($event, dialog)" )
                    br
                    br
                    button.button.slick-button.is-pulled-left.cancel-button( @click="cancel(dialog)" ) Cancel
                    button.button.slick-button.is-pulled-right.ok-button( @click="ok(dialog)" ) Ok
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "InputDialog",

    data() {
        return {
            ilse: ilse,
            input: "",
        }
    },

    watch: {

        "ilse.dialog.list"( list ) {

            let is_input = list && list[0] && list[0].type === "input"
            if( is_input ) {
                setTimeout( () => { this.$refs["input-dialog-input"][0].focus() }, 100 )
            }

        },

    },

    methods: {

        on_keydown( event, dialog ) {

            let key         = event.key

            let is_enter    = key === "Enter"
            let is_esc      = key === "Escape"

            let is_shift    = event.shiftKey
            let is_ctrl     = event.ctrlKey

            // textarea.input( v-model="input" placeholder="..." ref="input-dialog-input" @keydown.enter="ok(dialog)" @keydown.esc="cancel(dialog)" )

            if( is_enter && is_shift ) return

            if( is_enter ) {
                Messager.emit( "~dialog.vue", "done", { button: "ok", id: dialog.id, input: this.input })
                    this.close( dialog.id )
            } 

            if( is_enter ) {
                Messager.emit( "~dialog.vue", "done", { button: "cancel", id: dialog.id, input: this.input })
                    this.close( dialog.id )
            }

        },

        // <---------------------> Info <--------------------- > //
        ok( dialog ) {
                Messager.emit( "~dialog.vue", "done", { button: "ok", id: dialog.id, input: this.input })
                    this.close( dialog.id )
        },

        cancel( dialog ) {
                Messager.emit( "~dialog.vue", "done", { button: "cancel", id: dialog.id, input: this.input })
                    this.close( dialog.id )
        },
        // <---------------------> Info <--------------------- > //

        close( id ) {
            ilse.dialog.close( id )
            this.input = ""
        },

        on_shadow_click( event, dialog ) {

            let target      = event.target
            let classes     = target.classList
            let has_shadow  = false

            for( const _class of classes )  {
                if( _class === "shadow" ) has_shadow = true
            }

            // Has clicked on shadow
            if( has_shadow ) {
                this.cancel( dialog )
            }
        },

        on_dialog_click() {
            printf( "on_dialog_click" )
        },

        listen_key_up() {

            let _this = this

            function event_listener( event ) {

                let is_escape_key = event.which === 27

                if( is_escape_key ) {
                    let dialog = ilse.dialog.list[0]
                        if( !dialog ) return

                    _this.cancel( dialog )
                    window.removeEventListener( "keydown", event_listener )
                }

            }

            window.addEventListener( "keydown", event_listener )

        },

        listen() {
            this.listen_key_up()
        },

        setup() {
            this.listen()
            Messager.emit( "~dialog.vue", "loaded" )

        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.dialog-wrapper {
    position: fixed;

    width: auto;
        max-width: 53vw;
        min-width: 40vw;
    height: auto;


    left: 50%;
    top: 35%;
    transform: translate( -50%, -50% );
    z-index: 100;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
}

.shadow {
    background: rgba( 0, 0, 0, 0.2 );
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100 !important;
}

.dialog .description {
    justify-content: center;
    font-weight: 100;
    color: #4a4a4a;
}

.dialog .title {
    margin-bottom: 10px;
}

.ok-button {
    display: block !important;
    margin: 0 auto;
    border: 1px solid #cfc9c9;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-right: 5px;
}


.cancel-button {
    display: block !important;
    margin: 0 auto;
    border: 1px solid #cfc9c9;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 5px;
}


.dialog.input input{
    border: 1px solid #000;
    display: block;
    margin: 0 auto;
}

textarea.input {
    resize: none;
    border: 1px solid #000;
    width: 100%;
    padding: 7px;
    margin: 0 auto;
    min-height: 100px;

}

</style>
