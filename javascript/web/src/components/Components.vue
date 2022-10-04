<template lang="pug" >
.components-wrapper( style="width: 100%;" )

    // Component.top-menu( :component="get_menu()" :options="{ hide_bullet: true }" )

    .components( style="display: flex; flex-direction: row;" :key="components_key" )

        Component.second-menu( v-show="!ilse.is_left_sidebar_open && !ilse.is_zen" :component="get_menu_component()" :options="{hide_bullet: true }" style="width: 20%; overflow: auto; " )
        img( v-show="ilse.is_left_sidebar_open" :src="irequire.img('maximize.svg')" style="width: 20px; position: fixed; top: 1%; left: 5px; cursor: pointer; " @click="toggle_left_menu()" )

        // .component( v-if="ilse.frames.indexOf(component) === -1" v-for="(component, component_index) in components" :key="uniqueKey + component.id"  :style="get_component_style(component)" :component="component" )
        .component( v-for="(component, component_index) in components" :key="uniqueKey + component.id"  :style="get_component_style(component)" :component="component" )
            // Don't render window nor modal.
            Component( :component="component" :id="component.key" )

        Component.right-sidebar( v-show="ilse.is_right_sidebar_open" :component="get_right_sidebar()" :options="{ hide_bullet: true }" :style="get_component_style(get_right_sidebar())" )

    .no-components( v-if="!components.length" style="flex-direction: column; height: 89vh; overflow: hidden !important; " )
        .centered( style="" )
            h1.is-size-1 {{ $t('no_components') }}
            img( :src="irequire.img('logo.svg')" style="width: 20%;" )

    br
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
   import Component                     from "@/components/Component.vue"
   import Test                          from "@/components/Test.vue"
   import Vue                           from "vue"

// functions
   import vue_sfc_to_html               from "@/classes/vue_sfc_to_html.js"

export default {

    name: "IlseComponents",

    props: {
        components: { type: Array, required: false },
        uniqueKey: { type: String, required: false }, // Avoid same :key to avoid DOM update errors in vue.js
    },

    components: {
        Component,
    },

    watch: {
        async components( list ) {
            let added = list[list.length - 1]

            /*
            setTimeout( () => {

                let main = document.getElementById( added.key )
                    printf( "main -> ", main )
                    let html = main.innerHTML
                    printf( "html -> ", html )
                    main.style = "display: none;"

                    // added.is_window = true
                    // this.components[ this.components.indexOf( added ) ].is_window = true

                    // printf( "added.id -> ", added.id )
                    // printf( "this.uniqueKey -> ", this.uniqueKey )
                    // let b = document.getElementById( this.uniqueKey + added.id )
                    // printf( "b -> ", b )
            }, 1000 )
            */

            /*
            if( added.mode === "frame" ) {

                let has_already = ilse.frames.indexOf( added ) !== -1
                printf( "has_already -> ", has_already )

                if( !has_already ) {

                    const frame = ilse.frame.create({
                        title: 'Links & Graph',
                        left: 200, top: 200, width: 320, height: 220,
                        movable: true,//Enable to be moved by mouse
                        resizable: true,//Enable to be resized by mouse
                        appearanceParam: {
                            border: { shadow: '2px 2px 10px  rgba(0, 0, 0, 0.5)', width: 0, radius: 6, },
                            titleBar: {
                                color: 'white',
                                background: '#4784d4',
                                leftMargin: 40,
                                height: 30,
                                fontSize: 14,
                                buttonWidth: 36,
                                buttonHeight: 16,
                                buttonColor: 'white',
                            },
                        },
                        // url: `app://${ilse.target_directories[0]}/signature-pad.html`,//URL to display in iframe
                        // url: `app://${ilse.target_directories[0]}/html-table.html`,//URL to display in iframe
                        // url: `app://${ilse.target_directories[0]}/signature-pad.html`,//URL to display in iframe
                        
                        // html: `<embed src="app://${ilse.target_directories[0]}/signature-pad.html" />`
                        html: `<embed src="app://${ilse.target_directories[0]}/SearchButton.html" data-prop-label="LLLL" />`

                        // html: test.$el.outerHTML
                        // html: '<div id="my_element" style="padding:10px;font-size:12px;color:darkgray;">Contents of window</div>'
                    });

                    ilse.frames.push( added )

                    frame.show()
                }
                */

                /*
                var test = new Vue({
                    ...Test,
                    parent: this,
                    propsData: { component: { file: "Mental Models" } }
                }).$mount()

                printf( "test -> ", test )

                printf( "test.$el -> ", test.$el )
                printf( "test.$el.outerHTML -> ", test.$el.outerHTML)

                let _test = await vue_sfc_to_html( "File.vue", { component: { file: "Mental Models" } }, this )
                printf( "test -> ", _test )

                const frame = ilse.frame.create({
                    title: 'Links & Graph',
                    left: 200, top: 200, width: 320, height: 220,
                    movable: true,//Enable to be moved by mouse
                    resizable: true,//Enable to be resized by mouse
                    appearanceParam: {
                        border: { shadow: '2px 2px 10px  rgba(0, 0, 0, 0.5)', width: 0, radius: 6, },
                        titleBar: {
                            color: 'white',
                            background: '#4784d4',
                            leftMargin: 40,
                            height: 30,
                            fontSize: 14,
                            buttonWidth: 36,
                            buttonHeight: 16,
                            buttonColor: 'white',
                        },
                    },
                    // url: `app://${ilse.target_directories[0]}/html-table.html`,//URL to display in iframe
                    // html: '<div id="my_element" style="padding:10px;font-size:12px;color:darkgray;">Contents of window</div>'
                    html: test.$el.outerHTML
                });

                frame.show()

            }
                */

        }
    },

    data() {
        return {
            ilse: ilse,
            components_key: "",
        }
    },

    methods: {

        toggle_left_menu() {
            ilse.is_left_sidebar_open = !ilse.is_left_sidebar_open
        },

        get_menu_component() {
            // let type = ilse.config.menu_component || "menu"
            // let c         = { 'id': 'menu', 'width': 1, 'is_on': true, 'type': type, 'props': {} }
            // let component = new ilse.classes.Component( c )
            let component = ilse.types.get( "menu" )
            return component
        },

        get_left_sidebar() {
            let c         = { 'id': 'left-sidebar', 'width': 12, 'is_on': true, 'type': 'left-sidebar', 'props': {} }
            let component = new ilse.classes.Component( c )
            return component
        },

        get_right_sidebar() {
            let component = ilse.types.get( "right-sidebar" )
            // let c         = { 'id': 'right-sidebar', 'width': 12, 'is_on': true, 'type': 'right-sidebar', 'props': {} }
            // let component = new ilse.classes.Component( c )
            return component
        },

        get_component_style( component ) {

            let normal_style = `flex: 1; flex-basis: ${component.width * 10}%; overflow: auto; max-height: 93vh; background: var( --background-color ); border-radius: var( --border-radius ); `; 
            let zen_mode     = `width: 50%; margin: 0 auto; overflow: auto; max-height: 93vh;  `
            if( ilse.is_zen ) return zen_mode;

            return normal_style

            // let style = `flex: 1; margin-left: 10px; height: 100%; flex-basis: ${component.width * 10}%; `
            // let resize_style = `height: 100%; width: 100%; resize: horizontal; overflow: auto; `

            // if( ilse.config.is_resize_mode_on ) {
                // return resize_style
            // } else {
                // return normal_style
            // }

        },

        get_menu() {

            let menu         = null
            let component

            if( !menu ) {

                component = ilse.types.get( "top-menu" )

            } else {
                component = ilse.types.get( "top-menu-embed" )

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

            }
            return component

        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
