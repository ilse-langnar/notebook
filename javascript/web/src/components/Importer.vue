<template lang="pug" >
.impoter( v-if="list[0]" )
    h1.centered Importer

    .import-theme( v-if="list[0].indexOf('theme') " )
        h3 Import Theme: {{list[0].split(":")[2]}}

    br

    .loop( v-for="( item, index ) in list" :key="index" )
        code {{item}}

    br
    img.block.centered( :src="irequire.img('download.svg')" :title="$t('importer')" alt="Import" @click="import_now" style="width: 40px; cursor: pointer;" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Importer",

    data() {
        return {
            ilse: ilse,
            list: [],
        }
    },

    methods: {

        import_now() {

            let copy          = Array.from( this.list )
            let name          = copy.shift().split(":")[2]

            ilse.notes.add_list( copy )

            ilse.notes.save()
            ilse.modals.close()
            ilse.clipboard.write("")
            ilse.notification.send( "Imported", `Imported new theme: ${name}` )
        },

        async set() {
            let string = await ilse.clipboard.read()
            this.list  = string.split("\n")
            printf( "this.list -> ", this.list )
        },

        setup() {
            this.set()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.block {
    display: block;
}

</style>
