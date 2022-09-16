const printf                    = console.log

import ilse                     from "@/ilse.js"

export default function add_component({ type = "help", width= 9, props = {} }) {
    let component = new ilse.classes.Component({ type, width, props })
        ilse.components.push( component )
}

