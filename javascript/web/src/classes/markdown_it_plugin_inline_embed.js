import printf                          from "@/classes/printf.js"

import ilse                            from "@/ilse.js"

export default {
    regexp: /{{.*}}/,
    fn: function( match, utils ) {

        let content       = match[0].replace("{{", "").replace("}}", "")
        let chunks        = content.split("/")
        let target        = ilse.embeds.get( chunks[0] )

        if( target ) {
            return target.fn( chunks )
        } else {
            return `<span class="inline-embed" > ${content} </span>`
        }

        let id            = Math.random()
        let div           = document.createElement( "div" )
            div.innerHTML = content
            div.id        = id

        // vm.$mount('#some-place');

        return div.outerHTML
    }
}
