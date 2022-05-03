<template lang="pug" >
// .empty( style="display: flex;" )
.empty

    p.is-light.has-text-centered.is-size-4() Select

    .loop( v-for="( type, index ) in ilse.types.types" :key="index" style="margin: 1em; width: 20%; height: 150px; border: 1px solid rgb(167 167 167); float: left; margin-left: 10px; border-radius: 10px; overflow: hidden; position: relative;" )
        .wrapper( style="display: flex; margin-top: 5px;" )
            img( :src="type.img" style="display: block; width: 30px; " )
            p.is-light.has-text-centered.is-size-6( style="margin: 0 auto;" ) {{type.name}}

        button.slick-button( @click="select(type)" style="position: absolute; bottom: -10px; left: 50%; transform: translate( -50%, -50% );" ) Select

    // .loop( v-for="( type, index ) in ilse.types.types" :key="index" style="margin: 1em; width: 20%; height: 150px; border: 1px solid rgb(167 167 167); float: left; margin-left: 10px; border-radius: 10px; overflow: hidden;" )
        img( :src="type.img" style="display: block; width: 30px; margin: 0 auto;" )
        button.slick-button( @click="select(type)" ) Select
        p.is-light.has-text-centered.is-size-6 {{type.name}}

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Empty",
    props: {
        component: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        select( type ) {
            printf( "this.component -> ", this.component )
            printf( "this.component.type -> ", this.component.type )
            this.component.type = type.id
            printf( "this.component.type -> ", this.component.type )
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
