import printf                   from "@/classes/printf.js"

export default {
    regexp: /{{c[0-9]::.*}}/,
    fn: function( match, utils ) {
        let content = match[0]
        return `<span class="cloze-deletion" title="${content}" > ${content} </span>`
    }
}
