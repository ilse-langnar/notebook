<template lang="pug" >
.text-file
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    p {{component.props.name}}
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "TextFile",

    props: {
       component: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped >

</style>
