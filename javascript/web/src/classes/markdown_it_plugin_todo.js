const printf = console.log

// - [ ]
export default {
    regexp: /^ *\[([\sx])] /i,
    fn: function( match, utils ) {

        let content = match[0]
        let id      = Math.random().toString().replace( "0.", "" )
        let checked = content.indexOf( "[x]" ) !== -1

        let html    =  `<input type="checkbox" id="${id}" title="Click to Toggle" onclick="console.log('you clicked MEMEE'); document.getElementById(${id}).checked ?  document.getElementById(${id}).checked = true : document.getElementById(${id}).checked = false " ${checked ? "checked" : ""}/>`

        return html
    }
}
