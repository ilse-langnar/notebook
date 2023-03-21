import printf                   from "@/functions/printf.js"

// ilse
    import ilse                 from "@/ilse.js"

// functions
    import get_note_index           from "@/functions/get_note_index.js"
    import get_note_id_by_index     from "@/functions/get_note_id_by_index.js"
    import get_note                 from "@/functions/get_note.js"
    import is_note_child            from "@/functions/is_note_child.js"
    import if_else                  from "@/functions/if_else.js"
    import get_index_of             from "@/functions/get_index_of.js"
    import cut_array                from "@/functions/cut_array.js"
    import keys                     from "@/functions/keys.js"
    import map                      from "@/functions/map.js"
    import get_next_note            from "@/functions/get_next_note.js"


export default function get_note_children( id ) {

    printf( "---------" )
    printf( "id -> ", id )
    let key_list   = keys(ilse.notes.list)

    // let cutted   = cut_array( key_list, get_index_of( key_list, id ) + 1)
    let cutted     = cut_array( key_list, get_index_of( key_list, id ) + 1)

    let note_index = key_list.indexOf(id)
    let note_note  = ilse.notes.list[ key_list[note_index] ]

    let next_index = note_index + 1
    let next_note  = ilse.notes.list[ key_list[next_index] ]

    if( next_note.depth === 0 ) return [] // The next item(with index) has a depth of 0, thus the itam has no children. return an empty array( childless note )

    let children   = []

    let next
    for( let i = 1; i < 30; i++ ) {
        printf( "4" )

        next = key_list[ note_index + i ]
        children.push( next )

        if( ilse.notes.list[next].depth === 0 ) return children
    }

    return children

    /*
    let parent   = get_note( id )
        if( !parent ) return []

    // let children = []

    for( let item of cutted ) {
        if( parent.depth > ilse.notes.list[item].depth || ilse.notes.list[item].depth === 0 ) {
            return children
        }
        if( parent.depth < ilse.notes.list[item].depth ) children.push( item )
    }

    printf( "children -> ", children )
    return children
    */


    /*
    let has_tags      = string.indexOf( "#" ) !== -1
        if( !has_tags ) return ""

    let has_child_tag = string.indexOf( "#hidden/child/" ) !== -1
        if( !has_child_tag ) return ""

    let chunks = string.split(" ")

    let tag
    chunks.map( chunk => {
        if( chunk.indexOf("#hidden/child") !== -1 ) tag = chunk
    })

    let tag_chunks = tag.split("")
    printf( "@@@" )
    printf( ">>> tag_chunks -> ", tag_chunks )

    return tag
    */


    /*
    map( cutted, item => {

        printf( "item -> ", item )
        printf( "ilse.notes.list[item] -> ", ilse.notes.list[item], ilse.notes.list[item].depth )
        printf( "\n" )
        if( ilse.notes.list[item].depth === 0 ) {
            printf( "HAHAHAH" )

        }

        if( parent.depth > ilse.notes.list[item].depth  ) {
            printf( "found the smallest?" )
            return
        }

        if( parent.depth < ilse.notes.list[item].depth ) {
            children.push( item )
        }


        // if( ilse.notes.list[item].depth > parent.depth ) {
            // children.push( item )
        // } else if( note.depth > ilse.notes.list[item].depth ) {
            // return children
        // }

    })
    printf( "children -> ", children.length )

    return children
   */
}

/*
// let note      = get_note( id )
// let pa      = get_note( id )
printf( "before -> ", parent )
printf( "get_note( id ) -> ", get_note( id ) )
if( parent ) {
    parent = parent
} else {
    parent = get_note( id )
}
printf( "after -> ", parent )

let next_note = get_note( get_next_note( id ) )
    if( !next_note ) return children

// Them problem here is that the "note" will change to the next, How can I preserve the parent?
// if( next_note.depth > note.depth || next_note.depth > parent.depth ) {
if( next_note.depth >= parent.depth ) {
    printf( `next_note: ${next_note.content} is a child of: ${note.content}` )
    children.push( note )
} else {
    return children
}

return get_next_note( next_note.id, children, parent )
*/

// return [get_note(next_note)]
/*
if_else(
    is_note_child( _id ),
    yes => {
        children.push( get_note( _id ) )
        should_keep_going = true
    },
    no  => {
        should_keep_going = false
    },
)

if( should_keep_going ) {
    tmp( _id )

    return get_note_children(

        get_note_id_by_index(
            get_note_index( id ) + 1
        )
    )

} else {
    return children
}
*/


/*
pipe([
    [get_note_index, id], // qwionieowq -> 2
    [get_note_id_by_index], //
    [get_note],
    [is_note_child]
])

pipe([

    [ loop, [multiply_by, 10], [ 1,2,3,4,5,6,7 ] ],
    print
])

loop( printf, loop( multiply_by(2), [ 1,2,3,4,5,6,7,8 ] ) )

printf( "children -> ", children )
*/

// let note  = ilse.notes.list[id]
// let index = get_note_index( id )

// let next_index = ++index
// let note   = get_note(get_note_id_by_index( ++index ))
/// let note   = get_note(get_note_id_by_index( get_note_index( id ) ))

// let children = []
// I only need get_note_children( get_note( id ) )

/*
if_else(

    is_note_child(
        get_note(
            get_note_id_by_index(
                get_note_index( id )
            )
        ).id
    ),
    yes => { children.push( get_note( id ) ) },
    no  => { printf( "Not a child: ", get_note( id ) ) },

)
*/
