import printf                   from "@/functions/printf.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default function get_number_of_days_in_a_month( month, year ) {
    return new Date(year, month, 0).getDate();
}
