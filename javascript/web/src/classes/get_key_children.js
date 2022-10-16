import printf                       from "@/classes/printf.js"

//
    import map                          from "@/classes/map.js"
    import if_else                      from "@/classes/if_else.js"
    import same                         from "@/classes/same.js"
    import trim                         from "@/classes/trim.js"
    import remove_text                  from "@/classes/remove_text.js"
    import first_letter                 from "@/classes/first_letter.js"
    import clean_list                   from "@/classes/clean_list.js"

export default function get_key_children( child_key, keys ) {

    printf( "get_key_children -> child_key -> ", child_key )
    printf( "get_key_children -> keys -> ", keys )

    let o = map(
        keys,
        item => {
            return if_else(
                same( first_letter(trim( remove_text( item.combo, "ctrl+space" ) ) ), child_key ),
                yes => {
                    return remove_text( remove_text(item.combo, "ctrl+space"), child_key )
                },
                no => null,
            )
        }
    )

    printf( "o -> ", o )
    return o
}
