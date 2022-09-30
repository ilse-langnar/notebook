const printf = console.log

import ilse                         from "@/ilse.js"

// functions
    // import is_dev                       from "@/classes/is_dev.js"
    import get_protocol                 from "@/classes/get_protocol.js"
    import get_target_directory_url     from "@/classes/get_target_directory_url.js"

export default function create_window({
    html,
    id              = Math.random().toString().replace("0.", ""),
    url,
    use_embed       = true,
    title           = "Title",
    appearanceName  = "yosemite",
    left            = 200,
    top             = 200,
    width           = 600,
    height          = 400,
    movable         = true,
    resizable       = true,
}) {

    if( !html && !url ) throw new Error( `Error: create_window needs either a "html" or a "url" to work you passed me a object with none!` )

    // let endpoint = `${get_protocol()}${ilse.target_directories[0]}/${html}`
    let endpoint = `${get_target_directory_url()}${html}`
    printf( "endpoint -> ", endpoint )

    let frame = ilse.frame.create({
        title: title,
        appearanceName: appearanceName,
        left: left, top: top, width: width, height: height,
        movable: movable, //Enable to be moved by mouse
        resizable: resizable, //Enable to be resized by mouse
        // html: `<iframe src="${url}" style="width: 100%; height: 100%; overflow: hidden; "> </iframe>`
        // html: `<iframe src="${endpoint}" style="width: 100%; height: 100%; overflow: hidden; "> </iframe>`,
        // html: use_embed ? `<iframe id="${id}" class="floating-window" data-floating-window src="${endpoint}" style="width: 100%; height: 100%; overflow: hidden; " > </iframe> ` : html,
        html: use_embed ? `<embed id="${id}" class="floating-window" data-floating-window src="${endpoint}" style="width: 100%; height: 100%; overflow: hidden; " /> ` : html,
        url: url,
    })

    frame.show()

    return frame
}
