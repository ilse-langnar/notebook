<template lang="pug" >
.menu

    // Buttons
    .buttons
        .flex( @click="add_daiyl_notes" )
            img( :src="irequire.img('calendar.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; "   :title="$t('daily_notes')" )
            span.item Daily Notes

        // .flex( @click="toggle_first_brain" )
            img( :src="irequire.img('school.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; "   :title="$t('study')" )
            span.item Study

        // .flex( @click="open_dashboard" )
            img( :src="irequire.img('dashboard.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; "   :title="$t('open_dashboard')" )
            span.item Dashboard

    br
    br

    // Collapsables
    /// details
        summary #favorite
        .favorites( v-for="( item, index ) in ilse.notes.query('#favorite')" ) 
            Notes( :note="item" @on-link-click="on_note_link_click" :options="{}" )

    details
        summary Starred
        .favorites( v-for="( item, index ) in ilse.config.favorites" @click="on_favorite_click(item)" ) 
            p.link [[{{item}}]]

    details.filesystem
        summary Filesystem
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    .loopl( v-for="( item, index ) in ilse.notes.query( '#favorite' )" ) 

        .file-referencel( v-for="( file, file_reference_index ) in ilse.notes.get_file_references(item.content)" :keu="'file-reference-index' + index" )
            details
                summary {{file.split("|")[1].replace("]]", "")}}
                .loopl( v-if="note.content.indexOf('#favorite') === -1 " v-for="( note, ref_index ) in ilse.notes.query(  file.split('|')[0].replace( '![[', '') )" :key="'search' + ref_index" ) 
                    Notes( :note="note" :options="{}" )

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
    import RandomNote                   from "@/components/RandomNote.vue"

// Functions
    import add_component                from "@/classes/add_component.js"
    import update_key                   from "@/classes/update_key.js"

export default {

    name: "Menu",

    components: {
        Notes,
        RandomNote,
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        on_favorite_click( file ) {
            add_component({ type: "file", width: 8, props: { file  }})
        },

        open_dashboard() {
            add_component({ type: "dashboard", width: 12, props: {}})
        },

        // TODO: make this actually toggle instead of just opening.
        toggle_first_brain() {
            ilse.modals.open( "first-brain" )
        },

        add_daiyl_notes() {
            let has_daily_notes_already = !!ilse.components.map( component => {if( component.type === "daily-notes" ) return component }).filter( e=>e )[0]
            if( !has_daily_notes_already )
                add_component({ type: "daily-notes", width: 12 })
        },

        on_note_link_click( payload /*{link, event}*/ ) {
            let file             = payload.link
            add_component({ type: "file", width: 8 , props: { file }})
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
