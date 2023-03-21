import printf                           from "@/functions/printf.js"

export default function get_green_red_color_based_on_boolean( bool ) {
    if( bool ) {
        return `color: #60963D;`
    } else {
        return `color: #ED7586;`
    }
}
