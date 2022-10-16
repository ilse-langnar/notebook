import printf                   from "@/classes/printf.js"

import ilse                     from "@/ilse.js"

export default function add_component({
    id          = Math.random(),
    name        = "random-name-" + Math.random(),
    description = "",
    img         = ilse.require("menu.svg"),
    _component  = {},
    type        = "help",
    width       = 9,
    props       = {},
    is_on       = true,
}) {

    let component = ilse.types.get( type )


    if( !component ) {

        component = ilse.types.add({
            id: id,
            name: name,
            description: description,
            img: img,
            component: _component,
            width: width,
            is_on: is_on,
            type: type,
            props: props,
        })

    } else {
        component.props = props
        printf( "component -> ", component )
        ilse.components.push( component )
    }
}
