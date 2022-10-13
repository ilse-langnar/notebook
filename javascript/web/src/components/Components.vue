<template lang="pug" >
.components-wrapper( style="width: 100%;" )

    .components( style="display: flex; flex-direction: row;" :key="components_key" )

        // Bar
        .div( v-if="!ilse.is_zen" style="position: fixed; left: 0px; top: 0px; width: 30px; height: 100vh; z-index: 0; " @drop.prevent="on_drop" @dragover.prevent )
            img( :src="irequire.img('folders.svg')" style="width: 20px; cursor: pointer; margin-top: 50px; margin-left: 3px; " @click="toggle_left_menu( $event, 'default', true )" )
            img( :src="irequire.img('letter-i.svg')" style="width: 20px; cursor: pointer; margin-left: 3px; " @click="toggle_left_menu( $event, 'default', true )" )

            br
            br

            img.extended( v-for="( item, index ) in get_list()" :key="index" :src="irequire.img('point.svg')" style="cursor: pointer; width: 20px; margin-left: 3px;  "   :title="$t('daily_notes')" @click="toggle_left_menu( $event, item, true )" )

        // 
        iComponent( v-resize="onResize" v-show="ilse.is_left_sidebar_open && !ilse.is_zen" :component="get_menu_component()" :options="{hide_bullet: true }" style="min-height: 20vh !important; height: 20vh; max-height: 50vh; margin-left: 20px; width: 20%; " )

        .menu-arrows( v-if="!ilse.is_zen" )
            img( v-show="!ilse.is_left_sidebar_open" :src="irequire.img('arrow-narrow-left.svg')" style="width: 20px; position: fixed; top: 1%; left: 5px; cursor: pointer; z-index: 1; " @click="toggle_left_menu( $event, 'default', true )" )
            img( v-show="ilse.is_left_sidebar_open" :src="irequire.img('arrow-narrow-right.svg')" style="width: 20px; position: fixed; top: 1%; left: 5px; cursor: pointer; z-index: 1; " @click="toggle_left_menu( $event, 'default', true )" )

        .component( v-for="(component, component_index) in components" :key="uniqueKey + component.id"  :style="get_component_style(component)" :component="component" )
            // Don't render window nor modal.
            iComponent( :component="component" :id="component.key" )

        iComponent.right-sidebar( v-show="ilse.is_right_sidebar_open" :component="get_right_sidebar()" :options="{ hide_bullet: true }" :style="get_component_style(get_right_sidebar())" )

    .no-components( v-if="!components.length" style="flex-direction: column; height: 89vh; overflow: hidden !important; " )
        .centered( style="" )
            h1.is-size-1 {{ $t('no_components') }}
            img( :src="irequire.img('logo.svg')" style="width: 20%;" )

    br
</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Components
   import iComponent                    from "@/components/iComponent.vue"
   import Test                          from "@/components/Test.vue"
   import Vue                           from "vue"

// functions
   import vue_sfc_to_html               from "@/classes/vue_sfc_to_html.js"
   import set                           from "@/classes/set.js"

// libs
   // import Resizable                    from "resizable"
   import resize                        from "vue-resize-directive"

export default {

    name: "Components",

    props: {
        components: { type: Array, required: false },
        uniqueKey: { type: String, required: false }, // Avoid same :key to avoid DOM update errors in vue.js
    },

    directives: {
        resize,
    },

    components: {
        iComponent,
    },

    watch: {
        async components( list ) {
            let added = list[list.length - 1]
        }
    },

    data() {
        return {
            ilse: ilse,
            components_key: "",
        }
    },

    methods: {

        get_list() {
            if( ilse.config.left_sidebar ) return ilse.config.left_sidebar
            return []
        },

        on_drop( event, ll ) {

            if( !ilse.config.left_sidebar ) ilse.config.left_sidebar = []

            let id = ilse.drag
            printf( "id -> ", id )
            if( id ) {
                ilse.config.left_sidebar.push( id )
                ilse.config.save()
            }

        },

        onResize( event ) {
            printf( "Components -> event -> ", event )


        },

        toggle_left_menu( event, name, is_on ) {
            set( ilse, "is_left_sidebar_open", !ilse.is_left_sidebar_open )
            ilse.left_sidebar = name
            // set( ilse, "is_left_sidebar_open", is_on )
        },

        get_menu_component() {
            return ilse.types.get( "left-sidebar" )
        },

        get_right_sidebar() {
            return ilse.types.get( "right-sidebar" )
        },

        get_component_style( component ) {
            return `flex: 1; flex-basis: ${component.width * 10}%; overflow: auto; max-height: 99vh; background: var( --background-color ); border-radius: var( --border-radius ); `; 
        },

        setup() {

            /*
            var el = document.querySelector("#left-sidebar")

            var resizable = new Resizable( el, {
                within: 'parent',
                handles: 's, se, e',
                threshold: 1,
                draggable: false
            })

            printf( "resizable -> ", resizable )

            resizable.on( 'resize', function( event ) {
                printf( "event -> ", event )
            });
            */

            /*
            var p = document.getElementById('left-sidebar');
            printf( "p -> ", p )

            p.addEventListener('click', function init() {
                printf( "click -" )
                p.removeEventListener('click', init, false);
                p.className = p.className + ' resizable';
                var resizer = document.createElement('div');
                resizer.className = 'resizer';
                p.appendChild(resizer);
                resizer.addEventListener('mousedown', initDrag, false);
            }, false);

            var startX, startY, startWidth, startHeight;

            function initDrag(e) {
               startX = e.clientX;
               startY = e.clientY;
               startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
               startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
               document.documentElement.addEventListener('mousemove', doDrag, false);
               document.documentElement.addEventListener('mouseup', stopDrag, false);
            }

            function doDrag(e) {
               p.style.width = (startWidth + e.clientX - startX) + 'px';
               p.style.height = (startHeight + e.clientY - startY) + 'px';
            }

            function stopDrag(e) {
                document.documentElement.removeEventListener('mousemove', doDrag, false);    document.documentElement.removeEventListener('mouseup', stopDrag, false);
            }
            */




            /*
            let resize = document.getElementById( "left-sidebar" )

            resize.addEventListener("mousedown", function (e) {
                drag = true;
                moveX = e.x;
            });

            container.addEventListener("mousemove", function (e) {
                moveX = e.x;
                if (drag) left.style.width = moveX;
            });
            */

            /*
            const BORDER_SIZE = 4;
            const panel = document.getElementById("left-sidebar");
            printf( "panel -> ", panel )

            let m_pos;
            function resize(e){
                printf( "resize -> e -> ", e )
                const dx = m_pos - e.x;
                m_pos = e.x;
                panel.style.width = (parseInt(getComputedStyle(panel, '').width) + dx) + "px";

            }

            panel.addEventListener("mousedown", function(e){
                printf( "mousedown -> e -> ", e )
                if (e.offsetX < BORDER_SIZE) {
                    m_pos = e.x;
                    document.addEventListener("mousemove", resize, false);
                }
            }, false);

            document.addEventListener("mouseup", function(){
                document.removeEventListener("mousemove", resize, false);
            }, false);
            */

        },

    },

    mounted() {
        setTimeout( () => { this.setup(); }, 4000 )
    }

}
</script>
