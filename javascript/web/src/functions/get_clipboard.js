import printf                   from "@/functions/printf.js"

export default function get_selection() {

    if( window.getSelection ) {
        return window.getSelection().toString()
    }

    if( window.document.getSelection ) {
        return window.document.getSelection().toString()
    }

    if( window.document.selection ) {
        return window.document.selection.createRange().text
    }

    return ""
}
