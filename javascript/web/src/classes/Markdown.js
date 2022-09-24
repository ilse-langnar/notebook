const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Markdown
    import MarkdownIt                   from "markdown-it"
    import MarkdownPlugin               from "markdown-it-regexp"

// functions
    import get_note_references_from_string from "@/classes/get_note_references_from_string.js"
    import string_to_html               from "@/classes/string_to_html.js"

// plugins
    import highlight                    from "@/classes/markdown_it_plugin_highlight.js" // ==I'm fabulous==
    import tag                          from "@/classes/markdown_it_plugin_tag.js" // #databases
    import separator                    from "@/classes/markdown_it_plugin_separator.js" // ---
    import code_block                   from "@/classes/markdown_it_plugin_code_block.js" // ```javascript let new_thing = function(){}```
    import strike_through               from "@/classes/markdown_it_plugin_strike_through.js" // ???
    import todo                         from "@/classes/markdown_it_plugin_todo.js" // - [ ]
    import inline_code                  from "@/classes/markdown_it_plugin_inline_code.js" // `console.log("Hello, World")`
    import link                         from "@/classes/markdown_it_plugin_link.js" // [[Hello]]
    // import inline_embed                 from "@/classes/markdown_it_plugin_link.js" // {{word-count}}
    import embed                        from "@/classes/markdown_it_plugin_embed.js" // ![[img.png]] ![[UFOs.mp4]] ![[book.pdf]] ![[table.html]] ![[song.ogg]]

export default class Markdown {

    constructor() {

        this.plugins = [
            MarkdownPlugin( highlight.regexp, highlight.fn ),
            MarkdownPlugin( tag.regexp, tag.fn ),
            MarkdownPlugin( separator.regexp, separator.fn ),
            MarkdownPlugin( code_block.regexp, code_block.fn ),
            MarkdownPlugin( strike_through.regexp, strike_through.fn ),
            MarkdownPlugin( todo.regexp, todo.fn ),
            MarkdownPlugin( inline_code.regexp, inline_code.fn ),
            MarkdownPlugin( link.regexp, link.fn ),
            // MarkdownPlugin( inline_embed.regexp, inline_embed.fn ),
            MarkdownPlugin( embed.regexp, embed.fn ),
        ]
        this.setup()
    }

    setup() {

        // window.Messager = Messager

          /*/\[\[.*\]\]/gi,*/
        /*
        var link = MarkdownPlugin(
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
        */

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
        /*
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
        */

        // if( is_electron ) return `<img class="img" title="${url}" src="app://${target_dir}/${url}" />`
        // if( is_electron ) return `<img class="img" title="${url}" src="file://${target_dir}/${url}" />`
        // if( is_electron ) return `<img class="img" title="${url}" src="app://${target_dir}/${url}" />`
        // if( is_electron ) return `<video class="video" controls src="app://${target_dir}/${url}"/>`
        // if( is_electron ) return `<audio class="audio" controls title="${url}" src="app://${target_dir}/${url}"/>`


        // /<embed/,

        /*
        const embed_tag = MarkdownPlugin(
            /<embed[\s\S]/,

            // this function will be called when something matches
            function( match, utils ) {

                printf( "@@@@ match -> ", match )
                printf( "utils -> ", utils )
                printf( "match[0] -> ", match[0] )
                let url         = match[0]
            }
        )
        printf( "Adding embed tag ... " )

        this.plugins.push( embed_tag )
        printf( "embed tag added: -> ", embed_tag )
        */

        // /*/@(\w+)/,*/ // /*/^\!\[\[.*\.(png|jpg|gif|jpeg)\]\]$/gi,*/ // /*/[^!]\[.+?\]/g,*/ // /*/^\S*\!\[\[.*\.(png|jpg|gif|jpeg)\]\]\s*$/gi,*/ // /* /\S*#(?:\[[^\]]+\]|\S+)/,*/ // // this function will be called when something matches

        /*
        const embed = MarkdownPlugin(
            /^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,

            function( match, utils ) {

                let url         = match[0]
                    .replace( "![[" , "" )
                    .replace( "]]" , "" )

                let extention   = url.substr(url.lastIndexOf("."), url.length )

                let is_video    = extention === ".mp4" || extention === ".webm"
                let is_img      = extention === ".png" || extention === ".jpg" || extention === ".gif" || extention === ".jpeg" || extention === ".svg"
                let is_audio    = extention === ".mp3" || extention === ".ogg" || extention === ".wav"
                let is_html     = extention === ".html" || extention === ".htm"
                // let is_pdf      = extention === ".pdf"
                // else if( is_pdf ) { if( is_electron ) return `<iframe height="100%" width=100% src="atom://${target_dir}/second/${url}" ></iframe>`; return `<iframe height="100%" width=100% src="http://localhost:8090/file/${url}" ></iframe>`; }

                let is_file     = !is_img && !is_video && !is_audio && !is_html && url.indexOf(".") === -1
                let is_electron = process.env.VUE_APP_TARGET === "ELECTRON"
                let is_demo     = process.env.VUE_APP_TARGET === "DEMO" // TODO: How do we render <img> while in a demo
                let target_dir  = ilse.target_directories[0]

                if( is_img ) {
                    let zen_style = ilse.is_zen ? "width: 100px; " : ""
                    if( is_electron ) return `<img style="${zen_style}" class="img" title="${url}" src="atom://${target_dir}/${url}" />`
                    return `<img style="${zen_style}" class="img" title="${url}" src="http://localhost:8090/file/${url}"/>`
                } else if( is_video ) {
                    if( is_electron ) return `<video class="video" title="${url}" controls src="atom://${target_dir}/${url}"/>`
                    return `<video class="video" title="${url} "controls title="${url}" src="http://localhost:8090/file/${url}"/>`
                } else if( is_audio ) {
                    if( is_electron ) return `<audio class="audio" title="${url}" controls title="${url}" src="atom://${target_dir}/${url}"/>`
                    return `<audio class="audio" title="${url}" controls title="${url}" src="http://localhost:8090/file/${url}"/>`
                } else if( is_html ) {

                    let exists = ilse.filesystem.file.exists.sync( url )
                    if( exists ) {

                        let html      = ilse.filesystem.file.read.sync( url )
                        function base64EncodeUnicode( str, type = "text/html" ) {
                            let utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                                return String.fromCharCode('0x' + p1);
                            })
                            return `data:${type};base64,` + btoa( utf8Bytes )
                        }
                        let base64 = base64EncodeUnicode( html )
                        let dom    = string_to_html( html )

                        let base   = document.createElement( "base" )
                        printf( "before base -> ", base )
                        printf( "ilse.target_directories -> ", ilse.target_directories )
                        printf( "target_dir -> ", target_dir )
                            // base.href  = target_dir + "/"
                            base.href  = `file://${target_dir}/`
                        printf( "@@@ base.href -> ", base.href )
                        printf( "@@ base -> ", base )

                            dom.head.appendChild( base )
                        base64     = base64EncodeUnicode( dom.documentElement.innerHTML )
                        printf( "dom -> ", dom )

                        printf( `${target_dir}/${url}` )
                        printf( `NON ELECTRON: ${ilse.path.join(target_dir, url) }` )
                        if( is_electron ) return `<embed src="${base64}" style="height: 100%; width: 100%; position: relative; display: inline-block; " /> `
                        return `<embed src="file:///${ilse.path.join(target_dir, url)}" style="height: 100%; width: 100%; position: relative; display: inline-block; " /> `
                        // return `<webview src="https://example.com" autosize="on" minwidth="576" minheight="432"></webview>`
                        // return `<webview src="https://example.com" autosize="on" minwidth="576" minheight="432"></webview>`
                        // return `<webview src="https://example.com" style="height: 100%; width: 100%; position: relative; display: inline-block; " > </webview> `

                        // return `<webview src="file://${target_dir}/${url}" style="height: 100%; width: 100%; position: relative; display: inline-block; " > </webview> `

                        printf( `${target_dir}/${url}` )
                        // return `<embed src="${target_dir}/${url}" style="height: 100%; width: 100%; position: relative; display: inline-block; " /> `

                        // return `<iframe src="${base64}" style="width: 100% !important; height:auto !important; margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;" > </iframe> `
                        // return `<embed src="${base64}" style="width: 100% !important; margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;" /> `
                        // return `<embed src="${base64}" style="width: 100% !important; height: 100% !important; display:block; margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;" /> `

                        // let o = ilse.utils.file_2_base64( html )
                        // printf( ">>> o -> ", o )
                        return ""
                        // return `<embed src="" `
                        // printf( ">>> Markdown.js -> html -> ", html )
                        // <base href="https://www.example.com/" />

                        return html
                    } else {
                        return `<span> The file: ${url} does not exists ): </span>`
                    }

                } else if( is_file ) {
                    return `<span> ![[${url}]] </span>`
                    // let id      = `file-${url}`
                    // let content = ilse.filesystem.file.read.sync( "/second/" + url + ".md" )

                    // if( is_electron ) return `<div class="file-reference" >
                            // <h3> ${url} </h3>
                            // ${content}
                        // </div> `
                    // return `<div> <img style="border: 1px solid #000; width: 40px;" onload="console.log('hahaahahah')" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAAA3NCSVQICAjb4U/gAAAAHElEQVQ4y2P8//8/A1mAiYFcMKpzVOeozuGoEwAt9wMjCmsdlAAAAABJRU5ErkJggg==" /> File: ${url} </div> `

                }

            }

        )
        */

        // this.plugins.push( embed )

        // /*/@(\w+)/,*/
        // /*/\#\S$/,*/
        /*
        const tag = MarkdownPlugin(

            /\S*#(?:\[[^\]]+\]|\S+)/,

            // this function will be called when something matches
            function( match, utils ) {

                let tag = match[0]

                // return `<a href="https://example.com"> </a>`
                return `<span class="tag" > ${tag} </span>`
            }
        )

        this.plugins.push( tag )
        */

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

              let refs     = get_note_references_from_string( match[0] ) //  Helllo( 20200125... ) = [ "20200125" ]
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

        /*
        const separator = MarkdownPlugin(
            /^\S*---\S*$/,
            function( match, utils ) {
                return `<hr class="separator" title="Separator" />`
            }
        )

        this.plugins.push( separator )
        */

        /*/```([^]+?.*[^]+?[^]+?)/,*/ /*/(\>)(.*)/,*/
        /*
        const code_block = MarkdownPlugin(
            /(\\`{3}\\n+)(.*)(\\n+\\`{3})/,

            function( match, utils ) {
                return `<p class="separator" title="Separator" />@@@@@ </p>`
            }
        )

        this.plugins.push( code_block )
        */

        /*
        const strike_through = MarkdownPlugin(
            /{{c[0-9]::.*}}/,

            // this function will be called when something matches
            function( match, utils ) {

                let content = match[0]

                return `<span class="strike-through" title="${content}" > ${content} </span>`
            }
        )
        */

        /*
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
        */



        /*
        const inline_code = MarkdownPlugin(
            /(\\`{1})(\\`{1})/,

            // this function will be called when something matches
            function( match, utils ) {

                let content = match[0]
                return `<span class="blockquote" title="${content}" > AAAA ${content} </span>`
            }
        )
        */

        this.after_setup()
    }

    after_setup() {
        this.install_plugins()
    }

    install_plugins() {

        // Initiate Markdown render lib
        const md = new MarkdownIt({ html: true })

        // Installs
        this.plugins.map( plugin => {
            md.use(plugin)
        })

        this.after_install_plugins( md )
    }

    after_install_plugins( md ) {
        this.md = md
    }

    render( string ) {
        return this.md.render( string )
    }

}
