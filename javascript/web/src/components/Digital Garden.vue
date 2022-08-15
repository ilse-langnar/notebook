<template lang="pug" >
.digital-garden
    h1.centered Digigtal Garden
    br

    .flex
        .item
            p Template: 
        .item
            input.input( v-model="garden_url" style="width: 100%;" )

    br

    .flex
        p Link to add: 
        input.input( v-model="link" @keydown.enter="add_link(link)" )
        button( @click="add_link(link)" ) Add
    br
    .flex
        p Links: 
        .loop( v-for="( item, index ) in links" :key="index" style="width: fit-content; border: 1px solid var( --text-color ); border-radius: var( --border-radius ); padding: var( --padding ); " )
            img.is-pulled-right( :src="irequire.img('x.svg')" @click="links.splice( index, 1)" style="width: 10px;" )
            p {{item}}

    br

    .flex
        p Description: 
        textarea.textarea( v-model="description" )

    .flex
        button( @click="export_garden" ) Export Garden

    .clear
    .flex
        p Selected Notes: 
        .loop( v-for="( link, index ) in links" :key="index" )
            p.is-size-3 {{link}}
            .loop( v-for="( item, index ) in ilse.notes.query(link)" :key="index" )
                Notes( :note="item" :options="{ read_only: true }" )
            .loop( v-if="!ilse.notes.query(link).length" )
                p Nothing Found for: {{link}}
        br

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

    name: "DigitalGarden",

    data() {
        return {
            ilse: ilse,
            garden_url: "https://raw.githubusercontent.com/ilse-langnar/notebook/dev/javascript/quine/index.html",
            description: "",

            link: "",
            links: [],
        }
    },

    components: {
        Notes,
    },

    methods: {

        async export_garden() {

            let o    = await fetch("https://raw.githubusercontent.com/ilse-langnar/notebook/dev/javascript/quine/index.html")
            let text = await o.text()
            let notes= ""

            this.links.map( link => {
                ilse.notes.query(link).map( item => {
                    notes += item.get() + "\n"
                })
            })

            printf( "notes -> ", notes )

            let filesystem = {
                "/": {
                    "notes": notes,
                    "queue": "",
                    "statistics": "",
                    "priorities": "",
                    "config.json": JSON.stringify( ilse.config.get_normalized_config() ),
                    "second/": {

                    },
                    "first/": {

                    },
                    ".trash/": {

                    },
                    "plugins/": {

                    },
                }
            }

            text = text.replace( "<div id=\"app\"> </div>", `<div id="app"> </div>
            <div id="db">
                ${JSON.stringify(filesystem)}
            </div>
            `)

            ilse.utils.download_text( text, "index.html" )

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

</style>
