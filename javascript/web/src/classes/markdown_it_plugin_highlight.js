const printf = console.log

/*/^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,*/
export default {
    regexp: /^==(.*)==/,
    fn: function( match, utils ) {
        let content = match[0]
            .replace( "==", "" )
            .replace( "==", "" )
        return `<span class="highlight" title="${content}" > ${content} </span>`
    }
}
