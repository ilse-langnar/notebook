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

              let is_relative  = link.indexOf("@") !== -1
              // return `<span class="link" onclick="Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}' } )" title="${link}" > [[${link}]] </span>`
              // return `<span class="link" onclick="console.log('lllll'); var delay = 1000; window.lastClick = 0; if( 1000 > ( Date.now() - window.lastClick ) ) { console.log('threwe') } else { console.log('another'); window.lastClick = Date.now(); Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}' } ) }; " title="${link}" > [[${link}]] </span>`
              // TODO Find a way of ONLY acting on a target, the problem here
              // return `<span class="link" onclick="console.log(this.parentNode.parentNode)" title="${link}" > [[${link}]] </span>`
              return `<span class="link" onclick="console.log('lllll'); var delay = 1000; window.lastClick = 0; if( 1000 > ( Date.now() - window.lastClick ) ) { console.log('threwe') } else { console.log('another'); window.lastClick = Date.now(); Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}', target: this.parentNode.parentNode.id} ) }; " title="${link}" > [[${link}]] </span>`

              // if( is_relative ) {
                  // let relative_link= link.replace("@/", "")
                  // printf( "@@@ relative_link -> ", relative_link )
                  // link = relative_link
                  // printf( "@@@@ link -> ", link )
                  // printf( ">>>>>> ", relative_link )
                  // return `<span class="link" onclick="Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${relative_link}' } )" title="${link}" > [[${link}]] </span>`
              // } else {
                  // return `<span class="link" onclick="Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}' } )" title="${link}" > [[${link}]] </span>`
              // }
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

                let is_img      = url.indexOf(".png") !== -1 || url.indexOf(".jpg")  !== -1 || url.indexOf(".gif") !== -1 || url.indexOf(".jpeg") !== -1 || url.indexOf(".svg") !== -1
                let is_video    = url.indexOf(".mp4") !== -1 || url.indexOf(".webm") !== -1
                let is_audio    = url.indexOf(".mp3") !== -1 || url.indexOf(".ogg")  !== -1 || url.indexOf(".wav") !== -1
                let is_electron = process.env.VUE_APP_TARGET === "ELECTRON"
                let is_demo     = process.env.VUE_APP_TARGET === "DEMO" // TODO: How do we render <img> while in a demo
                let target_dir  = ilse.target_directories[0]

                if( is_img ) {
                    if( is_electron ) return `<img class="img" title="${url}" src="atom://${target_dir}/second/${url}" />`
                    return `<img class="img" title="${url}" src="http://localhost:8090/file/${url}"/>`
                } else if( is_video ) {
                    if( is_electron ) return `<video class="video" title="${url}" controls src="atom://${target_dir}/second/${url}"/>`
                    return `<video class="video" title="${url} "controls title="${url}" src="http://localhost:8090/file/${url}"/>`
                } else if( is_audio ) {
                    if( is_electron ) return `<audio class="audio" title="${url}" controls title="${url}" src="atom://${target_dir}/second/${url}"/>`
                    return `<audio class="audio" title="${url}" controls title="${url}" src="http://localhost:8090/file/${url}"/>`
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

        if( link ) {
            if( last ) {
                last += `\n ${link_content}`
            } else {
                last += `${text} \n ${link_content} `
            }
        }

        let target          = ilse.notes.get_references( link_content )

        if( target ) {
            let target_content  = ilse.notes.query( target + ":")[0].content
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

        let final  = "<blockquote>"
        for( const [index, chunk] of chunks.entries() ) {
            if( index === 0 ) {
                final += `<p> ${chunk} </p>`
            } else {
                final += `<blockquote style="margin-left: ${index * 10}px"> ${chunk} </blockquote>`
            }
        }
        final += "</blockquote>"
        return final
    }

    render( string ) {
        return this.md.render( string )
    }

}

