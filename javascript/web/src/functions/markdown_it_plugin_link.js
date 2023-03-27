import printf                   from "@/functions/printf.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

import get_css_class_list_from_nested_link_string                     from "@/functions/get_css_class_list_from_nested_link_string.js"

// $dispatch('link-click', { link: '[[${link}]]', id: $event.target.parentNode.parentNode.parentNode.id })
// window.Messager = Messager

/*/\[\[.*\]\]/gi,*/
export default {
    regexp: /\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,
    fn: function( match, utils ) {

        let link = match[0]
            .replace("[[", "")
            .replace("]]", "")

        let has_spacer = link.indexOf("|") !== -1

        if( has_spacer ) {

            let original = link.split("|")[0].trim()
            let alias    = link.split("|")[1].trim()
            let list = get_css_class_list_from_nested_link_string( original )

            return `<a class="link ${list.join(' ')}" title="${link}"
            @click="if( $event.shiftKey ) {
                let dom = api.utils.recursively_search_for_dom($event.target, 'x-note-id' )
                $dispatch('link-click', { link: '[[${link}]]', id: dom.getAttribute('id') })
            } else if( $event.ctrlKey ) {

            } else if( !$event.ctrlKey && !$event.shiftKey ){
            } " > <!-- [[${alias}]] -->  ${alias} </a>`

        } else {

            let list = get_css_class_list_from_nested_link_string( link )

            return ` <a class="link ${list.join(' ')}" title="${link}"
                @click.shift="if( $event.shiftKey ) {
                    let dom = api.utils.recursively_search_for_dom($event.target, 'id' )
                    let id  = dom.id.replace('render', '')
                    $dispatch('link-click', { link: '[[${link}]]', id })

                } else if( $event.ctrlKey ) {

                } else if( !$event.ctrlKey && !$event.shiftKey ) {

                }" > <!-- [[${link}]] --> ${link} </a>`

        }

    }

}
