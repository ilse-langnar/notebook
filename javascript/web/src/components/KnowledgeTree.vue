<template lang="pug" >
.knowledge-tree 
    p.is-size-1 Knowledge Tree


    .space

    // .loop( v-for="(node, index) in tree" :key="index" :style="get_style(index)" )
        p {{node}}
        img( src="@/assets/images/plus.svg" title="Add" @click="add(index)" )


    .loop.flex( v-for="(node, index) in tree" :key="index" :style="get_style(node)" )
        // span( contentEditable @keydown.enter="on_input_blur(node)" ) {{node.name}}
        // button.button( @click="set_items(node)" ) Set

        input.is-pulled-left.is-size-7.leaf( v-if="!node.item" v-model="node.name" style="width: 97%;" @blur="on_input_blur(node)" @keydown.enter="set_items(node)" )
        span.item( v-if="node.item" ) {{node.name}}

        img.is-pulled-left( v-if="!node.item" src="@/assets/images/plus.svg" title="Add" @click="add_child(node)" style="width:20px; " )
        img.is-pulled-left( v-if="!node.item" src="@/assets/images/x.svg" title="Add" @click="remove_node(node)" style="width:20px; " )

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

            let result = this.brains.first.query( node.name )
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

        test() {
            let result = this.brains.first.query( "#german" )
            printf( "result -> ", result )
        },

        get_style( node ) {
            let style = `padding: 0; margin: 0; margin-left: ${node.depth*10}px; `
            if( !node.item ) style += ";color: red;"
            return style
        },

        /*
        add( index ) {


            if( index || index === 0 ) {
                this.tree[index].push( "item-2" )
                return
            }

            if( !index ) this.tree.push(["item-1"])

        },
        */

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
            printf( "set_all_nodes -> list -> ", list )
            for( const node of list ) {
                printf( "node -> ", node )
                if( !node.item ) this.set_items( node )
            }

        },

        setup() {

            if( ilse.config.knowledge_tree ) {
                this.tree = ilse.config.knowledge_tree
                this.set_all_nodes()
            }

        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.leaf {
    width: 53px;
    border: 1px solid var( --text-color );
    border-radius: 5px;
    color: var( --text-color );
    background: var( --background-color );
    padding: 3px;
    margin-bottom: 3px;
}

span.item {
    margin-bottom: 10px;
}

</style>
