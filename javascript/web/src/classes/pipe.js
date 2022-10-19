import printf                   from "@/classes/printf.js"

// export default const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

let fn
let arg
let results = []

export default function pipe( ...fs ) {

    fs = fs.reverse()

    fs.map( f => {
        fn  = f[0]
        arg = f[1]

        if( arg ) {

            results.push(
                fn( arg )
            )

        } else {
            // printf( "results -> ", results )
            return fn( results )

        }

    })

    // return (...args) => fs.reduce((args,f) => [f.apply(this,args)],args)[0];
}

// export default function piper(...fs) {

    // return (...args) => {
        // fs.reduce( (args,f) => [f.apply(this,args)],args)[0]
    // }

// }
