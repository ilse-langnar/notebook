const printf = console.log

export default function string_to_base64( str, type = "text/html" ) {
    let utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    })

    return `data:${type};base64,` + btoa( utf8Bytes )
}
