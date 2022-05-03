<template lang="pug" >
.dialogs
    Info
    Confirm
    Input
    List

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Dialogs
    import Info                        from "@/components/InfoDialog.vue"
    import Confirm                     from "@/components/ConfirmDialog.vue"
    import Input                       from "@/components/InputDialog.vue"
    import List                        from "@/components/ListDialog.vue"

export default {

    name: "Dialogs",

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        Info,
        Confirm,
        Input,
        List,
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
<style>
</style>
