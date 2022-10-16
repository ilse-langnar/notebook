import printf                           from "@/classes/printf.js"

// /(^(\d+\.)(\s)(.*)(?:$)?)+/gi, // /[0-9]+\\.(.*)/gi,
export default {
    regexp: /\s[0-9]+\.(.*)/g,
    fn: function( match, utils ) {
        let content       = match[0]
        return `<span> LL </span>`
    }
}
