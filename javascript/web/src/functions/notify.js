import printf                       from "@/functions/printf.js"

import ilse                         from "@/ilse.js"

export default function notify( title, text = "", options = {
    // time: 300000,
    time: 3000,
    on_close: null,
    on_cancel: null
}) {

    let notification = ilse.components['notification.html']

    let id           = "notification-" + Math.random()

    let html         = notification
        .replace( "$title", title )
        .replace( "$description", text )

    ilse.stack.push({ id, html })

    setTimeout( () => {
        ilse.stack.pop()
    }, options.time )

    return id

}
