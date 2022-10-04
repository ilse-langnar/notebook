<template lang="pug" >
.create-app
    h1.centered Create App

    .flex
        .options
            p A 
            p B
        textarea.flexi.app-editor( v-model="text" style="resize: none;" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// const
    import APP_TEMPLATE                 from "@/classes/APP_TEMPLATE.js"

export default {

    name: "CreateApp",

    data() {
        return {
            ilse: ilse,
            text: APP_TEMPLATE,
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

textarea.app-editor {
    resize: none;
}

.options {
    flex-basis: 20%;
}

.create-app {
    border: 1px solid #000;
    overflow: hidden;
}

</style>
