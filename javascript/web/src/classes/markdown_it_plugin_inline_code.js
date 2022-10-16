import printf                           from "@/classes/printf.js"

/*/@(\w+)/,*/ /*/\#\S$/,*/
export default {
    regexp: /(\\`{1})(\\`{1})/,
    fn: function( match, utils ) {
        let content = match[0]
        return `<span class="blockquote" title="${content}" > AAAA ${content} </span>`
    }
}
