<template lang="pug" >
.interest-repetition
    p.is-size-1( style="text-align: center;" ) Interest Repetition

    .scan( style="display: block; margin: 0 auto; width: 50px;" )
        .flex
            img( src="@/assets/images/barcode.svg" alt="" title="Scan" style="margin-right: 20px; cursor: pointer;" )
            span {{items.length}}

    br
    br

    p 1
    iframe( src="http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf" style="width: 100%;" )
    p 2
    p get_book_url {{get_book_url()}}
    // iframe( :src="get_book_url()" style="width: 100%;" )
    p 3

    // object( :data="get_book_url()" type="application/pdf" )
        // embed( :src="get_book_url()" type="application/pdf")
    p 4

    // .loop( v-for="( item, index ) in items" :key="index" style="padding: 4px;" )
        p.is-size-6 {{item}}


</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "InterestRepetition",

    data() {
        return {
            ilse: ilse,
            items: [ ],
        }
    },

    methods: {

        get() {
            let url         = "RAC.pdf"
            let target_dir  = ilse.target_directories[0]
            return `atom://${target_dir}/${url}`

        },

        get_book_url() {
            let url         = "RAC.pdf"
            let target_dir  = ilse.target_directories[0]
            let final       = `atom://${target_dir}/${url}`

            return final
        },

        async init() {
            let q    = await ilse.filesystem.file.get( "q" )
            let list = await ilse.filesystem.dir.list( "irq" )
                this.items = list
        },

        setup() {
            this.init()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.interest-repetition {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
}

</style>
