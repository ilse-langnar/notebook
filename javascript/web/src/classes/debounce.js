const printf        = console.log

export default function debounce( fn, args, obj, time = 1000 ) {

    clearTimeout( obj.timeout )

    obj.timeout = setTimeout( () => {
        fn( args )
        // clearTimeout( obj.timeout )
        // obj.timeout = null
    }, time  )

}
