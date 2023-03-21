import printf                           from "@/functions/printf.js"

// ilse
    import ilse                             from '@/ilse.js'

// f
    import has_string                       from '@/functions/has_string.js'

export default function is_directory_cloud( string ) {
    return has_string( string, "cloud" )
}
