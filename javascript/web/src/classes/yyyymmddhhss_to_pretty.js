import printf                           from "@/classes/printf.js"

import get_month_name                   from "@/classes/get_month_name.js"

// 20220123180536 -> Febuary 20th, 2020
export default function yyyymmddhhss_to_pretty( unique_id ) {

    let year    = unique_id.substr( 0, 4 )
    let month   = unique_id.substr( 4, 2 )
        month   = get_month_name( month )

    let day     = unique_id.substr( 6, 2 )

    let format  = `${month} ${day}th, ${year}`

    return format
}
