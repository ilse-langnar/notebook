<template lang="pug" >
.components-wrapper( style="width: 100%;" )

    .components( style="display: flex; flex-direction: row;" :key="components_key" )

        iComponent( v-show="!ilse.is_left_sidebar_open && !ilse.is_zen" :component="get_menu_component()" :options="{hide_bullet: true }" style="width: 20%; overflow: auto; background: var( --secondary-background-color ); color: var( --secondary-text-color ); border-radius: var( --border-radius ); " )
        img( v-show="ilse.is_left_sidebar_open" :src="irequire.img('maximize.svg')" style="width: 20px; position: fixed; top: 1%; left: 5px; cursor: pointer; " @click="toggle_left_menu()" )

        .component( v-for="(component, component_index) in components" :key="uniqueKey + component.id"  :style="get_component_style(component)" :component="component" )
            // Don't render window nor modal.
            iComponent( :component="component" :id="component.key" )

        iComponent.right-sidebar( v-show="ilse.is_right_sidebar_open" :component="get_right_sidebar()" :options="{ hide_bullet: true }" :style="get_component_style(get_right_sidebar())" )

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
   import iComponent                    from "@/components/iComponent.vue"
   import Test                          from "@/components/Test.vue"
   import Vue                           from "vue"

// functions
   import vue_sfc_to_html               from "@/classes/vue_sfc_to_html.js"
   import set                           from "@/classes/set.js"

export default {

    name: "Components",

    props: {
        components: { type: Array, required: false },
        uniqueKey: { type: String, required: false }, // Avoid same :key to avoid DOM update errors in vue.js
    },

    components: {
        iComponent,
    },

    watch: {
        async components( list ) {
            let added = list[list.length - 1]
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
            set( ilse, "is_left_sidebar_open", !ilse.is_left_sidebar_open )
        },

        get_menu_component() {
            return ilse.types.get( "menu" )
        },

        get_right_sidebar() {
            return ilse.types.get( "right-sidebar" )
        },

        get_component_style( component ) {

            let normal_style = `flex: 1; flex-basis: ${component.width * 10}%; overflow: auto; max-height: 99vh; background: var( --background-color ); border-radius: var( --border-radius ); `; 

            return normal_style
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
