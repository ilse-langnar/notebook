import printf                                        from "@/functions/printf.js"

export default {
    // regexp: /#{1,6} .*/gi,
    regexp: /(?<=(^#)\s).*/,
    fn: function( match, utils ) {
        let content = match[0]
        printf( "content >>>>>>>>>>>> -> ", content )
        return "This is a heading"
    }
}
