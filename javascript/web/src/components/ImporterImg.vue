<template lang="pug" >
img.importer( v-if="is_on" src="@/assets/images/urgent.svg" :title="$t('click_to_import')" alt="Import" )
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

        open_importer_modal() {
            ilse.modals.open( "importer" )
        },

        repeat() {

            if( ilse.platform  !== "electron" ) return // Don't do anything for non-electron for now

            ilse.electron.ipc.on( "focus", async () => {

                let string
                try {
                    string         = await ilse.clipboard.read()
                } catch( e ) {}

                if( !string ) {
                    this.is_on = false
                    return
                }

                let is_importing   = string.indexOf("ilse-importer:") !== -1
                if( !is_importing ) {
                    this.is_on = false;
                    return
                }

                this.open_importer_modal()
            })

        },

        /*
        async check() {

            printf( "ilse.electron.is_focused -> ", ilse.electron.is_focused )

            let has_focus      = document.hasFocus()
            if( !has_focus ) {
                this.is_on = false
                return
            }

            // this.is_on = true

        },
        */

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

img.importer {
    cursor: pointer;
}

</style>
