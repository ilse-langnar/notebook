<template lang="pug">
.home-page

    // img.centered( src="@/assets/images/settings.svg" style="width: 20px; cursor: pointer; display: block; " @click="is_config_open = !is_config_open" )

    // .centered
        br
        img.centered( src="@/assets/images/point.svg" style="width: 20px; cursor: pointer; margin-bottom: 10px; display: inline-block; " alt="Delete Component" @click="list.splice( index, 1 )" )
        img.centered( src="@/assets/images/point.svg" style="width: 20px; cursor: pointer; margin-bottom: 10px; display: inline-block; " alt="Delete Component" @click="list.splice( index, 1 )" )
        img.centered( src="@/assets/images/point.svg" style="width: 20px; cursor: pointer; margin-bottom: 10px; display: inline-block; " alt="Delete Component" @click="list.splice( index, 1 )" )

    // Config
    .config( v-if="is_config_open" )
        .flitem( style="display: block; margin: 0 auto; width: 50%; " )

            .first
                p Components Per Column
                input.input( v-model="number_of_columns" type="number" style="width: 40px;" min="1" max="5")

            .clear

            .second
                p Components
                .loop( v-for="( item, index ) in list" :key="index" style="display: inline-block;" )
                    img( src="@/assets/images/x.svg" style="width: 15px; cursor: pointer; margin-bottom: 10px;" alt="Delete Component" @click="list.splice( index, 1 )" )
                    input.input.is-pulled-left( v-model="item.type" style="margin-left: 5px;" )
                .centered( style="width: 40px;" )
                    img.is-pulled-right( src="@/assets/images/question-mark.svg" style="width: 10px; cursor: pointer; display: block; " :title="get_types_description()" alt="Component List" )
                    img.is-pulled-right( src="@/assets/images/plus.svg" style="width: 30px; cursor: pointer; " @click="add_component(list)" )


    .div( style="border: 1px solid #000; height: 50px;" )
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
            list: [
                { id: "8944871287849104", width: 12, is_on: true, type: "calendar", props: {} },
                { id: "8944871287849108", width: 12, is_on: true, type: "favorites", props: {} },
                { id: "8944871287849103", width: 12, is_on: true, type: "todos", props: {} },
                // { id: "8944871287849106", width: 12, is_on: true, type: "favorites", props: {} },
            ],
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
            let component = { id: Math.random().toString(), width: 12, is_on: true, type: "", props: {} }
            list.push( component )
        },

        get_chunks() {
            let copy = Array.from( this.list )
            let list = ilse.utils.split_array_into_nth_legnth( copy, this.number_of_columns )
            printf( "this.number_of_columns -> ", this.number_of_columns )
            printf( "get_chunks -> list -> ", list )
            return list
        },

        setup() {

        },

    },

    mounted() {
        this.setup();
    },

}
</script>
<style scoped >

.home-page {
    width: 90%;
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
    min-height: 480px;
    height: 400px;
}

</style>
