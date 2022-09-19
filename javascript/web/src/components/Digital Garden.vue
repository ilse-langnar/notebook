<template lang="pug" >
.digital-garden
    h1.centered Digigtal Garden( Export to HTML DNA )
    br

    .flex
        .item
            p Template: 
        .item
            input.input( v-model="garden_url" style="width: 100%;" placeholder="https://raw.githubusercontent.com/ilse-langnar/notebook/dev/javascript/quine/index.html" )
        p Add Link:
        input.input( v-model="link" @keydown.enter="add_link(link)" )
        button( @click="add_link(link)" ) Add
    br

    .flex.links
        p Links: 
        .loop( v-for="( item, index ) in links" :key="index" style="" )
            img.is-pulled-right( :src="irequire.img('x.svg')" @click="links.splice( index, 1)" style="width: 10px;" )
            p {{item}}

    br

    .centered
        p Description: 
        textarea.textarea( v-model="description" )

    .centered
        button( @click="export_garden" ) Export Garden

    .clear

    // .flex
        p( v-if="removed_notes.length" ) Remove
        p( v-if="get_link_notes(link).length" ) Include

    .flex
        // .loop( v-for="( item, index ) in removed_notes" :key="'filter-out-' + index" )
            Notes( :note="ilse.notes.query(item)[0]" :options="{ read_only: true }" @on-note-click="removed_notes.splice( index, 1 )" )

        .loop( v-for="( link, index ) in links" :key="index" )
            .loop( v-for="( item, index ) in ilse.notes.query(link)" :key="index" :style="get_note_style( link, item )" )
                img.is-pulled-right( :src="irequire.img('x.svg')" @click="filter_out(item.id)" style="width: 15px; cursor: pointer;" title="Exclude" )
                Notes( :note="item" :options="{ read_only: true }" )

            .loop( v-if="!ilse.notes.query(link).length" )
                p Nothing Found for: {{link}}


        br

// @on-note-click="filter_out(item.id)" 

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

// Functions
    import export_digital_garden        from "@/classes/export_digital_garden.js"
    import html_to_string               from "@/classes/html_to_string.js"

export default {

    name: "DigitalGarden",

    data() {
        return {
            ilse: ilse,
            garden_url: "",
            description: "",

            removed_notes: [],

            link: "",
            links: [],
        }
    },

    components: {
        Notes,
    },

    methods: {

        get_note_style( link, item ) {

            let style           = ``
            let removed_notes   = this.removed_notes
            let is_filtered_out =  removed_notes.indexOf( item.id ) !== -1
                if( is_filtered_out ) style += `border: 1px dashed red;`

            return style
        },

        get_link_notes( link ) {

            let result   = ilse.notes.query(link)
            let removed  = this.removed_notes
            let filtered = result.filter( e => removed.indexOf(e.id) === -1 )
            return filtered
        },

        filter_out( id ) {
            printf( ">> Digital Garden -> filter_out -> id -> ", id )
            this.removed_notes.push( id )
        },

        async export_garden() {

            // let template_type = this.garden_url ? 'url' : 'template'
            // let result, template

            let result, template

            try  {
                result   = await fetch("https://raw.githubusercontent.com/ilse-langnar/notebook/dev/javascript/quine/index.html")
                template = await result.text()
            } catch( e ) {
                template = html_to_string( document )
            }

            let styles = document.getElementsByTagName( "style" )
                printf( "styles -> ", styles )

            printf( "template -> ", template )

            let links    = this.links
                printf( "links -> ", links )

            let removed  = this.removed_notes
                printf( "removed -> ", removed )

            export_digital_garden( template, links, removed )


            /*
            if( template_type === "url" ) {
                printf( "1 url" )
                result   = await fetch("https://raw.githubusercontent.com/ilse-langnar/notebook/dev/javascript/quine/index.html")
                template = await result.text()
            }

            if( template_type === "template" ) {
                printf( "2 template" )

                let use_self_as_template = (ilse.platform === "demo" || ilse.platform === "quine")
                printf( "3 template" )

                // I want to have digital-garden but only it's electron
                if( use_self_as_template ) {
                    printf( "4 self" )
                    // template = html_to_string( document )
                    template = html_to_string( document )
                }

                if( !use_self_as_template ) {
                    printf( "5 require('@/assets/digital-garden.html')" )
                    // result   = require("@/assets/digital-garden.html")
                    // template = result.default
                }

            }

            printf( "template_type -> ", template_type )
            printf( "template -> ", template )
            printf( "ilse.platform -> ", ilse.platform )
            */

            // TODO: When I compile my quine/demo, they need to use their own source as quine, not an external .html( optionally a URL )
            // if( use_default_template ) {
                // result   = require("@/assets/digital-garden.html")
                // template = result.default
                // printf( "using default template" )
            // } else {
                // printf( "URLing ..." )
            // }
        },

        add_link( input ) {
            this.links.push( input )
            this.link = ""
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

.digital-garden .flex input.input {
    margin-right: 20px;
}
 

.flex .item {
}

.loop {
    margin-left: 5px;
}

.flex p {
    margin-right: 5px;
}

textarea.textarea {
    background: var( --backround-color );
    resize: none;
    color: var( --text-color );
    border: 1px solid var( --text-color );
    width: 70%;
    height: 100px;
}

.flex .links .loop {
    width: fit-content;
    border: 1px solid var( --secondary-text-color );
    border-radius: var( --border-radius );
    padding: var( --padding ); 
}

.drop {
    width: 100%;
    border: 1px dotted #000; 
}

</style>
