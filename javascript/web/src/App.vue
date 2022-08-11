<template lang="pug">
#app( v-cloak )
    router-view // our stuff
</template>
<script>
// eslint-disable-next-line
const printf                                        = console.log;

// import "bulma/css/bulma.min.css"

// process.env.NODE_ENV === 'production' ? require("bulma/css/bulma.min.css") : require("@/assets/css/bulma.css")
// require("@/assets/css/bulma.css")

// <----------> Title <----------> //
// import title                                        from "@/utils/title.js";
// <----------> Title <----------> //

    // window.Mousetrap = Mousetrap
    // printf( "Mousetrap -> ", Mousetrap )

// directives: {
    // title,
// },
// title: "Ilse Langna's Noreboko",

// metaInfo: {
    // title: "Ilse Langnar's Notebook"
// },

// require("@/assets/domarrow.css")
// require("@/assets/js/domarrow.js")

export default {

    name: "App",

    data() {
        return {}
    },

    methods: {

        setFavicon() {
            // let favicon = require( "@/assets/images/logo-white-background.png" )
            let favicon = require( "@/assets/images/logo.svg" )

            (function() {
                var link = document.querySelector("link[rel*='icon']") || document.createElement("link")
                link.type = "image/x-icon"
                link.rel = "shortcut icon"
                link.href = favicon
                document.getElementsByTagName('head')[0].appendChild(link)
            })()

        },

        setup() {
        },

    },

    mounted() {
        this.setup();
    }

}
</script>
<style>


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
    color: var( --link-color );
}

.link:hover {
    text-decoration: underline;
}

.tag {
    color: #d3d3d3;
    color: #698b99;
}

.left-sidebar {
    min-height: 91vh;
    border-radius: var( --border-radius );
    /*width: 50%;*/
    flex-basis: 100%;
    min-width: 50%;
    width: 100%;
    background-color: var( --secondary-background-color );
    padding: var( --padding );
}

.right-sidebar {
    min-height: 80vh;
    border-radius: var( --border-radius );
    /*width: 50%;*/
    flex-basis: 70%;
    background-color: var( --secondary-background-color );
    padding: var( --padding );
}


/* ![[Ilse]] */
.file-embed {
    margin-left: 10px;
    border: 1px solid var( --text-color );
    border-radius: var( --border-radius );
    padding: var( --padding );
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

.strike-through {
    text-decoration: line-through;
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
}

.audio {
    display: block;
    clear: both;
}

input[type="checkbox"] {
    height:1em;
    width:1em;
    cursor:pointer;
    position:relative;
    -webkit-transition: .10s;
    border-radius:4em;
    background-color:red;
}

blockquote {
    padding: 5px;
    margin: 4px;
    border-left: 4px solid #bdbdbd;
    border-radius: 4px;
    margin-left: 10px;
    background-color: #ededed;

    /*background-color: var( --text-color );
    color: var( --background-color );*/

    border-left: 4px solid var( --text-color );
    color: var( --text-color );
    background: var( --secondary-background-color );
    margin-left: auto;
}

code {
    background-color: #ededed;
    color: #000000;
    padding: 0.25em 0.5em 0.25em;
    border-radius: 4px;
    font-family: CodeFire, CodeFira, monospace;
}

.query {
    /*text-decoration: underline;*/
    background-color: #D5DADF;
    color: var( --text-color );
    background-color: var( --background-color );
    padding: var( --padding );
    border-radius: var( --border-radius );
}
.note-reference {
    /*text-decoration: underline;*/
    background-color: #D5DADF;
    color: var( --secondary-text-color );
    background-color: var( --secondary-background-color );
    padding: var( --padding );
    border-radius: var( --border-radius );
}

.file-reference {
    /*text-decoration: underline;*/
    background-color: #D5DADF;
    color: var( --secondary-text-color );
    background-color: var( --secondary-background-color );
    padding: var( --padding );
    border-radius: var( --border-radius );
    width: 80%;
    margin-left: 10%;
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

hr {
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
    border: 1px solid var( --text-color ) !important;
}

.is-light {
    color: #7c7777;
}

.flex {
    display: flex;
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

html {
  box-sizing: border-box;
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
