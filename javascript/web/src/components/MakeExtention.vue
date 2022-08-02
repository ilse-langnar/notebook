<template lang="pug" >
.make-extention
    h1.centered Make Extention
    textarea.centered( v-model="extention" )
    br
    button.button.slick-button.centered( @click="add()" style="display: block;" ) Make

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "MakeExtention",

    data() {
        return {
            ilse: ilse,
            extention: "",
        }
    },

    methods: {

        add() {
            printf( "MakeExtention -> " )
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

textarea {
    width: 70%;
    display: block;
    margin: 0 auto;
    resize: none;
    height: 200px;
    text-align: left; 
    opacity: 1;
    background: var( --background-color );
    color: var( --text-color );
}

textarea:focus {
    outline: none;
}

</style>
