import printf                           from "@/functions/printf.js"

// classes
    import Messager                             from "@/classes/Messager.js"

// functions
    import fuzzy_sort                             from "@/assets/fuzzysort.js"
    import string_to_html                         from "@/functions/string_to_html.js"
    import get_string_favicon                     from "@/functions/get_string_favicon.js"
    import debounce                               from "@/functions/debounce.js"
    import extract_markdown_links_from_string     from "@/functions/extract_markdown_links_from_string.js"
    import extract_markdown_tags                  from "@/functions/extract_markdown_tags.js"
    import extract_tokens_by_regexp_delimiters    from "@/functions/extract_tokens_by_regexp_delimiters.js"
    import get_target_directory_url               from "@/functions/get_target_directory_url.js"
    import get_unique_date_id                     from "@/functions/get_unique_date_id.js"
    import move_array_item                        from "@/functions/move_array_item.js"
    import query                                  from "@/functions/query.js"
    import get_random_array_elements              from "@/functions/get_random_array_elements.js"
    import send_message                           from "@/functions/send_message.js"
    import split_array_into_nth_chunks            from "@/functions/split_array_into_nth_chunks.js"
    import yyyymmddhhss_to_pretty                 from "@/functions/yyyymmddhhss_to_pretty.js"
    import recursively_search_for_dom             from "@/functions/recursively_search_for_dom.js"
    import clean_markdown_tags                    from "@/functions/clean_markdown_tags.js"
    import get_number_of_days_in_a_month          from "@/functions/get_number_of_days_in_a_month.js"
    import create_infinite_canvas                 from "@/functions/create_infinite_canvas.js"
    import get_yesterday                          from "@/functions/get_yesterday.js"
    import get_bullet_description                 from "@/functions/get_bullet_description.js"
    import query_notes_from_day                   from "@/functions/query_notes_from_day.js"
    import get_linked_references                  from "@/functions/get_linked_references.js"
    import get_today                              from "@/functions/get_today.js"
    import get_month_days_by_week                 from "@/functions/get_month_days_by_week.js"
    import make_dom_draggable                     from "@/functions/make_dom_draggable.js"
    import get_un_linked_references               from "@/functions/get_un_linked_references.js"
    import base64_2_file                          from "@/functions/base64_2_file.js"
    import dom_img_2_base64                       from "@/functions/dom_img_2_base64.js"
    import get_note_root                          from "@/functions/get_note_root.js"
    import store                                  from "@/functions/store.js"
    import render                                 from "@/functions/render.js"
    import modal                                  from "@/functions/modal.js"
    import notify                                 from "@/functions/notify.js"
    import get_note_id                            from "@/functions/get_note_id.js"
    import random_number                          from "@/functions/random_number.js"
    import component                              from "@/functions/component.js"

export default function get_plugin_api( name, ilse ) {

    const api = {

        notify: notify,
        store: store,
        render: render,
        config: ilse.config,
        components:ilse.components,

        component: component,

        get( name ) {

            let obj = {
                "components.props": ilse.components_props,
                components:         ilse.components,
                plugins:            ilse.plugins,
                constants:          ilse.constants,
                stack:              ilse.stack,
                platform:           ilse.platform,
                version:            process.env.VUE_APP_VERSION,
                env:                process.env,
                target_directories: ilse.target_directories,
                directory:          ilse.target_directories[0],
            }

            return obj[name]
        },

        // markdown: ilse.markdown,
        markdown: function( string ) {
            if( string ) {
                return ilse.markdown.render(string)
            } else {
                return ilse.markdown
            }
        },

        keyboard: ilse.keyboard,

        // TODO: Make a simgle api.notes() interace.
        notes:        ilse.notes,

        require: ilse.require,

        on:   Messager.on.bind( Messager ),
        emit: Messager.emit.bind( Messager ),

        fs: {
            existsSync:    ilse.filesystem.file.exists.sync,
            exists:        ilse.filesystem.file.exists.async,

            readdir:       ilse.filesystem.dir.list.async,
            readdirSync:   ilse.filesystem.dir.list.sync,

            readFile:      ilse.filesystem.file.read.async,
            readFileSync:  ilse.filesystem.file.read.sync,

            writeFile:     ilse.filesystem.file.read.async,
            writeFileSync: ilse.filesystem.file.read.sync,
        },


        // Make a single api.commands() interface
        commands: {
            last: ilse.commands.last_command,
            history: ilse.commands.history,
            add: function( args ) {

                args.props.is_plugin = true
                args.props.source    = name

                ilse.commands.add( args )
            }.bind( ilse.commands ),

            list: ilse.commands.list,
            run: ilse.commands.run.bind( ilse.commands ),
        },

        utils: {
            close_all_modals: function() {
                ilse.stack = []
            },
            dom_img_2_base64,
            base64_2_file,
            get_note_root,
            get_note_id,
            get_string_favicon,
            get_unique_date_id,
            move_array_item,
            yyyymmddhhss_to_pretty,
            debounce: debounce,
            send_message: send_message,
            get_bullet_description,
            recursively_search_for_dom,
            string_to_html,
            get_target_directory_url,
            split_array_into_nth_chunks,
            extract_markdown_links_from_string,
            clean_markdown_tags,
            extract_markdown_tags,
            get_today,
            query_notes_from_day,
            get_month_days_by_week,
            extract_tokens_by_regexp_delimiters,
            fuzzy_sort,
            get_yesterday,
            get_number_of_days_in_a_month,
            create_infinite_canvas,
            get_un_linked_references,
            get_linked_references,
            get_random_array_elements,
            make_dom_draggable,
            random_number,
        }

    }

    return api
}
