const printf = console.log

export default function remove_duplicates_from_array( array ) {
    let unique = [ ...new Set(array) ]
    return unique
}
