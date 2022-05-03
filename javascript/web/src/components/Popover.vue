<template lang="pug" >
// .popover( v-if="name" )
.popover

    .icon( @click="on_icon_click"  :id="name + '-popover-icon'" )
        slot( name="icon" )

    // .arrow( :class="get_arrow_class()" )
    // .arrow

    .content( v-if="is_on" @click="on_content_click"  :style="get_content_style(name)" :id="name + '-popover-content'" )
        img.is-pulled-right( src="@/assets/images/x.svg" style="width: 20px; cursor: pointer; margin: 0.5em; " title="Close Popover" @click="close" )
        slot( name="content" )

</template>
<script>
// eslint-disable-next-line
const printf                        = console.log;

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default {

    name: "Popover",

    props: {
       direction: { type: String, required: false, },
       name: { type: String, required: false, },
    },

    data() {
        return {
            ilse: ilse,
            style: "",
            is_on: false,
        }
    },

    methods: {

        on_blur() {
            this.is_on = false
        },

        on_link_blur() {
            this.is_on = false
        },

        close() {
            this.is_on = false
        },

        get_arrow_class() {

            let is_right    = this.direction === "right" 
            let is_left     = this.direction === "left" 
            let is_top      = this.direction === "top" 
            let is_bottom   = this.direction === "bottom" 

                if( is_right ) return "right-arrow"
                if( is_left ) return "left-arrow"
                if( is_top ) return "top-arrow"
                if( is_bottom ) return "bottom-arrow"

            return ""

        },

            // TODO: XXX: left_offset is not correct ...
        get_content_style( name ) {
            printf( "get_content_style -> name -> ", name  )

            let style       = `width: 10%; margin-left: 10px;`
            let is_right    = this.direction === "right" 
            let is_left     = this.direction === "left" 
            let is_top      = this.direction === "top" 
            let is_bottom   = this.direction === "bottom" 

            let dom           = document.getElementById( `${name}-popover-icon` )
            printf( "dom -> ", dom )
                if( !dom.firstChild ) return

            let first_child = dom.firstChild
            let left_offset = first_child.offsetLeft
            let top_offset  = first_child.offsetTop


            if( is_right ) {
                style += `left: ${left_offset+ 10}px; top: ${top_offset-30}px`
            } else if( is_left ) {
                style += `right: ${left_offset+10}px; top: ${top_offset-10}px`
            } else if( is_top ) {
                style += `left: ${left_offset- 50}px; top: ${top_offset-100}px`
            } else if( is_bottom ) {
                style += `left: ${left_offset- 100}px; top: ${top_offset+30}px`
            }
            printf( "style -> ", style )

            return style

        },

        on_content_click() {
            printf( "on_content_click click " )
        },

        on_icon_click() {
            printf( "on_con_click click" )
            this.is_on = !this.is_on
            printf( "this.is_on -> ", this.is_on )
        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style scoped>

.content {
    display: block;
    position: absolute;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgb(52 73 94 / 20%);
    padding: 5px;
    border-radius: 5px;

}

/*
.contentt {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: -150px;
    transform: translate( 0, 10px );
    background-color: #bfbfbf;
    padding: 1.5rem;
    width: auto;
}

.content:before {
    position: absolute;
    z-index: -1;
    content: "";
    right: calc( 50% - 10px );
    top: -8px;
    border-style: solid;
}

.popover {
    z-index: 10;
    opacity: 1;
    visibility: visible;
    transform: translate( 0, -20px );

}
*/

.arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
}

.top-arrow {
    border-width: 5px 5px 0 5px;
    border-color: #fafafa transparent transparent transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.bottom-arrow {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #fafafa transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.right-arrow {
    border-width: 5px 5px 5px 0;
    border-color: transparent #fafafa transparent transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.left-arrow {
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #fafafa;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.content {
    /*width: auto;*/
    min-width: 100px;
    background-color: #fafafa;
    color: #212121;
    text-align: center;
    padding: 2px;
    display: inline-block;
    border-radius: 3px;
    position: absolute;
    font-size: 14px;
    font-weight: normal;
    border: 1px #ebebeb solid;
    z-index: 200000;
    /*
    -moz-box-shadow: rgb(58, 58, 58) 0 0 6px 0;
    -webkit-box-shadow: rgb(58, 58, 58) 0 0 6px 0;
    box-shadow: rgb(58, 58, 58) 0 0 6px 0;*/
}


/*
.content:after {
    content: " ";
    border-top: 11px solid #222;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: relative;
    top: 111px;
    right: -140px;
}
*/

/*
.content:before {
    content: "";
    position: absolute;
    bottom: -25px;
    left: 175px;
    border-style: solid;
    border-width: 25px 25px 0;
    border-color: #fff transparent;
    display: block;
    width: 0;
    z-index: 1;
}

.content:before {
    content: "";
    position: absolute;
    top: 250px;
    left: 174px;
    border-style: solid;
    border-width: 26px 26px 0;
    border-color: #000 transparent;
    display: block;
    width: 0;
    z-index: 0;

}
*/
.popper[x-placement^="top"] {
    margin-bottom: 5px;
}

.popper[x-placement^="top"] .popper__arrow {
    border-width: 5px 5px 0 5px;
    border-color: #fafafa transparent transparent transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.popper[x-placement^="bottom"] {
    margin-top: 5px;
}

.popper[x-placement^="bottom"] .popper__arrow {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #fafafa transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.popper[x-placement^="right"] {
    margin-left: 5px;
}

.popper[x-placement^="right"] .popper__arrow {
    border-width: 5px 5px 5px 0;
    border-color: transparent #fafafa transparent transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.popper[x-placement^="left"] {
    margin-right: 5px;
}

.popper[x-placement^="left"] .popper__arrow {
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #fafafa;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

</style>
