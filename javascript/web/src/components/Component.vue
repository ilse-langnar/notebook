<template lang="pug" >
.component
    img.is-pulled-right(
        v-if="!options.hide_bullet"
        src="@/assets/images/point.svg"

        @click.shift="on_shift_click(component_index)"
        @click.left="on_left_click($event, component)"
        @click.middle="on_middle_click($event, component)"
        @click.right="on_right_click($event, component)"
        @dblclick="on_db_click(component)"
        @wheel="on_wheel( $event, component )"
        @contextmenu="function(){}" 

        style="width: 20px; cursor: pointer; margin: 0.5em; "
        :title="get_title(component)"
        )

    br
    component( v-if="component.get_component()" :is="component.get_component()" :component="component" :style="get_component_margin(component)" )
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "IlseComponent",

    props: {
        component: { type: Object, required: false },
        options: { type: Object, required: false, default: 
            function() {
                return {
                    hide_bullet: false,
                }
            }
        },
    },

    data() {
        return {
            ilse: ilse,
            components_key: "",
            options_key: Math.random(),
        }
    },

    methods: {

        on_shift_click( index ) {
            this.toggle_is_component_maximized( index )
        },

        on_left_click( event, component ) {
            event.preventDefault()
        },

        on_middle_click( event, component ) {
            ilse.modals.open( "types", { component } )
        },

        on_right_click( event, component ) {
            event.preventDefault()
            this.delete_component( component )
        },

        get_title( component ) {
 
            let title = `width: ${component.width}\noffset: ${component.offset}\ntype: ${component.type}\n\nmiddle-click: Change Type\ndouble-click: ??\nDrag-n-Drop: Move around \nshift-click: Toggle Maximized`
            return title
        },

        on_wheel( event, component ) {

            event.preventDefault()

            let is_ctrl     = event.ctrlKey
            let is_shift    = event.shiftKey
            let number      = event.deltaY
            let is_positive = number < 0

            if( is_positive ) {
                component.width++
            } else {
                component.width--
            }

        },

        get_component_margin( component ) {

            let style        = `height: 100%;`

            let index        = ilse.components.indexOf( component )
            let is_last_item = index === ilse.components.length -1  && ilse.components.length !== 1
            if( is_last_item ) {
                style += `margin-right: 30px;`
            }

            return style
        },

        on_db_click( component ) {
            printf( "on_db_click -> component -> ", component )
        },

        get_popover_position( index ) {

            // this.options_key = Math.random()

            if( ilse.components.length === 1 ) {
                return "left"
            }

            if( ilse.components.length === 2 ) {
                if( index === 0 ) return "bottom"
                if( index === 1 ) return "left"
            }

            if( ilse.components.length > 2 ) {
                if( index === ilse.components.length - 1) return "left"
                return "bottom"
            }

        },

        toggle_is_component_maximized( component_index ) {

            let is_there_an_off_component = false

            ilse.components.map( component => {
                if( !component.is_on ) is_there_an_off_component = true
            })

            if( is_there_an_off_component ) {
                // All on

                ilse.components.map( ( component, index ) => {
                    ilse.components[index].is_on = true
                })

            } else {
                // One on, rest off

                // All off
                ilse.components.map( ( component, index ) => {
                    ilse.components[index].is_on = false
                })

                // Selected on
                ilse.components.map( ( component, index ) => {
                    if( index === component_index ) ilse.components[index].is_on = true
                })

            }

        },

        delete_component( component ) {

            ilse.components.map( (_component, index) => {

                if( _component.id === component.id ) {
                    ilse.components.splice( index, 1 )
                }

            })

            ilse.save()

            // this.components_key = Math.random()
        },

        listen() {

            Messager.on( "~components.vue", ( action, payload ) => {

                if( action === "toggle-maximized" ) {
                    this.toggle_is_component_maximized( payload )
                }

            })

        },

        setup() {
            this.listen()

        },

    },

    mounted() {
        this.setup();
    }

}
</script>
