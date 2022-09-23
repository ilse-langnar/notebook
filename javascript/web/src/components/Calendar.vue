<template lang="pug" >
// .calendar

    .wrapper
        .calendar-dates( style="width: 50%; margin: 0 auto; " )
            h1.centered {{yyyymmddhhss_to_pretty(ilse.utils.get_unique_date_id())}}({{(new Date().getMonth() + 1)}}/12)
            table.centered( style="width: 100px;" )
                th
                    td( v-for="( column, index ) in get_items()" :key="index" )
                        p( v-for="( day, day_index ) in column" :key=" 'td-' + day_index" :style="get_day_style(day)" @click="on_day_click(day)" )  {{day}}
        .selected-calendar( style="width: 50%; margin: 0 auto; " )
             h1.centered {{selected_day}}th
             .notes( v-if="notes_for_selected_day.length" )
                 .loop( v-for="( note, index ) in notes_for_selected_day" :key="index" )
                     Note( :note="note" )
             .no-notes( v-if="!notes_for_selected_day.length" )
                 p There are no notes here

             img.centered( :src="irequire.img('plus.svg')" style="width: 30px; cursor: pointer;" alt="Add Note" @click="add_note_to_date(selected_day)" )

// .calendar

    .flex
        .first( style="width: 50%; height: 44vh; border: 1px solid #000; " )
            .calendar-dates
                h1.centered {{yyyymmddhhss_to_pretty(ilse.utils.get_unique_date_id())}}({{(new Date().getMonth() + 1)}}/12)
                table.centered( style="width: 50%; " )
                    th
                        td( v-for="( column, index ) in get_items()" :key="index" )
                            p( v-for="( day, day_index ) in column" :key=" 'td-' + day_index" :style="get_day_style(day)" @click="on_day_click(day)" )  {{day}}
        .second( style="width: 50%; height: 44vh; border: 1px solid #000; " )
            .selected-calendar( style="width: 50%; margin: 0 auto; " )

                 h1.centered {{selected_day}}th
                 .notes( v-if="notes_for_selected_day.length" )
                     .loop( v-for="( note, index ) in notes_for_selected_day" :key="index" )
                         Note( :note="note" )
                 .no-notes( v-if="!notes_for_selected_day.length" )
                     p There are no notes here

                 img.centered( :src="irequire.img('plus.svg')" style="width: 30px; cursor: pointer;" alt="Add Note" @click="add_note_to_date(selected_day)" )

    .flex
        .first( style="width: 50%; height: 44vh; border: 1px solid #000; " )

             h1.centered {{( new Date().getDate() - 1 )}}th ({{$t('yesterday')}})
             .notes( v-if="get_days( ( new Date().getDate() - 1 ) )" )
                 .loop( v-for="( note, index ) in get_days( (new Date().getDate() - 1) )" :key="index" )
                     Note( :note="note" )
             .no-notes( v-if="get_days( (new Date().getDate() - 1) )" )
                 p There are no notes here


             img.centered( :src="irequire.img('plus.svg')" style="width: 30px; cursor: pointer;" alt="Add Note" @click="add_note_to_date( (new Date().getDate() - 1 ) )" )
             h1.centered {{( new Date().getDate() + 1 )}}th ({{$t('tomorrow')}})
             .notes( v-if="get_days( ( new Date().getDate() + 1 ) )" )
                 .loop( v-for="( note, index ) in get_days( (new Date().getDate() + 1) )" :key="index" )
                     Note( :note="note" )
             .no-notes( v-if="get_days( (new Date().getDate() + 1) )" )
                 p There are no notes here

             img.centered( :src="irequire.img('plus.svg')" style="width: 30px; cursor: pointer;" alt="Add Note" @click="add_note_to_date( (new Date().getDate() + 1 ) )" )

        .second( style="width: 50%; height: 44vh; border: 1px solid #000; " )
             h1.centered {{( new Date().getDate() )}}th ({{$t('today')}})
             .notes( v-if="get_days( ( new Date().getDate() ) )" )
                 .loop( v-for="( note, index ) in get_days( (new Date().getDate() ) )" :key="index" )
                     Note( :note="note" )
             .no-notes( v-if="get_days( (new Date().getDate() ) )" )
                 p There are no notes here

             img.centered( :src="irequire.img('plus.svg')" style="width: 30px; cursor: pointer;" alt="Add Note" @click="add_note_to_date( (new Date().getDate() ) )" )

.calendar
    // p {{initial_views[0]}}
    // button.button.slick-button( @click="next_option()" ) Toggle
    // FullCalendar( :options="calendarOptions" style="width: 600px; height: 500px; " )

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

// Functions
    import yyyymmddhhss_to_pretty       from "@/classes/yyyymmddhhss_to_pretty.js"

// import '@fullcalendar/core/vdom' // solves problem with Vite
// import FullCalendar from '@fullcalendar/vue'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from '@fullcalendar/interaction'

// functions
    import split_array_into_nth_chunks  from "@/classes/split_array_into_nth_chunks.js"

export default {

    name: "Calendar",

    data() {
        let _this = this
        return {
            ilse: ilse,
            initial_views: [ "dayGridWeek", "dayGridMonth" ],
            week_days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            selected_day: new Date().getDate(),
            notes_for_selected_day: [],

            /*
            calendarOptions: {
                height: 500,
                width: 700,
                contentHeight: 600,
                themeSystem: 'bootstrap5',
                selectable: true,


                dayMaxEventRows: true, // for all non-TimeGrid views
                views: {
                    timeGrid: {
                        dayMaxEventRows: 6 // adjust to 6 only for timeGridWeek/timeGridDay
                    }
                },



                dateClick: info => {
                    printf( "info -> ", info )
                    printf( "this.calendarOptions -> ", this.calendarOptions )
                },
                theme: "darkly",
                plugins: [ dayGridPlugin, interactionPlugin  ],
                // initialView: 'dayGridWeek',
                // initialView: 'resourceTimeGridDay',
                // initialView: 'dayGridMonth',
                // initialView: 'dayGridDay',
                initialView: 'dayGridWeek',
                eventColor: '#378006',
                events: [
                    { title: 'event 1', date: '2019-04-01'  },
                    { title: 'event 2', date: '2019-04-02'  },
                    // { title: "- [ ] Do Something", daysOfWeek: [ '3'  ], startTime: '11:00:00', endTime: '11:30:00', color: 'red' },
                    { title: 'simple event', start: '2022-08-02' },
                    { title: 'another', start: '2022-08-02' },
                    { title: 'haha', start: '2022-08-02' },
                    // { date: '2022-08-08', startTime: '11:00:00', endTime: '11:30:00', color: 'red' },
                ],

            },
            */

        }
    },

    components: {
        Note,
        // FullCalendar,
    },

    props: {
        component: { type: Object, required: false },
    },

    methods: {

        next_option() {
            let removed_item = this.initial_views.shift()
            printf( "removed_item -> ", removed_item )
            this.calendarOptions.initialView = removed_item
            this.initial_views.push( removed_item )
            this.$forceUpdate()
        },

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

        get_days( day ) {

            let year                    = new Date().getFullYear()
            let month   = Number( new Date().getMonth() )
                month += 1
                month = `0${month}`
                if( month === "010" ) month = "10" // BUGFIX :
                if( month === "011" ) month = "11" // BUGFIX :
                if( month === "012" ) month = "12" // BUGFIX :
            let notes_for_selected_day = this.get_notes_for_day( year, month, day )
            return notes_for_selected_day
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

            let chunks = split_array_into_nth_chunks( list, 7 )

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
    overflow: hidden;
    height: 100%;
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


.calendar .flex .first, .calendar .flex .second{
    margin-bottom: 1px;
    margin-right: 1px;
    border-radius: var( --border-radius );
    overflow: hidden; 
}

</style>
