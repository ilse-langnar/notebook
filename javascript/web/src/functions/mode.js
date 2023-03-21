import printf                           from "@/functions/printf.js"

// ilse
    import ilse                         from "@/ilse.js"

export default function mode( mode ) {

    let index       = ilse.config.modes.indexOf( string )
    let has_already = index !== -1

    let chunks      = string.split("|")
    let name        = chunks[0]
    let svg         = chunks[1]
    let fn          = chunks[2]

    let command     = this.commands.get(fn)

    if( has_already ) {
        command.undo()
        ilse.config.modes.splice( index, 1 )
        store( "config", ilse.config, true )
    } else {
        command.fn()
        ilse.config.modes.push( string )
        store( "config", ilse.config, true )
    }

}
