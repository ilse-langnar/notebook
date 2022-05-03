<template lang="pug" >
.notifications
    .notification( v-for="( notification, index ) in ilse.notification.items" :key="index" )
        .message( :style="get_notification_css(index)" :class="get_notification_class(notification)" :id="'notification' + index" )
            .message-header
                button.delete.is-pulled-right( @click="remove(notification)" ) 
                p.is-size-5 {{notification.title}} ({{notification.options.time / 1000}})
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

            let list = []

            if( notification.options.light ) {
                list.push("is-light")
            } else  {
                list.push("is-dark")
            }

            if( notification.options.theme === 'success' ) {
                list.push( "is-success" )
            } else if( notification.options.theme === 'info' )  {
                list.push( "is-info" )
            }


            return list

        },

        get_notification_css( index ) {

            // let style   = `width: 29%;  z-index: 14; margin-top: 20px; float: right; clear: both; display: inline; position: absolute; right: 0px; `
            let style   = `width: 35%;  z-index: 14; margin-top: 10px; float: right; clear: both; display: inline; position: fixed; right: 0px; `
                style       += `bottom: ${index * 150}px; `

            return style
        },


        remove( notification ) {
            ilse.notification.remove( notification )
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
    margin: 10px;
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    overflow: hidden;
    width: 40% !important;
    color: #000;
    background: #f1f1f1;
}

.notification {
    border-radius: 4px;
    position: absolute;
        position: fixed;
        left: 10px;
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
}

.notification a:not(.button):not(.dropdown-item) {
    color: currentColor;
    text-decoration: underline;
}

.notification strong {
  color: currentColor;
}

.notification code,
.notification pre {
  background: white;
}

.notification pre code {
  background: transparent;
}

.notification > .delete {
  right: 0.5rem;
  position: absolute;
  top: 0.5rem;
}

.notification .title,
.notification .subtitle,
.notification .content {
  color: currentColor;
}

.notification.is-white {
  background-color: white;
  color: #0a0a0a;
}

.notification.is-black {
  background-color: #0a0a0a;
  color: white;
}

.notification.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.notification.is-dark {
  background-color: #363636;
  color: #fff;
}

.notification.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.notification.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.notification.is-link {
  background-color: #485fc7;
  color: #fff;
}

.notification.is-link.is-light {
  background-color: #eff1fa;
  color: #3850b7;
}

.notification.is-info {
  background-color: #3e8ed0;
  color: #fff;
}

.notification.is-info.is-light {
  background-color: #eff5fb;
  color: #296fa8;
}

.notification.is-success {
  background-color: #48c78e;
  color: #fff;
}

.notification.is-success.is-light {
  background-color: #effaf5;
  color: #257953;
}

.notification.is-warning {
  background-color: #ffe08a;
  color: rgba(0, 0, 0, 0.7);
}

.notification.is-warning.is-light {
  background-color: #fffaeb;
  color: #946c00;
}

.notification.is-danger {
  background-color: #f14668;
  color: #fff;
}

.notification.is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}


</style>
