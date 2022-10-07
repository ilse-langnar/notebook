<template lang="pug">
.right-sidebar

    img( :src="irequire.img('settings.svg')" style="width: 20px;" @click="is_config_open = !is_config_open" )

    .flex( v-if="is_config_open" style="height: 50px; margin: auto; " )
        .loop.fitem( v-for="( item, index ) in list" :key="index" style="margin: auto; " )
            img.is-pulled-right( :src="irequire.img('x.svg')" style="width: 10px; cursor: pointer;  " alt="Delete"  @click="list.splice(index, 1)" )
            input.input( v-model="item.type" style="background: transparent; border: 0 !important;" )
        img.is-pulled-right( :src="irequire.img('plus.svg')" style="width: 30px; cursor: pointer;  " alt="Add Component" @click="add_component" )
    
    // Components
    .flex
        .item( v-for="( chunk, index ) in get_chunks()" :key="index" )
            // .fitem( v-for="( component, component_index ) in chunk" :key="'component-index-' + component_index" style="width: 300px; height: 300px; overflow: auto; " )
            .fitem.home-component( v-for="( component, component_index ) in chunk" :key="'component-index-' + component_index" )
                // IlseComponent( v-if="component.type" :component="new ilse.classes.Component(component)" :options="{ hide_bullet: true }" )
                iComponent( v-if="component.type" :component="component" :options="{ hide_bullet: true }" )

</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse                             from "@/ilse.js"

// Messager
    import Messager                         from "@/classes/Messager.js"

// Components
    import iComponent                       from "@/components/iComponent.vue"

// functions
    import split_array_into_nth_chunks      from "@/classes/split_array_into_nth_chunks.js"

export default {

    name: "RightSidebar",

    components: {
        iComponent,
    },

    data() {
        return {
            ilse: ilse,
            number_of_columns: 1,
            is_config_open: false,
            list: [],
        }
    },

    watch: {

        list( list ) {
            ilse.config.right_sidebar = list
            ilse.config.save( false )
        }

    },

    methods: {

        add_component( list ) {
            let component = { id: Math.random().toString(), width: 12, is_on: true, type: "empty", props: {} }
            this.list.push( component )
        },

        get_chunks() {
            let copy = Array.from( this.list )
            let list = split_array_into_nth_chunks( copy, this.number_of_columns )
            return list
        },

        setup() {
            this.list = ilse.config.right_sidebar || [ { id: "8944871287849104", width: 12, is_on: true, type: "draw", props: {} } ]
        },

    },

    mounted() {
        setTimeout( () => { this.setup(); }, 1000 )
    },

}
</script>
<style scoped >

.clear {
    height: 50px;
    clear: both;
}

</style>
