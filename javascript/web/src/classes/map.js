const printf = console.log

export default function map( list, fn ) {

    list.map( (item, index)  => {
        fn( item, index )
    })

    return list
}
