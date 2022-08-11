<template lang="pug">
.debugger 
    p Lorem 
</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Debugger",

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
    },

}
</script>
<style scoped >

</style>
