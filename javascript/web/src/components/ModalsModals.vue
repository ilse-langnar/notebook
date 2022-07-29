<template lang="pug" >
.modals-modals
    p modals-modals
    .loop( v-for="( item, index ) in ilse.modals.modals" :key="index" )
        p {{item.name}}
        // p {{item.component["img"]}}
        // p {{item}}
        // p {{item.img}}
        // p {{item.component}}
        // img( :src="item.component.img" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "ModalsModals",

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
<style>

</style>
