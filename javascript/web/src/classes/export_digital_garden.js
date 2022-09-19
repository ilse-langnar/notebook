const printf = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Functions
    import download                     from "@/classes/download.js"

export default function export_digital_garden( template, links, removed ) {

    let notes= ""

    links.map( link => {

        // ilse.notes.query(link).filter( e => removed.indexOf(e.id) !== -1  ).map( item => {
        ilse.notes.query(link).map( item => {
            notes += item.get() + "\n"
        })

    })
    printf( "notes -> ", notes )

    // printf( "notes.split('') -> ", notes.split('') )

    let filesystem = {
        "/": {
            "notes": notes,
            "queue": "",
            "statistics": "",
            "priorities": "",
            "config.json": JSON.stringify( ilse.config.get_normalized_config() ),
            "second/": { },
            "first/": { },
            ".trash/": {

            },
            "plugins/": { },
        }
    }
    printf( "filesystem -> ", filesystem )

    let html = template.replace( "<div id=\"app\"> </div>", `<div id="app"> </div>
        <div id="db" style="display: none;" >
            ${JSON.stringify(filesystem)}
        </div>
        `)

    download( "digital-garden.html", html )
}
