import printf                           from "@/classes/printf.js"

export default function get_build_target() {
    return process.env.VUE_APP_TARGET.toLowerCase()
}
