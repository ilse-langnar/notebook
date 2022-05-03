<template lang="pug">
.home

    .loading( v-if="!ilse.target_directories.length || !ilse.has_loaded" :key="ilse.key" )
        Setup

    .ilse( v-if="ilse.target_directories.length && ilse.has_loaded " :key="ilse.key" :data-theme="get_data_theme()" )
        
        TopMenu
        Components( :components="ilse.components" unique-key="home" )

        Modals
        Dialogs
        Notifications( v-if="ilse.has_loaded" )

</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import TopMenu          from "@/components/TopMenu.vue"
    import Setup            from "@/components/Setup.vue"
    import Modals           from "@/components/Modals.vue"
    import Dialogs          from "@/components/Dialogs.vue"
    import Notifications    from "@/components/Notifications.vue"
    import Components       from "@/components/Components.vue"

export default {

    name: "Home",

    components: {
        TopMenu,

        Modals,
        Dialogs,

        Setup,
        Notifications,

        Components,
    },

    data() {
        return {
            ilse: ilse,
            key: Math.random(),
        }
    },

    methods: {

        get_data_theme() {
            let theme = ilse.config.dark ? 'dark' : 'light'
            return theme
        },

        /*
        open_pdf() {
            ilse.electron.open_pdf( "RAC.pdf" )
        },

        async info_dialog() {
            ilse.dialog.info( "Title", "something else" )
        },

        async confirm_dialog() {
            ilse.dialog.confirm( "Title", "something else" )
        },

        async input_dialog() {
            ilse.dialog.input( "Title", "something else" )
        },

        notify() {
            ilse.notification.send( "New Message", "Hey man, could you switch away from that gas-thing from now on?" )
        },

        test() {
            ilse.ipc.send( "hello" )
        },

        dialog() {
            ilse.electron.dialog.open()
        },

        open_modal() {
            ilse.modals.open( "test" )
        },

        async confirm_dialog() {

            try {
                let o = await ilse.dialog.confirm( "Delete this note?", "Are you sure you want to delete this note? There's no going back! Make sure you have your backup secured." )
            } catch( e ) {
                printf( "e -> ", e )
            }

        },

        save() {
            ilse.save()
        },

        add_component() {
            let component = new ilse.classes.Component()
                ilse.components.push( component )
        },

        get_component_style( component ) {
            let style = `flex: ${component.flex}; margin-left: 10px; height: 100%; `
            return style
        },

        get_theme_type() {
            return ilse.themes.type
        },
        */

        setup() {

        },
    },

    mounted() {
        this.setup();
    },

}
</script>
<style>

:root, .ilse[data-theme='light'] {
    --background-color: #fff;
    --text-color: #4a4a4a;
    --border: 1px solid #4a4a4a;
    --border-radius: 6px;
}

.ilse[data-theme="dark"] {
    --background-color: #000;
    --text-color: #fff;
    --border: 2px solid #777;
    --border-radius: 6px;
}

.ilse  {
    color: var( --text-color );
    background: var( --background-color ) !important;
    min-height: 100vh;
}

</style>
