<template lang="pug" >
.daily-notes#daily-notes( :key="ilse.keys.daily_notes" )

    .day( v-for="( day, day_index ) in days" style="width: 97%; margin: 0 auto;" )

        .flex( style="margin: 0 auto; width: 40%; " )
            img.remove( :src="irequire.img('trash.svg')" @click="remove(day)" :title="$t('delete')")
            .centered
                span.flexi.is-size-3.has-text-weight-bold( :title=" $t('notes') + ' ' + day.notes.length" ) {{get_file( day )}}
            p.fitem &#128269;
        .options.centered

        Outline( :notes="day.notes" )

        GhostNote( v-if="day.notes.length" @on-enter="on_ghost_note_enter" @on-blur="on_ghost_note_blur" :payload="day" :options="{ placeholder: '' }" )

        .no-notes( v-if="!day.notes.length" )
            GhostNote( @on-enter="on_no_note_ghost_enter" @on-blur="on_no_note_ghost_blur" :payload="day" )

        References( :file="get_file(day) + '.md'" ref="daily-notes-references" )
        .space

    button.slick-button( @click="load_day_before" :title="$t('load_day_before')" ) Load More

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

// Constants
    import HTML_TEMPLATE                from "@/classes/HTML_TEMPLATE.js"

// functions
    import yyyymmddhhss_to_pretty       from "@/classes/yyyymmddhhss_to_pretty.js"
    import get_unique_date_id           from "@/classes/get_unique_date_id.js"
    import remove_array_item            from "@/classes/remove_array_item.js"
    import delay                        from "@/classes/delay.js"

export default {

    name: "DailyNotes",

    data() {
        return {
            ilse: ilse,
            days: [], // [ { id: "20220128", notes: [ { text: "20220124102749: This is a [[Writing]] example", index: 15532 } ] } ]
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

        get_daily_notes() {
            let date = get_unique_date_id() // 20200125
                date = date.split("")
                date = date.splice( 0, 8 )
                date = date.join("")

            let list = ilse.notes.query( date )

            return list
        },

        remove( day ) {
            remove_array_item( this.days, day )
            // let index = this.days.indexOf( day )
            // this.days.splice( index, 1 )
        },

        // TODO: I'm for some reason cropping the ID, this should not be happening.
        on_no_note_ghost_enter( payload ) {

            let content     = payload.content
            let depth       = 0
            let index       = ilse.notes.list.length 

            let new_note  = ilse.notes.add( content, index, depth )
                new_note.focus()
        },

        on_no_note_ghost_blur( payload ) {
        },

        // This does not work because we don't have the note.id inside of notes in the first place.
        on_ghost_note_enter( payload ) {

            let id      = payload.payload.id
            let day

            this.days.map( _day => {
                if( _day.id === id ) day = _day
            })

            let content = payload.content
            let note    = day.notes[ day.notes.length - 1 ]
            let depth   = 0 // BUGFIX: don't do note.depth, otherwise it'll be weird.

            let new_note = ilse.notes.add_after( content, depth, note )
                new_note.focus()
        },

        on_ghost_note_blur( payload ) {
            let content = payload.content
                if( !content ) return

        },

        // TODO: BUG: When we type enter we correctly add the note but it's not rendered corretly, also setting the depth is problematic k
        on_enter( payload ) {

            let note     = payload.note
            let new_note = ilse.notes.add_after( "", note.depth, note )
                new_note.focus()

            // let day      = this.get_note_day( note )
            // let index    = day.notes.indexOf( note )
            // day.notes.slice( ++index, 0, new_note )
            // day.notes.push( new_note )
            // printf( "after -> day.notes.length -> ", day.notes.length )

            // setTimeout( () => { new_note.focus() }, 1000 )

            // setTimeout( () => { ilse.save() }, 1000 )

            // let day_index   = this.days.indexOf( day )
                // this.days[day_index].notes.splice( ++index, 0, new_note )

            // day.notes.splice( index, 0, new_note )
            // day.notes.push( new_note )


            // note.children.push( new_note )
            // let day      = this.get_note_day( note )
            // printf( "day -> ", day )
            // printf( "index -> ", index )
            // day.notes.splice( index, 0, new_note )
            // day.notes.splice( ++index, 0, note )

        },

        get_file( day ) {
            // 20220123180536 -> Febuary 20th, 2020
            let date = yyyymmddhhss_to_pretty( day.id )
            return date
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

            let day    = id.substr( 0, 8 ) /*day*/ 
            let notes  = ilse.notes.query( day )
                this.days.push({ id, notes })
            this.$forceUpdate()
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
