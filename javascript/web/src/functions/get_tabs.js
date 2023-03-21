import printf                       from "@/functions/printf.js"

import irequire                     from "@/functions/require.js"
import get_uuid                     from "@/functions/get_small_unique_string_id.js"

export default function get_tabs( tabs ) {
    printf( "get_tabs -> tabs -> ", tabs )
    return {
        add( name = "New Tab", options = { components: [], autoselect: true }) {


            let new_tab_index = this.list.push({
                id: get_uuid(),
                icon: irequire("app-window.svg"),
                components: options.components.length ? options.components : [ { id: "new-tab.html", name: "New Tab", props: {}, is_on: true } ],
                name: name,
                is_selected: false,
            })

            if( options.autoselect ) {
                setTimeout( () => {
                    let index = new_tab_index -1
                    this.select( this.list[index] )
                }, 100 )
            }

        },

        close_active_tab() {

            if( this.list.length === 1 ) return

            let selected        = this.get_active()
            let selected_index  = this.list.indexOf( selected )
            let previous_index  = selected_index - 1
            if( selected ) this.remove( selected )

            let previous_tab    = this.list[previous_index]
            this.select( previous_tab )

        },

        // close_active_component() {
        // },

        previous_tab() {

            let selected        = this.get_active()
                printf( "(get_tabs.js) -> selected -> ", selected )
            let index           = this.list.indexOf( selected )
                printf( "(get_tabs.js) -> index -> ", index )
            let next_index      = Number(index) + 1
                printf( "(get_tabs.js) -> next_index -> ", next_index )
            let previous_index  = Number(index) - 1
                printf( "(get_tabs.js) -> previous_index -> ", previous_index )

            if( index === 0 ) { // from 0, goto last
                printf( "(get_tabs.js) -> index === 0 -> " )
                this.select(this.list[this.list.length -1] )
                return
            }

            if( previous_index ) { // has next
                printf( "(get_tabs.js) -> if(previous_index) -> this.list[previous_index] -> ", this.list[previous_index] )
                this.select( this.list[previous_index] )
            }

        },

        next_tab() {

            let selected        = this.get_active()
            let index           = this.list.indexOf( selected )
            let next_index      = Number(index) + 1
            let previous_index  = Number(index) - 1

            if( index === this.list.length - 1 ) {
                this.select(this.list[0] )
                return
            }

            if( next_index ) { // has next
                this.select( this.list[next_index] )
            } else {
                this.select( this.list[previous_index] )
            }

        },

        replace_selected_component( id, props, raw_html = false ) {

            printf( "get_tabs -> replace_selected_component -> id ", id )
            printf( "get_tabs -> replace_selected_component -> props ", props )

            let tab      = this.get_active()
                printf( "get_tabs -> replace_selected_component -> tabs ", tab )
            let selected = this.get_selected_component()
                printf( "get_tabs -> replace_selected_component -> selected ", selected )
            let index    = tab.components.indexOf( selected )
                printf( "get_tabs -> replace_selected_component -> index ", index )


            printf( "before -> tab.components[index] -> ", tab.components[index] )

            tab.components[index] = {
                id: id,
                name: id.replace(".html", ""),
                props,
                is_on: true,
            }

            printf( "after -> tab.components[index] -> ", tab.components[index] )
            printf( "after -> tab -> ", tab )

        },

        replace_all_components( id, props, raw_html = false ) {

            printf( "get_tabs -> replace_all_components -> id -> ", id )
            printf( "get_tabs -> replace_all_components -> props -> ", props )

            let selected        = this.list.filter( item => item.is_selected )[0]
                selected.components = []

            printf( "before -> selected -> ", selected )

            selected.components.push({
                id,
                name: id.replace( ".html", "" ),
                is_selected: false,
                is_on: true,
                props
            })

            printf( "after -> selected -> ", selected )

        },

        remove_component( component )  {

            let selected    = this.get_active()
            let components  = selected.components

            let index       = components.indexOf( component )
            selected.components.splice( index, 1 )

        },

        /*
        add_component( id = "new-tab.html", name = "New Tab", props = {} ) {

            let selected    = this.list.filter( item => item.is_selected )[0]

            let component   = {
                id,
                name,
                is_selected: false,
                is_on: true,
                props ,
            }

            return selected.components.push( component )
        },
        */

        add_component( id = "new-tab.html", name = "New Tab", props = {} ) {

            let selected    = this.list.filter( item => item.is_selected )[0]

            printf( "(get_tabs.js)(add_component) id -> ", id )
            printf( "(get_tabs.js)(add_component) name -> ", name )
            printf( "(get_tabs.js)(add_component) prosp -> ", props )
            printf( "(get_tabs.js)(add_component) selected -> ", selected )

            let component   = {
                id,
                name,
                is_selected: false,
                is_on: true,
                props,
            }

            return selected.components.push( component )
        },

        get_selected_component() {

            let selected    = this.list.filter( item => item.is_selected )[0]
            let components  = selected.components
            let to_return

            components.map( item => {
                if( item.is_selected ) to_return = item
            })

            return to_return
        },

        get_active() {

            let to_return

            this.list.map( item => {
                if( item.is_selected ) to_return = item
            })

            return to_return
        },

        select( tab ) {

            this.list.map( item => {
                item.is_selected = false
            })

            let index = this.list.indexOf( tab )
            if( index === -1 ) return

            this.list[index].is_selected = true
        },

        remove( tab ) {

            let index = this.list.indexOf( tab )
            if( index === -1 ) return

            this.list.splice( index, 1 )
        },

        list: tabs, /*[
            {
                id: get_uuid(),
                name: "Main Tab",
                icon: irequire("ilse.svg"),
                components: [
                    {
                        id: "daily-notes.html",
                        name: "Daily Notes",
                        is_selected: true,
                        is_on: true,
                        props: { days: [] }
                    }
                ],
                is_selected: true,
            }
        ] */
    }

}
