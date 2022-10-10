const printf                    = console.log

export default function get_last_key_combo( history ) {
    return history.slice( history.lastIndexOf( "Control" ), history.length )
}
