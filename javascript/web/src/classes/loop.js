const printf        = console.log

export default function loop( fn, list ) {

    list.map( (item, index)  => {
        fn( item, index )
    })

}
