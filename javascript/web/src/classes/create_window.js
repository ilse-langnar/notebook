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
    // is_internal_and_iframe = false,
    external        = false,
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

    let frame

    printf( "external -> ", external )
    if( external ) {

        frame = ilse.frame.create({
            title: title,
            appearanceName: appearanceName,
            left: left, top: top, width: width, height: height,
            movable: movable, //Enable to be moved by mouse
            resizable: resizable, //Enable to be resized by mouse
            // html: html,
            url: url,
            // html: `<iframe src="${url}" style="width: 100%; height: 100%; overflow: hidden; background: #fff; " > /<iframe>`,
            // url: url,
        })

    } else {

        frame = ilse.frame.create({
            title: title,
            appearanceName: appearanceName,
            left: left, top: top, width: width, height: height,
            movable: movable, //Enable to be moved by mouse
            resizable: resizable, //Enable to be resized by mouse
            html: `<iframe src="${get_target_directory_url()}${url}" style="z-index: 15; width: 100%; height: 100%; overflow: hidden; background: #fff; " > /<iframe>`,
            // url: url,
        })


    }

    frame.show()

    return frame
}
