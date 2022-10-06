const printf = console.log

// import vue from "vue"

// Ilse
    import ilse                         from "@/ilse.js"

    import i18n                         from "@/i18n.js"
printf( "t('month_december') -> ", i18n.t('month_december') )

export default function get_number_name( number ) {

    number = String(number)

    if( number === "01" ) {
        return i18n.t("month_january")
    } else if( number === "02" ) {
        return i18n.t("month_february")
    } else if( number === "03" ) {
        return i18n.t("month_march")
    } else if( number === "04" ) {
        return i18n.t("month_april")
    } else if( number === "05" ) {
        return i18n.t("month_may")
    } else if( number === "06" ) {
        return i18n.t("month_june")
    } else if( number === "07" ) {
        return i18n.t("month_july")
    } else if( number === "08" ) {
        return i18n.t("month_august")
    } else if( number === "09" ) {
        return i18n.t("month_september")
    } else if( number === "10" ) {
        return i18n.t("month_october")
    } else if( number === "11" ) {
        return i18n.t("month_november")
    } else if( number === "12" ) {
        return i18n.t("month_december")
    }

}
