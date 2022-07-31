<template lang="pug" >
.draw
    VueSignatureCanvas( ref="handWrite" :canvasProps="{class: 'sig-canvas'}" style="border: 1px solid var( --text-color ); " )
    button.button.slick-button.centered( style="display: block; " @click="save()" ) {{ $t('save') }}
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Libs
    import VueSignatureCanvas           from "vue-signature-canvas";

export default {

    name: "Draw",

    props: {
       component: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        VueSignatureCanvas,
    },

    methods: {

        save() {
            // printf( "image -> ", image )
            // let normalized = image.replace("data:image/png;base64,", "")
            // printf( "normalized -> ", normalized )
            // let blob       = ilse.utils.base64_2_blob( normalized, "image/png" )

            let el         = this.$refs.handWrite
            let image      = el.toDataURL()
            let name       = `image-${ilse.utils.get_unique_date_id()}.png`
            let buffer     = ilse.utils.decode_base64_image(image)

            ilse.filesystem.file.write.async( `second/${name}`, buffer.data )
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

.sig-canvas {
    display: block;
    margin: 0 auto; 
    width: 100%;
    height: 100vh;
    background-color: rgba(244,244,244,0);
    /*position: fixed;*/
    z-index: 9;
}

</style>
