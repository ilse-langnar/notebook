<template lang="pug" >
.notifications
    .notification( v-for="( notification, index ) in ilse.notification.items" :key="index" )
        .message( v-if="notification.type === 'normal'" :style="get_notification_css(index)" :class="get_notification_class(notification)" :id="'notification' + index" )
            .message-header
                button.delete.is-pulled-right( @click="remove(notification)" style="width: 40px;" ) 
                p.is-size-5.centered {{notification.title}} ({{notification.time / 1000}})
            .message-body
                br
                p.centered {{notification.text}}

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

export default {

    name: "Notifications",

    data() {
        return {
            ilse: ilse,
            remaining_time: 0,
        }
    },

    methods: {

        get_notification_class( notification ) {

            printf( "get_notification_class -> notification -> ", notification )

            let list = []

            if( notification.light ) {
                list.push("is-light")
            } else  {
                list.push("is-dark")
            }

            if( notification.theme === 'success' ) {
                list.push( "is-success" )
            } else if( notification.theme === 'info' )  {
                list.push( "is-info" )
            }


            return list

        },

        get_notification_css( index ) {

            // let style   = `width: 29%;  z-index: 14; margin-top: 20px; float: right; clear: both; display: inline; position: absolute; right: 0px; `
            let style   = `width: 35%;  z-index: 14; margin-top: 5px; float: right; clear: both; display: inline; position: fixed; right: 0px; `
                style       += `bottom: ${index * 150}px; `

            return style
        },


        remove( notification ) {
            ilse.notification.remove( notification )

            if( notification.on_cancel ) notification.on_cancel( notification )
            if( notification.on_close )  notification.on_close( notification )
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.message {
    /*filter: opacity( 0.9 );*/
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    overflow: hidden;
    width: 40% !important;
    color: var(--text-color);
    background: var(--background-color);
    border: 1px solid var( --text-color );
}

.notification {
    border-radius: var( --border-radius );
    position: absolute;
        position: fixed;
        left: 10px;
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
}

</style>
