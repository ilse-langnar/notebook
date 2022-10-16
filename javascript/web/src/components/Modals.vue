<template lang="pug" >
.modals
    .loop( v-for=" (modal, index) in ilse.modals.list" )
        .shadow( v-if="active_modal === modal.id" @click="on_shadow_click" )
            .modal-wrapper( :style="get_style(modal)"  )
                .modal
                    .modal__content
                        component.modal-component( :is="modal.component.component.default" :component="payload" )

</template>
<script>
// eslint-disable-next-line
import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"


// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Modals",

    data() {
        return {
            ilse: ilse,
            active_modal: "",
            payload: {},
        }
    },

    methods: {

        get_style( modal ) {
            return modal.props.style || "width: 70%; height: 70%;"
        },

        close() {
            this.active_modal = ''
            if( this.payload && this.payload.on_close ) this.payload.on_close( this.payload )
        },

        on_shadow_click( event ) {

           let has_clicked_on_shadow = event.target.className === "shadow" 

           if( has_clicked_on_shadow ) {
               this.close()
           }

        },

        listen() {

            Messager.on( "modals.vue", ( action, payload ) =>  {

                if( action === 'open' ) {
                    printf( "open -> action -> ", action )
                    printf( "payload -> ", payload )
                    this.listen_key_up()
                    this.active_modal = payload.target
                    this.payload      = payload
                } else if( action === 'close' ) {
                    this.close()
                    // this.active_modal = ""
                }

            })

        },

        listen_key_up() {

            let _this = this

            function event_listener( event ) {

                let is_escape_key = event.which === 27

                if( is_escape_key && _this.active_modal ) {
                    _this.close()
                    // _this.active_modal = ""
                    window.removeEventListener( "keydown", event_listener )
                }

            }

            window.addEventListener( "keydown", event_listener )

        },

        setup() {
            this.listen_key_up()
            this.listen()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>

.modal-wrapper {
    position: fixed;
    width: 70%;
    height: 70%;
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50% );
    z-index: 13;
    background: var( --background-color );
    border: 1px solid var( --text-color );
    border-radius: 10px;
    overflow: auto;
    /*overflow: hidden;*/
    /*opacity: 0.9;*/
}

.shadow {
    background: rgba( 0, 0, 0, 0.2 );
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /*z-index: 1;*/
    /*z-index: 10;*/
}

.modal {
    /* Border */
    border-radius: 10px;
    z-index: 12;
    height: 70vh;
}

.modal__header {
    display: flex;
     justify-content: center;
     font-size: 1.4em;
     /* Border */
     border-bottom: 1px solid rgba(0, 0, 0.3);
}

.modal__content {
    flex-grow: 1;
    padding: 4px;
    height: 100px;
}

.modal__footer {
    flex-shrink: 0;
    display: flex;
     /* Push the buttons to the right */
     justify-content: flex-end;
}

.modal-component {
}

</style>
