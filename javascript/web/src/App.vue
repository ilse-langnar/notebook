<template lang="pug">
#app( v-cloak )

    #setup( v-if="!ilse.target_directories.length" v-html="ilse.components['setup.html']" )

    .ilse( v-if="ilse.target_directories.length && ilse.has_loaded" data-theme="light" )

        .html-render( v-for="( item, index ) in ilse.stack" :key="index" )
            .div( v-html="item.html" :id="item.id" )

        // .app( v-html="render('ilse.html', {})" style="overflow: auto; " )
        // .app( v-html="ilse.components['ilse.html'].html" style="overflow: auto; " )

        // .app( v-html="ilse.components['ilse.html']" style="overflow: auto; " ) // I only use "ilse.components['ilse.html']" instead of ilse.component('ilse.html', {}) because it's a .vue file. IN ALL OTHER USES use "api.component(id)" and NOT "api.components['id']"
        // .app( v-html="ilse.components['ilse.html']" style="overflow: auto; " ) 

        .app( v-html="ilse.components['theme.html'] + ilse.components['url-bar.html'] + ilse.components['main.html'] + ilse.components['contextmenu.html']" style="overflow: auto; " )

</template>
<script>
// eslint-disable-next-line
import printf                                       from "@/functions/printf.js"

// import "@/assets/tailwind.js"

// Ilse
    import ilse                         from "@/ilse.js"

// functions
    import set                                      from "@/functions/set.js"
    import if_else                                  from "@/functions/if_else.js"
    import is_platform                              from "@/functions/is_platform.js"

// HTML
    // import setup                                    from "@/html/setup.html"

export default {

    name: "App",

    data() {
        return {
            mouse_x: -1,
            mouse_y: -1,
            ilse: ilse,
        }
    },

    methods: {

        get_context_menu_style() {
            return `left: ${this.mouse_x}px; top: ${this.mouse_y}px;`
        },

        get_active() {

            let to_return

            ilse.tabs.list.map( tab => {
                if( tab.id === ilse.active ) to_return = tab.components
            })

            return to_return
        },

        set_title() {
            document.head.title = "Ilse Langnar's Notebook"
        },

        set_favicon() {
            // let favicon = require( "@/assets/logo-white-background.png" )
            let favicon = require( "@/assets/logo.svg" )

            (function() {
                var link = document.querySelector("link[rel*='icon']") || document.createElement("link")
                link.type = "image/x-icon"
                link.rel = "shortcut icon"
                link.href = favicon
                document.getElementsByTagName('head')[0].appendChild(link)
            })()

        },

        // Font-Loading needs to be dynamic because of quine
        set_font_face() {

            const mary = new FontFace('Mary', `url( ${require("@/assets/mary.ttf")} )`);

            mary.load().then(function(loadedFont) {
                document.fonts.add( loadedFont )
                document.body.style.fontFamily = ' "Mary" '
            }).catch(function(error) {
                console.error( 'Failed to load font: ' + error )
            })



        },

        setup() {
            document.body.setAttribute( "x-data", "{ api: $store.api }" )

            /*
            let _this = this
            document.addEventListener( "contextmenu", event => {

                ilse.is_context_menu_on = !ilse.is_context_menu_on

                mousemove = document.addEventListener( "", event => {

                        })

                let mousemove 

                if( ilse.is_context_menu_on ) {

                    mousemove = document.addEventListener( "mousemove", event => {

                        if( _this.mouse_x === -1 && _this.mouse_y === -1 ) {
                            this.mouse_x = event.clientX;
                            this.mouse_y = event.clientY;
                        }
                    })
                } else {
                    printf( "removing ..." )
                    document.removeEventListener( "mousemove", mousemove )
                    this.mouse_x = -1
                    this.mouse_y = -1
                }
            })
            */

            if_else( is_platform( 'electron' ),
                yes => this.set_font_face(),
                no => null
            )
            this.set_title()
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>


@keyframes width {
    to {
        width: auto;
    }

    from {
        width: inherit;
    }

}

/*
.context-menu {
    position: absolute;
    height: 200px;
    width: 100px;
    background: #fff;
}
*/

.animation-width {
    animation: width;
    animation-duration: 1s;
}

.cursor-pointer {
    cursor: pointer;
}

.border-bottom {
    border-bottom: 1px solid var( --text-color );
}

.box-shadow {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; 
    border-radius: var( --border-radius );
}

.red {
    background: red;
}

.green {
    background: green;
}

.hover {
    color: var( --text-color );
    background: var( --background-color );
}

.hover:hover {
    /*color: var( --background-color ) !important;*/
    color: var( --background-color ) !important;
    background: var( --link-color ) !important;
}

/* Diagonal stacked paper effect */
.paper {
    background-color: #fff;
    /* Need position to allow stacking of pseudo-elements */
    position: relative;
    /* Padding for demo purposes */
    padding: 30px;
}

.paper,
    .paper::before,
    .paper::after {
    /* Add shadow to distinguish sheets from one another */
    box-shadow: 2px 1px 1px rgba(0,0,0,0.15);
}

.paper::before,
    .paper::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #eee;
}

/* Second sheet of paper */
.paper::before {
    left: 7px;
    top: 5px;
     z-index: -1;
}

/* Third sheet of paper */
.paper::after {
    left: 12px;
    top: 10px;
     z-index: -2;
}

.block {
    display: block;
}

.round {
    border-radius: var( --border-radius );
}

.circle {
    width: 10px !important;
    border-radius: 50%;
    border: 1px solid #000;
}

.shadow {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.left {
    float: left;
    clear: left;
}

.centered {
    display: block;
    margin: 0 auto;
}


.ilse  {
    color: var( --text-color );
    background: var( --background-color ) !important;
    height: 97vh;
    height: 100vh;
    width: 100vw;
    overflow: hidden !important;
}

.ilse[data-theme="dark"] img {
    filter: invert( 100% );
}

.component-icon {
    display: none;
}

/* Electron Frameless configuration */
    body {
    }

    input[type="submit"],
    input[type="reset"],
    input[type="button"],
    input[type="text"],
    button,
    textarea {
        -webkit-app-region: no-drag;
    }

    h1, h2, h3, h4, h5, h6 {
        /* -webkit-user-select: none; */
    }
/* Electron Frameless configuration */

/*
:root, .ilse[data-theme='light'] {

    --background-color: #EFEFEF;
    --secondary-background-color: #CED8E0;
    --terciary-background-color: #CED8E0;

    --text-color: #717171;
    --secondary-text-color: #3c3b3b;
    --terciary-text-color: #8D9EAC;

    --border: 1px solid #4a4a4a;
    --border-radius: 6px;

    --padding: 4px;

    --font-family: Mary, Helvetica, Georgia, Times New Roman, serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    --font-size: 1em;

    --link-color: #5ec7b8;
    --secondary-link-color: #70a7a8;
}

.ilse[data-theme="dark"] {

    --background-color: #131313ff;
    --secondary-background-color: #DCEAF8;
    --terciary-background-color: #5a6269;

    --text-color: #F8F8F8;
    --secondary-text-color: #000;
    --terciary-text-color: #8D9EAC;

    --border: 2px solid #777;
    --border-radius: 6px;

    --padding: 4px;

    --font-family: Mary, Helvetica, Georgia, Times New Roman, serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    --font-size: 1em;

    --box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    --link-color: #5ec7b8;
    --secondary-link-color: #99c6c2;
}
*/

table a:link {
    color: #666;
    font-weight: bold;
    text-decoration:none;
}
table a:visited {
    color: #999999;
    font-weight:bold;
    text-decoration:none;
}
table a:active,
table a:hover {
    color: #bd5a35;
    text-decoration:underline;
}
table {
    font-family:Arial, Helvetica, sans-serif;
    color:#666;
    font-size:12px;
    text-shadow: 1px 1px 0px #fff;
    background:#eaebec;
    margin:20px;
    border:#ccc 1px solid;

    -moz-border-radius:3px;
    -webkit-border-radius:3px;
    border-radius:3px;

    -moz-box-shadow: 0 1px 2px #d1d1d1;
    -webkit-box-shadow: 0 1px 2px #d1d1d1;
    box-shadow: 0 1px 2px #d1d1d1;
}
table th {
    padding:21px 25px 22px 25px;
    border-top:1px solid #fafafa;
    border-bottom:1px solid #e0e0e0;

    background: #ededed;
    background: -webkit-gradient(linear, left top, left bottom, from(#ededed), to(#ebebeb));
    background: -moz-linear-gradient(top,  #ededed,  #ebebeb);
}
table th:first-child {
    text-align: left;
    padding-left:20px;
}
table tr:first-child th:first-child {
    -moz-border-radius-topleft:3px;
    -webkit-border-top-left-radius:3px;
    border-top-left-radius:3px;
}
table tr:first-child th:last-child {
    -moz-border-radius-topright:3px;
    -webkit-border-top-right-radius:3px;
    border-top-right-radius:3px;
}
table tr {
    text-align: center;
    padding-left:20px;
}
table td:first-child {
    text-align: left;
    padding-left:20px;
    border-left: 0;
}
table td {
    padding:18px;
    border-top: 1px solid #ffffff;
    border-bottom:1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;

    background: #fafafa;
    background: -webkit-gradient(linear, left top, left bottom, from(#fbfbfb), to(#fafafa));
    background: -moz-linear-gradient(top,  #fbfbfb,  #fafafa);
}
table tr.even td {
    background: #f6f6f6;
    background: -webkit-gradient(linear, left top, left bottom, from(#f8f8f8), to(#f6f6f6));
    background: -moz-linear-gradient(top,  #f8f8f8,  #f6f6f6);
}
table tr:last-child td {
    border-bottom:0;
}
table tr:last-child td:first-child {
    -moz-border-radius-bottomleft:3px;
    -webkit-border-bottom-left-radius:3px;
    border-bottom-left-radius:3px;
}
table tr:last-child td:last-child {
    -moz-border-radius-bottomright:3px;
    -webkit-border-bottom-right-radius:3px;
    border-bottom-right-radius:3px;
}
table tr:hover td {
    background: #f2f2f2;
    background: -webkit-gradient(linear, left top, left bottom, from(#f2f2f2), to(#f0f0f0));
    background: -moz-linear-gradient(top,  #f2f2f2,  #f0f0f0);	
}

.no-outline:focus {
    outline: none !important;
outline: 3px solid transparent;
}

@font-face {
    font-family: Mary;
    font-style: normal;
    font-weight: lighter;
    src: url("assets/mary.ttf");
}

::selection {
    color: var( --background-color );
    background: var( --text-color );
}

/* Works on Firefox */
* {
    scrollbar-width: thin;
    scrollbar-color: blue orange;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 15px;
}

*::-webkit-scrollbar-track {
    background-color: var( --background-color );
}

*::-webkit-scrollbar-thumb {
    background-color: blue;
    border-radius: 20px;
    /*border: 3px solid orange;*/
    background-color: var( --text-color );
    border: 3px solid var( --background-color );
}

.shortcut {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 25px;
    white-space: nowrap;
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    cursor: default;
    outline: 0px;
    text-decoration: none;
    border: 0px;
    padding: 0px;
    vertical-align: middle;
    box-sizing: border-box;
    /*color: rgb(117, 138, 161);
    background: rgb(235, 242, 247);*/
    color: var( --background-color );
    padding: var( --padding );
    background: var( --text-color );
    border-radius: 2px;
    font-size: 15px;
    margin-left: 20px; 
}

.url {
    width: 70vw !important;
    height: 70vh;
    resize: both;
    box-shadow:0 4px 6px rgba(0,0,0,0.1);
}

.bold  {
    text-weight: bold;
}

.shorctu span {
    padding: 8px 12px;
    border-radius: var( --border-radius );
    background: var( --background-color );
    font-weight: 800;
    white-space: nowrap;
}

input[type="range"] {
    -webkit-appearance: none;
    margin-right: 15px;
    width: 200px;
    height: 7px;
    background: var( --text-color );
    border-radius: 5px;
    background-size: 70% 100%;
    background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var( --text-color );
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background .3s ease-in-out;
}

input[type=range]::-webkit-slider-runnable-track  {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
}

#app {
    /*font-family: Times New Roman, Georgia, Helvetica, serif;*/
    /*font-family: Mary, Helvetica, Georgia, Times New Roman, serif;*/
    font-family: var( --font-family )
}


.fc {
    background: var( --background-color );
    color: var( --text-color );
    height: 500px;
}

/*========Markdown========*/
.link {
    /*color: #5ec7b8;*/
    color: #fff;
    color: var( --link-color );
}

.link:after {
    content: url( "data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWJyYWNrZXRzIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiM0ODUzNjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgPHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTggNGgtM3YxNmgzIiAvPgogIDxwYXRoIGQ9Ik0xNiA0aDN2MTZoLTMiIC8+Cjwvc3ZnPgoKCg==" );
      position: relative; 
      top: 5px;

}

.link:hover {
    text-decoration: underline;
}

.tag {
    color: #d3d3d3;
    color: #698b99;
    color: var(--terciary-text-color);
    color: #8d9eac;
    border-radius: 7px;
    background: #cacfd4;
    background: #d7d9dc;
    padding: 0px 2px;
    margin: 2px;
}

.tag:hover {
    color: #cacfd4;
    background: #8d9eac;
}

/*
.left-sidebar {
    min-height: 91vh;
    border-radius: var( --border-radius );
    flex-basis: 100%;
    min-width: 50%;
    width: 100%;
    background-color: var( --secondary-background-color );
    padding: var( --padding );
}
*/

.right-sidebar {
    min-height: 80vh;
    border-radius: var( --border-radius );
    /*width: 50%;*/
    flex-basis: 70%;
    background-color: var( --secondary-background-color );
    padding: var( --padding );
}


/* ![[Ilse]] */
.html-embed {
    margin-left: 10px;
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: var( --padding );
    border: 1px solid #000;
}

.cloze-deletion {
    color: gray;
}

.separator {
    width: 100%;
    border: 1px solid #000;
}

.highlight {
    background: yellow;
    background-color: var( --text-color );
    color: var( --background-color );
    padding: 2px;
    margin: 4px;
    border-radius: var( --border-radius );
}

.cloze-deletion {
    color: var( --text-color );
    background: var( --text-color );
    border-radius: var( --border-radius );
}

.cloze-deletion:hover {
    color: var( --text-color );
    background: var( --background-color );
}

.img {
    display: block;
}

.todo {
    padding: 5px;

}

.video {
    display: block;
    clear: both;
    margin: 3px;
}

.audio {
    display: block;
    clear: both;
}

input.checkbox {
    height:1em;
    width:1em;
    cursor:pointer;
    position:relative;
    -webkit-transition: .10s;
    border-radius:4em;
    background-color:red;
    border: 10px solid red;
}

blockquote {
    padding: 5px;
    border-left: 4px solid #bdbdbd;
    border-radius: 4px;

    /*background-color: var( --text-color );
    color: var( --background-color );*/

    border-left: 4px solid var( --secondary-text-color );

    color: var( --background-color );
    background: var( --secondary-background-color );

    /*color: var( --secondary-text-color );
    background: #eef5f5;*/

    margin-top: 0px;
    margin-bottom: 5px;
    margin-left: auto;
}

code {
    background-color: #ededed;
    color: #000000;
    padding: 0.25em 0.5em 0.25em;
    border-radius: 4px;
    font-family: CodeFire, CodeFira, monospace;
}

.markdown ol li {
    margin-left: 20px;
}

.query {
    /*text-decoration: underline;*/
    background-color: #D5DADF;
    color: var( --text-color );
    background-color: var( --background-color );
    padding: var( --padding );
    border-radius: var( --border-radius );
}

.italic {
    text-decoration: italic;
}

.inline-embed {
    color: var( --text-color );
    background-color: var( --background-color );
}

.note-reference:before {
    content: "(("
}

.note-reference:after {
    content: "))"
}

.note-reference {
    /*color: var( --secondary-background-color );
    background-color: var( --secondary-text-color );
    padding: var( --padding );
    border-radius: var( --border-radius );
    overflow: hidden;*/
    display: flex;
}

.file-reference {

    text-decoration: underline;
    text-decoration: underline;
    text-decoration: none;
    text-decoration: italic;

    color: var( --secondary-text-color );
    color: var( --text-color );

    background-color: #D5DADF;
    background-color: var( --secondary-background-color );
    background-color: var( --background-color );

    padding: var( --padding );
    border-radius: var( --border-radius );
    width: 80%;

    margin-left: 10%;
    margin-left: 3%;

}

.component-embed {
    background-color: #D5DADF;
    color: var( --secondary-text-color );
    background-color: var( --secondary-background-color );
    border-radius: var( --border-radius );
    max-height: 400px;
    overflow: auto;
    margin-left: 25px;
    margin-bottom: 4px;
    width: 90%;
    box-shadow:0 4px 6px rgba(0,0,0,0.1);
    padding: var( --padding );
}

hr .hr {
    width: 100%;
    border: 1px solid #000;
}

/*========Markdown========*/

.input {
    background: var( --background-color );
    color: var( --text-color );
    border: 1px solid var( --text-color ) !important;
    padding: 0px;
    font-size: .8em !important;
    margin-bottom: 5px;
}

select {
    background: var( --background-color );
    color: var( --text-color );
    padding: var( --padding );
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
}

select option {
    background: var( --background-color );
    color: var( --text-color );
}

button {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    color: var( --text-color );
    appearance: none;
    cursor: pointer;
    display: inline-block;
    border: 0px !important;
}

.slick-button {
    flex: 1;
    margin: 24px;
    appearance: none;
    background-color: #FAFBFC;
    background-color: var( --background-color );
    /*border: 1px solid rgba(27, 31, 35, 0.15);*/
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    color: #24292E;
    color: var( --text-color );
    cursor: pointer;
    display: inline-block;
    /*font-family: Mary, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";*/
    font-family: var( --font-family );
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    padding: 6px 16px;
    position: relative;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    word-wrap: break-word;
    display: block;
    margin: 1em auto;
    /*border: 1px solid var( --text-color ) !important;*/
    border: 0px !important;
}

.slick-span {
    flex: 1;
    appearance: none;
    background-color: #FAFBFC;
    background-color: var( --background-color );
    /*border: 1px solid rgba(27, 31, 35, 0.15);*/
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    color: #24292E;
    color: var( --text-color );
    cursor: pointer;
    display: inline-block;
    /*font-family: Mary, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";*/
    font-family: var( --font-family );
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    padding: 3px 8px;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: top;
    word-wrap: break-word;
    /*border: 1px solid var( --text-color ) !important;*/
    border: 0px !important;
    width: 200px;
}


.is-light {
    color: #7c7777;
}

.flex {
    display: flex;
}

.space-between {
    justify-content: space-between;
}

.space-around {
    justify-content: space-around;
}

.flexi {
    flex: 1;
}
.flexb {
    flex-basis: 50%;
}

.centered {
    display: block;
    margin: 0 auto;
    text-align: center;
}

/*! bulma.io v0.9.3 | MIT License | github.com/jgthms/bulma */
/* Bulma Utilities */
.button, .input, .textarea, .select select, .file-cta,
.file-name, .pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis {
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
}

.button:focus, .input:focus, .textarea:focus, .select select:focus, .file-cta:focus,
.file-name:focus, .pagination-previous:focus,
.pagination-next:focus,
.pagination-link:focus,
.pagination-ellipsis:focus, .is-focused.button, .is-focused.input, .is-focused.textarea, .select select.is-focused, .is-focused.file-cta,
.is-focused.file-name, .is-focused.pagination-previous,
.is-focused.pagination-next,
.is-focused.pagination-link,
.is-focused.pagination-ellipsis, .button:active, .input:active, .textarea:active, .select select:active, .file-cta:active,
.file-name:active, .pagination-previous:active,
.pagination-next:active,
.pagination-link:active,
.pagination-ellipsis:active, .is-active.button, .is-active.input, .is-active.textarea, .select select.is-active, .is-active.file-cta,
.is-active.file-name, .is-active.pagination-previous,
.is-active.pagination-next,
.is-active.pagination-link,
.is-active.pagination-ellipsis {
  outline: none;
}

.button[disabled], .input[disabled], .textarea[disabled], .select select[disabled], .file-cta[disabled],
.file-name[disabled], .pagination-previous[disabled],
.pagination-next[disabled],
.pagination-link[disabled],
.pagination-ellipsis[disabled],
fieldset[disabled] .button,
fieldset[disabled] .input,
fieldset[disabled] .textarea,
fieldset[disabled] .select select,
.select fieldset[disabled] select,
fieldset[disabled] .file-cta,
fieldset[disabled] .file-name,
fieldset[disabled] .pagination-previous,
fieldset[disabled] .pagination-next,
fieldset[disabled] .pagination-link,
fieldset[disabled] .pagination-ellipsis {
  cursor: not-allowed;
}

.button, .breadcrumb, .pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis, .tabs, .is-unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.select:not(.is-multiple):not(.is-loading)::after, .navbar-link:not(.is-arrowless)::after {
  border: 3px solid transparent;
  border-radius: 2px;
  border-right: 0;
  border-top: 0;
  content: " ";
  display: block;
  height: 0.625em;
  margin-top: -0.4375em;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: rotate(-45deg);
  transform-origin: center;
  width: 0.625em;
}

.box:not(:last-child), .content:not(:last-child), .notification:not(:last-child), .progress:not(:last-child), .table:not(:last-child), .table-container:not(:last-child), .title:not(:last-child),
.subtitle:not(:last-child), .block:not(:last-child), .breadcrumb:not(:last-child), .level:not(:last-child), .message:not(:last-child), .pagination:not(:last-child), .tabs:not(:last-child) {
  margin-bottom: 1.5rem;
}

.delete {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: rgba(10, 10, 10, 0.2);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  pointer-events: auto;
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 20px;
  max-height: 30px;
  max-width: 30px;
  min-height: 30px;
  min-width: 30px;
  outline: none;
  position: relative;
  vertical-align: top;
  width: 30px;
}

.delete::before, .delete::after {
  background-color: white;
  content: "";
  display: block;
  left: 80%;
  position: absolute;
  top: 20%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}

.delete::before {
  height: 2px;
  width: 50%;
}

.delete::after {
  height: 50%;
  width: 2px;
}

.delete:hover, .delete:focus, {
  background-color: rgba(10, 10, 10, 0.3);
}

.delete:active {
  background-color: rgba(10, 10, 10, 0.4);
}

.is-small.delete {
  height: 16px;
  max-height: 16px;
  max-width: 16px;
  min-height: 16px;
  min-width: 16px;
  width: 16px;
}

.is-medium.delete {
  height: 24px;
  max-height: 24px;
  max-width: 24px;
  min-height: 24px;
  min-width: 24px;
  width: 24px;
}

.is-large.delete {
  height: 32px;
  max-height: 32px;
  max-width: 32px;
  min-height: 32px;
  min-width: 32px;
  width: 32px;
}

.button.is-loading::after, .loader, .select.is-loading::after, .control.is-loading::after {
  -webkit-animation: spinAround 500ms infinite linear;
          animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 9999px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
}

.image.is-square img,
.image.is-square .has-ratio, .image.is-1by1 img,
.image.is-1by1 .has-ratio, .image.is-5by4 img,
.image.is-5by4 .has-ratio, .image.is-4by3 img,
.image.is-4by3 .has-ratio, .image.is-3by2 img,
.image.is-3by2 .has-ratio, .image.is-5by3 img,
.image.is-5by3 .has-ratio, .image.is-16by9 img,
.image.is-16by9 .has-ratio, .image.is-2by1 img,
.image.is-2by1 .has-ratio, .image.is-3by1 img,
.image.is-3by1 .has-ratio, .image.is-4by5 img,
.image.is-4by5 .has-ratio, .image.is-3by4 img,
.image.is-3by4 .has-ratio, .image.is-2by3 img,
.image.is-2by3 .has-ratio, .image.is-3by5 img,
.image.is-3by5 .has-ratio, .image.is-9by16 img,
.image.is-9by16 .has-ratio, .image.is-1by2 img,
.image.is-1by2 .has-ratio, .image.is-1by3 img,
.image.is-1by3 .has-ratio, .is-overlay, .hero-video {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.navbar-burger {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: none;
  border: none;
  color: currentColor;
  font-family: var( --font-family );
  font-size: 1em;
  margin: 0;
  padding: 0;
}

/* Bulma Base */
/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  /*font-size: 100%;
  font-weight: normal; */
  font-weight: 200;
}

ul {
  list-style: none;
}

button,
input,
select,
textarea {
  margin: 0;
}

*, *::before, *::after {
  box-sizing: inherit;
}

img,
video {
  height: auto;
  max-width: 100%;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

td:not([align]),
th:not([align]) {
  text-align: inherit;
}

html {
  box-sizing: border-box;
  background-color: var(--background-color);
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  min-width: 300px;
  /*overflow-x: hidden;*/
  /*overflow-y: scroll;*/
  height: 100%;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
     -moz-text-size-adjust: 100%;
          text-size-adjust: 100%;
}

/* increase line-height for everything except headings */
body :not(:is(h1,h2,h3,h4,h5,h6)) {
    line-height: 1.75;
    line-height: 1.50;
}

article,
aside,
figure,
footer,
header,
hgroup,
section {
  display: block;
}

body,
button,
input,
optgroup,
select,
textarea {
  /*font-family: Mary, BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;*/
  font-family: var( --font-family );
}

code,
pre {
  -moz-osx-font-smoothing: auto;
  -webkit-font-smoothing: auto;
  font-family: monospace;
  font-family: var( --font-family3 );
}

body {
  /*color: #4a4a4a;*/
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
}

a {
  color: #485fc7;
  cursor: pointer;
  text-decoration: none;
}

a strong {
  color: currentColor;
}

a:hover {
  color: #363636;
}

code {
  background-color: whitesmoke;
  color: #da1039;
  font-size: 0.875em;
  font-weight: normal;
  padding: 0.25em 0.5em 0.25em;
}

/*
hr {
    border: none;
    display: block;
    height: 2px ;
    margin: 0.5rem 0;
    border: 1px solid #bbb8b8;
    width: 80%;
    margin: 10px auto;
    border-radius: 50%;
}
*/

img {
  height: auto;
  max-width: 100%;
}

input[type="checkbox"],
input[type="radio"] {
  vertical-align: baseline;
}

small {
  font-size: 0.875em;
}

span {
  font-style: inherit;
  font-weight: inherit;
}

strong {
  color: #363636;
  font-weight: 700;
}

fieldset {
  border: none;
}

pre {
  -webkit-overflow-scrolling: touch;
  background-color: whitesmoke;
  color: #4a4a4a;
  font-size: 0.875em;
  overflow-x: auto;
  padding: 1.25rem 1.5rem;
  white-space: pre;
  word-wrap: normal;
}

pre code {
  background-color: transparent;
  color: currentColor;
  font-size: 1em;
  padding: 0;
}

table td,
table th {
  vertical-align: top;
}

table td:not([align]),
table th:not([align]) {
  text-align: inherit;
}

table th {
  color: #363636;
}

.has-text-centered {
    text-align: center;
    display: block;
    margin: 0 auto;
}

.is-pulled-left {
  float: left !important;
}

.is-pulled-right {
  float: right !important;
}

.is-size-1 {
  font-size: 3rem !important;
}

.is-size-2 {
  font-size: 2.5rem !important;
}

.is-size-3 {
  font-size: 2rem !important;
}

.is-size-4 {
  font-size: 1.5rem !important;
}

.is-size-5 {
  font-size: 1.25rem !important;
}

.is-size-6 {
  font-size: 1rem !important;
}

.is-size-7 {
  font-size: 0.75rem !important;
}

@media screen and (max-width: 768px) {
  .is-size-1-mobile {
    font-size: 3rem !important;
  }
  .is-size-2-mobile {
    font-size: 2.5rem !important;
  }
  .is-size-3-mobile {
    font-size: 2rem !important;
  }
  .is-size-4-mobile {
    font-size: 1.5rem !important;
  }
  .is-size-5-mobile {
    font-size: 1.25rem !important;
  }
  .is-size-6-mobile {
    font-size: 1rem !important;
  }
  .is-size-7-mobile {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-size-1-tablet {
    font-size: 3rem !important;
  }
  .is-size-2-tablet {
    font-size: 2.5rem !important;
  }
  .is-size-3-tablet {
    font-size: 2rem !important;
  }
  .is-size-4-tablet {
    font-size: 1.5rem !important;
  }
  .is-size-5-tablet {
    font-size: 1.25rem !important;
  }
  .is-size-6-tablet {
    font-size: 1rem !important;
  }
  .is-size-7-tablet {
    font-size: 0.75rem !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-size-1-touch {
    font-size: 3rem !important;
  }
  .is-size-2-touch {
    font-size: 2.5rem !important;
  }
  .is-size-3-touch {
    font-size: 2rem !important;
  }
  .is-size-4-touch {
    font-size: 1.5rem !important;
  }
  .is-size-5-touch {
    font-size: 1.25rem !important;
  }
  .is-size-6-touch {
    font-size: 1rem !important;
  }
  .is-size-7-touch {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-size-1-desktop {
    font-size: 3rem !important;
  }
  .is-size-2-desktop {
    font-size: 2.5rem !important;
  }
  .is-size-3-desktop {
    font-size: 2rem !important;
  }
  .is-size-4-desktop {
    font-size: 1.5rem !important;
  }
  .is-size-5-desktop {
    font-size: 1.25rem !important;
  }
  .is-size-6-desktop {
    font-size: 1rem !important;
  }
  .is-size-7-desktop {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-size-1-widescreen {
    font-size: 3rem !important;
  }
  .is-size-2-widescreen {
    font-size: 2.5rem !important;
  }
  .is-size-3-widescreen {
    font-size: 2rem !important;
  }
  .is-size-4-widescreen {
    font-size: 1.5rem !important;
  }
  .is-size-5-widescreen {
    font-size: 1.25rem !important;
  }
  .is-size-6-widescreen {
    font-size: 1rem !important;
  }
  .is-size-7-widescreen {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-size-1-fullhd {
    font-size: 3rem !important;
  }
  .is-size-2-fullhd {
    font-size: 2.5rem !important;
  }
  .is-size-3-fullhd {
    font-size: 2rem !important;
  }
  .is-size-4-fullhd {
    font-size: 1.5rem !important;
  }
  .is-size-5-fullhd {
    font-size: 1.25rem !important;
  }
  .is-size-6-fullhd {
    font-size: 1rem !important;
  }
  .is-size-7-fullhd {
    font-size: 0.75rem !important;
  }
}

.space {
    height: 100px;
    clear: both
}

.mini-space {
    height: 50px;
    clear: both
}

</style>
