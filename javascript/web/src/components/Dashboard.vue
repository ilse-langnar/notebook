<template lang="pug" >
.dashboard
    // .centered
        h1 Dashboard
    .centered
        button( @click="selected = 'month' " )
            a Month
        button( @click="selected = 'week' " )
            a Week
        button( @click="selected = 'day' " )
            a Day

    br
    .month( v-if="selected === 'month' " )
        .flex( style="margin: 0; " )
            .fitem( v-for="( item, index ) in 12" :key="index" style="margin: 0 auto;" )
                button( @click="month_selected = item" ) {{get_shortcut(++index)}}

        br
        .selected.centered
            h2 {{ilse.utils.get_month_name_by_number(month_selected)}}
            p {{ilse.notes.query("20220" + month_selected).length}}
            // .loop( v-for="( item, index ) in ilse.notes.query('20220' + month_selected).length " :key="index" )
                // Notes( :note="ilse.notes.query(item + ': ')" )
            

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

    name: "Dashboard",

    data() {
        return {
            ilse: ilse,
            selected: 'month',
            month_selected: "",
        }

    },

    components: {
        Notes,
    },

    methods: {

        get_shortcut( index ) {
            printf( "Dashboard -> index -> ", index )
            let name   = ilse.utils.get_month_name_by_number( index )
            printf( "Dashboard -> name -> ", name )
            let short  = ilse.utils.get_month_shortcut( name )
            printf( "short -> ", short )
            return short.replace(",", "")
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

.dashboard .centered button {
    margin-left: 5px;
    cursor: pointer;
}

.month .flex .fitem button  {
    cursor: pointer;

}
     
</style>
