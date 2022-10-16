import printf                                        from "@/classes/printf.js"

/*/```([^]+?.*[^]+?[^]+?)/,*/ /*/(\>)(.*)/,*/
export default {
    regexp: /(\\`{3}\\n+)(.*)(\\n+\\`{3})/,
    fn: function( match, utils ) {
        return `<p class="separator" title="Separator" />@@@@@ </p>`
    }
}
