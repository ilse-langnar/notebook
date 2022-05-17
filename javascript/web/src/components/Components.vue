<template lang="pug" >
.components( style="display: flex; flex-direction: row;" :key="components_key" )

    .component( v-show="components.length && component.is_on" v-for="(component, component_index) in components" :key="uniqueKey + component.id"  :style="get_component_style(component)" :component="component" )

        img.is-pulled-right(
            v-show="!ilse.config.dark"
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
            v-popover="{ name: component.id, position: get_popover_position(component_index) }" )

        img.is-pulled-right(
            v-show="ilse.config.dark"
            src="@/assets/images/dark-mode/point.svg"

            @click.shift="on_shift_click(component_index)"
            @click.left="on_left_click($event, component)"
            @click.middle="on_middle_click($event, component)"
            @click.right="on_right_click($event, component)"
            @dblclick="on_db_click(component)"
            @wheel="on_wheel($event, component)"
            @contextmenu="function(){}" 

            style="width: 20px; cursor: pointer; margin: 0.5em; "
            title="get_title(component)"
            v-popover="{ name: component.id, position: get_popover_position(component_index) }" )

        br
        component( v-if="component.get_component()" :is="component.get_component()" :component="component" :style="get_component_margin(component)" )

    br
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Popover
    import Popover                      from "@/components/Popover.vue"

export default {

    name: "Components",

    props: {
        components: { type: Array, required: false },
        uniqueKey: { type: String, required: false }, // Avoid same :key to avoid DOM update errors in vue.js
    },

    components: {
        Popover,
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
            this.maximize_component( index )
        },

        on_left_click( event, component ) {
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

        maximize_component( component_index ) {

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

        increase_width( index ) {

            let _index
            for( const component of ilse.components ) {
                _index++

                if( index === _index ) {
                    ilse.components[_index].width++
                }

            }

        },

        decrease_width( index ) {

            let _index
            for( const component of ilse.components ) {
                _index++

                if( index === _index ) {

                    if( ilse.components[_index].width <= 0 ) return

                    ilse.components[_index].width--
                }

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

        get_component_style( component ) {
            // let style = `flex: 1; margin-left: 10px; height: 100%; flex-basis: ${component.width * 10}%; `
            let style = `flex: 1; height: 100%; flex-basis: ${component.width * 10}%; `

            return style
        },

        setup() {

        },

    },

    mounted() {
        this.setup();
    }

}
</script>
