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

                  return `<span class="link" onclick="console.log('lllll'); var delay = 1000; window.lastClick = 0; if( delay > ( Date.now() - window.lastClick ) ) { console.log('threwe') } else { console.log('another'); window.lastClick = Date.now(); Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}', target: this.parentNode.parentNode.id} ) }; " title="${link}" > [[${real}]] </span>`
              } else {
                  return `<span class="link" onclick="console.log('lllll'); var delay = 1000; window.lastClick = 0; if( delay > ( Date.now() - window.lastClick ) ) { console.log('threwe') } else { console.log('another'); window.lastClick = Date.now(); Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}', target: this.parentNode.parentNode.id} ) }; " title="${link}" > [[${link}]] </span>`
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

                let is_file     = !is_img && !is_video && !is_audio && ilse.files.list.indexOf( url + ".md") !== -1 && url.indexOf(".") === -1
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
                    let id = `file-${url}`
                    let content
                    async function get() {
                        content = await ilse.filesystem.file.get( "/second/" + url + ".md" )
                        if( !ilse.__HTML_CACHE ) {
                            ilse.__HTML_CACHE = {}
                            ilse.__HTML_CACHE[url] = content
                        } else {
                            ilse.__HTML_CACHE[url] = content
                        }
                    }
                    get()

                    if( is_electron ) return `
                        <div>
                            <h3> ${url} </h3>
                            <textarea style="width: 50vw; height: 300px; background: var( --background-color ); color: var( --text-color ); resize: none;" >
                                ${ilse.__HTML_CACHE ? ilse.__HTML_CACHE[url] : "HMMM"}
                            <textarea/>
                        </div>
                    `
                    // <img style="width: 1px;" onload="console.log(document.getElementById('${id}'))" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAAA3NCSVQICAjb4U/gAAAAHElEQVQ4y2P8//8/A1mAiYFcMKpzVOeozuGoEwAt9wMjCmsdlAAAAABJRU5ErkJggg==" />
                    // <img style="width: 1px;" onload="async function set() { printf( "${content}" ) }; set()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAAA3NCSVQICAjb4U/gAAAAHElEQVQ4y2P8//8/A1mAiYFcMKpzVOeozuGoEwAt9wMjCmsdlAAAAABJRU5ErkJggg==" />

                    return `<div> <img style="border: 1px solid #000; width: 40px;" onload="console.log('hahaahahah')" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAAA3NCSVQICAjb4U/gAAAAHElEQVQ4y2P8//8/A1mAiYFcMKpzVOeozuGoEwAt9wMjCmsdlAAAAABJRU5ErkJggg==" /> File: ${url} </div> `

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

        const cloze_deletion = MarkdownPlugin(

            /*/@(\w+)/,*/
            /{{c[0-9]::.*}}/,

            // this function will be called when something matches
            function( match, utils ) {
                let content = match[0]
                // return `<a href="https://example.com"> </a>`
                return `<span class="cloze-deletion" title="cloze" > ${content} </span>`
            }
        )

        this.plugins.push( cloze_deletion )

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

              let ref = ilse.notes.get_references( match[0] )

              // printf( "note_ref -> match -> ", ref )
              if( !ref ) return `<span class="note-reference" > ((MALFORMED REF)) </span>`

              // let note_content = ilse.notes.query(`${ref}: `)[0]
              let note_content = ilse.notes.query(ref)[0]
                  if( note_content ) note_content  = note_content.content
                  if( !note_content ) note_content = `Could not find note: ${ref} ):`

              // let html = this.render( note_content )

              return `<span class="note-reference" title="${ref}" > ${note_content} </span>`
          }

        )

        this.plugins.push( note_ref )

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

    // Removed resolved, have only last
    reference( text, last = "" ) {

        let link            = ilse.notes.get_references( text )
            if( !link ) return `${last} \n\t ${text} `

        let link_content    = ilse.notes.query( link + ":")[0].content
        printf( "text -> ", text )
        printf( "link -> ", link )
        printf( "link_content -> ", link_content )

        if( link ) {
            if( last ) {
                // last += `\n ${link_content}`
            } else {
                last += `${text} \n ${link_content} `
            }
        }

        let ref          = ilse.notes.get_references( link_content )

        if( ref ) {
            let target_content  = ilse.notes.query( ref + ":")[0].content
            return this.reference( target_content, last )
        } else {
            return last
        }

    }

    get_blockquote( content ) {

        let ignore = content.indexOf("#!scan") !== -1
            if( ignore ) return

        // === Refs === //
        let text   = this.reference( content )
        let chunks = text.split("\n")

        // let final  = "<blockquote>"
        let final  = `<div class="note-reference" > `
        for( const [index, chunk] of chunks.entries() ) {
            if( index === 0 ) {
                // final += `<p> ${chunk} </p>`
                // printf( "chunk -> ", chunk )
                // final += `<span> ${chunk} </span>`
            } else {
                // final += `<blockquote style="margin-left: ${index * 10}px"> ${chunk} </blockquote>`
                final += `<span> ${chunk} </span>`
            }
        }
        // final += "</blockquote>"

        final += "</div>"

        return final
    }

    render( string ) {
        return this.md.render( string )
    }

}

