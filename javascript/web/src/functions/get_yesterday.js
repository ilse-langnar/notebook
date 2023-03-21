import printf                   from "@/functions/printf.js"

export default function get_yesterday( date /* 2022010 */ ) {

    let year    = date.substr( 0, 4 );
    let month   = date.substr( 4, 2 );
    let day     = Number(date.substr( 6, 2 ) );

    // checking
    let day_copy    = day;
        day_copy        -= 1;

    if( month === "01" && day === 1) {
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
