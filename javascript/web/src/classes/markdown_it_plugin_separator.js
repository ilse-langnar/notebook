import printf                           from "@/classes/printf.js"

export default {
    regexp: /^\S*---\S*$/,
    fn: function( match, utils ) {
        return `<hr class="separator" title="Separator" />`
    }
}
