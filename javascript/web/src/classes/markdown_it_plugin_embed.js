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
            // let zen_style = ilse.is_zen ? "width: 100px; " : ""
            // if( is_electron && is_dev() ) return `<img class="img" title="${url}" src="atom://${target_dir}/${url}" />`
            // if( is_electron && !is_dev() ) return `<img class="img" title="${url}" src="atom://${target_dir}/${url}" />`
            // return `<img style="${zen_style}" class="img" title="${url}" src="http://localhost:8090/file/${url}"/>`
            return `<img class="img" title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_video ) {
            // if( is_electron ) return `<video class="video" title="${url}" controls src="atom://${target_dir}/${url}"/>`
            // return `<video class="video" title="${url} "controls title="${url}" src="http://localhost:8090/file/${url}"/>`
            return `<video class="video" title="${url} "controls title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_audio ) {
            // if( is_electron ) return `<audio class="audio" title="${url}" controls title="${url}" src="atom://${target_dir}/${url}"/>`
            // return `<audio class="audio" title="${url}" controls title="${url}" src="http://localhost:8090/file/${url}"/>`
            return `<audio class="audio" title="${url}" controls title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_link ) {
            // return `<iframe src="${url}" frameBorder="0" style="width: 100%;" > </iframe>`
            return `<iframe src="${url}" frameBorder="0" style="width: 100%;" > </iframe>`
        } else if( is_html ) {

            let exists = ilse.filesystem.file.exists.sync( url )
            if( exists ) {
                    return `<embed src="${get_target_directory_url()}${url}" data-event-click="on_click" data-prop-label="Exampleeee" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" /> `

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

                // let base64      = recursively_transform_embed_url_src_into_base64( url )

                // if( is_electron ) {

                    // window.addEventListener( "storage", storage => { printf( "markdown_it_plugin_embed -> storage -> ", storage ) })
                    // return `<embed src="${base64}" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" /> `
                    // printf( "LLL>>>>>>>> ilse.u_html -> ", ilse.u_html )
                    // let id = Math.random().toString().replace( "0.", "" )
                    // setTimeout( () =>{ let dom = document.getElementById(id) ilse.u.scan( dom ) }, 1000 )
                    // if( is_electron && is_dev() ) return `<embed src="app://${target_dir}/${url}" data-event-click="on_click" data-prop-label="Exampleeee" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" /> `
                    // if( is_electron && !is_dev() ) return `<embed src="atom://${target_dir}/${url}" data-event-click="on_click" data-prop-label="Exampleeee" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" /> `
                    // if( !is_electron ) return `<embed src="file://${target_dir}/${url}" data-event-click="on_click" data-prop-label="Exampleeee" style="height: ${size ? size : 30}vh; width: 100%; overflow: hidden;" /> `

                // } else {
                    // return `<embed src="file:///${ilse.path.join(target_dir, url)}" style="height: 100%; width: 100%; position: relative; display: inline-block; " /> `
                // }

            } else {
                return `<span> The file: ${url} does not exists ): </span>`
            }

        } else if( is_file ) {
            return `<span> ![[${url}]] </span>`
        }

    }

}
