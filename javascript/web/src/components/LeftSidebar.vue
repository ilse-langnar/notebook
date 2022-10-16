<template lang="pug" >
.left-sidebar( :key="ilse.left_sidebar" style="margin-left: 10px; padding: 10px;" )

    .default( v-if="ilse.left_sidebar === 'default' " )

        // .flex( style="border-radius: var( --border-radius ); " )
            // img( :src="irequire.img('lupe.svg')"    )

        input.input.search#quick-search( v-model="query" list="list" @keydown.enter="search = query" @keydown.esc="on_input_keydown_esc" style="width: 90%; ")
        .search-result( v-if="(search && query) && (search === query)" style="position: absolute; top: 90px; left: 0%; width: 80%; border: 1px solid #000; background: #fff; overflow: hidden; height: 80vh; z-index: 5; overflow-y: scroll; resize: right; " )
            Notes( v-for="( item, index ) in ilse.notes.query( search )" :key="'notes-' + index" :note="item" :options="{}" )

            br

        br
        br

        .buttons
            .flex( @click="add_daiyl_notes" style="border-radius: var( --border-radius );" )
                img( :src="irequire.img('calendar.svg')"      style="cursor: pointer; width: 20px; margin-left: 15px; "   :title="$t('daily_notes')" )
                span.item Daily Notes

        br
        br

        // Favorites

    .filesystem( v-if="ilse.left_sidebar === 'filesystem' " )
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    .else( v-else )
        // Notes( :note="ilse.left_sidebar" )
        Outline( v-if="get_left_sidebar().length" :notes="get_left_sidebar()" )

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
    import Favorites                    from "@/components/Favorites.vue"
    import Outline                      from "@/components/Outline.vue"

// Functions
    import add_component                from "@/classes/add_component.js"
    import update_key                   from "@/classes/update_key.js"
    import open_modal                   from "@/classes/open_modal.js"
    import if_else                      from "@/classes/if_else.js"
    import set                          from "@/classes/set.js"
    import same                         from "@/classes/same.js"
    import and                          from "@/classes/and.js"
    import listen_to_message            from "@/classes/listen_to_message.js"
    import Resizable                    from "resizable"

export default {

    name: "LeftSidebar",

    components: {
        Notes,
        Favorites,
        Outline,
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
        }
    },

    methods: {

        get_left_sidebar() {

            let array = []

            array.push( ilse.left_sidebar )

            return array
        },

        get_list() {
            if( ilse.config.left_sidebar ) return ilse.config.left_sidebar
            return []
        },

        on_input_keydown_esc() {
            set( this, "search", "" )
            set( this, "query", "" )
        },

        on_favorite_click( file ) {
            add_component({ type: "file", width: 8, props: { file  }})
        },

        open_dashboard() {
            add_component({ type: "dashboard", width: 12, props: {}})
        },

        add_daiyl_notes() {
            add_component({ type: "daily-notes", width: 12, props: {}})
        },

        on_note_link_click( payload /*{link, event}*/ ) {
            add_component({ type: "file", width: 8 , props: { file: payload.link}})
        },

        listen_to_esc_from_keyboard() {

            listen_to_message( "~keyboard", payload => {

                if_else(

                    and(
                        same(payload.action, "keydown"),
                        same(payload.key, "esc"),
                    ),
                    yes => { set( this, "search", "" ); set( this, "query", "" ) },
                    no  => null
                )
            })

        },

        setup() {

            /*
            var el = document.querySelector("#left-sidebar")

            var resizable = new Resizable( el, {
                within: 'parent',
                handles: 's, se, e',
                threshold: 10,
                draggable: true
            })

            printf( "resizable -> ", resizable )

            resizable.on( 'resize', function( event ) {
                printf( "event -> ", event )
            });
            */

            this.listen_to_esc_from_keyboard()
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

/*
.menu {
    padding: var( --padding );
    height: 100vh !important;

    color: var( --secondary-background-color );
    background-color: var( --secondary-text-color );
    padding: var( --padding );
    border-radius: var( --border-radius );
    margin-left: 30px;
    margin-top: 10px;
}
*/

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


#left-sidebar, .menu {
    height: 100px;
    /*resize: both;/*/
    overflow: auto;

    overflow: auto;
    background: var( --secondary-background-color );
    color: var( --secondary-text-color );
    border-radius: var( --border-radius ); 
}

    /*
#left-sidebar::after, .menu::after {
    content: '';
    border: 1px solid #000;
    background-color: #ccc;
    position: absolute;
    left: 0;
    width: 4px;
    height: 100%;
    cursor: ew-resize;
}
*/

</style>
