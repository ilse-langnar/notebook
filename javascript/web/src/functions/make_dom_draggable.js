import printf               from "@/functions/printf.js"

let mousedown, mouseup, mousemove, mousewheel

export default function make_dom_draggable( dom, component, props = { width: '50%', height: '50%' } ) {
    printf( "make_dom_draggable -> dom -> ", dom )

    // TODO: Make this "revirsible"
    class Draggable {
        /**
         * The element that was passed to the constructor.
         */
        targetElement;

        /**
         * Creates a new DFW instance.
         * @param {HTMLElement} targetElement The element you wish to make draggable.
         */
        constructor( targetElement, component, props ) {

            // if( !component || !component.props || !component.props.is_floating ) return

            // When called with nothing, undo-all?
            /*
            if( component.props.is_floating ) {
                targetElement.style.width      = "100%"
                targetElement.style.height     = "100%"
                targetElement.style.position   = "inherit"
                targetElement.style["z-index"] = 1
                component.props.is_floating    = false
                return
            }
            */

            if( targetElement.style["resize"] === "both" ) {
                targetElement.style.width      = "100%"
                targetElement.style.height     = "100%"
                targetElement.style.position   = "inherit"
                targetElement.style["z-index"] = 1
                targetElement.style["resize"]  = "inherit"
                return
            }



            printf( "make_dom_draggable -> component -> ", component )
            // var dup = targetElement.cloneNode(true)
                // dup.id  = "@" + dup.id

            // this.targetElement = dup;

            // let div = document.createElement( "div" )
                // div.style = `padding: 10px; border: 1px solid #000; `

            // printf( "before appending -> div -> ", div )
            // div.appendChild( targetElement )
            // printf( "after appending -> div -> ", div )

            // this.targetElement = div
            this.targetElement = targetElement;
            // printf( "this.targetElement -> ", this.targetElement )
                // this.old           = targetElement
                // this.targetElement.style.width = "50%";

            this.targetElement.style.width      = props.width
            this.targetElement.style.height     = props.height

            this.targetElement.style["z-index"] = 2
            this.targetElement.style["resize"]  = "both"
            // this.targetElement.style["overflow"]= "auto"

            // component.props.is_floating     = true
            this.load()
        }

        /**
         * Loads DFW.
         * @param {number} constraintGap The gap between the end of the document and your element.
         */
        load(constraintGap) {

            let isDragReady;
            let offsetX;
            let offsetY;

            const dragOffset = {};

            // Selecting
            mousedown = e => {


                if( e.target.className.indexOf("snap") === -1 ) return
                // if( !e.ctrlKey )     return // FEATURE: Only works while holding shift.
                // if( e.buttons !== 1 ) return // FEATURE: Only accepts 1 mouse click.

                isDragReady = true;
                // document.body.style['userSelect'] = 'none';

                // LLL
                this.targetElement.style["z-index"] = 3 // FEATURE: Focused Window are shown on top

                offsetX = e.pageX || e.clientX + window.scrollX;
                offsetY = e.pageY || e.clientY + window.scrollY;

                dragOffset.x = offsetX - this.targetElement.offsetLeft;
                dragOffset.y = offsetY - this.targetElement.offsetTop;
                printf( "dragOffset.x -> ", dragOffset.x )
                printf( "dragOffset.y -> ", dragOffset.y )
            }
            Draggable.event(this.targetElement, 'mousedown', mousedown ) // Select

            mouseup = e => {
                this.targetElement.style["z-index"] = 2 // FEATURE: Focused Window are shown on top
                isDragReady = false;
                document.body.style['userSelect'] = 'auto';
            }

            Draggable.event(document, 'mouseup', mouseup  ) // Un-Select

            mousemove = e => {
                if (!isDragReady) return;

                const height = parseInt(getComputedStyle(this.targetElement).height);
                const width = parseInt(getComputedStyle(this.targetElement).width);
                const gap = constraintGap ?? 8;

                offsetX = e.pageX || e.clientX + document.documentElement.scrollLeft;
                offsetY = e.pageY || e.clientY + document.documentElement.scrollTop;

                // Left and right constraint
                if (e.pageX - dragOffset.x < gap) {
                    offsetX = gap;
                } else if (e.pageX - dragOffset.x + width > document.body.clientWidth - gap) {
                    offsetX = document.body.clientWidth - width - gap;
                } else {
                    offsetX = e.pageX - dragOffset.x;
                }

                // Top and bottom constraint
                if (e.pageY - dragOffset.y < gap) {
                    offsetY = gap;
                } else if (e.pageY - dragOffset.y + height > window.innerHeight - gap) {
                    offsetY = window.innerHeight - height - gap;
                } else {
                    offsetY = e.pageY - dragOffset.y;
                }

                Object.assign(this.targetElement.style, {
                    top: `${offsetY}px`,
                    left: `${offsetX}px`
                });

            }

            Draggable.event(document, 'mousemove', mousemove) // Move

            mousewheel = e => {
                isDragReady = false;
            }

            Draggable.event(document, 'mousewheel', mousewheel ) // ::

            if (!/fixed|absolute/.test(getComputedStyle(this.targetElement).position) ) {
                this.targetElement.style.position = 'fixed';
            }

        }

        /**
         * Adds an event listener to a specific element.
         */
        static event(elm, event, func) {
            document.attachEvent ? elm.attachEvent('on' + event, func) : elm.addEventListener(event, func);
        }
    }

    let draggable = new Draggable( dom, component, props )

    return draggable

    return function off() {
        // call this function to un-bind everything.

    }
}

