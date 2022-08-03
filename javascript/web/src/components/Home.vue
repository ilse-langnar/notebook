<template lang="pug">
.home

    .loading( v-if="!ilse.target_directories.length || !ilse.has_loaded " :key="ilse.key" )
        Setup

    .ilse( v-if="ilse.target_directories.length && ilse.has_loaded && ilse.notes.has_loaded" :key="ilse.key" :data-theme="get_data_theme()" :style="ilse.config.is_resize_mode_on ? 'overflow: hidden;' : '' " )

        TopMenu
        // HelloI18n
        // img( src="@/assets/images/arrow-narrow-right.svg" style="position: fixed; left: 10px;  width: 25px; height: 25px;  " @click="ilse.is_left_sidebar_open = !ilse.is_left_sidebar_open")

        // .left( v-show="is_left_on" style="display: flex;" )
            .div( style="width: 80%; " )
                p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            List( :components="ilse.components" unique-key="home" )

        // List( v-show="!is_left_on" :components="ilse.components" unique-key="home" )

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
    import HelloI18n        from "@/components/HelloI18n.vue"


export default {

    name: "Home",

    components: {
        TopMenu,

        Modals,
        Dialogs,

        Setup,
        Notifications,

        List,
        HelloI18n,
    },

    data() {
        return {
            is_left_on: false,
            ilse: ilse,
            key: Math.random(),
        }
    },

    methods: {

        open_shortcuts() {
            ilse.modals.open( "keyboard-shortcut" )
        },

        get_data_theme() {
            let theme = ilse.config.dark ? 'dark' : 'light'
            return theme
        },

        setup() {
            ilse.vue = this
            // document.addEventListener( "keydown", event => { printf( "event -> ", event ) })
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
    min-height: 100vh;
}

</style>
