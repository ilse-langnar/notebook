<template lang="pug" >
// .orgchart
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    #chart-container
        .orgchart
            ul.nodes
                li.hierarchy
                    p.title Title
                    .node
                    p lorem
                        Note.content( v-if="component.props.note"  :note="component.props.note" )
                    i.edge.verticalEdge.bottomEdge.oci

// .orgchart
    table
        tr
            th First
            th Seonce
        tr
            td First
            td Second

.orgchar
    Note( :note=" note ? note: component.props.note" )
    // div.children( v-for="( _note, index ) in (note && note.children) ? note.children : component.props.note.children" :key="index" :style="get_note_style(_note)" )
        Note( :note="_note" )

    // div.children( v-for="( _note, index ) in (note && note.children) ? note.children : component.props.note.children" :key="index" )
        table
            tr
                td 
                    Note( :note="_note" )
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
    import GhostNote                    from "@/components/GhostNote.vue"
    import EditNote                     from "@/components/EditNote.vue"

export default {

    name: "OrgChart",

    props: {
        component: { type: Object, required: false, },
        note: { type: Object, required: false, }
    },

    components: {
        Note,
        GhostNote,
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        listen() {

            Messager.on( "~notes", (action, payload) => {

                if( action === "added" ) {

                    printf( "~notes -> action -> ", action )
                    printf( "~notes -> payload -> ", payload )
                    let after       = payload.after
                    let new_note  = payload.note

                    printf( "this.notes -> ", this.notes )

                    let index = 0 
                    for( const note of this.notes ) {
                        index++

                        if( note.id !== after.id ) continue

                        this.notes.splice( ++index, 0, new_note )
                        new_note.focus() 
                            return
                    } // for 

                }

            })

        },

        setup() {
            this.listen()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

table {
    border-collapse: collapse;
}

table tr th {
    padding: 10px;
}

table tr td {
    padding: 10px;
}


</style>
