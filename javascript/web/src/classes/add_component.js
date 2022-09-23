const printf                    = console.log

import ilse                     from "@/ilse.js"

export default function add_component({
    id          = Math.random(),
    name        = "random-name",
    description = "",
    img         = ilse.irequire.img("menu.svg"),
    _component  = {},
    type        = "help",
    width       = 9,
    props       = {},
    is_on       = true,
}) {

    printf( "add_component -> type -> ", type )
    let component = ilse.types.get( type )
    printf( "add_component -> component -> ", component )

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
    }

    printf( "before -> ilse.component -> ", ilse.components.length )
    ilse.components.push( component )
    printf( "before -> ilse.component -> ", ilse.components.length )
}
