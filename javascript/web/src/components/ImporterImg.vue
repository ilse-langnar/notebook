<template lang="pug" >
img.importer( v-if="is_on" src="@/assets/images/urgent.svg" title="Click to import" alt="Import" )
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

            ilse.electron.ipc.on( "focus", async () => {

                let string         = await ilse.clipboard.read()
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

            ilse.electron.ipc.on( "focus", () => {

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
            // this.repeat()
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
