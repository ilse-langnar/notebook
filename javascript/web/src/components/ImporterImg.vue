<template lang="pug" >
img.impoter( v-if="is_on" src="@/assets/images/urgent.svg" title="Click to import" alt="Import" @click="open_impoter_modal" )
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "ImporterImg",

    data() {
        return {
            ilse: ilse,
            is_on: false,
        }
    },

    methods: {

        open_impoter_modal() {
            ilse.modals.open( "impoter" )
        },

        repeat() {
            setInterval( () => {
                this.check()
            }, 500 )
        },

        async check() {

            let has_focus      = document.hasFocus()
                if( !has_focus ) return

            let string         = await ilse.clipboard.read()
                if( !string ) return

            let is_importing   = string.indexOf("ilse-impoter:") 
                if( !is_importing ) return

            this.is_on = true

        },

        setup() {
            this.repeat()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

img.impoter {
    cursor: pointer;
}

</style>
