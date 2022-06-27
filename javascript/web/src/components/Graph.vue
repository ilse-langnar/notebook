<template lang="pug" >
.graph( tabindex="0" :ref="link" :id="link" :title="link" autofocus="autofocus" )

    // img.img.is-pulled-right( src="@/assets/images/tool.svg" style="width: 20px; cursor: pointer; margin: 10px;" title="Network" v-popover="{ name: 'graph.config', position: 'left' }")

    .layout
        img.img.is-pulled-right( v-if="layouts[0] === 'cose'" :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" title="Cose Layout" :style="get_layout_style('cose')" @click="select_next_layout()" )
        img.img.is-pulled-right( v-if="layouts[0] === 'grid' " :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" title="Grid Layout" :style="get_layout_style('grid')" @click="select_next_layout()" )
        img.img.is-pulled-right( v-if="layouts[0] === 'circle'" :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" title="Circle Layout" :style="get_layout_style('circle')" @click="select_next_layout()" )
        img.img.is-pulled-right( v-if="layouts[0] === 'breadthfirst'" :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" title="Breadthfirst Layout" :style="get_layout_style('breadthfirst')" @click="select_next_layout()" )
        img.img.is-pulled-right( v-if="layouts[0] === 'concentric'" :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" title="Concentric Layout" :style="get_layout_style('concentric')" @click="select_next_layout()" )

    #cy( ref="cy" )

    // button.button.slick-button( @click="run" ) run

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Libs
    // import createGraph                  from 'ngraph.graph'
    // import Viva                         from  "vivagraphjs"

    import cytoscape                    from "cytoscape/dist/cytoscape.min.js"
    // import fcose                        from "cytoscape-fcose"

export default {

    name: "Graph",

    data() {
        return {
            ilse: ilse,
            layouts: [
                "breadthfirst",
                "grid",
                "circle",
                "concentric",
                "breadthfirst",
                "cose", 
            ],
            rows: 10,
            link: "Link",
        }
    },

    props: {
        component: { type: Object, required: false, },
    },

    methods: {

        select_next_layout() {
            let item = this.layouts.shift()
            this.layouts.push( item )
            this.run()
        },

        get_layout_image( layouts ) {

            if( layouts[0] === "breadthfirst" ) {
                return require( "@/assets/images/layout-grid.svg" )
            } else if( layouts[0] === "grid" ) {
                return require( "@/assets/images/grid-dots.svg" )
            } else if( layouts[0] === "circle" ) {
                return require( "@/assets/images/sitemap.svg" )
            } else if( layouts[0] === "concentric" ) {
                return require( "@/assets/images/network.svg" )
            } else if( layouts[0] === "cose" ) {
                return require( "@/assets/images/atom.svg" )
            }
        },

        set_layout( name ) {
            this.layout = name
        },

        get_layout_style( name ) {

            let style = ``

            if( this.layouts[0] === name ) {
                style += `background-color: #d7d7d7; padding: 3px; border-radius: 8px;`
            }

            return style

        },

        run() {

            let link        = this.component.props.file 
            let has_link    = link
            if( has_link ) {
                this.generate_graph( link )
            } else {
                this.generate_graph( "Javascript.md" ) // Default k
            }
        },

        add_connections( note, elements ) {

            let links_and_backlinks = ilse.utils.get_links_and_backlinks( note )

            // Add connections
            for( const backlink of links_and_backlinks.backlinks ) {

                elements.push({
                    data: {
                        id: backlink.id,
                        source: backlink.fromId,
                        target: backlink.toId
                    },
                    nodeSep: 20,
                    position: { x: 100, y: 50, },
                })

            }

            return elements

        },

        add_links( file, elements ) {

            let node  = ilse.graph.graph.getNode( file )
            printf( "node -> ", node )

            let links = node.links
                if( !links ) return elements

            let note
            let bottom
            let normalized_name

            // Add what note links to 
            for( const [index, link] of links.entries() ) {

                index % 2 === 0  ? bottom = 100 : bottom = -100
                note = ilse.notes.query( `${link.fromId}:` )[0]
                normalized_name = ilse.utils.add_new_lines(note.content, 10)
                printf( "normalized_name -> ", normalized_name )
                // var newStr = str.replace(/.{200}/g, "$0\n")


                elements.push({
                    // data: { id: note },

                    data: {
                        id:     link.fromId,
                        // label:   note.content,
                        // name:   note.content,
                        // name:   normalized_name,
                        // name: normalized_name,
                        label:  normalized_name,
                        // label:   note.content,
                    },
                    classes: 'bottom-left'  ,
                    // classes: "bottom-center",

                    // data: { label: normalized_name },

                    // nodeSep: 20,
                    position: {
                        // x: bottom + ilse.utils.random_integer()
                        y: 0,
                        x: 0,
                    },
                    // style: {
                        // 'background-color': 'red'
                    // },
                })

            }

            return elements

        },

        generate_graph( note, depth = 1 ) {

            let elements = []

            elements                = [{ data: { id: note, name: note } }]
            elements                = this.add_links( note, elements )
            elements                = this.add_connections( note, elements )

            if( depth === 2 ) {

                let links_and_backlinks     = ilse.utils.get_links_and_backlinks( note )

                let backlinks               = links_and_backlinks.backlinks

                for( const link of backlinks ) {
                    elements                = this.add_links( link.fromId, elements )
                    elements                = this.add_connections( link.fromId, elements )
                }

            }

            var cy                  = cytoscape({

                container: document.getElementById('cy'), // container to render in
                elements: elements,

                style: [ // the stylesheet for the graph

                    {
                        selector: 'selected-node',
                        style: {
                            'background-color': 'red',
                            'line-color': 'red',
                            'target-arrow-color': 'red',
                            'source-arrow-color': 'red',
                            'label': 'data(name)',
                        }
                    },

                    {
                        selector: 'node',
                        style: {
                            'background-color': '#666',
                            'height': '60px',
                            'width': '60px',
                            'overflow': 'auto',
                            'border-color': 'black',
                            'text-background-opacity': 1,
                            'text-background-color': 'lightgray',

                            'text-align': 'left',
                            'text-hallign': 'left',
                            'float': 'left',

                            // 'label': 'data(id)',
                            // 'label': 'data(name)',
                            'label': 'data(label)',
                        }
                    },

                    {
                        selector: 'edge',
                        style: {
                            'width': 3,
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                            'label': 'data(name)',
                        }
                    }

                ],

                layout: {
                    // name: 'breadthfirst', // grid, circle, concentric, breadthfirst, cose, 
                    name: this.layouts[0], // grid, circle, concentric, breadthfirst, cose, 
                    rows: this.rows,
                    columns: 10,
                    cols: 10,
                }

            })

            /*
            cy.layout({
                name: "breadthfirst",
                spacingFactor: 2,
                nodeSep: 20,
            })
            */

            /*
            var options = {
                animate: false, // whether to animate changes to the layout
                animationDuration: 500, // duration of animation in ms, if enabled
                animationEasing: undefined, // easing of animation, if enabled
                animateFilter: function ( node, i  ){ return true;  }, // a function that determines whether the node should be animated.
                // All nodes animated by default for `animate:true`.  Non-animated nodes are positioned immediately when the layout starts.
                eles: someCollection, // collection of elements involved in the layout; set by cy.layout() or eles.layout()
                fit: true, // whether to fit the viewport to the graph
                padding: 30, // padding to leave between graph and viewport
                pan: undefined, // pan the graph to the provided position, given as { x, y  }
                ready: undefined, // callback for the layoutready event
                stop: undefined, // callback for the layoutstop event
                spacingFactor: 10, // a positive value which adjusts spacing between nodes (>1 means greater than usual spacing)
                transform: function (node, position ){ return position;  }, // transform a given node position. Useful for changing flow direction in discrete layouts
                zoom: undefined // zoom level as a positive number to set after animation
            }

            cy.nodes().layoutPositions( "breadthfirst", options, (el, i) => {
                printf( "el, i -> ", el, i )
            })
            */

            cy.nodes().forEach( (el, index) => {

                let y       = el.position().y
                let x       = el.position().x
                // let should  = index % 2 === 0

                    // el.position({ y: y })
                // if( should ) {
                    // el.position({ y: y + ilse.utils.random_integer(10, 300 ) })
                    // el.position({ y: y + 50 })
                // } else {
                    // el.position({ y: y - 50 })
                    // el.position({ y: y })
                // }

                // el.layoutDimensions( options )
            })

            // var options = {
                // nodeDimensionsIncludeLabels: true // boolean which changes whether label dimensions are included when calculating node dimensions, default true
            // }
            // let dims    = cy.nodes().first().layoutDimensions( options  );

            // let o       = cy.elements().kruskal()
            // printf( "o -> ", o )


            // var collection = cy.collection()
            // printf( "collection -> ", collection )

            // cy.nodes().on('click', function(e) {
                // var clickedNode = e.target;
                // collection      = collection.union(clickedNode);
            // });


        },

        setup() {

            printf( "this.$props -> ", this.$props )
            printf( "this.props -> ", this.props )
            printf( "this.component -> ", this.component )

            ilse.graph.generate()
            setTimeout( () => { this.run() }, 1000 )
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>

#cy {
    margin-left: 20px;
    width: 80%;
    height: 450px;
    display: block;
    margin-top: 10px;
    border: 2px solid #666;
    border-radius: 7px;
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
}

#cy canvas {
    right: 0%;

}

.control {
    width: 30px;
    position: relative;
    left: 47%;
    top: 35px;
}

.options {

}

.options img {
    width: 20px;
}

.bottom-left {
    background: red !important;
}

.graph .layout {
}

.layout img {
    cursor: pointer;
    z-index: 100000 !important;
}

.layout {
    clear: both;
    height: 20px;
}
        
</style>
