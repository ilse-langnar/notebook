const printf   = console.log

// LocalStorage, how can I use LocalStorage to store data about the ID?
// idea: Math.random() + name = { id }
function embed_components( dom ) {

    // if( window.dna.has_done ) return

    // let embeds  = document.getElementsByTagName( "dna-import" )
    let embeds  = dom ? [dom] : document.getElementsByTagName( "embed" )
    let list    = [...embeds]

    list.map( item => {

        printf( `item.src -> `, item.src )

        // printf( ">>>> item -> ", item )

        // let dna         = new window.DNA( `#${id}`)

        Array.from(item.attributes).map( async attr => {

            if( attr.name.indexOf( "data-event" ) !== -1 ) {

                let name        = attr.name.split("-").splice( 2, attr.name.split("-").length ).join("-")
                let value       = attr.value
                let src         = item.src
                let id          = src.split("#")[1] || "main"

                printf( "data-event -> name -> ", name )
                printf( "data-event -> value -> ", value )

                item.addEventListener( "load", event => {

                    printf( "%% data-event -> 'load' -> event -> ", event )

                    printf( "window.addEventListener( 'storage' ) ...." )
                    window.addEventListener( "storage", storage => {
                        printf( "%%% -> storage -> ", storage )

                        let cargo  = JSON.parse(storage.newValue)
                            let label    = cargo.label
                            let payload  = cargo.payload
                            let _id       = cargo.id
                        printf( "cargo -> ", cargo )
                        if( _id === id )  {
                            printf( "cargo -> ", cargo )
                            printf( `data-event -> name: ${name} value: ${value} src: ${src} id: ${id}` )
                            printf( "item -> ", item )

                            const event = new Event( name, {
                                detail: {
                                    value: value
                                },
                                bubbles: true,
                                cancelable: true,
                                composed: false,
                            })

                            item.dispatchEvent( event )
                            printf( "emitting: ", name )

                        }
                        // let is_ok= !!this.listeners[label] && id === this.id
                        // if( is_ok ) {
                            // this.listeners[label]( payload )
                        // }
                    })


                    // This is where we bind child->parent

                    // window.localStorage.setItem( "dna", JSON.stringify({ label: name, payload: value, id: id }))
                    const e = new Event( name, {
                        details: {
                            value: value
                        },
                        bubbles: true,
                        cancelable: true,
                        composed: false
                    })

                    document.dispatchEvent( e )
                    // document.querySelector("#someElement").dispatchEvent(myEvent);

                })

                // printf( `name: ${name} value: ${value} id: ${id} ` )
                // printf( "@@@ window.dna -> ", window.dna )
            }

            if( attr.name.indexOf( "data-prop" )   !== -1  ) {

                let name        = attr.name.split("-").splice( 2, attr.name.split("-").length ).join("-")
                let value       = attr.value
                let src         = item.src
                let id          = src.split("#")[1] || "main"

                printf( "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA name -> ", name )
                printf( "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA value -> ", value )
                printf( "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA id -> ", id )

                item.addEventListener( "load", event => {
                    // printf( `AAAAAA: src: ${item.src} name: ${name} value: ${value} id: ${id}` )
                    printf( "@@@@ label -> ", name, value, id )
                    setTimeout( () => { window.localStorage.setItem( "dna", JSON.stringify({ label: name, payload: value, id: id })) }, 2000 )
                })

                item.onload = event => {
                    // printf( `AAAAAA: src: ${item.src} name: ${name} value: ${value} id: ${id}` )
                    // window.localStorage.setItem( "dna", JSON.stringify({ label: name, payload: value }))
                }

                // setTimeout( () => { window.localStorage.setItem( "dna", JSON.stringify({ label: name, payload: value })) }, 100 )

                // printf( `name: ${name} value: ${value} id: ${id}` )
                // printf( "@@@ window.dna -> ", window.dna )
            }

        })

    })

}

/*
async function add_import( item ) {

    let src             = item.attributes["src"].value
    let id              = item.attributes["id"].value

    let res             = await fetch( src )
    res             = await res.text()

    let div             = document.createElement( "div" )
        div.id          = id
        div.innerHTML   = res

    // item.append( div )
    // document.body.appendChild( div )
    printf( "item -> ", item )
    item.appendChild( div )

    return item
}
*/

function custom_embeds() {
    let embeds  = document.getElementsByTagName( "embed" )
    let list    = [...embeds]

    list.map( async item => {
        await add_import( item )
    })
}

class DNA {

    constructor( context ) {
        // printf( "constructor -> context  ", context )
        this.id         = typeof context === 'string' ? context : context.location.hash.replace("#", "")
            if( !this.id ) this.id = "main"
        // this.messager   = new EventEmitter( this.id )
        this.listeners  = {}
        this.blocked    = {}

        let _this = this

        // if( !window.dna || window.dna.is_listening ) return

        // printf( "AAAAAAAAAAAAAAAAAAA" )
        // printf( "window.dna.is_listening -> " )
        window.addEventListener( "storage", storage => {
            printf( ">>> index.js -> storage -> ", storage )

            let cargo  = JSON.parse(storage.newValue)
                let label    = cargo.label
                let payload  = cargo.payload
                let id       = cargo.id || "main"

            // let is_ok= !!this.listeners[label] && window.location.hash === this.id
            // printf( "&& id -> ", id )
            // printf( "&& this.id -> ", this.id )
            let is_ok= !!this.listeners[label] && id === this.id

            if( is_ok ) {
                // printf( "storage -> ", storage )
                // printf( "cargo -> ", cargo )
                // printf( `cargo: ${cargo} this.listeners: ${this.listeners} ` )
                // printf( "storage.target.location -> ", storage.target.location.href.split("#")[1] )
                // printf( "this.id -> ", this.id )
                this.listeners[label]( payload )
            }
                // if( is_ok ) this.listeners[label]( payload )
        })

        // window.dna.is_listening = true
    }

    scan( dom ) {
        printf( ">>> uHTML -> index -> component -> ", dom )
        embed_components( dom )
    }

    on( label, callback ) {
        printf( "index.js -> on -> label -> ", label )
        this.listeners[label] = callback
        // this.messager.on( label, callback )
    }

    emit( label, payload ) {

        let id  = window.location.hash.split("#")[1] || "main"
        let key = Math.random()
        window.localStorage.setItem( "dna", JSON.stringify({ label: label, payload: payload, id: id, key: key}))
    }

}




if( !window.DNA ) window.DNA = DNA

embed_components()
// custom_embeds()

/*
function eval_in_context( code, context, payload ) {
    var result = function( code ){
        let o = eval( code )
        return o
    }.call( context, payload )

    return result
}
*/
