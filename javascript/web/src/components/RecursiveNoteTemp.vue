<template lang="pug" >
.recursive-note( :style="get_root_style(note)" @click="on_recursive_note_root_click($event, note)" )

    Note( :note="note" :title="get_note_style(note, parent)" @on-note-click="on_note_click" :style="get_note_style(note, parent)" @on-esc="on_note_esc" @on-blur="on_ghost_note_blur" :options="get_note_options(note)" @on-enter="on_enter" )

    // table( :style=" note.depth === 0 ? 'margin: 0 auto;' : ' ' " )
    table( style="margin: 0 auto;" )
        tr
            td( v-for="( _note, index ) in note.children" :key="index" )
                p.middle( style="margin: 0 auto; width: 50px; height: 20px;" )
                // p {{note.content}}
                // .html( v-html="get_html( note, _note )" )

                RecursiveNote.example( :note="_note" :parent="note" )

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
    import RecursiveNote                from "@/components/RecursiveNoteTemp.vue"

// Libs
    import arrowCreate, { DIRECTION, HEAD }  from 'arrows-svg'
    import { ArcPath, CurvyPath, LinePath, SquarePath  } from 'svg-dom-arrows';
    import LeaderLine from "leader-line-new"
    // import ArrowLine from "arrow-line"
    import * as arrowLine from 'arrow-line'; // to import, or
    // require( "@/assets/js/arrows.1.0.0.js" )

    import PlanDraggable                 from "plain-draggable"
    import { dragmove  }                from "@knadh/dragmove"


export default {

    name: "RecursiveNote",

    props: {
        note: { type: Object, required: false },
        parent: { type: Object, required: false },
    },

    components: {
        Note,
        RecursiveNote,
    },

    data() {
        return {
            ilse: ilse,
            arrows: [],
            is_hidden: false,
        }
    },

    methods: {

        get_html( parent, child ) {
            printf( "get_html -> parent -> ", parent )
            printf( "get_html -> child -> ", child )
            printf( "parent.id -> ", parent.id )
            printf( "child.id -> ", child.id )
            let parent_dom = document.getElementById( parent.id )
            printf( ">> parent_dom -> ", parent_dom )
            let child_dom  = document.getElementById( child.id )
            printf( ">> child_dom -> ", child_dom )
            let string     = this.connect_v1( parent_dom, child_dom, 'red', 1 )
            printf( "@@@ string -> ", string )
            return string
        },

        getOffset( el ) {
            var rect = el.getBoundingClientRect();
            return {
                left: rect.left + window.pageXOffset,
                top: rect.top + window.pageYOffset,
                width: rect.width || el.offsetWidth,
                height: rect.height || el.offsetHeight
            };
        },

        connect_v1(div1, div2, color, thickness) { // draw a line connecting elements
            var off1 = this.getOffset(div1);
            var off2 = this.getOffset(div2);
            // bottom right
            var x1 = off1.left + off1.width;
            var y1 = off1.top + off1.height;
            // top right
            var x2 = off2.left + off2.width;
            var y2 = off2.top;
            // distance
            var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
            // center
            var cx = ((x1 + x2) / 2) - (length / 2);
            var cy = ((y1 + y2) / 2) - (thickness / 2);
            // angle
            var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
            // make hr
            let dom = document.createElement( "div" )
            dom.style = "padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);"
            printf( "dom -> ", dom )
            var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
             document.body.append( dom )
            return htmlLine

            // document.body.innerHTML += htmlLine;
             // document.body.innerHTML += htmlLine;
        },

        get_line_x1( parent, child ) {

            let parent_dom  = document.getElementById( parent.id )
                if( !parent_dom ) return ""

            let child_dom   = document.getElementById( child.id )
                if( !child_dom ) return ""

            let parent_info = parent_dom.getBoundingClientRect()
            return parent_info.left
        },

        get_line_y1( parent, child  ) {

            let parent_dom  = document.getElementById( parent.id )
                if( !parent_dom ) return ""

            let child_dom   = document.getElementById( child.id )
                if( !child_dom ) return ""

            let parent_info = parent_dom.getBoundingClientRect()
            return parent_info.top
        },

        get_line_x2( parent, child ) {

            let parent_dom  = document.getElementById( parent.id )
                if( !parent_dom ) return ""

            let child_dom   = document.getElementById( child.id )
                if( !child_dom ) return ""

            let parent_info = parent_dom.getBoundingClientRect()
            return parent_info.left
        },

        get_line_y2( parent, child ) {

            let parent_dom  = document.getElementById( parent.id )
                if( !parent_dom ) return ""

            let child_dom   = document.getElementById( child.id )
                if( !child_dom ) return ""

            let parent_info = parent_dom.getBoundingClientRect()
            return parent_info.top

        },

        get_marker_end( note ) {
            let string = `url(#${note.id})`
            return string
        },

        on_note_click() {
        },

        on_parent_click( payload ) {
            printf( "RecursiveNote -> on_parent_click -> payload -> ", payload )

            let note      = payload.note
            let event     = payload.event
            let is_shift  = event.shiftKey

            if( is_shift ) {
                let component = new ilse.classes.Component({ type: "mind-map", width: 12, props: { note: note } })
                    ilse.components.push( component )
            } else {
                let dom = document.getElementById( note.id )
                printf( ">>> dom -> ", dom )
                    if( dom ) dom.focus()
                printf( "note.focus -> ". note.focus )
            }

        },

        show_info( note ) {
            printf( "show_info -> note -> ", note )
            let dom     = document.getElementById( note.id )
            printf( "dom -> ", dom )
            let closest = dom.closest( ".note" )
            printf( "@@ closest -> ", closest )
            printf( "@@ closest topOffset -> ", closest.offsetTop)
            printf( "@@ closest topOffset -> ", closest.offsetLeft )
        },

        get_note_options( note ) {
            if( !note ) return { style: "", hide_bullet: true }
            printf( "RecursiveNote -> get_note_options -> note -> ", note )

            let style   = `display: block !important; margin-bottom: 10px !important; margin-left: 10px; border-radius: var( --border-radius ); `
                if( note.depth !== 0 ) style += `width: fit-content !important;`

            let options = {
                style,
                hide_bullet: true,
            }

            return options
        },

        // TODO: BUG: When we type enter we correctly add the note but it's not rendered corretly, also setting the depth is problematic k
        on_enter( payload ) {

            let note   = payload.note
            let depth  = note.depth + 1
            let new_note = ilse.notes.add_after( "", depth, note )
                new_note.focus()

            setTimeout( () => { ilse.save() }, 1000 )
        },

         drawCurvedLine(x1, y1, x2, y2, color, tension) {
             var svg = createSVG();
             var shape = document.createElementNS("http://www.w3.org/2000/svg", 
                     "path");{
                 var delta = (x2-x1)*tension;
                 var hx1=x1+delta;
                 var hy1=y1;
                 var hx2=x2-delta;
                 var hy2=y2;
                 var path = "M "  + x1 + " " + y1 + 
                     " C " + hx1 + " " + hy1 
                     + " "  + hx2 + " " + hy2 
                     + " " + x2 + " " + y2;
                 shape.setAttributeNS(null, "d", path);
                 shape.setAttributeNS(null, "fill", "none");
                 shape.setAttributeNS(null, "stroke", color);
                 svg.appendChild(shape);

             }

        },

        drag_element( elmnt ) {
          var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
          if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
          } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
          }

          function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
          }

          function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          }

          function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
          }
        },

        drawCircle( x, y, radius, color ) {
             var svg = createSVG();
             var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
             shape.setAttributeNS(null, "cx", x);
             shape.setAttributeNS(null, "cy", y);
             shape.setAttributeNS(null, "r",  radius);
             shape.setAttributeNS(null, "fill", color);
             svg.appendChild(shape);
        },


        /*
        update() {

            let parent   = this.note
            let children = parent.children
            let arrow, options

            this.arrows.map( line => { line.remove() })

            children.map( child => {
                arrow = new LeaderLine( document.getElementById(parent.id), document.getElementById(child.id) )
                    this.arrows.push( arrow )
            })
        },
        */

        /*
        update() {
            this.is_hidden = !this.is_hidden

            if( this.is_hidden ) {
                this.arrows.map( line => {
                    line.hide()
                })

            } else {

                this.arrows.map( line => {
                    line.show()
                })

            }

        },
        */

        connect( start, end, path  ) {

             // var divA      = document.querySelector("#a");
             // var divB      = document.querySelector("#b");
             // var connector = document.querySelector("#connector");

             printf( "connector -> start ", start )
             printf( "connector -> end ", end )
             printf( "connector -> path ", path )
             var divA      = start
             var divB      = end
             var connector = path

             var drawConnector = function() {
                 var posnA = {
                    x: divA.offsetLeft + divA.offsetWidth,
                    y: divA.offsetTop  + divA.offsetHeight / 2
                 };
                 var posnB = {
                    x: divB.offsetLeft,
                    y: divB.offsetTop  + divA.offsetHeight / 2
                 };
                 var dStr =
                     "M" +
                     (posnA.x      ) + "," + (posnA.y) + " " +
                     "C" +
                     (posnA.x + 100) + "," + (posnA.y) + " " +
                     (posnB.x - 100) + "," + (posnB.y) + " " +
                     (posnB.x      ) + "," + (posnB.y);
                 connector.setAttribute("d", dStr);
             }
             // window.addEventListener("resize", drawConnector);
             // drawConnector();
        },

        get_svg_arrow_style( parent, child ) {

            // let style = `stroke: #6666ff; stroke-width: 1px; fill: none; marker-start: url(#markerCircle); marker-end: url(#markerArrow);`
            let style = `stroke: #6666ff; stroke-width: 1px; fill: none; `

            style += `marker-start: url(#${parent.id}); marker-end: url(#${child.id});`

            return style
            // let style = `stroke:red; stroke-width: 1.25px; fill: none; marker-end: url(#arrow);`
            // let style = `stroke:red; stroke-width: 1.25px; fill: none; marker-end: url(#svg-arrow-${note.id});`
            // printf( "@@ style -> ", style )
            // return style
        },


        get_wrapper_style( note ) {
            // let style = `display: flex; position: absolute; margin: 50px;`
            // let style = `display: block; position: relative; margin: 0px;`
            let style = `display: flex; position: relative; margin: 0px;`
                if( note.depth === 0 ) style += `display: flex; align-items: baseline; justify-content: space-around; `

            return style
        },

        append_note( note ) {

        },

        on_recursive_note_root_click( event, note ) {
            document.activeElement.blur()
        },

        on_note_esc() {
            document.activeElement.blur()
        },

        on_ghost_note_blur() {
            document.activeElement.blur()
        },

        get_root_style( note ) {

            // let style = `margin: 10px; background: #fff; width: 170px; height: 100px; margin: auto;`
            // if( note.depth === 0 ) style += "width: 100%; height: 100vh; "
            // let style = `margin: 10px; background: #fff; width: fit-content; height: 100px; margin: auto; margin-top: 20px; padding: 3px; `
            // let style = `background: #fff; width: 100%; height: 100px; margin: 10px 0px; margin-top: 20px; padding: 1px; `
            // let style = `border: 1px solid #000; background: var( --background-color ); width: fit-content; margin: 20px 00px; padding: 1px; `
            // if( note.depth === 0 ) style += "width: 100%; height: 100%; "
            // if( note.children.length === 0 ) style += "width: 100px; height: 100px; float: left; margin-right: 10px; "

            let color = ilse.utils.random_rgba()
            let style = `border-left: 1px solid ${color}; border-right: 1px solid ${color}; border-radius: var( --border-radius ); background: var( --background-color ); width: fit-content; margin: 20px 00px; padding: 1px; `

            return style
        },

        // 1
        // 1 1
        // 1 1 1
        // 1 1 1 1
        // 1 1 1 1 1
        get_note_style( note, parent) {
            // let style = `min-width: 100%; width: 200px; overflow: auto; border: 1px solid var( --text-color ); `
            // let style = `overflow: auto; border: 1px solid var( --text-color ); `
            // let style = `overflow: auto; border: 1px solid var( --text-color ); position: relative; transform: translate( 60% );`
            let style = `height: auto; overflow: auto; border: 1px solid var( --text-color ); margin: auto; width: 100%; `

            if( parent ) {

                /*
                let len         = parent.children.length
                let index       = parent.children.indexOf( note )
                let half        = len / 2
                let is_even     = len % 2 === 0
                let is_first    = parent.children[0] === note.id
                let is_last     = parent.children[ len -1 ] === note.id
                */

               let is_single   = len === 1
                    if( is_single ) return style
                let len         = parent.children.length
                    if( len === 1 ) return style
                let index       = parent.children.indexOf( note )
                let half        = len / 2
                let is_even     = len % 2 === 0
                let left, right, is_left, is_right

                // Ways of splitting
                if( is_even ) {
                    // int two
                    let left_array  = parent.children.slice( 0, half )
                    let right_array = parent.children.slice( half, len )
                    let is_left     = left_array.indexOf( note ) !== -1
                    let is_right    = right_array.indexOf( note ) !== -1
                    if( is_left ) {
                        // style += `left: 30px;`
                        style += `left: ${len * 5}px;`
                    } else if( is_right ) {
                        // style += `right: 30px;`
                        style += `right: ${len * 5}px;`
                    }

                } else if( !is_even ) {
                    // in tree
                    // printf( "is odd" )
                    // printf( "in tree -> parent.children -> ", parent.children )
                    // printf( "in tree -> half -> ", half )

                    let middle          = parent.children.slice( half, half + 1 )[0]
                    // printf( "middle -> ", middle )
                    let middle_index    = parent.children.indexOf( middle )
                    // printf( "middle_index -> ", middle_index )
                    let string_children = JSON.stringify( parent.children )
                    // let copy = parent.children
                    let copy = JSON.parse( string_children )
                    // printf( "<<<<< copy -> ", copy )
                    let removed_middle  = copy.splice( middle_index, 1 )[0]
                    let is_middle = removed_middle.id === note.id
                    // printf( "note.id -> ", note.id )
                    // printf( "removed_middle.id -> ", removed_middle.id )
                    // printf( "@@@ is_middle -> ", is_middle )
                    // printf( "removed_middle -> ", removed_middle )
                    // printf( "copy -> ", copy )

                    let left_array  = copy.slice( 0, half )
                    // printf( "left_array -> ", left_array )
                    let right_array = copy.slice( half, len )
                    // printf( "right_array -> ", right_array )
                    let is_left     = left_array.indexOf( note ) !== -1
                    // printf( "@@@@ is_left -> ", is_left )
                    let is_right    = right_array.indexOf( note ) !== -1
                    // printf( "@@@@ is_right -> ", is_right )
                    if( is_left ) {
                        // style += `left: 30px;`
                        style += `left: ${len * 5}px;`
                    } else if( is_right ) {
                        // style += `right: 30px;`
                        style += `right: ${len * 5}px;`
                    }
                    // style += `position: absolute;`
                }

                /*
                let dom = document.getElementById( parent.id )
                if( dom ) {
                    // printf( "dom -> ", dom )
                    let closest     = dom.closest( ".note" )
                    // printf( "closest -> ", closest )
                    let offset_left = closest.offsetLeft
                    // printf( "offset_left -> ", offset_left )
                    let is_left     = offset_left < 0
                    if( is_left ) {
                        style += `left: 10px;`
                    } else {
                        style += `right: 10px;`
                    }
                    // printf( "AAAA is_left -> ", is_left )
                }
                */

            }

            // if( note.depth === 0 ) style += "width: 300px; margin: 0 auto !important; text-align: center; "
            // if( note.depth === 0 ) style += "width: 300px; margin: 0 auto !important; text-align: center; "
            return style
        },

        get_child_style( note, parent ) {
            // let style = `border: 1px solid grey; width: 100%;`
            let style   = `width: 200px; `
            return style
        },

        test() {

            let parent   = this.note
            let children = parent.children
            let arrow, options
            // printf( "children.length -> ", children.length )
            // if( !children.length ) return

            // const d1 = document.getElementById('d1')
            // const d2 = document.getElementById('d2')
            // this.connect(d1, d2, 'green', 5)


            // if( !children[0] ) return
            // printf( "children[0].id -> ", children[0].id )
            // printf( "parent.id -> ", parent.id )
            // this.connect( document.getElementById( children[0].id ), document.getElementById( parent.id ), document.getElementById( 'connector' ))

              // var arrowsDrawer1 = $cArrows( `#ex1-common-parent` )
              // arrowsDrawer1.arrow( `.central-icon`, `.icon`)

            // var cArrow = $cArrows('#mind-map').arrow(`#${child.id}`, `#${parent.id}`).arrow('.fromDiv2', '#toDiv2');
            // let line  = document.getElementById( "line" )
            // let box   = line.getBoundingClientRect()
            // let pos1, pos2

            printf( "children -> ", children )
            children.map( child => {

                this.connect_v1( document.getElementById( parent.id ), document.getElementById( child.id ), "red", 1 )
                /*
                pos1 = document.getElementById( parent.id ).getBoundingClientRect()
                    line.setAttribute('x1', pos1.x+pos1.width  );
                    line.setAttribute('y1', pos1.y+pos1.height );

                pos2 = document.getElementById( child.id ).getBoundingClientRect()
                    line.setAttribute('x2', pos2.x+pos2.width  )
                    line.setAttribute('y2', pos2.y+pos2.height )
                */

                // ArrowLine(`#${parent.id}`, `#${child.id}` )
                // cArrow = arrowLine( `[id='${parent.id}']`, `[id='${child.id}']`, { color: 'blue' })
                // cArrow = arrowLine( parent.id, child.id )
                // printf( "cArrow - >", cArrow )

                // cArrow = $cArrows('#mind-map').arrow(`#${child.id}`, `#${parent.id}`)
                // printf( "cArrow -> ", cArrow )

                // this.connect( document.getElementById( parent.id ), document.getElementById( child.id ), document.getElementById( 'conector' ))

                /*
                arrow = arrowCreate({
                    head: HEAD.THIN,
                    // from: document.getElementById( "child2-" + child.id ),
                    from: document.getElementById( child.id ),
                    to:   document.getElementById( parent.id ),
                })
                document.body.appendChild( arrow.node )
                */

                // arrow = new LeaderLine( document.getElementById(parent.id), document.getElementById(child.id) )
                    // this.arrows.push( arrow )

                // printf( "document.getElementById(parent.id) -> ", document.getElementById(parent.id) )
                // printf( "Arrow -> ", arrow )
                // printf( "arrow -> ", arrow )

                // setInterval( () => {
                    // arrow.remove()
                    // arrow.position()
                // }, 2000 )

                /*
                new ArcPath({
                    start: {
                        element: document.getElementById( parent.id ),
                        position: {
                            top: 0.5,
                            left: 1
                        }
                    },
                    end: {
                        element: document.getElementById( child.id ),
                        position: {
                            top: 0.5,
                            left: 0
                        }
                    },
                    style: 'stroke: blue ;stroke-width:1;fill: red',
                    appendTo: document.body

                })
                */

                /*
                arrow = new LinePath({
                    start: {
                        element: document.getElementById( parent.id ),
                    },
                    end: {
                        element: document.getElementById( child.id ),
                    },
                    style: 'stroke:black;stroke-width:4;fill:transparent',
                    appendTo: document.body, // Optional
                })
                */

                /*
                arrow = arrowCreate({
                    head: HEAD.THIN,
                    from: document.getElementById( parent.id ),
                    to:   document.getElementById( child.id ),
                })
                document.body.appendChild( arrow.node )
                */

            }) 

            /*
            const options: PathOptions = {
                start: {
                    element: document.getElementById('myGreenBox'),
                },
                end: {
                    element: document.getElementById('myGreyBox'),
                },
                style: 'stroke:black;stroke-width:4;fill:transparent',
                appendTo: document.body, // Optional
            }

            const arrow = new LinePath(options);
            */

        },

        listen() {

            Messager.on( "~notes", (action, payload) => {

                if( action === "added" ) {

                    let after       = payload.after
                    let new_note    = payload.note

                    if( this.note.id === after.id ) {
                        printf( "-----" )
                        printf( "after -> ", after )
                        printf( "after.id -> ", after.id )
                        printf( "this.note -> ", this.note )
                        printf( "this.note.id -> ", this.note.id )
                        printf( "new_note -> ", new_note )
                        printf( "new_note.id -> ", new_note.id )
                        printf( "HEHEHEEHEHEHEHEHEHE" )
                        printf( "this.note.children -> ", this.note.children )

                        let index       = this.note.children.indexOf( new_note )
                        let has_already = index !== -1
                        printf( "index -> ", index )
                        printf( "has_already -> ", has_already )
                        if( !has_already ) {
                            printf( "DOES NOT HAVE ALREADY -> this.note.children -> ", this.note.children )
                            let children = this.note.children
                            // let o = this.drag_element( document.getElementById( `child-${this.note.id}` ) )
                            // draggable = new PlanDraggable( document.getElementById( `child-${this.note.id}` ) )
                            // printf( "draggable -> ", draggable )
                            this.note.children.push( new_note )
                            setTimeout( () => { printf( "children -> ", children ) }, 1000 )
                        }
                        printf( "this.note.children.length -> ", this.note.children.length )
                        printf( "-----" )
                    }

                } else if( action === "deleted" ) {

                    // let note      = payload
                    // let day         = this.get_note_day( note )
                    // let note_index= day.notes.indexOf( note )
                    // let day_index   = this.days.indexOf( day )
                        // this.days[day_index].notes.splice( note_index, 1 )

                    // this.key = Math.random()
                }

            })

        },

        make_draggable() {
            // let dom         = document.getElementById( "root-" + this.note.id ) 
            // printf( "dom -> ", dom )
            // let draggable
            // if( dom ) draggable   = new PlanDraggable( dom )
            // if( dom ) draggable  = dragmove(document.querySelector(".note"), document.querySelector(".mind-map") )
        },

        setup() {
            this.listen()
            // setTimeout( () => { this.test() }, 1000 )
            // setTimeout( () => { this.make_draggable() }, 1000 )
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.clear {
    height: 100px;
    clear: both;
}

/*
.arrow {
    pointer-events: none;
    stroke-width: 1;
}

.arrow__path {
    stroke: #000;
    fill: transparent;
    stroke-dasharray: 2 1;
}

.arrow__head line {
    stroke: #000;
    stroke-width: 1px;
}
*/


.arrow {
    pointer-events: none;
    z-index: 2;

}
.arrow__path {
stroke: blue;
fill: transparent;
      stroke-dasharray: 8 4;
      stroke-width: 2;

}
.arrow__head line {
stroke: red;
        stroke-width: 2px;

}

table tr td {
    position: relative; 
}

</style>
