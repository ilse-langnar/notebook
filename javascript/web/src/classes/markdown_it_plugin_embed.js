const printf = console.log

import ilse                         from "@/ilse.js"
import string_to_base64             from "@/classes/string_to_base64.js"
import string_to_html               from "@/classes/string_to_html.js"
import is_dev                       from "@/classes/is_dev.js"
import get_target_directory_url     from "@/classes/get_target_directory_url.js"

// import recursively_transform_embed_url_src_into_base64 from "@/classes/recursively_transform_embed_url_src_into_base64.js"

/*/@(\w+)/,*/ /*/^\!\[\[.*\.(png|jpg|gif|jpeg)\]\]$/gi,*/ /*/[^!]\[.+?\]/g,*/ /*/^\S*\!\[\[.*\.(png|jpg|gif|jpeg)\]\]\s*$/gi,*/ /* /\S*#(?:\[[^\]]+\]|\S+)/,*/
export default {
    regexp: /^\!\[\[([^|\]\n]+)(\|([^\]\n]+))?\]\]/,
    fn: function( match, utils ) {

        let url         = match[0]
            .replace( "![[" , "" )
            .replace( "]]" , "" )


        let size        = match[2] ? match[2].replace("|", "").trim() : null

        if( size ) url  = url.split("|")[0].trim()

        let extention   = url.substr(url.lastIndexOf("."), url.length )

        let is_link     = url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1 || url.indexOf("file://") !== -1
        let is_video    = !is_link && extention === ".mp4" || extention === ".webm"
        let is_img      = !is_link && extention === ".png" || extention === ".jpg" || extention === ".gif" || extention === ".jpeg" || extention === ".svg"
        let is_audio    = !is_link && extention === ".mp3" || extention === ".ogg" || extention === ".wav"
        let is_html     = !is_link && extention === ".html" || extention === ".htm"

        let is_file     = !is_img && !is_video && !is_audio && !is_html && url.indexOf(".") === -1
        let is_electron = process.env.VUE_APP_TARGET === "ELECTRON"
        let target_dir  = ilse.target_directories[0]

        if( is_img ) {
            return `<img class="img" loading="lazy" title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_video ) {
            return `<video class="video" title="${url} "controls title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_audio ) {
            return `<audio class="audio" title="${url}" controls title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_link ) {
            return `<iframe src="${url}" frameBorder="0" style="width: 100%;" > </iframe>`
        } else if( is_html ) {

            let exists = ilse.filesystem.file.exists.sync( url )

            if( exists ) {
                return `<iframe class="html-embed" src="${get_target_directory_url()}${url}" data-event-click="on_click" data-prop-label="Exampleeee" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" > </iframe>`

            } else {
                let has_html_template = ilse.filesystem.file.exists.sync( "html-template.html" )

                if( has_html_template ) {
                    let html_template = ilse.filesystem.file.read.sync( "html-template.html" )
                    ilse.filesystem.file.write.sync( url, html_template.replace( /\$title/gi, url ) )
                } else {
                    ilse.filesystem.file.write.sync( url, ilse.HTML_TEMPLATE.replace( "@title@", url ).replace( "@body@", `<h1> ${url} </h1> ` ) )
                }

                return `<iframe class="html-embed" src="${get_target_directory_url()}${url}" data-event-click="on_click" data-prop-label="Exampleeee" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" > </iframe>`
            }

        } else if( is_file ) {
            return `<span> ![[${url}]] </span>`
        }

    }

}
