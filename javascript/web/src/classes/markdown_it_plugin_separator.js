const printf = console.log

export default {
    regexp: /^\S*---\S*$/,
    fn: function( match, utils ) {
        return `<hr class="separator" title="Separator" />`
    }
}
