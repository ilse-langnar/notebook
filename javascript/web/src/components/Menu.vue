<template lang="pug" >
.menu

    .flex( @click="add_daiyl_notes" )
        img( :src="irequire.img('calendar.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; "   :title="$t('daily_notes')" )
        span.item Daily Notes

    .flex( @click="toggle_first_brain" )
        img( :src="irequire.img('school.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; "   :title="$t('study')" )
        span.item Study

    .flex( @click="open_dashboard" )
        img( :src="irequire.img('dashboard.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; "   :title="$t('open_dashboard')" )
        span.item Dashboard

    // hr

    br
    // h2.centered Favorites
    // .item( v-for="( favorite, index ) in ilse.config.favorites" :key="index" @click="open_file(favorite)" @click.ctrl="open_file_graph(favorite)" :title="favorite" style="padding: 4px; ")
        p {{favorite}}

    .favorites( v-for="( item, index ) in ilse.notes.query('#favorite')" ) 
        Notes( :note="item" @on-link-click="on_note_link_click" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    import Notes                        from "@/components/Notes.vue"

export default {

    name: "Menu",

    components: {
        Notes,
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        add_daiyl_notes() {

            let has_daily_notes_already = false
            let daily_notes_index       = null

            let index = 0
            for( const component of ilse.components ) {
                index++

                if( component.type === "daily-notes" ) {
                    has_daily_notes_already = true
                    daily_notes_index       = index
                }
            }

            if( !has_daily_notes_already ) {
                let component = new ilse.classes.Component({ type: "daily-notes", width: 12 })
                    ilse.components.push( component )
            } else {

                if( ilse.components.length >= 1 ) {
                    ilse.components.splice( daily_notes_index, 1 )
                }

            }

        },

        toggle_first_brain() {
            ilse.modals.open( "first-brain" )
        },

        open_dashboard() {
            let component = new ilse.classes.Component({ type: "dashboard", width: 12, props: {}})
                ilse.components.push( component )
        },

        on_note_link_click( payload ) {

            printf( "Menu.vue -> on_note_click -> payload -> ", payload )

            let note             = payload.note
            let file             = payload.link
            let event            = payload.event
            let is_shift         = event.shiftKey
            let is_ctrl          = event.ctrlKey
            let is_relative      = payload.link.indexOf( "@" ) !== -1 

            if( is_relative ) {
                let component = new ilse.classes.Component({ type: "text-file", width: 12, props: { name: payload.link.replace("@", "") }})
                    ilse.components.push( component )
                    return
            }

            let is_file_markdown = !(file.indexOf(".png") !== -1 || file.indexOf(".jpg") !== -1 || file.indexOf(".jpeg") !== -1 || file.indexOf(".gif") !== -1 || file.indexOf(".svg") !== -1 || file.indexOf(".mp4") !== -1 || file.indexOf(".webm") !== -1 || file.indexOf(".mp3") !== -1 || file.indexOf(".ogg") !== -1 || file.indexOf(".wav") !== -1 || file.indexOf(".md") !== -1) 
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

        open_file_graph( file ) {
            let component = new ilse.classes.Component({ type: "graph", width: 8, props: { file }})
                ilse.components.push( component )
        },

        open_file( file ) {
            let component = new ilse.classes.Component({ type: "file", width: 8, props: { file } })
                ilse.components.push( component )
        },

        add_daily_notes() {
            let component = new ilse.classes.Component({ type: "daily-notes", with: 8 })
                ilse.components.push( component )
        },

        interest_repetition() {
            let component = new ilse.classes.Component({ type: "interest-repetition", width: 8 })
                ilse.components.push( component )
        },

        statistics() {
            let component = new ilse.classes.Component({ type: "statistics", width: 8 })
                ilse.components.push( component )
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped >

.item {
    padding: 3px;
    font-size: 0.9em;
    background: #454545;
    background-color: #f9f9f9;
    color: #000;
    text-align: center;
    cursor: pointer;
    margin: 3px;
    margin-bottom: 5px;
    background: var( --background-color );
    color: var( --text-color );
}

.flex {
    background: var( --background-color );
    color: var( --text-color );
}

.menu {
    /*flex-grow: 0% !important;*/
    padding: var( --padding );
    height: 93vh !important;
}

.item img{
    margin-right: 2px;
}

.item p {
    font-size: 0.8em;
}

.loop .item {
    background: var( --background-color );
    color: var( --text-color );
}

.loop {
    text-align: center;
    margin-left: 10px;
    background: #FAFBFC;
    border: 1px solid #b3b3b3;
    border-radius: 3px;
    margin-bottom: 4px;
    background: var( --background-color );
    color: var( --text-color );
}

</style>
