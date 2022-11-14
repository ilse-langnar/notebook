import printf                   from "@/functions/printf.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

window.Messager = Messager

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
            // return `<span class="link link-${real}" @click.shift="$dispatch('link-click', { link: '[[${link}]]', id: $event.target.parentNode.parentNode.parentNode.id })" title="${link}" > [[${real}]] </span>`
            return `<a class="link link-${real}" @click.shift="$dispatch('link-click', { link: '[[${link}]]', id: $event.target.parentNode.parentNode.parentNode.id })" title="${link}" > [[${real}]] </a>`
        } else {
            // return `<span class="link link-${link.replace(' ', '_').replace( '/', '__' ).replace('\'', '_') }" @click.shift="$dispatch('link-click', { link: '[[${link}]]', id: $event.target.parentNode.parentNode.parentNode.id })" title="${link}" > [[${link}]] </span>`
            return `<a class="link link-${link.replace(' ', '_').replace( '/', '__' ).replace('\'', '_') }" @click.shift="$dispatch('link-click', { link: '[[${link}]]', id: $event.target.parentNode.parentNode.parentNode.id })" title="${link}" > [[${link}]] </a>`
        }

    }

}
