<template lang="pug" >
.gene( v-html="get_html()" )
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// const dna = window.dna ? window.dna : { on: ()=>{}, emit: ()=>{}, example: ()=>{}, export: ()=>{}, import: ()=>{}, server: () => {} }

// Ilse
    import ilse                         from "@/ilse.js"

// functions
    import string_to_html               from "@/classes/string_to_html.js"

export default {

    name: "Gene",

    props: {
        component: { type: String, required: true },
        payload: { type: Object, required: false },
    },

    /*
    watch: {

        payload: {
            immediate: true,
            handler( payload ) {
                printf( "GENE.vUE AAAAAAAAAAAAAAAAAAAAAAAAA -> payload -> ", payload )
                window.dna.emit( this.component, payload )
            }
        },

    },
    */

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        get_html() {

            let string =  require(`@/components/${this.component}`).default
            return string

            /*
            let _this  = this
            let string =  require(`@/components/${this.component}`).default
            let html   = string_to_html( string )
            let scripts= html.getElementsByTagName( "script" )
            let list   = [...scripts]

            window.dna.on( this.component.replace(".html", ""), data => {
                printf( "Gene.vue -> dna.on -> this.component -> this.component ", this.component )
                printf( "Gene.vue -> dna.on -> this.component -> this.component ", this.component.replace(".", "") )
                printf( "Gene.vue -> dna.on -> this.component -> data ", data )
                let normalized = this.component.replace(".html", "")
                printf( ">> normalized -> ", normalized )
                _this.$emit( normalized, data )
            })

            list.map( item => { eval( item.innerHTML ) })

            // dna.emit( this.component, this.payload )

            return string
            */
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

.html {
    display: flex;
    /*box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;*/
}

</style>
