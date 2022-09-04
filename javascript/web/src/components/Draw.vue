<template lang="pug" >
.draw
    VueSignatureCanvas( ref="handWrite" :canvasProps="{class: 'sig-canvas'}" style="border: 1px solid var( --text-color ); border-radius: var( --border-radius ); " width="650px" height="500px")
    button.button.slick-button.centered( style="display: block; " @click="save()" ) {{ $t('save') }}
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;
const dna = window.dna ? window.dna : { on: ()=>{}, emit: ()=>{}, example: ()=>{}, export: ()=>{}, import: ()=>{} }

// Libs
    import VueSignatureCanvas           from "vue-signature-canvas";

export default {

    name: "Draw",

    props: {
       component: { type: Object, required: false, },
    },

    data() {
        return {
        }
    },

    components: {
        VueSignatureCanvas,
    },

    methods: {

        /*
        async save() {
            let name       = `image-${ilse.utils.get_unique_date_id()}.png`
            let buffer     = ilse.utils.decode_base64_image(image)

            ilse.filesystem.file.write.async( `second/${name}`, buffer.data )
            await ilse.filesystem.file.write.async( `second/${name}`, buffer.data )

            let content    = `![[${name}]]`

            ilse.notes.add( content )
            ilse.notification.send( "Added", `Added Picture: ![[${name}]]` )
        },


        save() {
            let el         = this.$refs.handWrite
            let image      = el.toDataURL()
            let name       = `image-${ilse.utils.get_unique_date_id()}.png`
            let buffer     = ilse.utils.decode_base64_image(image)

            ilse.filesystem.file.write.async( `second/${name}`, buffer.data )

            let content    = `![[${name}]]`
                ilse.notes.add( content )
            ilse.notification.send( "Added", `Added Picture: ![[${name}]]` )

        },
        */

        decode_base64_image( dataString ) {
            var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};
            if (matches.length !== 3) return new Error('Invalid input string');

            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');

            return response;
        },

        save() {
            let el         = this.$refs.handWrite
            let image      = el.toDataURL()
            let buffer     = this.decode_base64_image(image)

            dna.emit( "save", buffer )
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
    background-color: rgba(244,244,244,0);
    /*position: fixed;*/
    z-index: 9;
}

</style>
