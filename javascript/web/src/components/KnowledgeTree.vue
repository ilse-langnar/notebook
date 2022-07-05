<template lang="pug" >
.knowledge-tree 

    .loop.flex( v-for="(node, index) in ilse.brains.first.get_tags()" :key="index" :style="get_style(node)" )
        details
            summary( draggable @drop.prevent="on_drop($event, node)" @dragenter.prevent @dragover.prevent) {{node}}
            .loop.query( v-for="( item, item_query ) in ilse.brains.first.query( node )" :key=" 'query-' + item_query" )
                p( :title="item" ) {{item}}

    img( src="@/assets/images/plus.svg" title="Add" @click="add(tree[0])" style="width: 50px; display: block; margin: 0 auto; " )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

export default {

    name: "KnowledgeTree",

    components: {
    },

    data() {
        return {
            ilse: ilse,
            // tree: [],
            order: {
                "#german": "#languages",
                "#linear-algebrea": "#math",
            },

            tree: [
                {
                    name: "Name",
                    item: false,
                    depth: 1,
                }
            ],

        }
    },

    methods: {

        on_dragleave( event, node ) {
            event.target.style = ""
        },

        on_dragover( event, node ) {
            event.target.style = "border: 1px solid #000;"
        },

        on_drop( ...payload ) {
            this.add_child_item( payload[0], payload[1] )
        },

        add_child_item( event, node ) {
            printf( "KnowledgeTree -> add_child_item -> event -> ", event )
            printf( "KnowledgeTree -> add_child_item -> node -> ", node )
            printf( "LÇLLLLLLLL " )
        },

        remove_node( node ) {
            let index = this.tree.indexOf( node )
            this.tree.splice( index, 1 )
            // TODO: Delete every child too.
        },

        on_input_blur( node ) {
            this.set_items( node )
            this.save()
        },

        set_items( node ) {

            if( node.name === "#" ) return
            if( node.name.indexOf("#") === -1 ) return

            let result = this.ilse.brains.first.query( node.name )
            let index  = this.tree.indexOf(node)
            let copy   = node.depth
                copy       += 1

            for( const item of result ) {

                this.tree.splice( ++index, 0, {
                    name: item,
                    item: true,
                    depth: copy
                })

            }

        },

        get_style( node ) {
            let style = `padding: 0; margin: 0; margin-left: ${node.depth*10}px; `
            if( !node.item ) style += ";color: #000;"
            return style
        },

        add( node ) {

            this.tree.push({
                name: "Name",
                item: false,
                depth: node.depth,
            })

            this.save()

        },

        add_child( node ) {

            let index    = this.tree.indexOf(node)

            let copy     = node.depth

            let new_node = {
                name:  node.name,
                item: false,
                depth: ++copy,
            }

            printf( "before -> this.tree.length -> ", this.tree.length )
            this.tree.splice( ++index, 0, new_node )
            printf( "after -> this.tree.length -> ", this.tree.length )

            this.save()

        },

        save() {

            let save_me = []
            this.tree.map( ( leaf, index ) => {
                if( !leaf.item ) save_me.push( leaf )
            })

            this.ilse.config.knowledge_tree = save_me
            this.ilse.config.save()
        },

        set_all_nodes() {

            let list = this.tree
            for( const node of list ) {
                if( !node.item ) this.set_items( node )
            }

        },

        setup() {

            if( ilse.config.knowledge_tree ) {
                this.tree = ilse.config.knowledge_tree
                this.set_all_nodes()
            } else {
                ilse.config.knowledge_tree = []
                ilse.config.save()
            }

        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.knowledge-tree .loop.query {
    width: 20px; 
    height: 20px;
    background: #fff;
    color: #fff;
    overflow: hidden;
    float: left; 
    margin-left: 1px;
    margin-bottom: 1px;
    border: 1px solid #000;
    cursor: pointer;
    border-radius: var( --border-radius );
}

.knowledge-tree details summary {
    cursor: pointer;
}

</style>
