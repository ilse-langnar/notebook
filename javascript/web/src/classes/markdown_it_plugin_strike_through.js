const printf = console.log

export default {
    regexp: /{{c[0-9]::.*}}/,
    fn: function( match, utils ) {
        let content = match[0]
        return `<span class="strike-through" title="${content}" > ${content} </span>`
    }
}
