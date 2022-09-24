<template lang="pug" >
.graph( tabindex="0" :ref="link" :id="link" :title="link" autofocus="autofocus" )
    input.input.centered( v-model="component.props.file" style="width: 100%; background: var( --background-color ); color: var( --text-color ); width: fit-content; display: block; " )
    .layout( style="position: relative; top: 25px; right: 25px; z-index: 100; " )
        img.img.is-pulled-right( v-if="layouts[0] === 'cose'" :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" :title="$t('cose_layout')" :style="get_layout_style('cose')" @click="select_next_layout()" )
        img.img.is-pulled-right( v-if="layouts[0] === 'grid' " :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" :title="$t('grid_layout')" :style="get_layout_style('grid')" @click="select_next_layout()" )
        img.img.is-pulled-right( v-if="layouts[0] === 'circle'" :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" :title="$t('circle_layout')" :style="get_layout_style('circle')" @click="select_next_layout()" )
        img.img.is-pulled-right( v-if="layouts[0] === 'breadthfirst'" :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" :title="$t('breadthfirst_layout')" :style="get_layout_style('breadthfirst')" @click="select_next_layout()" )
        img.img.is-pulled-right( v-if="layouts[0] === 'concentric'" :src="get_layout_image(layouts)" style="width: 30px; cursor: pointer;" :title="$t('concentric_layout')" :style="get_layout_style('concentric')" @click="select_next_layout()" )

    #cy( ref="cy" )

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
    // import fcose                        from "cytoscape-fcose"
    import cytoscape                    from "cytoscape/dist/cytoscape.min.js"
    // import qtip                         from "cytoscape-qtip";
    // import dagre                        from "cytoscape-dagre";


// Install Libraries
    // cytoscape.use( qtip )
    // cytoscape.use( dagre )

export default {

    name: "Graph",

    data() {
        return {
            ilse: ilse,
            target: this.component.file,
            layouts: [
                // "dagre",
                "circle",
                "breadthfirst",
                "grid",
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

    watch: {

        target( target ) {

            if( target.indexOf(".md") !== -1 ) {
                this.run()
            }

        },

    },

    methods: {

        select_next_layout() {
            let item = this.layouts.shift()
            this.layouts.push( item )
            this.run()
        },

        get_layout_image( layouts ) {

            if( layouts[0] === "breadthfirst" ) {
                // return require( "@/assets/images/layout-grid.svg" )
                return ilse.irequire.img( "layout-grid.svg" )
            } else if( layouts[0] === "grid" ) {
                // return require( "@/assets/images/grid-dots.svg" )
                return ilse.irequire.img( "grid-dots.svg" )
            } else if( layouts[0] === "circle" ) {
                // return require( "@/assets/images/sitemap.svg" )
                return ilse.irequire.img( "sitemap.svg" )
            } else if( layouts[0] === "concentric" ) {
                // return require( "@/assets/images/network.svg" )
                return ilse.irequire.img( "network.svg" )
            } else if( layouts[0] === "cose" ) {
                // return require( "@/assets/images/atom.svg" )
                return ilse.irequire.img( "atom.svg" )
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
                this.generate_graph( this.target ) // Default k
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

            let links = node.links
                if( !links ) return elements

            let note
            let bottom
            let normalized_name

            // Add what note links to 
            for( const [index, link] of links.entries() ) {

                // index % 2 === 0  ? bottom = 100 : bottom = -100
                note = ilse.notes.query( `${link.fromId}:` )[0]
                // normalized_name = ilse.utils.add_new_lines(note.content, 10)
                // normalized_name = ilse.utils.add_new_lines(note.content, 30)
                // printf( "normalized_name -> ", normalized_name )
                // var newStr = str.replace(/.{200}/g, "$0\n")


                elements.push({
                    // data: { id: note },

                    data: {
                        id:     link.fromId,
                        // label:   note.content,
                        // name:   note.content,
                        // name:   normalized_name,
                        // name: normalized_name,
                        // label:  `${note.content}\nLorem`,
                        // label:  note.id,
                        label:  note.content,
                        name: note.content,
                        // label:   note.content,
                    },
                    // classes: ''  ,
                    // classes: "bottom-center",

                    // data: { label: normalized_name },

                    // nodeSep: 20,
                    // position: {
                        // x: bottom + random_number()
                        // y: 0,
                        // x: 0,
                    // },
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
                        selector: "node[label]",
                        style: {
                            label: "data(label)",
                            "font-size": "12",
                            color: "#000",
                            "overlay-padding": "6px",
                            'height': '20px',
                            "text-halign": "center",
                            "text-valign": "center"
                        }
                    },

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
                            // 'width' : 'data(size)',
                            // 'height' : 'data(size)',
                            'width' : '40px',
                            'height' : '40px',
                            /*'overflow': 'auto',*/
                            'border-color': 'black',
                            'text-background-opacity': 1,
                            'text-background-color': 'lightgray',
                            "overlay-padding": "6px",
                            "text-max-width": "200px",
                            "text-valign": "bottom",
                            "text-wrap": "ellipsis",

                            'text-align': 'top',
                            'text-hallign': 'top',
                            // 'float': 'left',

                            // 'label': 'data(id)',
                            // 'label': 'data(name)',
                            'label': 'data(label)',
                            /*'label': 'data(node)',*/
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
                    /*
                    name: this.layouts[0], // grid, circle, concentric, breadthfirst, cose, 

                    padding: 10,
                    nodeDimensionsIncludeLabels: true,
                    idealEdgeLength: 100,
                    edgeElasticity: 0.1,

                    rows: this.rows,
                    columns: 10,
                    cols: 10,
                    */

                    name: this.layouts[0], // grid, circle, concentric, breadthfirst, cose, 
                    fit: true,
                    // circle: true,
                    // directed: true, // up or down
                    // padding: 10,
                    spacingFactor: .3,
                    animate: true,
                    animationDuration: 500,
                    avoidOverlap: true,
                    nodeDimensionsIncludeLabels: true,

                    // columns: 3,
                    // cols: 3,

                    //Put all the clusters to the bottom row
                    // position: function (ele) {
                        // if (ele.data("type") === "cluster") {
                            // return { row: 3  };
                        // }
                        // return { row: 1  };
                    // },

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

            // cy.nodes().each(function (node) {
                // node.qtip({
                    // content: `${node.data("id")}`,
                    // show: { event: "mouseenter mouseover" },
                    // hide: { event: "mouseleave mouseout" }
                // });
            // });

            cy.nodes().forEach( (el, index) => {

                // let y       = el.position().y
                // let x       = el.position().x
                // let should  = index % 2 === 0

                    // el.position({ y: y })
                // if( should ) {
                    // el.position({ y: y + random_number(10, 300 ) })
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
            // setTimeout( () => { this.run() }, 1000 )
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>

#cy {
    width: 98%;
    height: 450px;
    display: block;
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
