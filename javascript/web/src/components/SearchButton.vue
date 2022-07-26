<template lang="pug" >
.search-button
    button.button( @click="on_button_click()" )
        span.text Search
        span.shortcut
            img( src="@/assets/images/keyboard.svg" style="width: 10px; " )
            span s s

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "SearchButton",

    data() {
        return {
            ilse: ilse,
        }
    },


    methods: {

        on_button_click() {
            this.open_search_modal()
        },

        open_search_modal() {
            ilse.modals.open( "search", { mode: "global", filter: "all", is_markdown_mode_on: true, id: null  })
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

.search-button button {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: var( --background-color );
    border-radius: var( --border-radius );
}


button span.text  {
    color: var( --text-color );
}

.search-button button {
    cursor: pointer;
}

</style>
