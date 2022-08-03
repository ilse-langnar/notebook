<template lang="pug" >
.components-wrapper

    .components( style="display: flex; flex-direction: row;" :key="components_key" )

        Component.left-sidebar( v-show="ilse.is_left_sidebar_open" :component="get_left_sidebar()" :options="{ hide_bullet: true }" :style="get_component_style(get_left_sidebar())" )

        .component( v-show="components.length && component.is_on" v-for="(component, component_index) in components" :key="uniqueKey + component.id"  :style="get_component_style(component)" :component="component" )
            Component( :component="component" :style="get_component_style_2()" )

        Component.right-sidebar( v-show="ilse.is_right_sidebar_open" :component="get_right_sidebar()" :options="{ hide_bullet: true }" :style="get_component_style(get_right_sidebar())" )

    .no-components( v-if="!components.length" style="flex-direction: column; height: 89vh; overflow: hidden !important; " )
        .centered( style="" )
            h1.is-size-1 {{ $t('no_components') }}
            img( src="@/assets/logo.svg" style="width: 20%;" )

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

export default {

    name: "IlseComponents",

    props: {
        components: { type: Array, required: false },
        uniqueKey: { type: String, required: false }, // Avoid same :key to avoid DOM update errors in vue.js
    },

    components: {
        Component,
    },

    data() {
        return {
            ilse: ilse,
            components_key: "",
        }
    },

    methods: {

        get_left_sidebar() {
            let c         = { 'id': 'left-sidebar', 'width': 12, 'is_on': true, 'type': 'left-sidebar', 'props': {} }
            let component = new ilse.classes.Component( c )
            return component
        },

        get_right_sidebar() {
            let c         = { 'id': 'right-sidebar', 'width': 12, 'is_on': true, 'type': 'right-sidebar', 'props': {} }
            printf( "right -> c- > ", c )
            let component = new ilse.classes.Component( c )
            return component
        },

        get_component_style_2() {
            let style       = ``

            if( ilse.is_zen ) style       += `width: 50%; margin: 0 auto;`

            return style
        },

        get_component_style( component ) {
            // let style = `flex: 1; margin-left: 10px; height: 100%; flex-basis: ${component.width * 10}%; `

            let normal_style = `flex: 1; height: 100%; flex-basis: ${component.width * 10}%; `
            let resize_style = `height: 100%; width: 100%; resize: horizontal; overflow: auto; `

            if( ilse.config.is_resize_mode_on ) {
                return resize_style
            } else {
                return normal_style
            }

        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
