<template lang="pug">
.home
    // TopMenu
    // Component.top-menu( :component="get_main()" :options="{ hide_bullet: true }" )

    .loading( v-if="!ilse.target_directories.length || !ilse.has_loaded " :key="ilse.key" )
        Setup

    // .ilse( v-if="ilse.target_directories.length && ilse.has_loaded && ilse.notes.has_loaded" :key="ilse.key" :data-theme="get_data_theme()" :style="ilse.config.is_resize_mode_on ? 'overflow: hidden;' : '' " )
    .ilse( v-if="ilse.target_directories.length && ilse.has_loaded && ilse.notes.has_loaded" :key="ilse.key" :data-theme="ilse.config.dark ? 'dark' : 'light' " :style="ilse.config.is_resize_mode_on ? 'overflow: hidden;' : '' " )

        // button.button( @click="render" ) Render

        // button.button( @click="spawn" ) spawn
        button.button( @click="spawn" ) spawn
        // button.button( @click="test" ) Test

        Renderer( :components="ilse.components" unique-key="home" )


        // .flex
            .flexi( style="flex-basis: 2%; border: 1px dashed var( --text-color ); height: 100vh;" @drop.prevent="on_app_drop" )

                // img( :src="irequire.img('logo.svg')" style="cursor: inline-block; width: 40px;" )
                img( src="@/assets/logo.svg" style="cursor: inline-block; width: 40px; /*border: 1px solid #000; border-radius: 5px;*/ box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; " )

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

// libs
    // import { JSFrame } from 'jsframe.js';


// functions
    import get_unique_date_id           from "@/classes/get_unique_date_id.js"
    import is_dev                       from "@/classes/is_dev.js"
    import string_to_base64             from "@/classes/string_to_base64.js"
    import get_protocol                 from "@/classes/get_protocol.js"
    import get_target_directory_url     from "@/classes/get_target_directory_url.js"
    import create_window                from "@/classes/create_window.js"

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

        spawn() {


            const input = prompt("What's your name?");
            printf( "Home.vue -> input -> ", input )
            let url     = get_target_directory_url()
            printf( "Home.vue -> url -> ", url )
            create_window({ title: "Component", html: input + ".html" })

            /*
            let html = ilse.filesystem.file.read.sync( "SearchButton.html" )
            const frame = ilse.frame.create({
                title: 'Window',
                left: 200, top: 200, width: 320, height: 220,
                movable: true,//Enable to be moved by mouse
                resizable: true,//Enable to be resized by mouse
                // url: `app://${ilse.target_directories[0]}/SearchButton.html`,//URL to display in iframe
                // url: `app://${ilse.target_directories[0]}/html-table.html`,//URL to display in iframe
                // html: html,

                // html: `<embed src="app://${ilse.target_directories[0]}/html-table.html" />`,
                // url: `app://${ilse.target_directories[0]}/SearchButton.html`,//URL to display in iframe
                // html: `<embed id="example" src="app://${ilse.target_directories[0]}/SearchButton.html" data-prop-label="From Ilse" data-events="[ 'click' ]" />`,
                // html: `<embed id="example" src="app://${ilse.target_directories[0]}/SearchButton.html" data-props="{ 'label': 'Ilse Langnars Notebook' }" data-events="[ 'click' ]" />`,

                // html: `<iframe id="example" src="app://${ilse.target_directories[0]}/SearchButton.html" onload="console.log("iframe loaded -> ", this )" data-props="{ 'label': 'Ilse Langnars Notebook' }" data-events="[ 'click' ]" > </iframe>`
                html: `<embed id="example" src="app://${ilse.target_directories[0]}/SearchButton.html" onload="console.log("iframe loaded -> ", this )" data-props="{ 'label': 'Ilse Langnars Notebook' }" data-events="[ 'click' ]" /> `

                // html: `<embed id="example" onload="${
                    // setTimeout( () => { ilse.dna.emit( "label", { label: "Ilse Langnar's Notebook" }) }, 1000 )
                    // }" src="app://${ilse.target_directories[0]}/SearchButton.html" data-props="{ 'label': 'Ilse Langnars Notebook' }" data-events="[ 'click' ]" />`,
            })
            */
                    // /*setTimeout( () => { ilse.dna.scan(document.getElementById('example')); console.log( document.getElementById('example') ) }, 1000 )*/
                    // /*setTimeout( () => { ilse.dna.scan(document.getElementById('example')); console.log( document.getElementById('example') ) }, 1000 )*/
                    // /*setTimeout( () => { console.log("emitting ... "); window.localStorage.setItem( "dna", JSON.stringify({ label: 'Ilse Langnars Notebook ' }) ) }, 1000 )*/

            /*
            setTimeout( async () => {
                printf( ">>>>>> timeout -> ilse.dna -> ", ilse.dna )
                let dom = document.getElementById( "example" )
                printf( "window.DNA -> ", window.DNA )
                printf( "dom -> Scanning ... -> ", dom )
                // window.DNA.scan( dom )

                ilse.dna.scan( dom )
                dom.addEventListener( "load", event => {
                    printf( ">>@>@>@@> loaded" )

                    dom.addEventListener( "click", event => {
                        printf( ">>>>> addEventListener -> event -> ", event )
                    })

                })

                // printf( "dom -> ", dom )

            }, 1000 )
            */

            // frame.show()

            //Create window
            /*
            const frame = ilse.frame.create({
                title: 'Window',
                left: 200, top: 200, width: 620, height: 420,
                movable: true,//Enable to be moved by mouse
                resizable: true,//Enable to be resized by mouse
                // url: `app://${ilse.target_directories[0]}/html-table.html`,//URL to display in iframe
                // html: '<div id="my_element" style="padding:10px;font-size:12px;color:darkgray;">Contents of window</div>'

                html: `<embed src="app://${ilse.target_directories[0]}/html-table.html" style="width: 100%; height: 100%; overflow: hidden; "/> `,//URL to display in iframe
            });

            frame.show()
            */

            // create_window({ title: "Component", html: get_target_directory_url() + ".html" })
        },

        test() {

            let all   = document.querySelectorAll( ".floating-window" )
            let list  = [...all]
            printf( "parent -> window.location -> ", window.location )
            printf( "list -> ", list )
            let url = get_target_directory_url()
            printf( ">>> url -> ", url )
            list.map( iframe => {
                printf( "iframe -> ", iframe )
                printf( "iframe.contentWindow -> ", iframe.contentWindow )
                // iframe.contentWindow.postMessage({ number: "LLL" }, 'http://localhost:3000');
                iframe.contentWindow.postMessage({ number: "LLL" }, url )
            })

            // html: use_embed ? `<iframe id="${html}" data-floating-window src="${endpoint}" style="width: 100%; height: 100%; overflow: hidden; " > </iframe> ` : html,
            // create_window({ title: "Component", html: full_path + ".html" })

            /*
            printf( "1" )
            printf( "ilse.frame -> ", ilse.frame )
            //Create window
            const frame = ilse.frame.create({
                title: 'Window',
                left: 200, top: 200, width: 320, height: 220,
                movable: true,//Enable to be moved by mouse
                resizable: true,//Enable to be resized by mouse
                // url: `app://${ilse.target_directories[0]}/html-table.html`,//URL to display in iframe
                // html: '<div id="my_element" style="padding:10px;font-size:12px;color:darkgray;">Contents of window</div>'

                url: `<embed src="app://${ilse.target_directories[0]}/html-table.html"`,//URL to display in iframe
            });
            printf( ">>> frame -> ", frame )

            frame.show()
            */

            // printf( "window.localStorage -> ", window.localStorage )

            // window.localStorage.setItem( "dna", JSON.stringify({ label: "Ilse" }) )

            // Connection to a broadcast channel
            // const bc = new BroadcastChannel( 'test_channel' )
            // bc.postMessage('This is a test message.') // Example of sending of a very simple message. It doesn't have to be a string, it could be a JS object

            /*
            const jsFrame = new JSFrame();
            printf( "jsFrame -> ", jsFrame )

            //Create window
            const frame = jsFrame.create({
                title: 'Window',
                left: 200, top: 200, width: 320, height: 220,
                movable: true,//Enable to be moved by mouse
                resizable: true,//Enable to be resized by mouse
                url: `app://${ilse.target_directories[0]}/html-table.html`,//URL to display in iframe
                // html: '<div id="my_element" style="padding:10px;font-size:12px;color:darkgray;">Contents of window</div>'
            });

            frame.show()

            printf( "frame -> ", frame )
            */
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

        test() {

            document.addEventListener( "mouseover", async event => {
                // printf( "2@@@navigator.clipboard -> ", navigator.clipboard )
                // let text = navigator.clipboard.readText();
                printf( "@@@@mouseover -> event -> ", event )
            })

            document.addEventListener( "mouseleave", async event => {
                // alert( "Leave" )
                // printf( "@@@@mouseleave -> event -> ", event )
                // printf( "@@@@navigator -> ", navigator )
                // await navigator.clipboard.writeText( "I have written this!" )
            })
        },

        setup() {
            printf( "window.location -> ", window.location )

            // this.test()
            ilse.vue = this
            printf( "Home.vue -> 'storage' -> this -> ", this )
            window.addEventListener( "storage", storage => {
                printf( ">>>>>>>> storage -> ", storage )
            })

            window.addEventListener('storage', () => {
              // When local storage changes, dump the list to
              // the console.
              console.log(JSON.parse(window.localStorage.getItem('sampleList')));
            });
            setTimeout( () => {
                printf( "Setting ..... " )
                window.localStorage.setItem( "dna", { key: Math.random().toString, mm: 22 } )
            }, 5000 )

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
