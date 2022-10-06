const printf        = console.log

export default function get_note_depth( conditional, _if, _else ) {

    if( conditional ) {
        return _if()
    } else {
        return _else()
    }

}
