import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Functions
    import download                     from "@/classes/download.js"

export default function html_to_string( html ) {
    return html.documentElement.innerHTML
    // return new DOMParser().parseFromString( html, "text/html").documentElement.textContent;
}
