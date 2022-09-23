const printf = console.log

/*/\[\[.*\]\]/gi,*/
export default {
    regexp: /\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,
    fn: function( match, utils ) {

        let link = match[0]
            .replace("[[", "")
            .replace("]]", "")

        let has_spacer = link.indexOf("|") !== -1
        if( has_spacer ) {
            let real = link.split("|")[1].trim()
            return `<span class="link" onclick="console.log('lllll'); var delay = 1000; window.lastClick = 0; if( delay > ( Date.now() - window.lastClick ) ) { console.log('threwe') } else { console.log('another'); window.lastClick = Date.now(); Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}', target: (this.parentNode.parentNode.id ? this.parentNode.parentNode.id : this.parentNode.parentNode.parentNode.id) } ) }; " title="${link}" > [[${real}]] </span>`

        } else {
            return `<span class="link" onclick="console.log('lllll'); var delay = 1000; window.lastClick = 0; if( delay > ( Date.now() - window.lastClick ) ) { console.log('threwe') } else { console.log('another'); window.lastClick = Date.now(); Messager.emit('~note.vue', 'link-click', { 'event': event, 'link': '${link}', target: (this.parentNode.parentNode.id ? this.parentNode.parentNode.id : this.parentNode.parentNode.parentNode.id ) } ) }; " title="${link}" > [[${link}]] </span>`
        }

    }


}

