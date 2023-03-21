import printf                   from "@/functions/printf.js"

export default function get_month_days_by_week() {

    let date                      = new Date()
    let month                     = date.getMonth()
    let year                      = date.getFullYear()
    let number_of_days_in_a_month = get_number_of_days_in_a_month( month, year )
    let array                     = create_array( number_of_days_in_a_month, 1 )
    let arr2=[]

    array.map( (item, index) => {
        arr2[index] = index + 1
    })

    let chunks                    = split_array_into_nth_chunks( arr2, 7 )

    return chunks
}
