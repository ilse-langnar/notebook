import printf                   from "@/functions/printf.js"

import has_media_extention      from "@/functions/has_media_extention.js"

export default async function scan_links( html ) {

    let notes            = this.list
    let links
    let exists
    let is_media
    let has_nickname

    // [ "20220122113043: Top [[Psycology Papers]]", "20220122113043: I have a new [[Idea]]" ]
    for( const note of notes ) {

        links              = extract_tokens_by_regexp_delimiters( note.content,  /^\[\[.*/, /\]\]$/ ) // "Something to [[Write]]" -> [ "Write" ]

        // [ [ "[[Javascript]]", "[[Psycology Papers]]" ] ]
        for( let link of links ) {

            // BUGFIX: Don't process : ![[img.png]] ![[music.mp4]] as a link
                is_media = has_media_extention( link )
                if( is_media ) continue //skip

            // Nroamlize [[Psycology Papers]] -> Psycology\ Papers.md
                link = link.replace( "[[", "" ).replace( "]]", "" ) // "[[Psycology Papers]]" -> "Psycology Papers"
                link = link + ".md" // "Psycology Papers" -> "Psycology Papers.md"
                link = link.trim() // " Psycology Papers .md" -> "Psycology Papers.md"

            // if not exists, create
                try {
                    exists         = await this.filesystem.file.exists.async( link )// link - > "Psycology Papers.md"
                } catch( e ) {
                    exists = false
                }

            // For [[ Example | Another Name ]]
                has_nickname =  link.indexOf("|") !== -1
                    if( has_nickname ) return

            // Is an actual file, then create
                // if( !exists ) {
                    // await this.filesystem.file.write.async( link, link )
                // }

            Messager.emit( "~notes", "link", { link, note } )
        }
    }

    Messager.emit( "~notes", "loaded", this )
}
