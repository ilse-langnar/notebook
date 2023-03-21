import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Markdown
    import MarkdownIt                   from "markdown-it"
    import MarkdownPlugin               from "markdown-it-regexp"

// functions
    import get_note_references_from_string from "@/functions/get_note_references_from_string.js"
    import string_to_html               from "@/functions/string_to_html.js"

// plugins
    import highlight                    from "@/functions/markdown_it_plugin_highlight.js" // ==I'm fabulous==
    import tag                          from "@/functions/markdown_it_plugin_tag.js" // #databases
    import separator                    from "@/functions/markdown_it_plugin_separator.js" // ---
    import code_block                   from "@/functions/markdown_it_plugin_code_block.js" // ```javascript let new_thing = function(){}```
    import cloze_deletion               from "@/functions/markdown_it_plugin_cloze_deletion.js" // ???
    import todo                         from "@/functions/markdown_it_plugin_todo.js" // - [ ]
    import inline_code                  from "@/functions/markdown_it_plugin_inline_code.js" // `console.log("Hello, World")`
    import link                         from "@/functions/markdown_it_plugin_link.js" // [[Hello]]
    import embed                        from "@/functions/markdown_it_plugin_embed.js" // ![[img.png]] ![[UFOs.mp4]] ![[book.pdf]] ![[table.html]] ![[song.ogg]]
    import blockquote                   from "@/functions/markdown_it_plugin_blockquote.js" // ![[img.png]] ![[UFOs.mp4]] ![[book.pdf]] ![[table.html]] ![[song.ogg]]
    import header                       from "@/functions/markdown_it_plugin_header.js" // ![[img.png]] ![[UFOs.mp4]] ![[book.pdf]] ![[table.html]] ![[song.ogg]]
    import reference                    from "@/functions/markdown_it_plugin_reference.js" // ![[img.png]] ![[UFOs.mp4]] ![[book.pdf]] ![[table.html]] ![[song.ogg]]

export default class Markdown {

    constructor() {

        this.plugins = [
            MarkdownPlugin( highlight.regexp, highlight.fn ),
            MarkdownPlugin( tag.regexp, tag.fn ),
            MarkdownPlugin( separator.regexp, separator.fn ),
            MarkdownPlugin( code_block.regexp, code_block.fn ),
            MarkdownPlugin( cloze_deletion.regexp, cloze_deletion.fn ),
            MarkdownPlugin( todo.regexp, todo.fn ),
            MarkdownPlugin( inline_code.regexp, inline_code.fn ),
            MarkdownPlugin( link.regexp, link.fn ),
            MarkdownPlugin( embed.regexp, embed.fn ),
            MarkdownPlugin( header.regexp, header.fn ),
            MarkdownPlugin( reference.regexp, reference.fn ),
        ]

        this.setup()
    }

    setup() {
        this.install_plugins()
        // this.install_ref()
    }

    install_ref() {

        var note_ref = MarkdownPlugin(

          // /\(({2}([^)]*)\){2}/g,

          // /\s*\([()]*(\([^()]*\)[^()]*)\)\s?/gi,
          // /({2}([^)]*)){2}/g,
          // /\({2}([^()]+(\([^)]+\)[^)]*)*)\){2}/,
          // /\s*\([()]*(\([^()]*\)[^()]*)\)\s?/,
          // /[(]{2}[^()]*[)]{2}/,
          // /\s?\({2}(.*)\){2}\s?/gi,
          // /\([^()](.*)[^()]*)+\)/,
          // /\([^)]*\)|\[[^\]]*\]/g,
          // /\([^)]*\)(.*)\[[^\(]*\]/g,
          // /^.*?\(\((.*)\)\)$/,
          // /^(.*|\S\s)?\(\((.*)\)\)$/,
          // /^(.*|\S)?\(\((.*)\)\)$/,
          // /^.*?\(\((.*)\)\)/,
          // /[\s\S]*([(]\((.*)\)[)])[\s\S]*/,
          // /^\(\((.*)\)\)/gi,
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

              printf( "match -----> ", match )

              let refs     = get_note_references_from_string( match[0] ) //  Helllo( 20200125... ) = [ "20200125" ]
              let ref      = refs[0]
              let has_refs = !!refs[0]
                  if( !has_refs ) return `<span> ((MALFORMED REF)) </span>`
              // let ref  = ilse.notes.extract_note_references( match[0] )
                  // if( !ref ) return `<span> ((MALFORMED REF)) </span>`

              // let note_content = ilse.notes.query(ref)[0]
                  // if( note_content ) note_content  = note_content.content
                  // if( !note_content ) note_content = `Could not find note: ${ref} ):`

              return `<span title="${ref}" > @@@ </span>`
          }

        )

        this.md.use( note_ref )
    }

    install_plugins() {

        // Initiate Markdown render lib
        const md = new MarkdownIt({ html: true })

        // Installs
        this.plugins.map( plugin => {
            md.use(plugin)
        })

        // Make it global( for global access )
        this.md = md
    }

    render( string ) {
        return this.md.render( string )
    }

}
