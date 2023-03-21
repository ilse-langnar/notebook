import printf                   from "@/functions/printf.js"

export default function remove_duplicates_from_array( array ) {
    let unique = [ ...new Set(array) ]
    return unique
}
