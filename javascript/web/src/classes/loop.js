import printf                           from "@/classes/printf.js"

export default function loop( fn, list ) {

    list.map( (item, index)  => {
        fn( item, index )
    })

}
