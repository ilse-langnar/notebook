import printf                   from "@/functions/printf.js"

// functions
    import map                      from "@/functions/map.js"

export default function clean_markdown_tags( string ) {

    let tmp = ""
    let has_tag

    map( string.split(" "), chunk => {
        has_tag = chunk.indexOf("#") !== -1
        if( !has_tag ) tmp += chunk
    })

    return tmp
}
