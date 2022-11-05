import printf                       from "@/functions/printf.js"

//
    import map                          from "@/functions/map.js"
    import if_else                      from "@/functions/if_else.js"
    import same                         from "@/functions/same.js"
    import trim                         from "@/functions/trim.js"
    import remove_text                  from "@/functions/remove_text.js"
    import first_letter                 from "@/functions/first_letter.js"
    import clean_list                   from "@/functions/clean_list.js"

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
