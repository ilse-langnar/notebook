<template lang="pug" >
.knowledge-tree 

    .flex
        p.fitem {{ilse.brains.first.queue.length}} Items
        p.fitem {{get_tags().length}} Tags 
        p.fitem {{ilse.brains.first.query('#').length}} Tagged
        p.fitem {{Math.round(ilse.brains.first.query('#').length / ilse.brains.first.queue.length * 100)}}%


    .loop.flex( v-for="(node, index) in ilse.brains.first.get_tags()" :key="index" :style="get_style(node)" )
        details
            summary( draggable @drop.prevent="on_drop($event, node)" @dragenter.prevent @dragover.prevent :title="get_items(node).length + '(' + Math.round(get_items(node).length / ilse.brains.first.queue.length * 100) + '%)' " ) {{node}}
                input.input( v-model.number="ilse.brains.first.priorities.priorities[node]" type="number"  style="width: 35px; height: 5px; margin-top: 2px;  " @change="on_priority_change" )

            .loop.query( v-for="( item, item_query ) in get_items(node)" :key=" 'query-' + item_query" :title="item" ) {{item}}
                // p( :title="item" ) {{item}}

    img( :src="irequire.img('plus.svg')" :title="$t('add')" @click="add(tree[0])" style="width: 50px; display: block; margin: 0 auto; " )

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

            tree: [ { name: "Name", item: false, depth: 1, } ],
            items_with_tags: 0,
            caches: {
                tags: []
            },
            can_save_priority: true,
        }
    },

    methods: {

        on_priority_change() {

            if( this.can_save_priority ) {
                this.can_save_priority = false
                ilse.brains.first.priorities.save()
                setTimeout( () => { this.can_save_priority = true }, 1000 )
            }
            
        },

        get_tag_priority( name ) {
            return ilse.brains.first.priorities.priorities[name]
        },

        get_tags( tag_name ) {

            // FEATURE: CACHE
            if( this.caches.tags ) {

                if( tag_name ) {
                    return this.caches.tags[tag_name]
                } else {
                    let list   = Object.keys( this.caches.tags )
                    let sorted = list.sort( (a,b) => {
                        return this.caches.tags[b].length - this.caches.tags[a].length
                    })
                    return sorted
                }

            }

            let queue       = this.ilse.brains.first.queue
            let chunks, name, seen, interest, tags
            let obj         = []
            let items_with_tags = 0

            for( const item of queue ) {
                chunks      = item.split( "/" )
                name        = chunks[0]
                seen        = chunks[1]
                interest    = chunks[2]
                    interest    = Number( interest )
                tags      = chunks[3]

                if( !tags ) continue
                if( !tags[0] ) continue
                if( tags[0] !== "#" ) continue
                items_with_tags++

                let has_multiple =  tags.indexOf(",") !== -1
                if( has_multiple ) {

                    for( const chunk of tags.split(",") ) {
                        if( !obj[chunk] ) obj[chunk] = []
                        obj[chunk].push( item )
                    }

                } else {
                    if( !obj[tags] ) obj[tags] = []
                    obj[tags].push(item)
                }
            }

            if( !this.caches.tags ) this.caches.tags = obj

            // TODO: REMOVE: IMPURE: 
            this.items_with_tags = items_with_tags

            // printf( "tag_name -> ", tag_name )
            // printf( "obj -> ", obj )
            // printf( "obj[tag_name] -> ", obj[tag_name] )

            if( tag_name ) {
                return obj[tag_name]
            } else {
                let list   = Object.keys(obj)
                let sorted = list.sort( (a,b) => {
                    return obj[b].length - obj[a].length
                })
                return sorted
            }
        },

        get_items( node ) {

            // FEATURE: use cache
                if( ilse.cache.get(node) ) return ilse.cache.get(node)
                // if( this.cache[node] ) return this.cache[node]

            let result = ilse.brains.first.query( node )

            // FEATURE: set cache
                // this.cache[node] = result
                ilse.cache.set( node, result )

            return result
        },

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

.knowledge-tree details {
    background: var( --background-color );
    color: var( --text-color );
}

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

.knowledge-tree .fitem {
    margin: 0 auto;
}
</style>
