<template lang="pug" >
.dialog.list

    .loop( v-for=" (dialog, index) in ilse.dialog.list" )

        .shadow( v-if="dialog.type === 'list' " @click="on_shadow_click($event, dialog)" )
            .dialog-wrapper( @click="on_dialog_click" )
                .dialog
                    h1.has-text-centered {{dialog.title}} {{dialog.description}}
                    input.input.centered
                    .item( v-for="( item, item_index ) in dialog.list" @click="on_item_click(dialog, item)" )
                        p {{item}}

                    button.button.slick-button( @click="cancel(dialog)" ) Cancel
                    button.button.slick-button.is-pulled-right( @click="ok(dialog)" ) Confirm
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "ListDialog",

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        // <---------------------> Info <--------------------- > //
        ok( dialog ) {
            Messager.emit( "~dialog.vue", "done", { button: "ok", id: dialog.id })
                this.close( dialog.id )
        },

        cancel( dialog ) {
            Messager.emit( "~dialog.vue", "done", { button: "cancel", id: dialog.id })
                this.close( dialog.id )
        },

        on_item_click( dialog, item ) {

            Messager.emit( "~dialog.vue", "done", {
                button: "item",
                item: item,
                id: dialog.id
            })

            this.close( dialog.id )

        },
        // <---------------------> Info <--------------------- > //

        close( id ) {
            ilse.dialog.close( id )
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

.dialog .list {
}

.dialog-wrapper {
    color: var( --text-color ) !important;
    background: var( --background-color ) !important;
    border: 1px solid var( --text-color );

    position: fixed;

    height: 20%;


    width: 75vw;
        /*max-width: 43vw;
        min-width: 30vw;*/
    height: 75vh;


    left: 50%;
    top: 45%;
    transform: translate( -50%, -50% );
    z-index: 100;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    overflow: auto;
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
    margin-bottom: 10px;
}

.item {
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 2px;
}

.item p {
    border: 1px solid var( --text-color );
    padding: var( --padding );
    border-radius: var( --border-radius );
}

.dialog input.input {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
    text-align: left;
}

</style>
