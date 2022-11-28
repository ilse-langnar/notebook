import printf                   from "@/functions/printf.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// $dispatch('link-click', { link: '[[${link}]]', id: $event.target.parentNode.parentNode.parentNode.id })
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

            return `<a class="link link-${real}" title="${link}"
            @click="if( $event.shiftKey ) {
                console.log('>>>>>>>> $event.target -> ', $event.target );
                $dispatch('link-click', { link: '[[${link}]]', id: ilse.utils.get_related_links($event.target, 'x-note-id' ) })
            } else if( $event.ctrlKey ) {

            } else if( !$event.ctrlKey && !$event.shiftKey ){
            } " > [[${real}]] </a>`

        } else {

            let normalized = link
                .replace( " ", "_" )
                .replace( "\'", "_" )

            normalized = encodeURIComponent( normalized )

            return ` <a class="link link-${normalized}" title="${link}"
                @click.shift="if( $event.shiftKey ) {
                    $dispatch('link-click', { link: '[[${link}]]', id: ilse.utils.get_related_links($event.target, 'x-note-id' ) })
                } else if( $event.ctrlKey ) {

                } else if( !$event.ctrlKey && !$event.shiftKey ) {

                }" > [[${link}]] </a>`

        }

    }

}
