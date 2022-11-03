import printf                           from "@/classes/printf.js"

// Ilse
    // import ilse                              from "@/ilse.js"

// classes
    // import MessagerFactory                   from "@/classes/MessagerFactory.js"
    import Messager                             from "@/classes/Messager.js"

// functions
    import string_to_html                         from "@/classes/string_to_html.js"
    import create_window                          from "@/classes/create_window.js"
    import html_to_string                         from "@/classes/html_to_string.js"
    import add_component                          from "@/classes/add_component.js"
    import get_string_favicon                     from "@/classes/get_string_favicon.js"
    import add_array_item                         from "@/classes/add_array_item.js"
    import add_permission                         from "@/classes/add_permission.js"
    import and                                    from "@/classes/and.js"
    import char_at                                from "@/classes/char_at.js"
    import clean_list                             from "@/classes/clean_list.js"
    import cut_array                              from "@/classes/cut_array.js"
    import cut_string                             from "@/classes/cut_string.js"
    import debounce                               from "@/classes/debounce.js"
    import delay                                  from "@/classes/delay.js"
    import download                               from "@/classes/download.js"
    import export_digital_garden                  from "@/classes/export_digital_garden.js"
    import extract_embeds_from_string             from "@/classes/extract_embeds_from_string.js"
    import extract_html_embeds                    from "@/classes/extract_html_embeds.js"
    import extract_markdown_links_from_string     from "@/classes/extract_markdown_links_from_string.js"
    import extract_note_content                   from "@/classes/extract_note_content.js"
    import extract_note_id                        from "@/classes/extract_note_id.js"
    import extract_tokens_by_regexp_delimiters    from "@/classes/extract_tokens_by_regexp_delimiters.js"
    import first_letter                           from "@/classes/first_letter.js"
    import focus_on_note                          from "@/classes/focus_on_note.js"
    import get_array_item_from_string             from "@/classes/get_array_item_from_string.js"
    import get_build_target                       from "@/classes/get_build_target.js"
    import get_clipboard                          from "@/classes/get_clipboard.js"
    import get_file_type                          from "@/classes/get_file_type.js"
    import get_green_red_color_based_on_boolean   from "@/classes/get_green_red_color_based_on_boolean.js"
    import get_html_favicon                       from "@/classes/get_html_favicon.js"
    import get_human_readable_creation_date       from "@/classes/get_human_readable_creation_date.js"
    import get_index_of                           from "@/classes/get_index_of.js"
    import get_key_children                       from "@/classes/get_key_children.js"
    import get_last_command                       from "@/classes/get_last_command.js"
    import get_month_name                         from "@/classes/get_month_name.js"
    import get_next_note                          from "@/classes/get_next_note.js"
    import get_normalized_note                    from "@/classes/get_normalized_note.js"
    import get_note                               from "@/classes/get_note.js"
    import get_note_children                      from "@/classes/get_note_children.js"
    import get_note_depth                         from "@/classes/get_note_depth.js"
    import get_note_id                            from "@/classes/get_note_id.js"
    import get_note_id_by_index                   from "@/classes/get_note_id_by_index.js"
    import get_note_id_from_index                 from "@/classes/get_note_id_from_index.js"
    import get_note_index                         from "@/classes/get_note_index.js"
    import get_note_references_from_string        from "@/classes/get_note_references_from_string.js"
    import get_note_string_id                     from "@/classes/get_note_string_id.js"
    import get_protocol                           from "@/classes/get_protocol.js"
    import get_small_unique_string_id             from "@/classes/get_small_unique_string_id.js"
    import get_spaces_count                       from "@/classes/get_spaces_count.js"
    import get_special_normalized_note            from "@/classes/get_special_normalized_note.js"
    import get_target_directory_url               from "@/classes/get_target_directory_url.js"
    import get_unique_date_id                     from "@/classes/get_unique_date_id.js"
    import has_string                             from "@/classes/has_string.js"
    import i18n                                   from "@/classes/i18n.js"
    import if_else                                from "@/classes/if_else.js"
    import is                                     from "@/classes/is.js"
    import is_dev                                 from "@/classes/is_dev.js"
    import is_filename_markdown                   from "@/classes/is_filename_markdown.js"
    import is_inside                              from "@/classes/is_inside.js"
    import is_letter                              from "@/classes/is_letter.js"
    import is_note_child                          from "@/classes/is_note_child.js"
    import is_platform                            from "@/classes/is_platform.js"
    import keys                                   from "@/classes/keys.js"
    import last_item                              from "@/classes/last_item.js"
    import last_letter                            from "@/classes/last_letter.js"
    import listen_to_message                      from "@/classes/listen_to_message.js"
    import loop                                   from "@/classes/loop.js"
    import map                                    from "@/classes/map.js"
    import markdown_it_plugin_cloze_deletion      from "@/classes/markdown_it_plugin_cloze_deletion.js"
    import markdown_it_plugin_code_block          from "@/classes/markdown_it_plugin_code_block.js"
    import markdown_it_plugin_embed               from "@/classes/markdown_it_plugin_embed.js"
    import markdown_it_plugin_highlight           from "@/classes/markdown_it_plugin_highlight.js"
    import markdown_it_plugin_inline_code         from "@/classes/markdown_it_plugin_inline_code.js"
    import markdown_it_plugin_link                from "@/classes/markdown_it_plugin_link.js"
    import markdown_it_plugin_number_list         from "@/classes/markdown_it_plugin_number_list.js"
    import markdown_it_plugin_separator           from "@/classes/markdown_it_plugin_separator.js"
    import markdown_it_plugin_tag                 from "@/classes/markdown_it_plugin_tag.js"
    import markdown_it_plugin_todo                from "@/classes/markdown_it_plugin_todo.js"
    import markdown_to_html                       from "@/classes/markdown_to_html.js"
    import move_array_item                        from "@/classes/move_array_item.js"
    import normalize_note                         from "@/classes/normalize_note.js"
    import not                                    from "@/classes/not.js"
    import pipe                                   from "@/classes/pipe.js"
    import prevent_default                        from "@/classes/prevent_default.js"
    import push                                   from "@/classes/push.js"
    import query                                  from "@/classes/query.js"
    import random_number                          from "@/classes/random_number.js"
    import random_rgba                            from "@/classes/random_rgba.js"
    import remove_array_item                      from "@/classes/remove_array_item.js"
    import remove_duplicates_from_array           from "@/classes/remove_duplicates_from_array.js"
    import remove_permission                      from "@/classes/remove_permission.js"
    import remove_text                            from "@/classes/remove_text.js"
    import same                                   from "@/classes/same.js"
    import scan_links                             from "@/classes/scan_links.js"
    import scan_tags                              from "@/classes/scan_tags.js"
    import search                                 from "@/classes/search.js"
    import send_message                           from "@/classes/send_message.js"
    import set                                    from "@/classes/set.js"
    import set_caret_to_end_on_content_editable_element from "@/classes/set_caret_to_end_on_content_editable_element.js"
    import shift_nth_times                        from "@/classes/shift_nth_times.js"
    import shuffle_array                          from "@/classes/shuffle_array.js"
    import sleep                                  from "@/classes/sleep.js"
    import split_array_into_fixed_size_chunks     from "@/classes/split_array_into_fixed_size_chunks.js"
    import split_array_into_nth_chunks            from "@/classes/split_array_into_nth_chunks.js"
    import split_array_into_pairs                 from "@/classes/split_array_into_pairs.js"
    import string_to_base64                       from "@/classes/string_to_base64.js"
    import trim                                   from "@/classes/trim.js"
    import truncate_text                          from "@/classes/truncate_text.js"
    import update_key                             from "@/classes/update_key.js"
    import values                                 from "@/classes/values.js"
    import yyyymmddhhss_to_pretty                 from "@/classes/yyyymmddhhss_to_pretty.js"


    // import has_permission               from "@/classes/has_permission.js"

function has_permission( name, permission, ilse ) {

    if( !ilse.config.permissions ) ilse.config.permissions = {} // Make sure it exists

    let has_name = ilse.config.permissions[name]
        if( !has_name ) return false // Does not have name

    let has_permission = ilse.config.permissions[name].indexOf( permission ) !== -1
        if( !has_permission ) return false

    return true
}

export default function get_plugin_api( name, ilse ) {

    // const Messager = new MessagerFactory()

    // Messager.on( "message", payload => {
        // printf( "get_plugin_api -> payload -> ", payload )
    // })

    // printf( "htmls -> ilse.htmls -> ", ilse.htmls)
    // printf( "ilse.notes -> ", ilse.notes )
    // printf( " name === 'global' -> ", name === 'global' )

    const api = {

        htmls: ilse.htmls,

        store: ilse.store,

        electron: ilse.electron,
        active: ilse.active,

        tabs: ilse.tabs,

        configutation: {
            save: ilse.config.save.bind( ilse.config ),
            load: ilse.config.load.bind( ilse.config ),
        },

        components: ilse.components,

        info: {
            platform: ilse.platform,
            version:  ilse.env.VUE_APP_VERSION,
            env:      ilse.env,
        },

        languages: ilse.constants.SUPPORTED_LANGUAGES,

        keys: {
            list: ilse.keyboard.keys,

            get_command_key: function get_command_key( id ) {

                let command   = ilse.commands.get(id)
                let keys      = ilse.keys
                let to_return = ""

                ilse.keyboard.keys.map( key => {
                    if( key.command === id ) to_return = key.combo
                })

                return to_return

            },
        },

        plugins: ilse.plugin_manager.list,

        markdown: ilse.markdown,

        add_component: add_component,

        notes: ilse.notes,
        // notes: name === "global" ? ilse.notes.list : (has_permission( name, 'notes', ilse )  ? ilse.notes : null),
        add_note: ilse.notes.add.bind( ilse.notes ),
        query:        ilse.notes.query.bind( ilse.notes ),
        query_regexp: ilse.notes.query_regexp.bind( ilse.notes ),

        command: function() {}, // todo
        autocomplete: function() {}, // todo
        text_expansion: function() {}, // todo

        require: ilse.require,

        fetch: {
            json: async function( url ) {
                let res     = await fetch( url )
                let json    = await res.json()
                return json
            },
            text: async function( url ) {
                let res     = await fetch( url )
                let text    = await res.text()
                return text
            },
        },

        has_loaded: ilse.has_loaded,
        Messager: Messager,

        // io: {
            // in:   Messager.on.bind( Messager ),
            // out:  Messager.emit.bind( Messager ),
        // },

        clipboard: {
            read:   has_permission( name, 'clipboard', ilse )  ? ilse.clipboard.read  : null,
            write:  has_permission( name, 'clipboard', ilse )  ? ilse.clipboard.write : null,
        },

        fs: {
            existsSync:    has_permission( name, 'read', ilse )  ? ilse.filesystem.file.exists.sync  : null,
            exists:        has_permission( name, 'read', ilse )  ? ilse.filesystem.file.exists.async : null,
            readdir:       has_permission( name, 'read', ilse )  ? ilse.filesystem.dir.list.async    : null,
            readdirSync:   has_permission( name, 'read', ilse )  ? ilse.filesystem.dir.list.sync     : null,
            readFile:      has_permission( name, 'read', ilse )  ? ilse.filesystem.file.read.async   : null,
            readFileSync:  has_permission( name, 'read', ilse )  ? ilse.filesystem.file.read.sync    : null,
            writeFile:     has_permission( name, 'write', ilse ) ? ilse.filesystem.file.read.sync    : null,
            writeFileSync: has_permission( name, 'write', ilse ) ? ilse.filesystem.file.read.sync    : null,
        },

        dom: name === "global" ? null : function(HTML) { // We have limited what the plugin can do to the DOM. But here's the function you want to do your DOM transformations
            // TODO:
        },

        components: {
            create_window: create_window,
        },

        notify: ilse.notification.send.bind( ilse.notification ),

        keyboard: {
            add: ilse.keyboard.add.bind( ilse.keyboard ),
        },

        commands: {
            last: ilse.commands.last_command,
            history: ilse.commands.history,
            add: function( args ) {

                args.props.is_plugin = true
                args.props.source    = name

                ilse.commands.add( args )
            }.bind( ilse.commands ),

            list: ilse.commands.commands,
            run: ilse.commands.run.bind( ilse.commands ),
        },

        dialog: {
            info:    ilse.dialog.info.bind( ilse.dialog ),
            confirm: ilse.dialog.confirm.bind( ilse.dialog ),
            input:   ilse.dialog.input.bind( ilse.dialog ),
            close:   ilse.dialog.close.bind( ilse.dialog ),
        },

        load:  name === "global" ? null : function() {
            let file    = ilse.filesystem.file.read.sync( name )
            let HTML    = string_to_html( file )
            let data    = HTML.getElementById( "data" ) ? HTML.getElementById( "data" ).innerText : {}
            return JSON.parse(data)
        },

        save: name === "global" ? null  : function( json ) {

            let string          = JSON.stringify( json )
            let file            = ilse.filesystem.file.read.sync( name )

            let HTML            = string_to_html( file ) // mount DOM from string
                HTML.getElementById( "data" ).innerText = string // Change it

            let updated_html    = html_to_string( HTML ) // return to string(Changed)

            ilse.filesystem.file.write.sync( name , updated_html ) // Write

            return json
        },

        utils: {
            get_string_favicon: function( string ) {
                let favicon = get_string_favicon( string )
                return favicon
            },
            get_unique_date_id,
            move_array_item,
            yyyymmddhhss_to_pretty,
            debounce: debounce,
            send_message: send_message,
            get_human_readable_creation_date,

            set_dom_x_data: function( id, props ) {

                let string_props     = JSON.stringify( props )
                let normalized_props = string_props.replaceAll( "\"", "'" )

                let dom              = document.getElementById( id )
                    if( dom ) dom.setAttribute( "x-data", normalized_props )

                return dom
            },
        }

    }

    return api

}
