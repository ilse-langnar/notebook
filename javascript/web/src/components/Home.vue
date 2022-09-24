<template lang="pug">
.home
    // TopMenu
    // Component.top-menu( :component="get_main()" :options="{ hide_bullet: true }" )

    .loading( v-if="!ilse.target_directories.length || !ilse.has_loaded " :key="ilse.key" )
        Setup

    // .ilse( v-if="ilse.target_directories.length && ilse.has_loaded && ilse.notes.has_loaded" :key="ilse.key" :data-theme="get_data_theme()" :style="ilse.config.is_resize_mode_on ? 'overflow: hidden;' : '' " )
    .ilse( v-if="ilse.target_directories.length && ilse.has_loaded && ilse.notes.has_loaded" :key="ilse.key" :data-theme="ilse.config.dark ? 'dark' : 'light' " :style="ilse.config.is_resize_mode_on ? 'overflow: hidden;' : '' " )

        .flex
            .flexi( style="flex-basis: 2%; border: 1px solid #000; height: 100vh;" @drop.prevent="on_app_drop" )

                // img( :src="irequire.img('logo.svg')" style="cursor: inline-block; width: 40px;" )
                img( src="@/assets/logo.svg" style="cursor: inline-block; width: 40px; border: 1px dashed #000; border-radius: 5px; " )

            .flex( style="flex-basis: 100%; " )
                embed(     v-if="get_main()" :src="get_embed_src(get_main().component)" style="width: 100% !important; height: 100vh !important; overflow: hidden !important; border: 1px solid #000; " )
                Renderer(  v-if="!get_main()" :components="ilse.components" unique-key="home" )

        // .rendered
            .is-pulled-left( style="border: 1px solid #000; width: 3%; height: 100vh;" )
                img( :src="irequire.img('logo.svg')" style="cursor: pointer; width: 40px;" )

            .is-pulled-right( style="width: 97%; " )
                embed(     v-if="get_main()" :src="get_embed_src(get_main().component)" style="width: 100% !important; height: 100vh !important; overflow: hidden !important; border: 1px solid #000; " )
                Renderer(  v-if="!get_main()" :components="ilse.components" unique-key="home" )


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
    import Renderer         from "@/components/Components.vue"
    import Component        from "@/components/Component.vue"


export default {

    name: "Home",

    components: {
        TopMenu,

        Modals,
        Dialogs,

        Setup,
        Notifications,

        Renderer,
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

        on_app_drop( event ) {
            printf( "Home.vue -> on_app_drop -> event -> ", event )
        },

        get_embed_src( id ) {
            let target_dir  = ilse.target_directories[0]
            let final       = `app://${target_dir}/${id}`
            return final
        },

        get_main() {

            let main         = ilse.filesystem.file.exists.sync( "main.html" )
                if( !main ) return

            let component = ilse.types.get( "main" )
            if( !component )
                component = ilse.types.add({
                    id: "main",
                    name: "Main",
                    description: "Main(Total View)",
                    img: ilse.irequire.img( "menu.svg" ),
                    component: "main.html",
                    width: 12,
                    is_on: true,
                    type: "embed",
                    props: {},
                })

            printf( "component -> ", component )

            return component
        },

        // let type      = ilse.config.top_menu_component || "top-menu"
        get_menu() {

            // let menu         = ilse.filesystem.file.read.sync( "piano.html" )
            let menu         = null

            if( !menu ) {

                let component = ilse.types.get( "top-menu" )
                return component

            } else {
                let component = ilse.types.get( "top-menu-embed" )

                if( !component ) {

                    component = ilse.types.add({
                        id: "top-menu-embed",
                        name: "Top Menu Embed",
                        description: "Top menu from the user",
                        img: ilse.irequire.img( "menu.svg" ),
                        component: "piano.html",
                        width: 12,
                        is_on: true,
                        type: "embed",
                        props: {},
                    })
                }

                return component
            }

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
