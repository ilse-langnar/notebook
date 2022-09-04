<template lang="pug">
.home

    .loading( v-if="!ilse.target_directories.length || !ilse.has_loaded " :key="ilse.key" )
        Setup

    // .ilse( v-if="ilse.target_directories.length && ilse.has_loaded && ilse.notes.has_loaded" :key="ilse.key" :data-theme="get_data_theme()" :style="ilse.config.is_resize_mode_on ? 'overflow: hidden;' : '' " )
    .ilse( v-if="ilse.target_directories.length && ilse.has_loaded && ilse.notes.has_loaded" :key="ilse.key" :data-theme="ilse.config.dark ? 'dark' : 'light' " :style="ilse.config.is_resize_mode_on ? 'overflow: hidden;' : '' " )

        // TopMenu
        Component.top-menu( :component="get_top_menu()" :options="{ hide_bullet: true }" style="" )
        List( :components="ilse.components" unique-key="home" )
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
    import List             from "@/components/Components.vue"
    import Component        from "@/components/Component.vue"


export default {

    name: "Home",

    components: {
        TopMenu,

        Modals,
        Dialogs,

        Setup,
        Notifications,

        List,
        Component,
    },

    data() {
        return {
            is_left_on: false,
            ilse: ilse,
            key: Math.random(),
        }
    },

    computed: {

        get_data_theme() {
            return ilse.config.dark ? 'dark' : 'light'
        },


    },

    methods: {

        get_top_menu() {
            let type = ilse.config.top_menu_component || "top-menu"
            let c         = { 'id': 'top-menu', 'width': 12, 'is_on': true, 'type': type, 'props': {} }
            let component = new ilse.classes.Component( c )
            return component
        },

        open_shortcuts() {
            ilse.modals.open( "keyboard-shortcut" )
        },

        // get_data_theme() {
            // return ilse.config.dark ? 'dark' : 'light'
            // return theme
            // return ilse.theme_tone
        // },

        setup() {
            ilse.vue = this
        },

    },

    mounted() {
        this.setup();
    },

}
</script>
<style>

/*
:root,
.ilse[data-theme='light'] {

    --background-color: #fff;
    --background-color: #E9E9E9;

    --text-color: #4a4a4a;
    --text-color: #BABABA;
    --text-color: #717171;


    --border: 1px solid #4a4a4a;
    --border-radius: 6px;
    --padding: 4px;
}

.ilse[data-theme="dark"] {

    --background-color: #000;
    --background-color: #212121;
    --background-color: #181C20;
    --background-color: #0E1011;

    --background-color: #252a2cff;

    --background-color: #131313ff;

    --text-color: #fff;
    --text-color: #F8F8F8;

    --border: 2px solid #777;
    --border-radius: 6px;
    --padding: 4px;
    --box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
*/

.ilse  {
    color: var( --text-color );
    background: var( --background-color ) !important;
    height: 100vh;
    overflow: hidden;
}

</style>
