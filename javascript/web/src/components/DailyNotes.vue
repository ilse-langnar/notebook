<template lang="pug" >
.daily-notes#daily-notes( style="height: 100%; " :key="ilse.keys.daily_notes" )

    .day( v-for="( day, day_index ) in days" style="width: 97%; margin: 0 auto;" )

        .flex
            .options.centered
                p.flexi.is-size-3.has-text-weight-bold( :title=" 'notes: ' + day.notes.length" @click="notify_now()" ) {{get_file( day )}}
                img( src="@/assets/images/filter.svg" style="cursor: pointer; width: 20px; margin-left: 5px;" title="Filter"                    )
                img( src="@/assets/images/minus.svg"  style="cursor: pointer; width: 20px; margin-left: 5px;" title="Filter"                    )
                img( src="@/assets/images/plus.svg"   style="cursor: pointer; width: 20px; margin-left: 5px;" title="Filter"                    )
                img( src="@/assets/images/x.svg"   style="cursor: pointer; width: 17px; margin-left: 5px;" title="Filter"  @click="remove(day)" )
                // img( src="@/assets/images/school.svg"   style="cursor: pointer; width: 17px; margin-left: 5px;" title="Filter" @click="open_mindmap(day_index)" )

        .note( v-for="(note, note_index) in day.notes" :key="note_index" :style="get_note_style(note)" )
            Note( :note="note" :key="note.id + day.id" @on-enter="on_enter" @on-tab="on_tab" @on-shift-tab="on_shift_tab" @on-link-click="on_note_link_click" @on-esc="on_note_esc" @on-arrow-up="on_note_arrow_up" @on-arrow-down="on_note_arrow_down" @on-note-left-click="on_note_left_click" @on-note-middle-click="on_note_middle_click(note)" @on-note-right-click="on_note_right_click" )

        GhostNote( v-if="day.notes.length" @on-enter="on_ghost_note_enter" @on-blur="on_ghost_note_blur" :payload="day" )

        .no-notes( v-if="!day.notes.length" )
            GhostNote( @on-enter="on_no_note_ghost_enter" @on-blur="on_no_note_ghost_blur" :payload="day" )

        References( :file="get_file(day) + '.md'" ref="daily-notes-references" )
        .space

    button.slick-button( @click="load_day_before" title="Load day before" ) Load More

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
    import GhostNote                    from "@/components/GhostNote.vue"
    import References                   from "@/components/References.vue"

export default {

    name: "DailyNotes",

    data() {
        return {
            ilse: ilse,
            key: 0,
            days: [], // [ { id: "20220128", notes: [ { text: "20220124102749: This is a [[Writing]] example", index: 15532 } ] } ]
        }
    },

    components: {
        Note,
        GhostNote,
        References,
    },

    methods: {

        remove( day ) {
            let index = this.days.indexOf( day )
            this.days.splice( index, 1 )
        },

        /*
        open_mindmap( index ) {
            let day       = this.days[index]
            let component = new ilse.classes.Component({ type: "mind-map", width: 12, props: { day: day } })
                ilse.components.push( component )
        },
        */

        notify_now() {

            ilse.notification.send( "ERROR", `BAD FORMAT: lll`)
/*

            ilse.notification.send( "Title", "Description", {
                type: "normal",
                on_cancel: function( notification ) {
                    printf( "on_cancel -> notification -> ", notification )
                }
                on_close: function() {},
            })
            */

        },

        on_note_middle_click( note ) {
            ilse.clipboard.write( note.id )
        },

        on_note_left_click( payload ) {

            let note        = payload.note
            let event       = payload.event
            let is_shift    = event.shiftKey
            let is_ctrl     = event.ctrlKey

            if( is_shift ) {
                // let component = new ilse.classes.Component({ type: "mind-map", width: 12, props: { note: note } })
                // let component = new ilse.classes.Component({ type: "org-chart", width: 12, props: { note: note } })
                let component = new ilse.classes.Component({ type: "mind-map", width: 12, props: { id: note.id } })
                    ilse.components.push( component )
            }

            if( is_ctrl ) {
                // let component = new ilse.classes.Component({ type: "memex", width: 12, props: { note: note } })
                let component = new ilse.classes.Component({ type: "table-pan", width: 12, props: { id: note.id } })
                    ilse.components.push( component )
            }

        },

        on_note_right_click( note ) {
            ilse.notes.delete( note )
        },

        // TODO: I'm for some reason cropping the ID, this should not be happening.
        on_no_note_ghost_enter( payload ) {
            printf( "on_no_note_ghost_blur -> payload -> ", payload )

            let content     = payload.content
            let depth       = 0
            let index       = ilse.notes.list.length 

            let new_note  = ilse.notes.add( content, index, depth )
                new_note.focus()
        },

        on_no_note_ghost_blur( payload ) {
            printf( "blur" )
        },

        // This does not work because we don't have the note.id inside of notes in the first place.
        on_ghost_note_enter( payload ) {

            let id      = payload.payload.id
            let day

            this.days.map( _day => {
                if( _day.id === id ) day = _day
            })
            /*
            let index = 0
            for( const _day of this.days ) {
                index++

                if( _day.id === id ) day = _day
            }
            */

            let content = payload.content
            let note    = day.notes[ day.notes.length - 1 ]
            let depth   = 0 // BUGFIX: don't do note.depth, otherwise it'll be weird.

            let new_note = ilse.notes.add_after( content, depth, note )
            printf( "new_note -> ", new_note )
                new_note.focus()
        },

        on_ghost_note_blur( payload ) {
            let content = payload.content
                if( !content ) return

        },

        /*
        on_ghost_note_blur( payload ) {

            let content = payload.content
                if( !content ) return

            let day_id  = payload.payload.id
            let instance
            let time_id

            for( const [index, day] of this.days.entries() ) {
                if( day.id === day_id ) {
                    time_id         = ilse.utils.get_unique_date_id() // 20220120155758
                    instance        = new ilse.classes.Note( `${time_id}: ${content}`)

                    // ilse.notes.add( content, ilse.notes.list.length+1 ,0 )

                    // printf( "ilse -> ", ilse )
                    // printf( "ilse.notes -> ", ilse.notes )
                    // this.days[index].notes.push(instance)
                    // day.notes.push( instance )
                }

            }

        },
        */

        on_note_arrow_down( payload ) {
            let index   = ilse.notes.list.indexOf(payload.note)
            let note  = ilse.notes.list[++index]
                if( note ) note.focus()
        },

        on_note_arrow_up( payload ) {
            let index   = ilse.notes.list.indexOf(payload.note)
            let note  = ilse.notes.list[--index]
                if( note ) note.focus()
        },

        on_note_esc() {
            document.activeElement.blur()
        },

        on_note_link_click( payload ) {

            printf( "on_note_link_click -> payload -> ", payload )

            let note             = payload.note
            let file             = payload.link
            let event            = payload.event
            let is_shift         = event.shiftKey
            let is_ctrl          = event.ctrlKey
            let is_relative      = payload.link.indexOf( "@" ) !== -1 

            if( is_relative ) {
                printf( "is_relative -> ", is_relative )
                let component = new ilse.classes.Component({ type: "text-file", width: 12, props: { name: payload.link.replace("@", "") }})
                printf( ">>> compoennt -> ", component )
                    ilse.components.push( component )
                    return
            }

            printf( ">>> is_relative -> ", is_relative )

            let is_file_markdown = !(file.indexOf(".png") !== -1 || file.indexOf(".jpg") !== -1 || file.indexOf(".jpeg") !== -1 || file.indexOf(".gif") !== -1 || file.indexOf(".svg") !== -1 || file.indexOf(".mp4") !== -1 || file.indexOf(".webm") !== -1 || file.indexOf(".mp3") !== -1 || file.indexOf(".ogg") !== -1 || file.indexOf(".wav") !== -1 || file.indexOf(".md") !== -1) 
                printf( ">>> is_file_markdown -> ", is_file_markdown )
                if( is_file_markdown ) file += ".md"

            // <=======> Shift <=======> //
            if( is_shift ) {
                let component = new ilse.classes.Component({ type: "file", width: 8, props: { file }})
                    ilse.components.push( component )
            }
            // <=======> Shift <=======> //

            // <=======> Ctrl <=======> //
            if( is_ctrl ) {
                let component = new ilse.classes.Component({ type: "graph", width: 8, props: { file }})
                    ilse.components.push( component )
            }
            // <=======> Ctrl <=======> //

        },

        on_tab( payload ) {
            printf( "on_tab -> payload -> ", payload )
            payload.note.$depth( 1 )
        },

        on_shift_tab( payload ) {
            payload.note.$depth( -1 )
        },

        // TODO: BUG: When we type enter we correctly add the note but it's not rendered corretly, also setting the depth is problematic k
        on_enter( payload ) {

            let note = payload.note
            let depth  = note.depth
            let new_note = ilse.notes.add_after( "", depth, note )
                new_note.focus()

            setTimeout( () => { ilse.save() }, 1000 )
        },

        get_file( day ) {
            // 20220123180536 -> Febuary 20th, 2020
            let date = ilse.utils.convert_from_date_unique_id_to_daily_note_format( day.id )
            return date
        },

        // Control the margins
        get_note_style( note ) {

            // let style = `display: flex;`
            let style = ``
                if( note.depth ) style += `margin-left: ${18 * note.depth}px !important; `

            return style
        },

        load_day_before() {

            let has_days = this.days.length
                if( !has_days ) return

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

        // When bottom scrolling, load the previous day.
        scroll_listener() {

            let _this = this
            window.addEventListener('scroll', function(e) {
                if( (window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
                    _this.load_day_before()
                }
            }, false )

        },

        setup() {
            // setTimeout( () => { this.scroll_listener() }, 1000 )
            this.scroll_listener() 

            // Add today's data and its notes
            let today_id     = ilse.utils.get_unique_date_id() // 20200125
                setTimeout( () => { this.add_day( today_id ) }, 2000 )

            this.listen()
        },

        add( payload ) {

            /*
            for( let i = 0; i < this.days.length; i++ ) {

                printf( "i -> ", i )
                for( let j = 0; j < this.days[i].notes.length; j++  ) {
                    printf( "j -> ", j )
                    if( this.days[i].notes[j].id === after.id ) {
                        this.days[i].notes.splice( j, 0, new_note )
                    }

                }
            }
            */

            /*
            this.days.forEach( ( day, day_index ) => {
                printf( "day -> ", day )
                day.notes.forEach( ( note, note_index ) => {
                    is_equal = note.id === after.id 
                    printf( `note.id: ${note.id} after: ${after.id}, is_equal: ${is_equal}` )
                    // printf( "is_equal -> ", is_equal )
                    if( is_equal ) {
                        printf( ">>>>" )
                        // this.days[day_index].notes.splice( next_index, 0, new_note )
                        day.notes.splice( note_index, 0, new_note )
                        return
                    }
                })
            })
            */

            /*
            return
            for( const day of this.days ) {

                let index = 0

                for( const note of day.notes ) {
                    index++

                    if( note.id !== after.id ) continue

                    printf( "this.days -> ", this.days )
                    printf( "index -> ", index )
                    printf( "this.days[index] -> ", this.days[index] )
                    // this.days[index].notes.splice( ++index, 0, new_note )
                    // this.$forceUpdate()
                    // day.notes.splice( ++index, 0, new_note )

                    // this.key = Math.random()
                    // day.notes.splice( index, 0, new_note )

                    return

                }

            }
            */

        },

        // Give me a note(object) and I'll tell which day it is on.
        get_note_day( note ) {
            printf( "DailyNotes -> get_note_day -> note -> ", note )

            /*
            this.days.map( day => {
                printf( "ddd day -> ", day )
                day.notes.map( note => {
                    printf( "note -> ", note )
                })
            })
            */

            for( const day of this.days ) {
                for( const day_note of day.notes ) {
                    if( day_note.id === note.id ) return day
                }
            }

        },

        reload() {

        },

        listen() {

            Messager.on( "~notes", (action, payload) => {

                if( action === "added" ) {

                    printf( "added -> payload -> ", payload )
                    let after       = payload.after
                    let new_note    = payload.note
                    let is_equal
                    let day         = this.get_note_day( after )

                    let note_index  = day.notes.indexOf( after )

                    let day_index   = this.days.indexOf( day )
                        this.days[day_index].notes.splice( ++note_index, 0, new_note )

                    /*
                    for( const day of this.days ) {
                        for( const note of day.notes ) {
                            if( note.id === after.id ) {
                                printf( "day.notes.indexOf(note) -> ", day.notes.indexOf(note) )
                                let index = day.notes.indexOf( note )
                                day.notes.splice( ++index, 0, new_note )
                                return
                            }

                        }
                    }
                    */

                } else if( action === "deleted" ) {

                    let note      = payload
                    let day         = this.get_note_day( note )
                    let note_index= day.notes.indexOf( note )
                    let day_index   = this.days.indexOf( day )
                        this.days[day_index].notes.splice( note_index, 1 )

                    // this.key = Math.random()
                }

            })
        }

    },

    mounted() {
        this.setup();
    }

}
</script>
