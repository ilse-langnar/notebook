import printf                                       from "@/functions/printf.js"

export default function get_css_class_list_from_nested_link_string( string ) {

    let list   = []
    let chunks = string.split("/")
    let last   = []
    let tmp    = []
    let normalized

    chunks.map( (item, index) => {

        last.push( item )

        item = item
            .replaceAll( " ", "_" )
            .replaceAll( "\'", "_" )

        normalized = "link-" + encodeURIComponent(
            last.join("__")
        )

        list.push( normalized )

    })

    return list

}
