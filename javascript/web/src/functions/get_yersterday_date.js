import printf                                          from "@/functions/printf.js"

import get_unique_date_id                               from "@/functions/get_unique_date_id.js"

let default_day = get_unique_date_id().slice(0, 8)

export default function get_yesterday_date( date = default ) {

    let year    = date.substr( 0, 4 );
    let month   = date.substr( 4, 2 );
    let day     = Number(date.substr( 6, 2 ) );
    printf( `${year}-${month}-${day}` )

    // checking
    let day_copy    = day;
    day_copy        -= 1;

    if( month === "01" ) {
        year--;
        return year + month + --day
    }

    if( day_copy === 0 ) {
        return year + --month + '31'
    } else {
        if( day_copy < 10 ) {
            return year + month + '0' + --day
        } else {
            return year + month + --day
        }
    }

}
