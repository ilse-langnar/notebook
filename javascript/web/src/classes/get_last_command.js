const printf                    = console.log

export default function get_last_command( history ) {
    return history.slice( history.lastIndexOf( "Control" ), history.length )
}
