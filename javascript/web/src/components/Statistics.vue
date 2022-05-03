<template lang="pug" >
.statistics
    p.is-size-1( style="text-align: center;" ) Statistics

    vuetiful-board(
        theme="rainbow"
        :dark-mode="true"
        :col-num="12"
        :row-height="30"
        :layout-editable="false"
        :datasets="datasets"
    )

    p 2


    // g-gantt-chart(chart-start="2020-03-01 00:00" chart-end="2020-03-03 00:00")
        g-gantt-row( label="My row #1" )
        g-gantt-row( label="My row #2" )
        g-gantt-row( label="My row #3" )

    // .loop( v-for="( item, index ) in statistics" :key="index" )
        p {{break_item(item).file}}


    // table.table
        tr
            th Name
            th Time
            th Action
            th Operation 
            th Show 
        tr( v-for="( item, index ) in statistics" :key="index" v-if="item" )
            td {{ilse.utils.truncate_text(break_item(item).file, 25 )}}
            td {{break_item(item).time}}s
            td {{break_item(item).action}}
            td {{break_item(item).operation}}
            td 
                img(src="@/assets/images/book.svg" alt="")

        // tr
            td

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Messager
    // import { GGanttChart, GGanttBar }   from 'vue-ganttastic'


// import VuetifulBoard                    from 'vuetiful-board'

export default {

    name: "Statistics",

    components: {
        // GGanttChart,
        // GGanttBar,
        // VuetifulBoard,
    },

    data() {
        return {
            ilse: ilse,
            statistics: [],
            datasets: [
                {
                    chartInfo: {
                        series: [200, 12, 40, 25, 34, 6, 23],
                        options: {
                            chart: {
                                type: 'pie',
                                },
                            title: {
                                text: 'The recent inflow route',
                                align: 'center',
                                style: {
                                fontSize: '18px',
                                fontWeight: 'bold', },
                            },
                            labels: [ 'Javascript', 'Japanese', 'Chinese', 'Example', 'Kakaotalk Channel', 'Rumor', 'ETC', ],
                            fill: {
                                opacity: 1,
                                },
                            legend: {
                                position: 'bottom',
                            }
                        }
                    }, 
                    gridInfo: { x: 6, y: 0, w: 6, h: 12, i: '1', static: false }, 
                }
            ]
        }
    },

    methods: {

        break_item( item ) {


            let normalized  = item.substr( item.indexOf(":") + 3, item.length )
            let chunks      = normalized.split("/")
                let operation   = chunks[0]
                let action      = chunks[1]
                let time        = chunks[2]
                let file        = chunks[3]

            let payload = {
                operation,
                action,
                time,
                file,
            }
            printf( "payload -> ", payload )

            return payload

        },

        async init() {
            let statistics  = await ilse.filesystem.file.get( "s" )
                this.statistics = statistics.split("\n")
        },

        setup() {
            this.init()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped >

tr th  {
    padding: 10px;
}

tr td {
    padding: 10px;
}

</style>
