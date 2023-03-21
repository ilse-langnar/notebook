import printf                   from "@/functions/printf.js"

export default function dom_img_2_base64( dom ) {
    let canvas      = document.createElement( "canvas" )
        canvas.height   = dom.naturalHeight
        canvas.width    = dom.naturalWidth

    let ctx         = canvas.getContext( "2d" )
        ctx.drawImage( dom, 0, 0, canvas.width, canvas.height )

    let base64string= canvas.toDataURL()

    return base64string
}
