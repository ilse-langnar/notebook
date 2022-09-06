<template lang="pug" >
.file( :key="key" )

    .centered
        input.input( v-model="file" @keydown.enter="on_input_keydown_enter" )

    .centered
        img( v-if="!ilse.config.favorites || !(ilse.config.favorites.indexOf(file) !== -1)" :src="irequire.img('star.svg')" style="width: 20px; cursor: pointer; " @click="toggle_favorite(file)" :title="$t('favorite')" )
        img( v-if="ilse.config.favorites && ilse.config.favorites.indexOf(file) !== -1" :src="irequire.img('star-off.svg')" style="width: 20px; cursor: pointer; " @click="toggle_favorite(file)" :title="$t('unfavorite')" )

    br

    details#graph-details
        summary Graph( {{get_links(file).length}} )
        Graph.flexi( v-if="is_graph_on" :component="{ props: { file: file + '.md' } }" )

    details
        summary Media( {{get_links(file).filter( e=> e.content.indexOf("![[") !== -1 ).length}} )
        .loop( v-for="( item, index ) in get_links(file)" :key="index" )
            .render( v-if="item.content.indexOf('![[') !== -1" )
                Notes( :note="item" )

    .space
    References( v-if="file" :file="file" )
    .space

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Notes                        from "@/components/Notes.vue"
    import References                   from "@/components/References.vue"
    import Graph                        from "@/components/Graph.vue"

export default {

    name: "File",

    props: {
       // path: { type: String, required: false, },
       component: { type: Object, required: false, },
    },

    data() {
        return {
            ilse: ilse,
            file: this.component.props.file || "",
            is_graph_on: false,
            key: 0,
        }
    },

    components: {
        Notes,
        References,
        Graph,
    },

    watch: {

        file( file ) {
            this.component.props.file = file
        }
    },

    methods: {

        on_input_keydown_enter() {
            this.key = Math.random()
        },

        get_embed( content, file ) {
            let list = ilse.utils.extract_tokens_by_delimiters( content, /\!?\[\[/, /\]\]/ ).filter( e => e.indexOf(file) === -1)
            return list
        },

        get_links( file ) {

            let list  = ilse.links.links[file + ".md" ]
            let notes = []
            let result

            list.map( item => {
                result = ilse.notes.query(item)[0]
                notes.push( result )
            })

            return notes
        },

        toggle_favorite( file ) {

            let has_favorites = ilse.config.favorites 
                if( !has_favorites ) ilse.config.favorites = []

            let has_file_already = ilse.config.favorites.indexOf( file ) !== -1

            if( has_file_already ) {
                let index = ilse.config.favorites.indexOf( file )
                ilse.config.favorites.splice( index, 1 )
            } else {
                ilse.config.favorites.push( file )
            }

            ilse.config.save()
        },

        listen_to_details() {

            var details = document.querySelector("#graph-details")
                printf( "details -> ", details )

            let _this = this
            details.addEventListener( "toggle", function() {
                _this.is_graph_on = !_this.is_graph_on 
                // if( this.is_graph_on ) this.is_graph_on = false
                // if( !this.is_graph_on ) this.is_graph_on = true
                // printf( "this.is_graph_on -> ", this.is_graph_on )
                // details.firstChild.textContent = "done"
            })
        },

        setup() {
            this.listen_to_details()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.file {
    overflow: hidden;
}

.file .centered .input {
    background: transparent;
    border: 0 !important;
    border-bottom: 1px solid var( --text-color ) !important;
    border-radius: 0px;
}

</style>
