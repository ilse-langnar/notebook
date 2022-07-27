<template lang="pug" >
.write
    h1.centered {{ $t('write') }}

    .flex( style="flex-direction: row; " )
        .loop.fitem( v-for="( item, index ) in list" :key="index" style="margin: auto; " )
            .flex
                img.fitem( src="@/assets/images/x.svg" style="width: 10px; cursor: pointer; " :alt="$t('delete_item')" :title="$t('delete_item')" @click="list.splice( index, 1 )" )
                input.fitem.input( v-model="list[index]" style="width: 75%; border: 0; background: transparent; " )
                img.fitem( src="@/assets/images/check.svg" style="width: 15px; cursor: pointer; margin-right: 10px; " :alt="$t('select_item')" :title="$t('select_item')" @click="path = item" )
        br
    img.centered( src="@/assets/images/plus.svg" style="width: 30px; cursor: pointer;  " title="$t('add_component')" :alt="$t('add_component')" @click="add()" )

    h2.centered {{path}}
    .half.is-pulled-left( style="width: 50%; " )
        TextFile( v-if="path" :component="get_component(path)" :key="path" )
    .half.is-pulled-right( style="width: 50%; " )
        .markdown( v-html="markdown" style="height: 100vh; overflow: auto; " )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import TextFile                     from "@/components/TextFile.vue"

export default {

    name: "TopMenu",

    data() {
        return {
            ilse: ilse,
            path: "",
            markdown: "",
            list: [],
        }
    },

    watch: {

        async path( path ) {
            let text = await ilse.filesystem.file.get( `/second/${path}` )
            this.markdown = ilse.markdown.render( text )
        }

    },

    components: {
        TextFile,
    },

    methods: {

        async get_html() {
        },

        get_component( path ) {

            let component = {
                props: { name: `/second/${path}` }
            }
            return component
        },

        add() {
            this.list.push( "" )
        },

        setup() {
            if( !ilse.config.data.writer ) ilse.config.data.writer = []
            this.list = ilse.config.data.writer 
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

</style>
