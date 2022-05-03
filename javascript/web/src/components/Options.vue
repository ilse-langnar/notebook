<template lang="pug" >
.options
    input.input.search( :id="id + '-search-input'" v-model="search_query" placeholder="🔎" accesskey="f" @keydown="on_key_down" @blur="on_blur" )

    .search-result( :style="get_search_result_style()" )
        .item.flex( v-if="!search_result.length" )
            p.is-size-6( style="" ) No Results Found for {{search_query}}
        p.is-size-6.is-pulled-left( v-if="search_result.length" ) {{search_result.length}} Result[s]
        .clear
        .item.flex( v-if="search_result.length" v-for="( result, index ) in search_result" :key="index" :style="get_search_result_item_style( index )" :id="'search-item'+ index" )

            span.paragraph-note ⚫
            img.img( :src="get_icon(result.icon)" )
            p.text( title="Click to open" @click="on_search_result_click($event, result)" ) {{result.id}}


</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse             from "@/ilse.js"


// TODO: BUG: search is not good enough
export default {

    name: "Options",

    data() {
        return {
            ilse: ilse,
            search_query: "",
            search_result_selected_index: 0,
            search_result: [],
            can_search: true,
        }
    },

    props: {
        id: { type: String, required: false, default: function() { return Math.random().toString() } },
        width: { type: Number, required: false, },
        shouldAutofocus: { type: Boolean, required: false, default: false },
    },

    search_query( search ) {

        // BUGFIX: this will load ALL notes ... heavy operation
            if( !search ) return

        let that = this
        clearTimeout( this.timeout )

        this.timeout = setTimeout( () => {
            that.search()
        }, 1500 )
    },

    methods: {

        get_icon( icon ) {
            return require( `@/assets/images/${icon}` )
        },

        on_search_result_click( event, result ) {
            printf( "on_search_result_click -> result -> ", result )
            // TODO: 
        },

        get_search_result_style() {

            let style = ``

            let has_width = this.width
                if( has_width ) style += `width: ${this.width}%;`

            return style

        },

        get_search_result_item_style( index ) {

            let style       = ``

            let is_selected = index === this.search_result_selected_index
                if( is_selected ) style       += `border: 1px solid gray; border-radius: 7px; padding: 1px;`

            return style

        },

        close_options() {
            this.search_query  = ""
            this.search_result = []
            // Blur whatever element is focused!!
            this.can_search    = true
            document.activeElement.blur()

        },

        on_blur() {
            setTimeout( () => {
                this.close_options()
                this.$emit( "on-blur" )
            }, 200 )
        },

        on_key_down() {

            let key         = event.key

            if( key === "Enter" ) {
                this.on_keydown_enter()
            }

            if( key === "Escape" ) {
                this.on_keydown_esc()
            }

            if( key === "ArrowUp" ) {
                this.on_keydown_arrow_up()
            }

            if( key === "ArrowDown" ) {
                this.on_keydown_arrow_down()
            }
        },

        on_keydown_enter() {
            this.search()
        },

        on_keydown_esc() {
            this.$emit( "on-esc" )
            this.close_options()
        },

        on_keydown_arrow_up() {
            let copy    = this.search_result_selected_index
            let go_upper  = --copy <= -1 
                if( go_upper ) {
                    this.search_result_selected_index = this.search_result.length
                    return
                }

            this.search_result_selected_index--
        },

        on_keydown_arrow_down() {

            let copy    = this.search_result_selected_index
            let is_lower  = ++copy >= this.search_result.length
                if( is_lower ) {
                    this.search_result_selected_index = 0
                    return
                }

            this.search_result_selected_index++

            // Might do: scroll down-list
        },



        search() {

            // BUGFIX: Avoid Duplicated Search
                if( !this.can_search ) return

            let query               = this.search_query
                if( !query ) return

            this.search_result = []

            let list     = ilse.options.list.map( note => {
                return note
            })

            // Search
            let note_result    = []
            let match          = false
            let is_dup         = false

            for( const item of list ) {

                match  = item.id.indexOf( query ) !== -1
                is_dup = this.search_result.indexOf( item ) !== -1

                if( match && !is_dup ) this.search_result.push( item )
            }

            // === notes === //
            this.can_search = false

        },

        autofocus() {
            const dom = document.getElementById( `${this.id}-search-input` )
            dom.focus()
        },

        show_all_options() {
            this.search_result  = ilse.options.list
        },

        setup() {

            // autofocus
            if( this.shouldAutofocus ) this.autofocus()

            this.show_all_options()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

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
    line-height: 10px;
    list-style: none;
    padding: 6px 16px;
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
    background-color: var( --text-color );
    color: var( --background-color );
    background-color: var( --background-color );
    color: var( --text-color );
    border: var( --border );
}

.search-result {
    position: absolute;
    /*min-width: 50%;*/
    min-width: 10%;
    overflow: auto;
    height: 50vh;
    background-color: #f1f1f1;
    background-color: var( --background-color );
    color: var( --text-color );
    padding: 5px;
    filter: opacity(0.9);
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    border-radius: 4px;
    font-weight: 300;
    z-index: 10;
}


.options img.img {
    margin-right: 10px;
}

.options p.text {
    font-size: 1.5em;
}

.options .search-result .result-length {
    margin-bottom: 10px;
    clear: both;
    display: block;
}

.clear {
    heighr: 20px;
    clear: both;
}

</style>
