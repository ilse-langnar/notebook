import printf                           from "@/functions/printf.js"

export default function is_filename_markdown(  ) {

    let is_file_markdown = !(file.indexOf(".png") !== -1 || file.indexOf(".jpg") !== -1 || file.indexOf(".jpeg") !== -1 || file.indexOf(".gif") !== -1 || file.indexOf(".svg") !== -1 || file.indexOf(".mp4") !== -1 || file.indexOf(".webm") !== -1 || file.indexOf(".mp3") !== -1 || file.indexOf(".ogg") !== -1 || file.indexOf(".wav") !== -1 || file.indexOf(".md") !== -1)
    return is_file_markdown
}
