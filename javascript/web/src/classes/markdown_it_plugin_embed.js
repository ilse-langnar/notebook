const printf = console.log

import ilse                         from "@/ilse.js"
import string_to_base64             from "@/classes/string_to_base64.js"
import string_to_html               from "@/classes/string_to_html.js"

import recursively_transform_embed_url_src_into_base64 from "@/classes/recursively_transform_embed_url_src_into_base64.js"

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

        let is_video    = extention === ".mp4" || extention === ".webm"
        let is_img      = extention === ".png" || extention === ".jpg" || extention === ".gif" || extention === ".jpeg" || extention === ".svg"
        let is_audio    = extention === ".mp3" || extention === ".ogg" || extention === ".wav"
        let is_html     = extention === ".html" || extention === ".htm"

        let is_file     = !is_img && !is_video && !is_audio && !is_html && url.indexOf(".") === -1
        let is_electron = process.env.VUE_APP_TARGET === "ELECTRON"
        let is_demo     = process.env.VUE_APP_TARGET === "DEMO" // TODO: How do we render <img> while in a demo
        let target_dir  = ilse.target_directories[0]

        if( is_img ) {
            let zen_style = ilse.is_zen ? "width: 100px; " : ""
            if( is_electron ) return `<img style="${zen_style}" class="img" title="${url}" src="atom://${target_dir}/${url}" />`
            return `<img style="${zen_style}" class="img" title="${url}" src="http://localhost:8090/file/${url}"/>`
        } else if( is_video ) {
            if( is_electron ) return `<video class="video" title="${url}" controls src="atom://${target_dir}/${url}"/>`
            return `<video class="video" title="${url} "controls title="${url}" src="http://localhost:8090/file/${url}"/>`
        } else if( is_audio ) {
            if( is_electron ) return `<audio class="audio" title="${url}" controls title="${url}" src="atom://${target_dir}/${url}"/>`
            return `<audio class="audio" title="${url}" controls title="${url}" src="http://localhost:8090/file/${url}"/>`
        } else if( is_html ) {

            let exists = ilse.filesystem.file.exists.sync( url )
            if( exists ) {

                // let html      = ilse.filesystem.file.read.sync( url )
                // function string_to_base64( str, type = "text/html" ) {
                    // let utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                        // return String.fromCharCode('0x' + p1);
                    // })
                    // return `data:${type};base64,` + btoa( utf8Bytes )
                // }

                // in the HTML, I need to recursively go down and transform them into base64?
                // let base64 = string_to_base64( html )
                // let dom    = string_to_html( html )

                // let base   = document.createElement( "base" )
                    // base.href  = target_dir + "/"
                    // dom.head.appendChild( base )
                // base64     = string_to_html( dom.documentElement.innerHTML )

                // if( is_electron ) return `<embed src="atom://${target_dir}/${url}" style="height: 100%; width: 100%; position: relative; display: inline-block; " /> `

                let base64      = recursively_transform_embed_url_src_into_base64( url )

                if( is_electron ) {
                    // return `<embed src="${base64}" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" /> `
                    return `<embed src="app://${target_dir}/${url}" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" /> `
                } else {
                    return `<embed src="file:///${ilse.path.join(target_dir, url)}" style="height: 100%; width: 100%; position: relative; display: inline-block; " /> `
                }

            } else {
                return `<span> The file: ${url} does not exists ): </span>`
            }

        } else if( is_file ) {
            return `<span> ![[${url}]] </span>`
        }

    }

}
