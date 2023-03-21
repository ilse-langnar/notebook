import printf                       from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

export default function get_command_by_keyboard_shortcut( command_id ) {

    let command   = ilse.commands.get(command_id)
    let keys      = ilse.keys
    let to_return = ""

    ilse.keyboard.keys.map( key => {
        if( key.command === command_id ) to_return = key.combo
    })

    return to_return

}
