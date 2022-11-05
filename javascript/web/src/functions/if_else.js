import printf                   from "@/functions/printf.js"

export default function get_note_depth( conditional, _if, _else = () => {} )  {
    if( !_if ) throw new Error( "if_else.js: The if clauses are mandatory!!!" )

    if( conditional ) {
        return _if()
    } else {
        return _else()
    }

}
