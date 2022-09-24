<template lang="pug" >
.mind-map#mind-map( :style="get_mindmap_style(component.props.is_child)" )
    svg#svg( :style="get_svg_style(component.props.is_child)" )
        foreignObject( requiredExtensions="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; overflow: visible; background: var( --background-color );" )
            body(xmlns="http://www.w3.org/1999/xhtml" )
                // RecursiveNoteMindMap( :note="get_note(component.props.id)" )
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
    import Note                         from "@/components/Note.vue"
    // import RecursiveNoteMindMap                from "@/components/RecursiveNoteMindMap.vue"

// Libraries
    // import svgPanZoom from "svg-pan-zoom"


export default {

    name: "MindMap",

    data() {
        return {
            ilse: ilse,
            modes: [ "pan", "tree" ],
        }
    },

    components: {
        Note,
        // RecursiveNoteMindMap,
    },

    props: {
        component: { type: Object, required: false },
    },

    methods: {

        get_note( id ) {
            let result = ilse.notes.query( `${id}:` )[0]
            return result
        },

        get_svg_style( is_child ) {
            let style = `overflow: hidden; background: var( --background-color );`
                // if( is_child ) style += "width: 100%; height: 100px; overflow: auto;"
                // if( is_child ) style += "overflow: auto;"
                // if( is_child ) style += "block-size: fit-content;"
                // if( is_child ) style += ""

            return style
        },

        get_mindmap_style( is_child ) {

            let style = ``
            if( is_child ) style += `border: .1pc solid #000; overflow: auto; `
            return style

        },

        next_mode() {
            let item = this.modes.shift()
            this.modes.push( item )
        },

        on_note_click( payload ) {

            let note      = payload.note
            let event     = payload.event
            let is_shift  = event.shiftKey

            if( is_shift ) {
                let component = new ilse.classes.Component({ type: "mind-map", width: 12, props: { note: note } })
                    ilse.components.push( component )
            }

            // let component = new ilse.classes.Component({ type: "mind-map", width: 12, props: { note: note } })
                // ilse.components.push( component )
        },

        get_child_component( note ) {

            let component = {
                id: Math.random().toString(),
                is_on: true,
                props: {
                    note: note,
                    is_child: true,
                },
                type: "mind-map",
                width: 12,
            }

            return component
        },

        listen() {

            if( this.component.props.is_child ) return

            /*
            Messager.on( "~notes", (action, payload) => {

                if( action === "added" ) {

                    let after       = payload.after
                    let new_note    = payload.note
                    let is_equal

                    printf( "after -> ", after )

                    after.children.push( new_note )
                    // this.component.props.note.children.push( new_note )

                    // let day         = this.get_note_day( after )
                    // let note_index  = day.notes.indexOf( after )
                    // let day_index   = this.days.indexOf( day )
                        // this.days[day_index].notes.splice( ++note_index, 0, new_note )

                } else if( action === "deleted" ) {

                    let note      = payload
                    // let day         = this.get_note_day( note )
                    // let note_index= day.notes.indexOf( note )
                    // let day_index   = this.days.indexOf( day )
                        // this.days[day_index].notes.splice( note_index, 1 )
                    // this.key = Math.random()
                }

            })
            */

        },

        create_svg() {
            if( this.component.props.is_child ) return
            let instance = svgPanZoom('#svg')
            printf( "instance -> ", instance )

        },

        setup() {
            this.listen()
            // this.create_svg()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>

.mind-map .textarea {
    width: fit-content !important;
}

.mind-map {
    width: 98%;
    margin: 0 auto;
    /*height: 100vh;;
    height: 100%;*/

    /*border: 1px solid #000;*/
    /*overflow: auto;*/
    margin-bottom: 3px solid #000;
    /*overflow: auto;*/

}

svg#svg {
    /*border: 1px solid #000;*/
    /*width: 100%;
    height: 100vh;
    overflow: hidden;*/
    z-index: 1;
    background: var( --background-color );
    width: 100%;
    height: 100vh;
}

.container .item {
    /*height: 100%;*/
}

.clear {
    clear: both;
    height: 100px;
}

</style>
