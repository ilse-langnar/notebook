<template lang="pug" >
.keyboard-shortcuts
    .loop( v-for="( key, index ) in ilse.keyboard.keys" :key="index" )
        p Combo
        input.input( v-model="key.combo" )
        p Command
        input.input( v-model="key.command" )
        // p {{key.combo}}
        // p {{key.command}}
    button.button( @click="add_keyboard_shorctu()" ) Add

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "KeyboardShortcut",

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        add_keyboard_shorctu() {
            this.ilse.keyboard.add( "ctrl+space l", "void" )
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

.keyboard-shortcuts .loop {
    border: 1px solid #000;
    border-radius: 5px;
    margin-bottom: 4px;
    padding: 3px;
}

</style>
