import printf                   from "@/functions/printf.js"

import ilse                     from "@/ilse.js"

export default function create_infinite_canvas( dom ) {

    let canvas      = dom

    let coordinates = document.createElement( "p" )
        coordinates.style = "position: relative; width: 100px; bottom: 101vh; height: 25px; border: 1px solid rgb(0, 0, 0);"
    canvas.parentNode.appendChild( coordinates )


    let ctx         = canvas.getContext('2d');
        canvas.width    = window.innerWidth;
        canvas.height   = window.innerHeight;

    function draw() {

        let step    = 30;
        let left    = 0.5 - Math.ceil(canvas.width / step) * step;
        let top     = 0.5 - Math.ceil(canvas.height / step) * step;
        let right   = 2*canvas.width;
        let bottom  = 2*canvas.height;

        ctx.clearRect(left, top, right - left, bottom - top);

        ctx.beginPath();

        // Draws vertical line |
        //                     |
        //                     |
        for (let x = left; x < right; x += step) {
            ctx.moveTo(x, top);
            ctx.lineTo(x, bottom);
        }

        // Draws horizontal line -----
        for (let y = top; y < bottom; y += step) {
            ctx.moveTo(left, y);
            ctx.lineTo(right, y);
        }

        ctx.strokeStyle = "#454545";

        ctx.stroke();
    }

    // Mouse event handling:
    let start;
    const getPos = (e) => ({
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    });

    const reset = () => {
        start = null;
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translation
        draw();
    }

    canvas.addEventListener("mousedown", e => {
        reset();
        start = getPos(e)
    });

    canvas.addEventListener("mouseup", reset);
    canvas.addEventListener("mouseleave", reset);

    canvas.addEventListener("mousemove", e => {
        // Only move the grid when we registered a mousedown event
        if (!start) return;
        let pos = getPos(e);
        // Move coordinate system in the same way as the cursor
        ctx.translate(pos.x - start.x, pos.y - start.y);
        draw();
        start = pos;
        // write_text( canvas, ctx )
        coordinates.innerText = `${pos.x}/${pos.y}`
    });

    document.addEventListener('scroll', function(e){
        printf( "e -> ", e )

        ctx.translate(pos.x - start.x, pos.y - start.y);
        draw();

        // Only move the grid when we registered a mousedown event
        if (!start) return;
        let pos = getPos(e);
        // Move coordinate system in the same way as the cursor
        ctx.translate(pos.x - start.x, pos.y - start.y);
        draw();
        start = pos;
    }, true);

    draw(); // on page load

}


function write_text( canvas, ctx ) {

    //Set the font size and the fontface to use.
    ctx.font = '25px Arial';

    //Set the color of the text. This can be
    //an RGB color or a textual description
    //such as red.
    ctx.fillStyle = '0,0,0';

    //Use the fillText method to draw the text.
    ctx.fillText("Text", 10, 10);

}
