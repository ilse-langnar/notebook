import printf                                        from "@/functions/printf.js"
import ilse                         from "@/ilse.js"

import markdown                     from "@/classes/Markdown.js"

/*/```([^]+?.*[^]+?[^]+?)/,*/ /*/(\>)(.*)/,*/
export default {
    regexp: /(^> ?.+?)((\r?\n\r?\n\w)|\Z)/,
    fn: function( match, utils ) {
        let content = match[0]
        return markdown.render(content)
    }
}
