<template lang="pug" >
.menu

    .flex( style="border-radius: var( --border-radius ); " )
        img( :src="irequire.img('lupe.svg')"    )

        input.input.search#quick-search( v-model="query" list="list" @keydown.enter="search = query" @keydown.esc="on_input_keydown_esc" )
        .search-result( v-if="(search && query) && (search === query)" style="position: absolute; top: 90px; left: 0%; width: 80%; border: 1px solid #000; background: #fff; overflow: hidden; height: 80vh; z-index: 5; overflow-y: scroll; resize: right; " )
            Notes( v-for="( item, index ) in ilse.notes.query( search )" :key="'notes-' + index" :note="item" :options="{}" )

        br

        // .search-result( v-if="query && query.length >= 5" style="position: relative; top: 10px; " )
            p {{ilse.notes.query(query)}}
    // @ img.img.is-pulled-right( :src="irequire.img('arrow-narrow-left.svg')" @click="toggle_menu()" )
    br
    br

    .buttons
        .flex( @click="add_daiyl_notes" style="border-radius: var( --border-radius );" )
            img( :src="irequire.img('calendar.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; "   :title="$t('daily_notes')" )
            span.item Daily Notes

    br
    br

    Favorites

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
    import Favorites                    from "@/components/Favorites.vue"

// Functions
    import add_component                from "@/classes/add_component.js"
    import update_key                   from "@/classes/update_key.js"
    import truncate_text                from "@/classes/truncate_text.js"

export default {

    name: "Menu",

    components: {
        Notes,
        RandomNote,
        Favorites,
    },

    watch: {

        query( query ) {

            let _this = this

            if( query.length === 0 || query.length === 1 ) return // Speed
            if( query === this.search ) return // Redundant

            clearTimeout( this.timeout )

            this.timeout = setTimeout( () => {
                _this.search = query
            }, 2000 )
        },

    },

    data() {
        return {
            ilse: ilse,
            query: "",
            search: "",
            is_on: true,
        }
    },

    methods: {

        get_favorites() {
            let list = ilse.notes.query( '#favorite' ) 
            return list
        },

        on_input_keydown_esc() {
            this.search = ""
            this.query  = ""
        },


        validateSelection( event ) {
            printf( "Menu.vue -> validateSelection -> event -> ", event )
        },

        getDropdownValues( event ) {
            printf( "Menu.vue -> getDropdownValues -> event -> ", event )
        },

        truncate_text( text, limit ) {
            return truncate_text( text, limit )
        },

        toggle_menu() {
            // ilse.is_left_sidebar_open = !ilse.is_left_sidebar_open
            ilse.is_left_sidebar_open = !ilse.is_left_sidebar_open
        },

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
            let component = ilse.types.get( "daily-notes" )
            ilse.components.push( component )

            return
            let has_daily_notes_already = !!ilse.components.map( component => {if( component.id === "daily-notes" ) return component }).filter( e=>e )[0]
            printf( "has_daily_notes_already -> ", has_daily_notes_already )
            if( !has_daily_notes_already ) {
                printf( "HAS NOT" )
                    let component = ilse.types.get( "daily-notes" )
                    ilse.components.push( component )
            }
                // add_component({ type: "daily-notes", width: 12 })
        },

        on_note_link_click( payload /*{link, event}*/ ) {
            let file             = payload.link
            add_component({ type: "file", width: 8 , props: { file }})
        },

        setup() {

            Messager.on( "~keyboard", payload => {
                if( payload.action === "keydown" && payload.key === "esc" ) {
                    this.search = ""
                    this.query = ""
                }
            })
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
    height: 100vh !important;
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

img.img {
    cursor: pointer;
}

.search {
    margin-left: 10px !important;
    border: 0 !important;
}

.search input::after{
    content: '<i>Hello, World</i> ';
}

datalist {
    display: inline-block;
}

</style>
