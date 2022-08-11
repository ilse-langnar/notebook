const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Markdown
    import MarkdownIt                   from "markdown-it"

    import markdownItPluginTaskList     from "markdown-it-task-lists"
    import MarkdownPlugin               from "markdown-it-regexp"
    // const wikilinks                     = require( 'markdown-it-wikilinks')

export default class Markdown {

    constructor() {

        this.plugins = []
        this.setup()
    }

    setup() {

        window.Messager = Messager


        var link = MarkdownPlugin(
          /*/\[\[.*\]\]/gi,*/
          /\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,

          function( match, utils ) {

              let link = match[0]
                  .replace("[[", "")
                  .replace("]]", "")

              let has_spacer = link.indexOf("|") !== -1
              if( has_spacer ) {
                  let real = link.split("|")[1].trim()

                  return `<span class="link" onclick="console.log('lllll'); var delay = 1000; window.lastClick = 0; if( delay > ( Date.now() - window.lastClick ) ) { console.log('threwe') } else { console.log('another'); window.lastClick = Date.now(); Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}', target: (this.parentNode.parentNode.id ? this.parentNode.parentNode.id : this.parentNode.parentNode.parentNode.id) } ) }; " title="${link}" > [[${real}]] </span>`
              } else {
                  return `<span class="link" onclick="console.log('lllll'); var delay = 1000; window.lastClick = 0; if( delay > ( Date.now() - window.lastClick ) ) { console.log('threwe') } else { console.log('another'); window.lastClick = Date.now(); Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}', target: (this.parentNode.parentNode.id ? this.parentNode.parentNode.id : this.parentNode.parentNode.parentNode.id ) } ) }; " title="${link}" > [[${link}]] </span>`
              }


          }

        )

        this.plugins.push( link )

        /*
        var todo = MarkdownPlugin(
            /\[.\]/,

          function( match, utils ) {
              printf( "match -> ", match )
              printf( "@@@@@@ " )
              let input = document.createElement( "input" )
                  input.checked = true
                  input.type    = "checkbox"
                  input.onclick= function() {
                      alert( "XXXX" )
                  }

              return `<input class="todo" onclick="this.,g" type="checkbox" >`

          }

        )

        this.plugins.push( todo )
        */


        /*/^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,*/
        var highlight = MarkdownPlugin(
          /^==(.*)==/,
          function( match, utils ) {

              let content = match[0]
                  .replace( "==", "" )
                  .replace( "==", "" )

              return `<span class="highlight" title="${content}" > ${content} </span>`
          }

        )

        this.plugins.push( highlight )

        // if( is_electron ) return `<img class="img" title="${url}" src="app://${target_dir}/${url}" />`
        // if( is_electron ) return `<img class="img" title="${url}" src="file://${target_dir}/${url}" />`
        // if( is_electron ) return `<img class="img" title="${url}" src="app://${target_dir}/${url}" />`
        // if( is_electron ) return `<video class="video" controls src="app://${target_dir}/${url}"/>`
        // if( is_electron ) return `<audio class="audio" controls title="${url}" src="app://${target_dir}/${url}"/>`

        const embed = MarkdownPlugin(

            /*/@(\w+)/,*/
            /*/^\!\[\[.*\.(png|jpg|gif|jpeg)\]\]$/gi,*/
            /*/[^!]\[.+?\]/g,*/
            /*/^\S*\!\[\[.*\.(png|jpg|gif|jpeg)\]\]\s*$/gi,*/
            /^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,

            /* /\S*#(?:\[[^\]]+\]|\S+)/,*/

            // this function will be called when something matches
            function( match, utils ) {

                let url         = match[0]
                    .replace( "![[" , "" )
                    .replace( "]]" , "" )

                let extention   = url.substr(url.lastIndexOf("."), url.length )

                let is_video    = extention === ".mp4" || extention === ".webm"
                let is_img      = extention === ".png" || extention === ".jpg" || extention === ".gif" || extention === ".jpeg" || extention === ".svg"
                let is_audio    = extention === ".mp3" || extention === ".ogg" || extention === ".wav"
                // let is_pdf      = extention === ".pdf"
                // else if( is_pdf ) { if( is_electron ) return `<iframe height="100%" width=100% src="atom://${target_dir}/second/${url}" ></iframe>`; return `<iframe height="100%" width=100% src="http://localhost:8090/file/${url}" ></iframe>`; }

                let is_file     = !is_img && !is_video && !is_audio && !is_pdf && url.indexOf(".") === -1
                let is_electron = process.env.VUE_APP_TARGET === "ELECTRON"
                let is_demo     = process.env.VUE_APP_TARGET === "DEMO" // TODO: How do we render <img> while in a demo
                let target_dir  = ilse.target_directories[0]

                if( is_img ) {
                    let zen_style = ilse.is_zen ? "width: 100px; " : ""
                    if( is_electron ) return `<img style="${zen_style}" class="img" title="${url}" src="atom://${target_dir}/second/${url}" />`
                    return `<img style="${zen_style}" class="img" title="${url}" src="http://localhost:8090/file/${url}"/>`
                } else if( is_video ) {
                    if( is_electron ) return `<video class="video" title="${url}" controls src="atom://${target_dir}/second/${url}"/>`
                    return `<video class="video" title="${url} "controls title="${url}" src="http://localhost:8090/file/${url}"/>`
                } else if( is_audio ) {
                    if( is_electron ) return `<audio class="audio" title="${url}" controls title="${url}" src="atom://${target_dir}/second/${url}"/>`
                    return `<audio class="audio" title="${url}" controls title="${url}" src="http://localhost:8090/file/${url}"/>`
                } else if( is_file ) {

                    return `<span> ![[${url}]] </span>`
                    /*
                    let id      = `file-${url}`
                    let content = ilse.filesystem.file.read.sync( "/second/" + url + ".md" )

                    if( is_electron ) return `<div class="file-reference" >
                            <h3> ${url} </h3>
                            ${content}
                        </div> `
                    return `<div> <img style="border: 1px solid #000; width: 40px;" onload="console.log('hahaahahah')" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAAA3NCSVQICAjb4U/gAAAAHElEQVQ4y2P8//8/A1mAiYFcMKpzVOeozuGoEwAt9wMjCmsdlAAAAABJRU5ErkJggg==" /> File: ${url} </div> `
                    */

                }

            }
        )

        this.plugins.push( embed )

        const tag = MarkdownPlugin(

            /*/@(\w+)/,*/
            /*/\#\S$/,*/
            /\S*#(?:\[[^\]]+\]|\S+)/,

            // this function will be called when something matches
            function( match, utils ) {

                let tag = match[0]
                // return `<a href="https://example.com"> </a>`
                return `<span class="tag" > ${tag} </span>`
            }
        )

        this.plugins.push( tag )

        const inline_embed = MarkdownPlugin(

            /*/@(\w+)/,*/
            /{{.*}}/,

            // this function will be called when something matches
            function( match, utils ) {

                let content       = match[0].replace("{{", "").replace("}}", "")
                let chunks        = content.split("/")
                let target        = ilse.embeds.get( chunks[0] )
                if( target ) {

                    return target.fn( chunks )
                } else {
                    return `<span class="inline-embed" > ${content} </span>`
                }

                let id            = Math.random()
                let div           = document.createElement( "div" )
                    div.innerHTML = content
                    div.id        = id

                printf( "div -> ", div )
                printf( "inline_embed -> content -> ", content )
                printf( "ilse.embeds -> ", ilse.embeds )

                // return `<a href="https://example.com"> </a>`
                // return `<span class="inline-embed" title="cloze" > ${content} </span>`

                vm.$mount('#some-place');
                return div.outerHTML
            }
        )

        this.plugins.push( inline_embed )

        var note_ref = MarkdownPlugin(
          /* /\(({2}([^)]*)\){2}/g,
          /\s*\([()]*(\([^()]*\)[^()]*)\)\s?/gi,
          /({2}([^)]*)){2}/g,
          /\({2}([^()]+(\([^)]+\)[^)]*)*)\){2}/,
          /\s*\([()]*(\([^()]*\)[^()]*)\)\s?/,
          /[(]{2}[^()]*[)]{2}/,*/
          /*/\s?\({2}(.*)\){2}\s?/gi,*/
          /*/\([^()](.*)[^()]*)+\)/,*/
          // /\([^)]*\)|\[[^\]]*\]/g,
          // /\([^)]*\)(.*)\[[^\(]*\]/g,
          /*/^.*?\(\((.*)\)\)$/,*/
          /*/^(.*|\S\s)?\(\((.*)\)\)$/,*/
          /*/^(.*|\S)?\(\((.*)\)\)$/,*/
          /*/^.*?\(\((.*)\)\)/,*/
          /[\s\S]*[(]\((.*)\)[)]/,


          function( match, utils ) {

              /*
              let chunks = match[0].split(" ")
              let ref

              let has_opening_parenthesis
              let has_closing_parenthesis
              let has_both

              for( const chunk of chunks ) {

                  has_opening_parenthesis  = chunk.indexOf( "((" ) !== -1
                  has_closing_parenthesis  = chunk.indexOf( "))" ) !== -1

                  has_both                 = has_opening_parenthesis && has_closing_parenthesis
                  if( has_both ) ref = chunk.replace( " ", "" ).replace( "((", "" ).replace( "))", "" )

              }
              */

              let refs     = ilse.utils.get_note_references_from_string( match[0] )
              let ref      = refs[0]
              let has_refs = !!refs[0]
                  if( !has_refs ) return `<span> ((MALFORMED REF)) </span>`
              // let ref  = ilse.notes.extract_note_references( match[0] )
                  // if( !ref ) return `<span> ((MALFORMED REF)) </span>`

              let note_content = ilse.notes.query(ref)[0]
                  if( note_content ) note_content  = note_content.content
                  if( !note_content ) note_content = `Could not find note: ${ref} ):`

              return `<span title="${ref}" > ${note_content} </span>`
          }

        )

        // this.plugins.push( note_ref )

        const separator = MarkdownPlugin(
            /^\S*---\S*$/,
            function( match, utils ) {
                return `<hr class="separator" title="Separator" />`
            }
        )

        this.plugins.push( separator )

        const code_block = MarkdownPlugin(
            /*/```([^]+?.*[^]+?[^]+?)/,*/
            /(\\`{3}\\n+)(.*)(\\n+\\`{3})/,
            /*/(\>)(.*)/,*/

            function( match, utils ) {
                return `<p class="separator" title="Separator" />@@@@@ </p>`
            }
        )

        this.plugins.push( code_block )

        const strike_through = MarkdownPlugin(
            /{{c[0-9]::.*}}/,

            // this function will be called when something matches
            function( match, utils ) {

                let content = match[0]

                return `<span class="strike-through" title="${content}" > ${content} </span>`
            }
        )

        // - [ ]
        const todo = MarkdownPlugin(
            // /-\ \[|\]/gi,
            // [^\n]+ [\n]
            /^ *\[([\sx])] /i,

            // this function will be called when something matches
            function( match, utils ) {

                let content = match[0]
                let id      = Math.random().toString().replace( "0.", "" )
                let checked = content.indexOf( "[x]" ) !== -1

                let html    =  `<input type="checkbox" id="${id}" title="Click to Toggle" onclick="document.getElementById(${id}).checked ?  document.getElementById(${id}).checked = true : document.getElementById(${id}).checked = false " ${checked ? "checked" : ""}/>`

                return html
            }
        )

        this.plugins.push( todo )



        const inline_code = MarkdownPlugin(
            /(\\`{1})(\\`{1})/,

            // this function will be called when something matches
            function( match, utils ) {

                let content = match[0]
                return `<span class="blockquote" title="${content}" > AAAA ${content} </span>`
            }
        )

        this.after_setup()
    }

    after_setup() {

        const md = new MarkdownIt()
            // .use( markdownItPluginTaskList )
            // .use( wikilinks )

        for( const plugin of this.plugins ) {
            md.use( plugin )
        }

        this.md = md
    }

    render( string ) {
        return this.md.render( string )
    }

}
