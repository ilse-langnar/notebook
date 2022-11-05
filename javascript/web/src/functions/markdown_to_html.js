import ilse from "@/ilse.js"

export default function markdown_to_html( markdown ) {
    return ilse.markdown.render( markdown )
}
