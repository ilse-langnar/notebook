const printf = console.log

// 20220123180536
export default function get_unique_date_id() {

    const today = new Date()
    let year    = today.getFullYear()

    let month   = Number( today.getMonth() )
        month += 1
        month = `0${month}`
        if( month === "010" ) month = "10" // BUGFIX :
        if( month === "011" ) month = "11" // BUGFIX :
        if( month === "012" ) month = "12" // BUGFIX :


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
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()

    let id      = `${year}${month}${day}${hour}${minutes}${seconds}`

    return id
}
