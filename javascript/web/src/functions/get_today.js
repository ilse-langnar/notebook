import printf                   from "@/functions/printf.js"

export default function get_today() {
    var date = new Date();
    return date.getDate()
}
