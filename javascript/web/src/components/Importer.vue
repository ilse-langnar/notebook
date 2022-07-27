<template lang="pug" >
.impoter
    h1.centered Importer

    .loop( v-for="( item, index ) in list" :key="index" )
        p {{item}}

    br
    img.block.centered( src="@/assets/images/download.svg" :title="$t('importer')" alt="Import" @click="import_now" style="width: 40px; cursor: pointer;" )

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

            let copy = Array.from( this.list )
            copy.shift()

            copy.map( (string, index) => {
                ilse.notes.add( string, ilse.notes.length - 1, index === 0 ? 0 : 1 ) 
            })

            ilse.notes.save()
            ilse.clipboard.write("")
        },

        async set() {
            let string = await ilse.clipboard.read()
            this.list  = string.split("\n")
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
