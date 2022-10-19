import printf                           from "@/classes/printf.js"

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
    import cloze_deletion               from "@/classes/markdown_it_plugin_cloze_deletion.js" // ???
    import todo                         from "@/classes/markdown_it_plugin_todo.js" // - [ ]
    import inline_code                  from "@/classes/markdown_it_plugin_inline_code.js" // `console.log("Hello, World")`
    import link                         from "@/classes/markdown_it_plugin_link.js" // [[Hello]]
    import embed                        from "@/classes/markdown_it_plugin_embed.js" // ![[img.png]] ![[UFOs.mp4]] ![[book.pdf]] ![[table.html]] ![[song.ogg]]

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
        ]
        this.setup()
    }

    setup() {
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
