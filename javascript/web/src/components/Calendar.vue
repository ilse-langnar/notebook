<template lang="pug" >
.calendar


    h1.centered {{ilse.utils.convert_from_date_unique_id_to_daily_note_format(ilse.utils.get_unique_date_id())}}
    // table
        tr
            th S
            th M
            th T
            th W
            th T
            th F
            th S
        th( v-for="( column, index ) in get_items()" :key="index" )
            td( v-for="( day, day_index ) in column" :key=" 'td-' + day_index" ) {{day_index}}

    table
        th
            td( v-for="( column, index ) in get_items()" :key="index" )
                p( v-for="( day, day_index ) in column" :key=" 'td-' + day_index" :style="get_day_style(day)" )  {{day}}

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components 
    import Note                         from "@/components/Note.vue"

export default {

    name: "Celandar",

    data() {
        return {
            ilse: ilse,
        }
    },

    components: {
        Note,
    },

    props: {
        component: { type: Object, required: false },
    },

    methods: {

        get_day_style( index ) {
            printf( "get_day_style -> index -> ", index )
            let style = ``

            let today = new Date().getDate()
            printf( "today -> ", today )
                if( today === index ) style += `background: var(--text-color); color: var( --background-color ); border-radius: var( --border-radius );`

            return style
        },

        get_items() {

            let num = ilse.utils.get_numer_of_days_in_month( (new Date().getMonth()), (new Date().getFullYear()) )
                num += 1
            let list=[]

            for( var i = 1; i < num; ++i ) {
                list.push(i)
            }

            printf( "list -> ", list )

            let chunks = ilse.utils.split_array_into_nth_legnth( list, 7 )
            printf( "chunks -> ", chunks )
            return chunks
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>


.calendar {
    width: 100%;
}

table th td {
    padding: 20px;
}

table tr td {
    border: 1px solid #000;
}




table th td p:hover {
    background: var( --text-color );
    color: var( --background-color );
    border-radius: var( --border-radius );
}

table th td p {
    width: 16vw;
    height: 30vh;
    text-align: center; 
}

</style>
