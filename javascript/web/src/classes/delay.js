const printf                    = console.log

export default function delay( fn, args, delay = 10 ) {

    setTimeout( () => {
        fn( args )
    }, 10 )

}
