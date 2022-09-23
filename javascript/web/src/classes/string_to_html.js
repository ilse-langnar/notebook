const printf = console.log

export default function string_to_html( string ) {

    let parser = new DOMParser()
    let doc    = parser.parseFromString( string, 'text/html')

    return doc
}
