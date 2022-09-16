const printf                    = console.log

export default function get_file_type( string ) {

    let extention = file.substr(file.lastIndexOf("."), file.length )
    let type      = null

    if( extention === ".png" ||
        extention === ".jpg" ||
        extention === ".jpeg"||
        extention === ".gif" ||
        extention === ".svg") {
        type = "image"
    }

    if( extention === ".mp4" ||
        extention === ".webm" ) {
        type = "video"
    }

    if( extention === ".mp3" ||
        extention === ".ogg" ||
        extention === ".wav"  ) {
        type = "audio"
    }

    if( extention === ".md" ) {
        type === "markdown"
    }

    return type

}
