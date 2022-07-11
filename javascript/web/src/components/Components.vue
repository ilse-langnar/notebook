<template lang="pug" >
.components-wrapper
    .components( style="display: flex; flex-direction: row;" :key="components_key" )

        .component( v-show="components.length && component.is_on" v-for="(component, component_index) in components" :key="uniqueKey + component.id"  :style="get_component_style(component)" :component="component" )
            Component( :component="component" )

    .no-components( v-if="!components.length" style="flex-direction: column; " )
        .centered( style="" )
            h1.is-size-1.centered No Components ):
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

    name: "Components",

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

        get_component_style( component ) {
            // let style = `flex: 1; margin-left: 10px; height: 100%; flex-basis: ${component.width * 10}%; `
            let style = `flex: 1; height: 100%; flex-basis: ${component.width * 10}%; `

            return style
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
