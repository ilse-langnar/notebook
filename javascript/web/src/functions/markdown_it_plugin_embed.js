import printf                       from "@/functions/printf.js"

import ilse                         from "@/ilse.js"
import string_to_base64             from "@/functions/string_to_base64.js"
import string_to_html               from "@/functions/string_to_html.js"
import is_dev                       from "@/functions/is_dev.js"
import get_target_directory_url     from "@/functions/get_target_directory_url.js"
import render                       from "@/functions/render.js"

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
        let is_note_embed = url[0] === "(" && url[url.length -1] === ")"
        let is_video    = !is_link && extention === ".mp4" || extention === ".webm"
        let is_img      = !is_link && extention === ".png" || extention === ".jpg" || extention === ".gif" || extention === ".jpeg" || extention === ".svg"
        let is_audio    = !is_link && extention === ".mp3" || extention === ".ogg" || extention === ".wav"
        let is_html     = !is_link && extention === ".html" || extention === ".htm"
        let is_pdf      = !is_link && extention === ".pdf"

        let is_file     = !is_img && !is_video && !is_audio && !is_html && url.indexOf(".") === -1
        let is_electron = process.env.VUE_APP_TARGET === "ELECTRON"
        let target_dir  = ilse.target_directories[0]

        if( is_img ) {

            return `<img class="img" loading="lazy" title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_video ) {

            return `<video controls preload="metadata" width="100%" >
                    <source class="video" title="${url}" src="${get_target_directory_url()}${url}" type="video/mp4">
            </video>`

            // return `<video class="video" title="${url} "controls title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_audio ) {
            return `<audio class="audio" title="${url}" controls title="${url}" src="${get_target_directory_url()}${url}"/>`
        } else if( is_link ) {

            return ` <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWxpbmsiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iIzQ4NTM2MSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICA8cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMTAgMTRhMy41IDMuNSAwIDAgMCA1IDBsNCAtNGEzLjUgMy41IDAgMCAwIC01IC01bC0uNSAuNSIgLz4KICA8cGF0aCBkPSJNMTQgMTBhMy41IDMuNSAwIDAgMCAtNSAwbC00IDRhMy41IDMuNSAwIDAgMCA1IDVsLjUgLS41IiAvPgo8L3N2Zz4KCgo="/> <div style="resize: both;" > <iframe class="url" src="${url}" frameBorder="0" style="width: 100%;" > </iframe> </div> `

        } else if( is_pdf ) {

            return ` <span class="pdf" > ${url} </span> <img style="width: 15px; display: inline !important;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0cm9rZT0iIzQ4NTM2MSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMzg0IDUxMiIgPjxwYXRoIGQ9Ik0xODEuOSAyNTYuMWMtNS0xNi00LjktNDYuOS0yLTQ2LjkgOC40IDAgNy42IDM2LjkgMiA0Ni45em0tMS43IDQ3LjJjLTcuNyAyMC4yLTE3LjMgNDMuMy0yOC40IDYyLjcgMTguMy03IDM5LTE3LjIgNjIuOS0yMS45LTEyLjctOS42LTI0LjktMjMuNC0zNC41LTQwLjh6TTg2LjEgNDI4LjFjMCAuOCAxMy4yLTUuNCAzNC45LTQwLjItNi43IDYuMy0yOS4xIDI0LjUtMzQuOSA0MC4yek0yNDggMTYwaDEzNnYzMjhjMCAxMy4zLTEwLjcgMjQtMjQgMjRIMjRjLTEzLjMgMC0yNC0xMC43LTI0LTI0VjI0QzAgMTAuNyAxMC43IDAgMjQgMGgyMDB2MTM2YzAgMTMuMiAxMC44IDI0IDI0IDI0em0tOCAxNzEuOGMtMjAtMTIuMi0zMy4zLTI5LTQyLjctNTMuOCA0LjUtMTguNSAxMS42LTQ2LjYgNi4yLTY0LjItNC43LTI5LjQtNDIuNC0yNi41LTQ3LjgtNi44LTUgMTguMy0uNCA0NC4xIDguMSA3Ny0xMS42IDI3LjYtMjguNyA2NC42LTQwLjggODUuOC0uMSAwLS4xLjEtLjIuMS0yNy4xIDEzLjktNzMuNiA0NC41LTU0LjUgNjggNS42IDYuOSAxNiAxMCAyMS41IDEwIDE3LjkgMCAzNS43LTE4IDYxLjEtNjEuOCAyNS44LTguNSA1NC4xLTE5LjEgNzktMjMuMiAyMS43IDExLjggNDcuMSAxOS41IDY0IDE5LjUgMjkuMiAwIDMxLjItMzIgMTkuNy00My40LTEzLjktMTMuNi01NC4zLTkuNy03My42LTcuMnpNMzc3IDEwNUwyNzkgN2MtNC41LTQuNS0xMC42LTctMTctN2gtNnYxMjhoMTI4di02LjFjMC02LjMtMi41LTEyLjQtNy0xNi45em0tNzQuMSAyNTUuM2M0LjEtMi43LTIuNS0xMS45LTQyLjgtOSAzNy4xIDE1LjggNDIuOCA5IDQyLjggOXoiLz48L3N2Zz4=" /> `

                /*
            return `
                <img style="width: 15px; display: inline !important;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWJvb2siIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iIzQ4NTM2MSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICA8cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMyAxOWE5IDkgMCAwIDEgOSAwYTkgOSAwIDAgMSA5IDAiIC8+CiAgPHBhdGggZD0iTTMgNmE5IDkgMCAwIDEgOSAwYTkgOSAwIDAgMSA5IDAiIC8+CiAgPGxpbmUgeDE9IjMiIHkxPSI2IiB4Mj0iMyIgeTI9IjE5IiAvPgogIDxsaW5lIHgxPSIxMiIgeTE9IjYiIHgyPSIxMiIgeTI9IjE5IiAvPgogIDxsaW5lIHgxPSIyMSIgeTE9IjYiIHgyPSIyMSIgeTI9IjE5IiAvPgo8L3N2Zz4KCgo=" />
                <span class="pdf" > ${url} </span>`
                */

        } else if( is_html ) {

            // let exists = ilse.filesystem.file.exists.sync( url )
            let exists = ilse.fs.existsSync( url )

            if( exists ) {
                return `<iframe class="html-embed" src="${get_target_directory_url()}${url}" data-event-click="on_click" data-prop-label="Exampleeee" style="height: ${size ? size : 30}vh; width: 90%; overflow: hidden;" > </iframe>`

            } else {
                // let has_html_template = ilse.filesystem.file.exists.sync( "html-template.html" )
                let has_html_template = ilse.fs.existsSync( "html-template.html" )

                if( has_html_template ) {
                    // let html_template = ilse.filesystem.file.read.sync( "html-template.html" )
                    let html_template = ilse.fs.readFileSync( "html-template.html" )
                    ilse.fs.writeFilesync( url, html_template.replace( /\$title/gi, url ) )
                    // ilse.filesystem.file.write.sync( url, html_template.replace( /\$title/gi, url ) )
                } else {
                    // ilse.filesystem.file.write.sync( url, ilse.constants.HTML_TEMPLATE.replace( "@title@", url ).replace( "@body@", `<h1> ${url} </h1> ` ) )
                    ilse.fs.writeFilesync( url, ilse.constants.HTML_TEMPLATE.replace( "@title@", url ).replace( "@body@", `<h1> ${url} </h1> ` ) )
                }

                return `<iframe class="html-embed" src="${get_target_directory_url()}${url}" data-event-click="on_click" data-prop-label="Exampleeee" style="height: ${size ? size : 30}vh; width: 90%; overflow: hidden;" > </iframe>`
            }

        } else if( is_note_embed ) {

            let id      = url
                .replaceAll("(", "")
                .replaceAll(")", "")

            return `<div class="note-embed" >
                <span x-html="api.component('outline.html', { list: [ '${id}' ] })" > </span>
            </div>`


        } else if( is_file ) {
            return `<span> fILE ![[${url}]] </span>`
        }
        // else if( is_note ){
            // let note = ilse.notes.list[url]
            // printf( "NOTE -> ", note )
            // return `<div class="file-reference"> ${note.content} </div> `
            // return `<div class="component-embed"> ${note.content} </div> `
            // return `<div class="note-reference"> @@@ ${note.content} </div> `
        // }

    }

}
