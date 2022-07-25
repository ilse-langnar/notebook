<template lang="pug">
.home-page

    .flex( style="height: 50px; margin: auto; " )
        .loop.fitem( v-for="( item, index ) in list" :key="index" style="margin: auto; " )
            img.is-pulled-right( src="@/assets/images/x.svg" style="width: 10px; cursor: pointer;  " alt="Delete"  @click="list.splice(index, 1)" )
            input.input( v-model="item.type" style="background: transparent; border: 0 !important;" )
        img.is-pulled-right( src="@/assets/images/plus.svg" style="width: 30px; cursor: pointer;  " alt="Add Component" @click="add_component" )
    
    // Components
    .flex
        .item( v-for="( chunk, index ) in get_chunks()" :key="index" )
            // .fitem( v-for="( component, component_index ) in chunk" :key="'component-index-' + component_index" style="width: 300px; height: 300px; overflow: auto; " )
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
    import DailyNotes                   from "@/components/DailyNotes.vue"
    import Calendar                     from "@/components/Calendar.vue"
    import Kanban                       from "@/components/Kanban.vue"

    import IlseComponent                    from "@/components/Component.vue"

export default {

    name: "HomePage",

    components: {
        DailyNotes,
        Calendar,
        Kanban,
        IlseComponent,
    },

    data() {
        return {
            ilse: ilse,
            is_config_open: false,
            number_of_columns: 1,
            list: [],
        }
    },

    watch: {

        list( list ) {
            ilse.config.homepage_components = list
            ilse.config.save()
        }

    },

    methods: {

        get_types_description() {

            let list    = ilse.types.types
            let payload = {}

            list.map( item => {
                payload[item.id] = `${item.name}-${item.description ? item.description : ""}`
            })

            return JSON.stringify( payload )
        },

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

            this.list = ilse.config.homepage_components || [ { id: "8944871287849104", width: 12, is_on: true, type: "calendar", props: {} }, { id: "8944871287849108", width: 12, is_on: true, type: "favorites", props: {} }, { id: "8944871287849103", width: 12, is_on: true, type: "todos", props: {} }, ]

        },

    },

    mounted() {
        setTimeout( () => { this.setup(); }, 1000 )
    },

}
</script>
<style scoped >

.home-page {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50% );
    background: #fff; 
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    background: var( --background-color );
    color: var( --text-color );
    overflow: hidden;
    z-index: 1000 !important;
}

.clear {
    height: 50px;
    clear: both;
}

.home-component {
    resize: horizontal;
    overflow: auto;
    /*width: 100%;*/
    width: fit-content;
    /*border: 1px solid var( --background-color );*/
    border-left: 1px solid #000;
    /*box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
    min-height: 92vh;
    height: 400px;
}

</style>
