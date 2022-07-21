<template lang="pug" >
.impoter
    h1.centered Importer

    .loop( v-for="( item, index ) in list" :key="index" )
        p {{item}}

    br
    img.block.centered( src="@/assets/images/download.svg" title="Import" alt="Import" @click="import_now" style="width: 40px; cursor: pointer;" )

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
            let note
            printf( "copy -> ", copy )
            copy.shift()

            copy.map( (string, index) => {

                if( index === 0 ) {
                    ilse.notes.add( string )
                } else {
                    ilse.notes.add( string, ilse.notes.length - 1, 1 )
                }

            })

            // ilse.notes.save()
        },

        async set() {
            let string = await ilse.clipboard.read()
            this.list  = string.split("\n")
        },

        setup() {

            ilse.electron.ipc.on( "focused", (event, payload) => {
                printf( "Importer -> event -> ", event )
                printf( "Importer -> payload -> ", payload )
            })

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
