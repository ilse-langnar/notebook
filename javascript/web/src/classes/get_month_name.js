const printf = console.log

// import vue from "vue"

// Ilse
    import ilse                         from "@/ilse.js"

export default function get_number_name( number ) {

    number = String(number)

    if( number === "01" ) {
        return ilse.vue.$t("month_january")
    } else if( number === "02" ) {
        return ilse.vue.$t("month_february")
    } else if( number === "03" ) {
        return ilse.vue.$t("month_march")
    } else if( number === "04" ) {
        return ilse.vue.$t("month_april")
    } else if( number === "05" ) {
        return ilse.vue.$t("month_may")
    } else if( number === "06" ) {
        return ilse.vue.$t("month_june")
    } else if( number === "07" ) {
        return ilse.vue.$t("month_july")
    } else if( number === "08" ) {
        return ilse.vue.$t("month_august")
    } else if( number === "09" ) {
        return ilse.vue.$t("month_september")
    } else if( number === "10" ) {
        return ilse.vue.$t("month_october")
    } else if( number === "11" ) {
        return ilse.vue.$t("month_november")
    } else if( number === "12" ) {
        return ilse.vue.$t("month_december")
    }

}
