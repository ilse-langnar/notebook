import printf                   from "@/functions/printf.js"

export default function query_notes_from_day( day ) {

    // Fix Day
        if( day === 1 ) day = "01" // BUGFIX: only "1" will give a bug on the id, 01 is not allowed in strict mode,
        if( day === 2 ) day = "02"
        if( day === 3 ) day = "03"
        if( day === 4 ) day = "04"
        if( day === 5 ) day = "05"
        if( day === 6 ) day = "06"
        if( day === 7 ) day = "07"
        if( day === 8 ) day = "08"
        if( day === 9 ) day = "09"
        if( day === 10 ) day = "10"

    let date   = new Date()
    let month  = date.getMonth()
        if( month === 0 ) month = "01" // BUGFIX: only "1" will give a bug on the id, 01 is not allowed in strict mode,
        if( month === 1 ) month = "02" // BUGFIX: only "1" will give a bug on the id, 01 is not allowed in strict mode,
        if( month === 2 ) month = "03"
        if( month === 3 ) month = "04"
        if( month === 4 ) month = "05"
        if( month === 5 ) month = "06"
        if( month === 6 ) month = "07"
        if( month === 7 ) month = "08"
        if( month === 8 ) month = "09"
        if( month === 9 ) month = "10"
        if( month === 10 ) month = "11"
        if( month === 11 ) month = "12"


    let year   = date.getFullYear()
    let query  = `${year}${month}${day}`
    let result = ilse.notes.query_regexp( new RegExp( '^' + query) )
    return result
}
