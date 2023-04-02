<template lang="pug">
#app( v-cloak style="font-family: 'Inter Light', Roboto, serif, sans; " )

    // Layers( for modals etc. )
    .layers( v-for="( item, index ) in ilse.stack" :key="index" )
        .layer( v-html="item.html" :id="item.id" )

    #sass( v-if="ilse.platform === 'sass' " style="max-height: 100vh; overflow: hidden;" )
        // .ll( v-html="component('url-bar.html')" style="overflow: auto; " x-init="console.log('$store -> ', $store)" )
        // .ll( v-html="component('contextmenu.html')" style="overflow: auto; " x-init="console.log('$store -> ', $store)" )
        // .ll( v-html="component('theme.html')" style="overflow: auto; " x-init="console.log('$store -> ', $store)" )
        // .ll( v-html="component('main.html')" style="overflow: auto; " x-init="console.log('$store -> ', $store)" )
        .app( v-html="component('ilse.html', {})" style="overflow: auto; " ) 

    #electron( v-if="ilse.platform === 'electron' " )

        #setup( v-if="!ilse.target_directories.length" v-html="ilse.components['setup.html']" )

        .loading( v-if="ilse.target_directories.length && !ilse.has_loaded" v-html="ilse.components['loading.html']" )

        .ilse( v-if="ilse.target_directories.length && ilse.has_loaded" data-theme="light" )

            // .app( v-html="component('ilse.html', {})" style="overflow: auto; " )

            // .app( v-html="ilse.components['ilse.html'].html" style="overflow: auto; " )

            // .app( v-html="ilse.components['ilse.html']" style="overflow: auto; " ) // I only use "ilse.components['ilse.html']" instead of ilse.component('ilse.html', {}) because it's a .vue file. IN ALL OTHER USES use "api.component(id)" and NOT "api.components['id']"
            // .app( v-html="ilse.components['ilse.html']" style="overflow: auto; " ) 

            // .app( v-html="ilse.components['theme.html'] + ilse.components['url-bar.html'] + ilse.components['main.html'] + ilse.components['contextmenu.html']" style="overflow: auto; " )

            .app( v-html="ilse.components['ilse.html']" style="overflow: auto; " ) 

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
    import component                                from "@/functions/component.js"

// HTML
    // import setup                                    from "@/html/setup.html"

export default {

    name: "App",

    data() {
        return {
            ilse: ilse,
        }
    },

    methods: {

        component( one, two, tree ) {
            return component( one, two, tree )

        },

        test() {
            console.log('ilse.components -> ', ilse.components)
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

            this.set_font_face(),

            if_else( ilse.platform === 'electron',
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

@font-face {
    font-family: 'Inter';
    src: url('assets/Inter-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

/*
.test > * {
    --accent: #f7d1cd;
    --accent: #b392ac;
    --accent: #735d78;
}

.test > blockquote {
    --accent: #f7d1cd;
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

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var( --secondary );
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
  background-color: var(--primary);
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

.space {
    height: 100px;
    clear: both
}

.mini-space {
    height: 50px;
    clear: both
}

</style>
