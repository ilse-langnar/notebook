<template lang="pug" >
// .test
    // p.is-size-1.is-light.centered Statistics
    // img( src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F89%2F05%2F05%2F89050576bbc2f10542b79567178026c8.png&f=1&nofb=1" )

    svg( xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" )
        path(id="connector" fill="none" stroke="black" stroke-width="10" )

    #a This is a regular HTML div.
    #b So is this.


// .test( style="width: 90%; display: block; margin: 0 auto; " )
    button.button.slick-button( @click="on_click" ) Click
    br
    br
    br
    br
    br
    p.is-pulled-left( v-for="( word, index ) in list" :key="index" :style="word.style + 'text-align: center; '" ) {{word.word}}

.test( style="border: 1px solid #000; width: 100%;" )
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</template>
<script>
// eslint-disable-next-line
const printf                                                    = console.log;
    // import printf                                                       from "@/utils/functions/debugging/printf.js"

    // import axios                                        from "axios"
    import ilse                                         from "@/ilse.js"
    // import GraphPixel                                   from  "ngraph.pixel"
    // import HLayout                                      from  "ngraph.hlayout"
    // import createGraph                                  from 'ngraph.graph'
    import LeaderLine                                   from "leader-line-new"
    import orgchart                                     from "orgchart"
    printf( "orgchart -> ", orgchart )

export default {

    name: "Test",

    data() {
        return {
            text: "",
            list: [
                { word: "In January 2001,", style: "color: #000;" },
                { word: "the ambassador to Japan of", style: "" },
                { word: "a European country told me about", style: "" },
                { word: "his recent New Year's Eve party", style: "" },
                { word: "at his residence in Tokyo.", style: "" },
                { word: "Among the guests was a highranking", style: "" },
                { word: "official from Japan's Ministry of Finance (MoP).", style: "" },
                { word: "Most guests were in a joyful mood.", style: "" },
                { word: "They looked forward to", style: "" },
                { word: "the dawn of the twenty-ftrst century", style: "" },
                { word: "Cham- pagne was flowing", style: "" },
                { word: "and the party was in full swing.", style: "" },
                { word: "But not everyone was happy:", style: "" },
            ]
        }
    },

    methods: {

        on_click() {

            let index   = 0

            // if( !this.list[index] ) {
                // interval = null
                // clearInterval( interval )
                // return
            // }

            let len         = this.list.length
            let interval    = setInterval( () => {
                this.list.map( item => { item.style = "" })

                printf( "this.list -> ", this.list )
                printf( "this.list[index] -> ", this.list[index] )

                if( len - 1 === index ) {
                    clearInterval( interval )
                    return
                }
                this.list[index].style = "color: #000;"
                index++
            }, 500 )

        },

        draw() {
            var divA      = document.getElementById("a");
            printf( "divA -> ", divA )

            var divB      = document.getElementById("b");
            printf( "divB -> ", divB )

            var connector = document.getElementById("connector");
            printf( "connector -> ", connector )

            var drawConnector = function() {
                var posnA = { x: divA.offsetLeft + divA.offsetWidth, y: divA.offsetTop  + divA.offsetHeight / 2 };
                var posnB = { x: divB.offsetLeft, y: divB.offsetTop  + divA.offsetHeight / 2 };
                var dStr =
                    "M" +
                    (posnA.x      ) + "," + (posnA.y) + " " +
                    "C" +
                    (posnA.x + 100) + "," + (posnA.y) + " " +
                    (posnB.x - 100) + "," + (posnB.y) + " " +
                    (posnB.x      ) + "," + (posnB.y);
                connector.setAttribute("d", dStr);
            }

            window.addEventListener("resize", drawConnector);

            drawConnector();
        },

        setup() {
            // new LeaderLine( document.getElementById('a'), document.getElementById('b') )
            // setTimeout( () => {
                // this.draw()
            // }, 1000)
        },

    },

    mounted() {
        this.setup()
    }

}
</script>

<style scoped>

html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

div {
    color: white;
    text-align: center;
    padding: 10px;
    position: fixed;
    width: 200px;
    height: 100px;
}

#a {
    background-color: blue;
    top: 20px;
    left: 20px;
}

#b {
    background-color: red;
    bottom: 20px;
    right: 20px;
}


.test p {
    color: var( --text-color );
}

.space {
    height: 100px;
    clear: both;
}

</style>
