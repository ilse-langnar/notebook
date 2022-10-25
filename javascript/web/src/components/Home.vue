<template lang="pug">
.home( :key="ilse.keys.home" )

    // p has_loaded {{ilse.has_loaded}}
    // p has_loaded {{ilse.target_directories.length}}

    #setup( v-show="!ilse.target_directories.length || !ilse.has_loaded " v-html="HTML_SETUP" )

    // .ilse( v-if="ilse.target_directories.length && ilse.has_loaded && ilse.notes.has_loaded && has_apps()" :data-theme="get_data_theme" :style="ilse.config.is_resize_mode_on ? 'overflow: hidden;' : '' " )

    .ilse( v-show="ilse.target_directories.length && ilse.has_loaded" :data-theme="get_data_theme" )

        // button.button( @click="info" ) Info
        .html-render( v-for="( item, index ) in ilse.htmls.list" :key="index" )
            .div( v-html="item.html" :id="item.id" )

        .top-menu( v-html="HTML_TOP_MENU" )
        DailyNotes

        // button.button( @click="show_info" ) Show Info
        // So Dark mode works with zen
        // .wrapper( :style="get_home_style()" )
            // .top-menu( v-html="ilse.get_html('top-menu')" )
            // button.button( @click="add" ) Add

            // Renderer( :components="ilse.components" )

            // .app( :key="ilse.keys['home'] ? ilse.keys['home'] : 0" style="flex-basis: 100%; " )
                iframe.external-app(   v-show="get_active_html() !== 'ilse.html' " :src="get_active_html()" )
                Renderer(              v-show="get_active_html() === 'ilse.html' " :components="ilse.components" unique-key="home" )

            .status-line( v-html="HTML_STATUS_LINE" )
            // StatusLine

        // Search( v-if="ilse.is_search_on" )

</template>
<script>
// eslint-disable-next-line
import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    // import Renderer                     from "@/components/Components.vue"
    import DailyNotes                   from "@/components/DailyNotes.vue"
    // import StatusLine                   from "@/components/StatusLine.vue"

// functions
    import HTML_TOP_MENU                from "@/classes/HTML_TOP_MENU.js"
    import HTML_SETUP                   from "@/classes/HTML_SETUP.js"
    import HTML_STATUS_LINE             from "@/classes/HTML_STATUS_LINE.js"
    printf( "HTML_STATUS_LINE -> ", HTML_STATUS_LINE )

// functions
    import get_unique_date_id           from "@/classes/get_unique_date_id.js"
    import is_dev                       from "@/classes/is_dev.js"
    import string_to_base64             from "@/classes/string_to_base64.js"
    import get_protocol                 from "@/classes/get_protocol.js"
    import get_target_directory_url     from "@/classes/get_target_directory_url.js"
    import create_window                from "@/classes/create_window.js"
    import string_to_html               from "@/classes/string_to_html.js"
    import get_html_favicon             from "@/classes/get_html_favicon.js"
    import move_array_item              from "@/classes/move_array_item.js"
    import set                          from "@/classes/set.js"
    import delay                        from "@/classes/delay.js"
    import if_else                      from "@/classes/if_else.js"
    import update_key                   from "@/classes/update_key.js"
    import pipe                         from "@/classes/pipe.js"

export default {

    name: "Home",

    components: {
        DailyNotes,
        // StatusLine,
    },

    data() {
        return {
            is_left_on: false,
            HTML_TOP_MENU,
            HTML_SETUP,
            HTML_STATUS_LINE,
            ilse: ilse,
        }
    },

    computed: {

        get_data_theme() {
            return ilse.config.dark ? 'dark' : 'light'
        },

    },

    methods: {

        show_info() {

            window.Alpine.data('ref',
                function() {
                    return {
                        value:11111111111
                    }
                }
            )
            printf( "window.Alpine -> ", window.Alpine.data('ref') )

            ilse.htmls.test()

        },

        get_home_style() {

            return if_else(
                ilse.is_zen, 
                yes => `width: 80%; margin: 0 auto; overflow: hidden; height: 100vh;` ,
                no  => null ,
            )

        },

        add() {
            printf( "ilse.notes.list ", ilse.notes.list )

            // let added = ilse.notes.add( "Example", 10 )
            // printf( "ilse.notes.list -> ", ilse.notes.list )
            // printf( "added -> ", added )
        },

        has_apps() {
            if( !ilse || !ilse.config || !ilse.config.apps || !ilse.config.apps[0] ) return false
            return true
        },

        get_app_icon_style( item ) {
            let name = ilse.config.apps[0]
            if( name === item ) return `border-bottom: 1px dashed #000; `
        },

        get_icon( name ) {
            if( name === "ilse.html" ) return require("@/assets/logo.svg")

            let file    = ilse.filesystem.file.read.sync( name )
            let html    = string_to_html( file )
            let favicon = get_html_favicon( html )
            return favicon
        },

        get_active_html() {

            if( !ilse || !ilse.config || !ilse.config.apps || !ilse.config.apps[0] ) return "ilse.html"
            let name = ilse.config.apps[0]
                if( name === "ilse.html" ) return "ilse.html"

            // let file = ilse.filesystem.file.read.sync( apps )
            let url = get_target_directory_url() + name
            return url

        },

        spawn() {


            const input = prompt("What's your name?");
            printf( "Home.vue -> input -> ", input )
            let url     = get_target_directory_url()
            printf( "Home.vue -> url -> ", url )
            create_window({ title: "Component", html: input + ".html" })
        },

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
                    img: ilse.require( "menu.svg" ),
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
                        img: ilse.require( "menu.svg" ),
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

        setup() {

            printf( "Math.random() -> ", Math.random() )
            printf( "Math.random() -> ", Math.random() )
            printf( "Math.random() -> ", Math.random() )

            document.addEventListener('alpine:init', () => {
                printf( "!!!! Home.vue -> alpine:init" )
                Alpine.data('dropdown', () => ({
                    open: false,
                    toggle() {
                        this.open = ! this.open
                    }
                }))
            })


            // var result = pipe( Math.min, Math.abs, Math.sqrt )(3, -9, 0, 2, 5)

            // printf( "result -> ", result )

            var result2 = pipe(
                [ Math.min, 16 ], 
                [ Math.abs, -9 ],
                [ Math.sqrt, 0 ],
                [ Math.sqrt ],
                [ Math.sqrt ],
                // [ function(e){ return e +1 } ],
                [ console.log ],
            )
            printf( "result2 -> ", result2 )


            // setTimeout( () => { this.key= Math.random() }, 1000 )

            // delay( update_key, this, 1000 )
        },

    },

    mounted() {
        this.setup();
    },

}
</script>
<style>

.ilse  {
    color: var( --text-color );
    background: var( --background-color ) !important;
    /*height: 97vh;*/
    height: 97vh;
    /*width: 98vw;*/
    width: 100vw;
    overflow: hidden !important;
}

.external-app {
    width: 100% !important;
    height: 100vh !important;
    overflow: hidden !important;
    border: 1px solid #000; 
}

.app-icon {
    cursor: inline-block;
    width: 20px;
    cursor: pointer;  
    margin-left: 5px;
}

.apps-bar {
    flex-basis: 2%;
    margin-top: 5px;
    border: 1px dashed var( --text-color );
    height: 100vh;
    background: var( --background-color );
}

.app {
    flex-basis: 100%; 
    /*border: 1px solid #000;
    overflow: hidden;
    height: 90vh;*/
}

</style>
