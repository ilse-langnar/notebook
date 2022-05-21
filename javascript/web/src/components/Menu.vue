<template lang="pug" >
.menu
    br
    // .item.flex
        img( src="@/assets/images/calendar.svg" style="width: 18px;")
        p( @click="add_daily_notes" title="Daily Notes" ) Daily Notes

    // .item.flex
        img( src="@/assets/images/math-function.svg" style="width: 18px;")
        p( @click="interest_repetition" title="Interest Repetition" ) Interest Repetition

    // .item.flex
        img( src="@/assets/images/report.svg" style="width: 18px;")
        p( @click="statistics" title="Statistics") Statistics

    .mini-space
    p( style="cursor: auto; text-align: center;" ) Favorites:

    .loop( v-for="( favorite, index ) in ilse.config.favorites" :key="index" @click="open_file(favorite)" @click.ctrl="open_file_graph(favorite)" :title="favorite" )
        p.item {{ilse.utils.truncate_text(favorite, 8)}}

    .mini-space
    p( style="cursor: auto; text-align: center;" ) Plugins:

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Menu",

    props: {
    },

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        open_file_graph( file ) {
            let component = new ilse.classes.Component({ type: "graph", width: 8, props: { file }})
                ilse.components.push( component )
        },

        open_file( file ) {
            let component = new ilse.classes.Component({ type: "file", width: 8, props: { file } })
                ilse.components.push( component )
        },

        add_daily_notes() {
            let component = new ilse.classes.Component({ type: "daily-notes", with: 8 })
                ilse.components.push( component )
        },

        interest_repetition() {
            let component = new ilse.classes.Component({ type: "interest-repetition", width: 8 })
                ilse.components.push( component )
        },

        statistics() {
            let component = new ilse.classes.Component({ type: "statistics", width: 8 })
                ilse.components.push( component )
        },

        setup() {
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
}

.flex {
    background: var( --background-color );
    color: var( --text-color );
}

.menu {
    flex-grow: 0% !important
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

</style>
