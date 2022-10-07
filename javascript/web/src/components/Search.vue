<template lang="pug" >
.search-wrapper

    .flex( style="margin: auto;" )
        input.input.search( ref="input" :id="id + '-search-input'" v-model="search_query" placeholder="🔎" accesskey="f" @keydown="on_key_down" )

        .display-mode

            img( v-show="is_markdown_mode_on" :src="irequire.img('markdown.svg')" @click="toggle_markdown_mode"  :title="$t('search_markdown_mode')" aria-role="markdown" :alt="$t('search_markdown_mode')" )
            img( v-show="!is_markdown_mode_on" :src="irequire.img('letter-case.svg')" @click="toggle_markdown_mode"  :title="$t('search_text_mode')" aria-role="text" :alt="$t('search_text_mode')" )

            img( v-show="filter === 'notes' " :src="irequire.img('point.svg')" @click="toggle_filter_mode" :title="$t('search_filter_mode_notes')" aria-role="markdown" :alt="$t('search_filter_mode_notes')" )

            img( v-show="filter === 'files' " :src="irequire.img('file.svg')" @click="toggle_filter_mode"  :title="$t('search_filter_mode_files')" aria-role="text" :alt="$t('search_filter_mode_files')" )

            img( v-show="filter === 'all' " :src="irequire.img('filter.svg')" @click="toggle_filter_mode"  :title="$t('search_filter_mode_all')" aria-role="text" alt="$t('search_filter_mode_all')" )

    .search-result( v-if="search_query" )
        .nothing.item.flex( v-if="!search_result.length" )
            p.is-size-6 {{ $t( "search_nothing_found_for" ) }} {{search_query}}
        p.is-size-6.is-pulled-left( v-if="search_result.length" ) {{search_result.length}} {{ $t('search_results') }}
        br
        .item.flex( v-if="search_result.length" v-for="( result, index ) in search_result" :key="index" :style="get_search_result_item_style( index )" :id="'search-item'+ index" )

            span.paragraph-note ⚫
            p( v-if="!is_markdown_mode_on" :style="get_p_style(result.type)" :title="$t('click_to_open')" @click="on_search_result_click($event, result)" ) {{result.content}}
            p( v-if="is_markdown_mode_on"  :style="get_p_style(result.type)" :title="$t('click_to_open')" @click="on_search_result_click($event, result)" v-html="get_html(result.content)" ) 

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Search",

    props: {
        id: { type: String, required: false, default: function() { return Math.random().toString() } },
        component: { type: Object, required: false }
    },

    data() {
        return {
            ilse: ilse,

            search_query: "",
            search_result: [],
            search_result_selected_index: 0,
            can_search: true,


            last_attempt: 0,
            timeout: {},

            is_markdown_mode_on: (this.component && this.component.payload && this.component.payload.is_markdown_mode_on) || true ,
            filter: (this.component && this.component.payload && this.component.payload.filter) || "all",
        }
    },

    watch: {

        search_query( search ) {

            // BUGFIX: this will load ALL notes ... heavy operation
                if( !search ) {
                    this.close_search( false )
                    return
                }

            let that = this
            clearTimeout( this.timeout )

            this.timeout = setTimeout( () => {
                that.search()
            }, 1500 )
        },

    },

    methods: {

        toggle_filter_mode() {

            if( this.filter === "all" ) {
                this.filter = "notes"
            } else if( this.filter === "notes" ) {
                this.filter = "files"
            } else if( this.filter === "files" ) {
                this.filter = "all"
            }

        },

        get_p_style( type ) {
            let style = ``

            if( type === "file" ) style += "font-weight: bold;"

            return style
        },

        toggle_markdown_mode() {
            this.is_markdown_mode_on = !this.is_markdown_mode_on
        },

        get_html( string ) {
            let o = ilse.markdown.render( string )
            return o
        },

        get_search_result_item_style( index ) {

            let style       = ``
            let is_selected = index === this.search_result_selected_index

            if( is_selected ) {
                style       += `border: 1px solid gray; border-radius: 7px; padding: 1px;`
            }

            return style

        },

        on_search_result_click( event, item ) {

            let is_shift_pressed    = event.shiftKey
            let is_ctrl_pressed     = event.ctrlKey
            let target              = this.component.payload.id

            let is_note             = item.type === "note"
            let is_file             = item.type === "file"

            /*
            if( this.component.payload.mode === "embed" ) {
                if( is_note ) Messager.emit( "~search.vue", "select", { type: item.type, target: target, shift: is_shift_pressed, ctrl: is_ctrl_pressed, text: item.id })
                if( is_file ) Messager.emit( "~search.vue", "select", { type: item.type, target: target, shift: is_shift_pressed, ctrl: is_ctrl_pressed, text: item.content })
            } else if( this.component.payload.mode === "global" ){

                if( is_note ) {
                    let note = ilse.notes.query( `${item.id}:` )[0]
                    let component = new ilse.classes.Component({ type: "edit-note", width: 12, props: { note: note.id} })
                        ilse.components.push( component )
                } else {
                    let component = new ilse.classes.Component({ type: "file", width: 12, props: { file: item.content } })
                        ilse.components.push( component )
                }

            }

            ilse.modals.close()
            */
        },

        on_blur() {
            setTimeout( () => {
                this.close_search()
                this.$emit( "on-blur" )
            }, 200 )
        },

        on_key_down_enter( event ) {
            let is_shift_pressed  = event.shiftKey
            let is_ctrl_pressed   = event.ctrlKey

            let should_search     = !this.search_result.length
            if( should_search ) {
                this.search()
                return
            } 

            let item = this.search_result[this.search_result_selected_index]

            // File or Note?
            if( item.type === "note" ) {
                this.$emit( "on-result-select", { shift: is_shift_pressed, ctrl: is_ctrl_pressed, note_id: item.id })
            }

            if( item.type === "file" ) {
                this.$emit( "on-result-select", { shift: is_shift_pressed, ctrl: is_ctrl_pressed, file: item.content, })
            }

            return

        },

        on_key_down_esc() {
            this.$emit( "on-esc" )
            let target              = this.component.payload.id
            Messager.emit( "~search.vue", "cancel", { target: target })
            this.close_search()
        },

        on_key_down_arrow_up() {

            let copy    = this.search_result_selected_index
            let go_upper  = --copy <= -1 
                if( go_upper ) {
                    this.search_result_selected_index = this.search_result.length
                    return
                }

            this.search_result_selected_index--

            /*
            setTimeout( () => {

                let dom = document.getElementById( 'search-item' + this.search_result_selected_index )

                let is_attempting_too_fast  = this.last_attempt >= ( Date.now() - 4000 )
                    if( is_attempting_too_fast ) return

                if( dom ) dom.scrollIntoView()
                // window.location.href = "search-item" + this.search_result_selected_index

            }, 1000 )
            */

        },

        on_key_down_arrow_down() {

            let copy    = this.search_result_selected_index
            let is_lower  = ++copy >= this.search_result.length
                if( is_lower ) {
                    this.search_result_selected_index = 0
                    return
                }

            this.search_result_selected_index++

            /*
            setTimeout( () => {

                let dom = document.getElementById( 'search-item' + this.search_result_selected_index )

                let is_attempting_too_fast  = this.last_attempt >= ( Date.now() - 4000 )
                    if( is_attempting_too_fast ) return

                if( dom ) dom.scrollIntoView()
                // window.location.href = "search-item" + this.search_result_selected_index

            }, 1000 )
            */

        },

        on_key_down( event ) {

            let key               = event.key
            let is_shift_pressed  = event.shiftKey
            let is_ctrl_pressed   = event.ctrlKey

            if( key === "Enter" ) {
                this.on_key_down_enter( event )
            }

            if( key === "Escape" ) {
                this.on_key_down_esc()
            }

            if( key === "ArrowUp" ) {
                this.on_key_down_arrow_up()
            }

            if( key === "ArrowDown" ) {
                this.on_key_down_arrow_down()
            }

        },

        close_search( blur = true ) {
            this.search_query  = "" // Reset
            this.search_result = [] // Reset
            this.can_search    = true // Reset
            if( blur ) document.activeElement.blur() // Blur whatever element is focused!!
        },

        search() {

            // BUGFIX: Avoid Duplicated Search
                if( !this.can_search ) return

            let query               = this.search_query
                if( !query ) return

            // === Files === //
                let file_list           = ilse.files.list.map( file => {
                    return {
                        content: file,
                        type: "file",
                    }
                })

                // Search
                let file_result    = []
                let has_file_match = false

                for( const item of file_list ) {

                    has_file_match = item.content.indexOf( query ) !== -1
                    if( has_file_match && (/*Filter*/ this.filter === "files" || this.filter === "all") ) this.search_result.push( item )
                }
            printf( " 1 this.search_result -> this.search_result.length -> ", this.search_result.length )

            // === Files === //



            // === notes === //
                let note_list     = ilse.notes.list.map( note => {
                    return {
                        content: note.content,
                        type: "note",
                        id: note.id,
                    }
                })

            // Search
                let note_result    = []
                let has_note_match = false

                for( const item of note_list ) {

                    has_note_match = item.content.indexOf( query ) !== -1
                    if( has_note_match && (/*Filter*/ this.filter === "notes" || this.filter === "all" ) ) this.search_result.push( item )
                }

            // === notes === //
            this.can_search = false

        },

        autofocus() {
            if( this.$refs.input )  {

                setTimeout( () => { this.$refs.input.focus() }, 500 )
            }
            // const dom = document.getElementById( `${this.id}-search-input` )
                // dom.focus()
        },

        setup() {
            this.autofocus()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.search-wrapper {
    /*filter: opacity( 0.7 );*/
}

.note-search .search {
    padding: 10px;

}

.note-search {
    color: var( --text-color );
    background: var( ---background-color );
}

.search {
    appearance: none;
    background-color: #FAFBFC;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 7px;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
    box-sizing: border-box;
    color: rgb(118 118 118);
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    line-height: 4px;
    height: 33px;
    list-style: none;
    position: relative;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    word-wrap: break-word;
    font-weight: 0;
    background-color: #f1f1f1;
    background-color: var( --background-color );
    color: var( --text-color );
    border: 1px solid var( --background-color );
    width: 80%;
    display: block;
    margin: 0 auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}

.search-result {
    /*position: absolute;*/
    /*min-width: 50%;*/
    /*min-width: 10%;
    overflow: auto;
    height: 50vh;
    background-color: #f1f1f1;
    background-color: var( --background-color );
    color: var( --text-color );
    padding: 5px;*/
    /*filter: opacity(0.9);*/
    /*box-shadow: 2px 3px 5px rgba(0,0,0,.2);*/
    border-radius: 4px;
    /*font-weight: 300;*/
    z-index: 10;
}


.display-mode {
    display: inline;
    margin: 5px;
    vertical-align: middle;
    cursor: pointer;
}
.display-mode img {
    width: 17px !important;
}


.item.flex p {
    margin-bottom: 10px;
    cursor: pointer;
}

.clear {
    heighr: 20px;
    clear: both;
}

</style>
