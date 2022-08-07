<template lang="pug">
.left-sidebar

    // .div( style="background: #fff; border-radius: 10px; border: 1px solid transparent; width: 30px; padding: 3px;  " )
    img( :src="irequire.img('settings.svg')" style="width: 20px;" @click="is_config_open = !is_config_open" )

    .flex( v-if="is_config_open" style="height: 50px; margin: auto; " )
        .loop.fitem( v-for="( item, index ) in list" :key="index" style="margin: auto; " )
            img.is-pulled-right( :src="irequire.img('x.svg')" style="width: 10px; cursor: pointer;  " alt="Delete"  @click="list.splice(index, 1)" )
            input.input( v-model="item.type" style="background: transparent; border: 0 !important;" )
        img.is-pulled-right( :src="irequire.img('plus.svg')" style="width: 30px; cursor: pointer;  " alt="Add Component" @click="add_component" )
    
    // Components
    .flex
        .item( v-for="( chunk, index ) in get_chunks()" :key="index" )
            .fitem.home-component( v-for="( component, component_index ) in chunk" :key="'component-index-' + component_index" )
                IlseComponent( v-if="component.type" :component="new ilse.classes.Component(component)" :options="{ hide_bullet: true }" )

</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import IlseComponent                    from "@/components/Component.vue"

export default {

    name: "LeftSidebar",

    components: {
        IlseComponent,
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
            ilse.config.left_sidebar = list
            ilse.config.save()
        }

    },

    methods: {

        add_component( list ) {
            let component = { id: Math.random().toString(), width: 12, is_on: true, type: "empty", props: {} }
            this.list.push( component )
        },

        get_chunks() {
            let copy = Array.from( this.list )
            let list = ilse.utils.split_array_into_nth_legnth( copy, this.number_of_columns )
            return list
        },

        setup() {
            this.list = ilse.config.left_sidebar || [ { id: Math.random().toString().replace("0.", ""), width: 12, is_on: true, type: "random-note", props: {} } ]

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
