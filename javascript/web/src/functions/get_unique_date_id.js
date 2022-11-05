import printf                   from "@/functions/printf.js"

// 20220123180536
export default function get_unique_date_id() {

    const today = new Date()
    let year    = today.getFullYear()

    let month   = Number( today.getMonth() )
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
        if( month === 11 ) monthgT = "12"

    let day     = today.getDate()
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

    let hour    = today.getHours()
        if( hour === 0 ) hour = "00"
        if( hour === 1 ) hour = "01"
        if( hour === 2 ) hour = "02"
        if( hour === 3 ) hour = "03"
        if( hour === 4 ) hour = "04"
        if( hour === 5 ) hour = "05"
        if( hour === 6 ) hour = "06"
        if( hour === 7 ) hour = "07"
        if( hour === 8 ) hour = "08"
        if( hour === 9 ) hour = "09"
        if( hour === 10 ) hour = "10"

    let minutes = today.getMinutes()
        if( minutes === 0 ) minutes = "00"
        if( minutes === 1 ) minutes = "01"
        if( minutes === 2 ) minutes = "02"
        if( minutes === 3 ) minutes = "02"
        if( minutes === 4 ) minutes = "04"
        if( minutes === 5 ) minutes = "05"
        if( minutes === 6 ) minutes = "06"
        if( minutes === 7 ) minutes = "07"
        if( minutes === 8 ) minutes = "08"
        if( minutes === 9 ) minutes = "09"
        if( minutes === 10 ) minutes = "10"

    let seconds = today.getSeconds()
        if( seconds === 0 ) seconds = "00"
        if( seconds === 1 ) seconds = "01"
        if( seconds === 2 ) seconds = "02"
        if( seconds === 3 ) seconds = "03"
        if( seconds === 4 ) seconds = "04"
        if( seconds === 5 ) seconds = "05"
        if( seconds === 6 ) seconds = "06"
        if( seconds === 7 ) seconds = "07"
        if( seconds === 8 ) seconds = "08"
        if( seconds === 9 ) seconds = "09"
        if( seconds === 10 ) seconds = "10"


    let id      = `${year}${month}${day}${hour}${minutes}${seconds}`

    return id
}
