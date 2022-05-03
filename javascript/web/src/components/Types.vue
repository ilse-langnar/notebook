<template lang="pug" >
.types
    p.is-size-1.centered Types
    // button.button.slick-button( @click="close" ) Close
    br

    .loop( v-for=" ( type, index ) in ilse.types.types" :key="index" style="border: 1px solid #000; float: left; margin-left: 10px; padding: 14px; margin-bottom: 8px; border-radius: 10px; width: 32%"  )
        p.is-size-4.centered {{type.name}} 
        img.img( :src="type.img" style="display: block; margin: 0 auto; width: 40px;" )
        button.slick-button( @click="select(type)" ) Select

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Utilty
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Types",

    data() {
        return {
            ilse: ilse,
        }
    },

    props: {
        payload: { type: Object, required: false }, // Avoid same :key to avoid DOM update errors in vue.js
    },

    methods: {

        close() {
            ilse.modals.close()
        },

        select( type ) {
            this.payload.component.type  = type.id
            this.payload.component.props = type.props
            this.close()
        },

        get_img( img ) {
            let url = require( `@/assets/images/${img}` )
            return url
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

</style>
