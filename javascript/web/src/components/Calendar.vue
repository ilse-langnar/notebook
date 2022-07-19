<template lang="pug" >
.calendar

    .wrapper( style="display: flex;" )
        .calendar-dates( style="flex-basis: 50%;" )
            h1.centered {{ilse.utils.convert_from_date_unique_id_to_daily_note_format(ilse.utils.get_unique_date_id())}}({{(new Date().getMonth() + 1)}}/12)
            table.centered( style="width: 100px;" )
                th
                    td( v-for="( column, index ) in get_items()" :key="index" )
                        p( v-for="( day, day_index ) in column" :key=" 'td-' + day_index" :style="get_day_style(day)" @click="on_day_click(day)" )  {{day}}
        .selected-calendar( style="flex-basis: 50%;" )
             h1.centered {{selected_day}}th
             .notes( v-if="notes_for_selected_day.length" )
                 .loop( v-for="( note, index ) in notes_for_selected_day" :key="index" )
                     Note( :note="note" )
             .no-notes( v-if="!notes_for_selected_day.length" )
                 p There are no notes here

             img.centered( src="@/assets/images/plus.svg" style="width: 30px; cursor: pointer;" alt="Add Note" @click="add_note_to_date(selected_day)" )

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
            week_days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            selected_day: new Date().getDate(),
            notes_for_selected_day: [],
        }
    },

    components: {
        Note,
    },

    props: {
        component: { type: Object, required: false },
    },

    methods: {

        add_note_to_date( selected_day ) {

            if( selected_day ) {

                let year                    = new Date().getFullYear()
                    let month   = Number( new Date().getMonth() )
                    month += 1
                    month = `0${month}`
                    if( month === "010" ) month = "10" // BUGFIX :
                    if( month === "011" ) month = "11" // BUGFIX :
                    if( month === "012" ) month = "12" // BUGFIX :

                let content     = ` #i/calendar/${year}-${month}-${selected_day}`
                let depth       = 0
                let index       = ilse.notes.list.length 
                let new_note    = ilse.notes.add( content, index, depth )
                this.fetch_notes_for_given_day( selected_day )
                // this.$forceUpdate()
            }

        },

        on_day_click( day ) {
            this.fetch_notes_for_given_day( day )
        },

        fetch_notes_for_given_day( day ) {

            let year                    = new Date().getFullYear()
            let month   = Number( new Date().getMonth() )
                month += 1
                month = `0${month}`
                if( month === "010" ) month = "10" // BUGFIX :
                if( month === "011" ) month = "11" // BUGFIX :
                if( month === "012" ) month = "12" // BUGFIX :
            this.notes_for_selected_day = this.get_notes_for_day( year, month, day )
            this.selected_day           = day
        },

        get_day_style( index ) {
            let style = ``

            let today = new Date().getDate()
            printf( "today -> ", today )
                if( today === index ) style += `background: var(--text-color); color: var( --background-color ); border-radius: var( --border-radius );`

            return style
        },

        get_notes_for_day( year, month, day ) {
            let result = ilse.notes.query( `#i/calendar/${year}-${month}-${day}` )
            return result
        },

        get_unchunked_items() {

            let num = ilse.utils.get_numer_of_days_in_month( (new Date().getMonth()), (new Date().getFullYear()) )
                num += 1
            let list=[]

            for( var i = 1; i < num; ++i ) {
                list.push(i)
            }

            return list
        },

        get_items() {

            let num = ilse.utils.get_numer_of_days_in_month( (new Date().getMonth()), (new Date().getFullYear()) )
                num += 1
            let list=[]

            for( var i = 1; i < num; ++i ) {
                list.push(i)
            }

            let chunks = ilse.utils.split_array_into_nth_legnth( list, 7 )

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

table {
    width: 100%;
}

table th td {
    padding: 20px;
}

table tr td {
    width: 100%;
}


table th td p:hover {
    background: var( --text-color );
    color: var( --background-color );
    border-radius: var( --border-radius );
}

table th td p {
    /*width: 16vw;
    height: 30vh;*/
    /*width: 16vw;
    height: 10vh;*/
    height: fit-content;
    text-align: center; 
    /*padding: var( --padding );
    padding: 15px;*/
}

</style>
