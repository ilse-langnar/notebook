import printf                       from "@/functions/printf.js"

import ilse                         from "@/ilse.js"
import string_to_base64             from "@/functions/string_to_base64.js"
import string_to_html               from "@/functions/string_to_html.js"
import is_dev                       from "@/functions/is_dev.js"
import get_target_directory_url     from "@/functions/get_target_directory_url.js"

// import recursively_transform_embed_url_src_into_base64 from "@/classes/recursively_transform_embed_url_src_into_base64.js"

/*/@(\w+)/,*/ /*/^\!\[\[.*\.(png|jpg|gif|jpeg)\]\]$/gi,*/ /*/[^!]\[.+?\]/g,*/ /*/^\S*\!\[\[.*\.(png|jpg|gif|jpeg)\]\]\s*$/gi,*/ /* /\S*#(?:\[[^\]]+\]|\S+)/,*/
export default {
    regexp: /^.*?\(\((.*)\)\)/,
    // regexp: /\ \(\([.*]\)\)\ /,
    // regexp: /^.*?\((.*)\)/,
    // regexp: /\((([^].*))/,
    // regexp: /(([^]+))/,
    // regexp: /\ \(([^]+)\)/,
    // regexp: /[(][(](([^]))[)][)]/g,
    // regexp: /\(([^)\]+)\)/g,
    // regexp: /\ \(\([^]+\)\)\ /gi,
    // regexp: /\(([^()*)\)/g,
    // regexp: /^[(]([^]+)[)]/gi,
    // regexp: /[\s\S]*[(]\(([^]+)\)[)][\s\S]*/gi,


    // regexp: /[\s\S]+\({2}(.*)\){2}[\s\S]+/gi,
    // regexp: /^.*?\(\((.*)\)\)$/gi,
    // regexp: /[\s\S]+\(\((.*)\)\([\s\S]+/,
    // regexp: /[\s\S]+([(]\((.*)\)[)])[\s\S]+/gi,
    // regexp: /^\(([^|\]\n]+)\)/,
    // regexp: /[\s\S]*[(]\((.*)\)[)]/gi,
    // regexp: /[\s\S]*[(]\(([^)]+)\)[)]/gi,

    // regexp: /\(({2}([^)]*)\){2}/g,
    // regexp: /[\s\S]*[(]\((.*)\)[)]/,

    // regexp: /^[\s\S]?[(]\(([\s\S]*)\)[)][\s\S]+$/gi,
    // regexp: /[\s\S]*[(]\((.*)\)[)]/,

    // regexp: /^\(\((*.)\)\)$/gi,
    // regexp: /[\s\S]*[(]\(([\s\S]*)\)[)]/,
    // regexp: /^[\s\S]+/gi,
    // regexp: /[\s\S]*[(]\((.*)\)[)]/)],

    // regexp: /[\s\S]*[(]\((.*)\)[)]/,
    // regexp: /[\s\S]+[(]\((.*)\)[)][\s\S]+/,
    regexp: /^[\s\S]*[(]\((.*)\)[)][\s\S]*/,
    // regexp: /[\s\S]+\d{14}\w{8}[\s\S]+/,

    fn: function( match, utils ) {

        printf( "match[0] -> ", match[0] )

        let id         = match[0]
            .replaceAll( "[" , "" )
            .replaceAll( "]" , "" )
            .replaceAll( "(" , "" )
            .replaceAll( ")" , "" )
            .replaceAll( ":" , "" )
            .trim()
        id = id.split(" ")[0]

        return `<div class="note-reference" >
            <span x-html="api.markdown.render(api.notes.list['${id}'].content) " > </span>
        </div>`

        // return `<span> ((${normalized})) </span> `
    }

}
