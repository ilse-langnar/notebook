import printf                   from "@/classes/printf.js"

export default function get_small_unique_string_id() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
