import printf                   from "@/functions/printf.js"

export default function base64_2_file( dataurl, filename = "New File" ) {

    let arr  = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n    = bstr.length,
        u8arr = new Uint8Array(n)

    while( n-- ) {
        u8arr[n] = bstr.charCodeAt(n)
    }

    let newFile = new File([u8arr], filename, {
        type: mime,
    })

    return newFile
}
