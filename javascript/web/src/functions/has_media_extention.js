import printf                   from "@/functions/printf.js"

export default function has_media_extention( file_name ) {

    let is_mp4  = file_name.indexOf(".mp4")   !== -1
    let is_webm = file_name.indexOf(".webm") !== -1

    let is_png  = file_name.indexOf(".png") !== -1
    let is_jpg  = file_name.indexOf(".jpg") !== -1 || file_name.indexOf(".jpeg") !== -1
    let is_gif  = file_name.indexOf(".gif") !== -1

    let is_mp3  = file_name.indexOf(".mp3")   !== -1
    let is_ogg  = file_name.indexOf(".ogg")   !== -1

    if( is_mp4 || is_webm || is_png || is_jpg || is_gif || is_mp3 || is_ogg ) {
        return true
    } else {
        return false
    }
}
