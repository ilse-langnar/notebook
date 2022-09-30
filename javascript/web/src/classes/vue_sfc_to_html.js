const printf = console.log

import Vue                           from "vue"

export default async function vue_sfc_to_html( name, props, parent ) {

    // let Component = require( `@/components/${name}` ).default
    let Component = await import( `@/components/${name}` )
        Component     = Component.default
    printf( ">>> Component -> ", Component )
    var c         = new Vue({
        ...Component,
        parent: parent,
        // propsData: props,
        propsData: {
            file: "Mental Models",
        }
    }).$mount()

    printf( "c -> ", c )

    printf( "c.$el -> ", c.$el )
    printf( "c.$el.outerHTML -> ", c.$el.outerHTML )

    return c
}
