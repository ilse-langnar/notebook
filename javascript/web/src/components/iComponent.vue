<template lang="pug" >
.component
    img.is-pulled-right(
        v-if="!options.hide_bullet"
        :src="ilse.require('point.svg')"

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


    .embed( v-if="component.type === 'embed' " )
        embed( :src="get_embed_src(component.component)" )

    // .vue( v-if="component.get_component() && ilse.types.get(component.type).type === 'vue' " )

    // p {{ component.type === 'vue' ? 'AAAA' : "NOO" }}
    .vue( v-if="component.type === 'vue' " )
        component( :is="component.component.default" :component="component" :style="get_component_margin(component)" )

    // .html-css-and-javascript( v-if="ilse.types.get(component.type).type === 'html' " )
    .html-css-and-javascript( v-if="component.type === 'html' " )
        div( :id="component.id" ) {{embed_into_html(component)}}

</template>
<script>
// eslint-disable-next-line
import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "iComponent",

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

        get_embed_src( id ) {
            let target_dir  = ilse.target_directories[0]

            let final       = `app://${target_dir}/${id}`

            return final
        },

        embed_into_html( payload ) {

            setTimeout( () => {
                let TYPE =ilse.types.get(payload.type)
                let dom  = document.getElementById( payload.id )
                dom.append( TYPE.component )
            }, 1000 )
        },

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
 
            let title = `width: ${component.width}
            ${this.$t('offset')}: ${component.offset}
            ${this.$t('type')}: ${component.type}
            middle-click: Change Type
            double-click: ??
            Drag-n-Drop: Move around 
            shift-click: Toggle Maximized`
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
