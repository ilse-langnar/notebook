<template lang="pug">
.first-brain-config
    img.is-pulled-left( src="@/assets/images/arrow-narrow-left.svg"   title="Previous"  @click="decrease_pointer()" )
    img.is-pulled-right( src="@/assets/images/arrow-narrow-right.svg"  title="Next"     @click="increase_pointer()" )
    br
    p.centered {{pointer}} / {{chunks.length}}
    .loop( v-for="(chunk, index) in chunks[pointer]" :key="index" )
        p {{chunk}} 
</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "FirstBrainConfig",

    data() {
        return {
            ilse: ilse,
            pointer: 0,
            chunks: []
        }
    },

    methods: {

        increase_pointer() {
            if( this.pointer >= this.chunks.length ) return
            this.pointer++
        },

        decrease_pointer() {
            if( this.pointer === 0 ) return
            this.pointer--
        },

        // ---------------------------------- Setup -------------------------- //
        setup() {
            let queue       = Array.from(this.ilse.brains.first.queue)
            let chunks      = this.ilse.utils.split_array_into_nth_legnth( queue, 100 )
                this.chunks     = chunks
        },
        // ---------------------------------- Setup -------------------------- //

    },

    mounted() {
        this.setup();
    },

}
</script>
<style scoped>

.first-brain-config img {
    width: 40px;
}

</style>
