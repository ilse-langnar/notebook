const printf = console.log

/*/```([^]+?.*[^]+?[^]+?)/,*/ /*/(\>)(.*)/,*/
export default {
    regexp: /(\\`{3}\\n+)(.*)(\\n+\\`{3})/,
    fn: function( match, utils ) {
        return `<p class="separator" title="Separator" />@@@@@ </p>`
    }
}
