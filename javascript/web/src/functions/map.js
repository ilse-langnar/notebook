import printf           from "@/functions/printf.js"

export default function map( list, fn ) {

    list.map( (item, index)  => {
        fn( item, index )
    })

    return list
}
