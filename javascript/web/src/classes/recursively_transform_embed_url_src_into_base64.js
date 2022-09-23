const printf = console.log

// ilse
    import ilse                         from "@/ilse.js"

// functions
    import string_to_html               from "@/classes/string_to_html.js"
    import string_to_base64             from "@/classes/string_to_base64.js"

export default function recursively_transform_embed_url_src_into_base64( url ) {

    let is_electron = process.env.VUE_APP_TARGET === "ELECTRON"

    let text        = ilse.filesystem.file.read.sync( url )
    let dom         = string_to_html( text )

    let target_dir  = ilse.target_directories[0]

    let base        = document.createElement( "base" )
        // printf( "base -> ", base )
        // base.href  = target_dir + "/"
        // base.href  = "file://" + target_dir + "/"
        // base.href  = "atom://" + target_dir + "/"
            // printf( "base.href -> ", base.href )
        base.href  = "app://" + target_dir + "/"

    // dom.head.appendChild( base )

    let embeds    = [...dom.querySelectorAll( "embed" )]
    let name, result
    embeds.map( (embed, index) => {

        // name      = embed.src.split("/")[embed.src.split("/").length -1]
        // embed.src = `app://${target_dir}/${name}`

        // embed.src = embed.src.replace("")
        // embed.src = embed.src.replace("")
        /*
        try {
            name      = embed.src.split("/")[embed.src.split("/").length -1]
            result    = ilse.filesystem.file.read.sync( name )
            embed.src = string_to_base64( result )
        } catch( e ) {
            printf( "e -> ", e )
        }
        */

    })


    /*
    let styles    = [...dom.querySelectorAll( "style" )]
    styles.map( style => {

        if( is_electron )  {
            style.innerHTML = style.innerHTML.replace( /url\("/, `url("atom://${target_dir}/` )
        } else {
            style.innerHTML = style.innerHTML.replace( /url\("/, `url("file://${target_dir}/` )
        }

    })


    let imgs    = [...dom.querySelectorAll( "img" )]
    imgs.map( img => {

        name      = img.src.split("/")[img.src.split("/").length -1]

        if( is_electron )  {
            img.src   = `atom://${target_dir}/${name}`
        } else {
            img.src   = `file://${target_dir}/${name}`
        }

    })
    */

    return string_to_base64( dom.documentElement.innerHTML )
}
