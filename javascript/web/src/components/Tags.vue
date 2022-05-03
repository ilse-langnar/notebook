<template lang="pug" >
.tags

    .space( style="height: 20px;" )
    p.is-size-2.centered Tags

    .is-pulled-left.loop( v-for="( tag_name, index ) in Object.keys(ilse.tags.tags)" :key="index" style="width: 300px; display: inline-block;  border: 1px solid #aaa; border-radius: 10px; margin-left: 5px; margin-bottom: 10px; padding: 5px; " @click="open_tag(tag_name)" )
        br
        p.is-size-4 {{tag_name}}
        p  {{ilse.tags.tags[tag_name].length}}
        br
        // .div( v-for="(tag, i) in ilse.tags.tags[tag_name]" :key="'i' + i" )
            p {{tag}}

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Tags",

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        open_tag() { },
        setup() { },

    },

    mounted() {
        this.setup();
    }

}
</script>
