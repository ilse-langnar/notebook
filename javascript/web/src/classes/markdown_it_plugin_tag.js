import printf                           from "@/classes/printf.js"

/*/@(\w+)/,*/ /*/\#\S$/,*/
export default {
    regexp: /\S*#(?:\[[^\]]+\]|\S+)/,
    fn: function( match, utils ) {
        let tag = match[0]
        return `<span class="tag tag-${tag.replace('#', '')}" > ${tag} </span>`
    }
}
