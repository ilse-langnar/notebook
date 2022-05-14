<template lang="pug" >
.ghost-note.flex( :style="style" )
    p.paragraph-note ⚫
    textarea.textarea.rendered( v-model="content" @input="on_input" @blur="on_blur" @focus="on_focus" placeholder="New note Content" @keydown.enter="on_keydown_enter" @keydown.tab="on_keydown_tab" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
    // import note                       from "@/components/note.vue"

// A note that does not exists already, it's used to create new notes
export default {

    name: "GhostNote",

    data() {
        return {
            ilse: ilse,
            is_on: false,
            content: "",
            style: "",
        }
    },

    components: {
        // Note,
    },
    props: {
        payload: { type: Object, required: false, },
    },

    methods: {

        on_keydown_tab() {
            event.preventDefault()
            this.$emit( "on-enter", { content: this.content, payload: this.payload })
            this.reset()
        },

        on_keydown_enter( event ) {

            event.preventDefault()
            this.$emit( "on-enter", { content: this.content, payload: this.payload })
            this.reset()
        },

        on_input() {
        },

        reset() {
            this.style = "filter: opacity(0.3);";
            this.content = ""
        },

        on_blur() {
            this.$emit( "on-blur", { content: this.content, payload: this.payload })
            this.reset()
        },

        on_focus() {
            this.style = "filter: opacity(1);";
        },

        setup() {
            this.style = "filter: opacity(0.3);";
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped >

.rendered {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 30px;
}

.paragraph-note {
    margin-top:   -5px;
    text-align:   center;
    cursor:       pointer;
    color:        #a3a3a3;
    color:        var(--text-color);
    font-size:    24px;
}

.ghost-note {
    width: 100%;
}

.ghost-note:hover {
    color: var( --text-color );
    background: var( --background-color );
    filter: opacity(1) !important;
    color: #fff;
}

</style>
