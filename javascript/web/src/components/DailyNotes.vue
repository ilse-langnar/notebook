<template lang="pug" >
.daily-notes#daily-notes( :key="key" )

    .day( v-for="( day, day_index ) in days" style="width: 97%; margin: 0 auto;" )

        .flex( style="margin: 0 auto; width: 40%; " )
            img.remove( :src="irequire.img('trash.svg')" @click="remove(day)" :title="$t('delete')")
            .centered
                span.flexi.is-size-3.has-text-weight-bold( :title=" $t('notes') + ' ' + day.notes.length" ) {{get_pretty_date( day )}}
            p.fitem &#128269;
        .options.centered

        Outline( :notes="get_note_days(day.notes)" )

        GhostNote( v-if="day.notes.length" @on-enter="on_ghost_note_enter" @on-blur="on_ghost_note_blur" :payload="day" :options="{ placeholder: '' }" )

        .no-notes( v-if="!day.notes.length" )
            GhostNote(                     @on-enter="on_ghost_note_enter" @on-blur="on_ghost_note_blur" :payload="day" :options="{ placeholder: '' }")

        References( :file="get_pretty_date(day) + '.md'" ref="daily-notes-references" )
        .space

    button.slick-button( @click="load_day_before" :title="$t('load_day_before')" ) Load More
    br
    br

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
    import Notes                        from "@/components/Notes.vue"
    import GhostNote                    from "@/components/GhostNote.vue"
    import References                   from "@/components/References.vue"
    import Outline                      from "@/components/Outline.vue"

// functions
    import yyyymmddhhss_to_pretty       from "@/classes/yyyymmddhhss_to_pretty.js"
    import get_unique_date_id           from "@/classes/get_unique_date_id.js"
    import remove_array_item            from "@/classes/remove_array_item.js"
    import delay                        from "@/classes/delay.js"
    import extract_note_id              from "@/classes/extract_note_id.js"
    import cut_string                   from "@/classes/cut_string.js"
    import set                          from "@/classes/set.js"
    import push                         from "@/classes/push.js"

export default {

    name: "DailyNotes",

    data() {
        return {
            ilse: ilse,
            days: [], // [ { id: "20220128", notes: [ { text: "20220124102749: This is a [[Writing]] example", index: 15532 } ] } ]
            key: 0,
        }
    },

    components: {
        Note,
        Notes,
        GhostNote,
        References,
        Outline,
    },

    methods: {

        get_note_days( list ) {
            return list.map( e=> { return e.id }) // I only want an array with [ <id>, <id> ]
        },

        extract_note_id( string ) {
            return extract_note_id( string )
        },

        get_daily_notes() {
            return ilse.notes.query( cut_string( get_unique_date_id(), 0, 8 ) )
        },

        remove( day ) {
            return remove_array_item( this.days, day )
        },

        on_ghost_note_enter( payload ) {
            return ilse.notes.add( payload.content, null, 0 )
        },

        on_ghost_note_blur( payload ) {
            if( payload.content ) ilse.notes.add( payload.content, null, 0 )
        },

        // 20220123180536 -> Febuary 20th, 2020
        get_pretty_date( day ) {
            return yyyymmddhhss_to_pretty( day.id )
        },

        load_day_before() {

            let has_days = this.days.length
                if( !has_days ) {
                    let today_id     = get_unique_date_id() // 20200125
                    this.add_day( today_id ) 
                    return
                }

            // Last day on list
            let last_day_id       = this.days[this.days.length - 1].id // last day in "days"
                let year          = last_day_id.substr( 0, 4 )
                    year          = Number( year ) // BUGFIX: since we NEED to decrease this one, we need to make sure it's a number
                let month         = last_day_id.substr( 4, 2 )
                    month         = Number( month ) // BUGFIX: since we NEED to decrease this one, we need to make sure it's a number
                let day           = last_day_id.substr( 6, 2 )
                    day           = Number( day ) // BUGFIX: since we NEED to decrease this one, we need to make sure it's a number

            // Calculate the last day, taking into accounts the number of days in last month, decreasing the current month when in day 1, also taking day 1 of new year into account
            let yesterday     = day - 1
                if( day === 1 ) yesterday   = ilse.utils.get_numer_of_days_in_month( month, year ) // first day of the month, the last day should not be 0 or -1, it should be like: 30, 31
                if( day === 1 ) month       = month -1 // BUGFIX: First day of the month gets special treatment
                if( year === 12 ) year      = year -1  // BUGFIX: First day of the first month of the new year
                if( month < 10 ) month      = `0${month}` // BUGFIX: a month needs to be 2-digits long, otherwise bug

                if( yesterday < 10 ) yesterday  = `0${yesterday}` // BUGFIX: 2022019 -> 20220209
            let yesterday_id      = `${year}${month}${yesterday}`
                this.add_day( yesterday_id )
        },

        add_day( id ) {
            push( { id: id, notes: ilse.notes.query( cut_string( id, 0, 8 ) ) }, this.days )
            set( this, "key", Math.random() )
        },

        /*
        // When bottom scrolling, load the previous day.
        scroll_listener() {

            let _this = this
            window.addEventListener('scroll', function(e) {
                if( (window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
                    _this.load_day_before()
                }
            }, false )

        },
        */

        add_today() {
            delay( this.add_day, get_unique_date_id(), 1000 )
        },

        setup() {
            // this.scroll_listener() 
            this.add_today()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>

.daily-notes {
    height: 100%;
    /*width: 100vw;*/
    overflow: hidden;
    margin-left: 15px;
}

.flex p.fitem  {
    margin-top: 10px; 
}

.flex p.remove  {
    cursor: pointer;
    width: 20px; 
    margin: 0 auto;
}
              
.day img.remove {
    cursor: pointer;
}
          
</style>
