import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// functions
    import create_window                from "@/functions/create_window.js"

// html
    import top_menu                     from "@/html/top-menu.html"
    import daily_notes                  from "@/html/daily-notes.html"
    import status_line                  from "@/html/status-line.html"
    import new_tab                      from "@/html/new-tab.html"


export default class Tabs {

    constructor( ilse ) {

        let id = Math.random().toString().replace( "0.", "" )

        this.list =  [
            {
                id: id,
                is_active: true,
                title: "Notes",
                html: ` <html>
                    <head>
                        <title> Notes </title>
                        <link rel="icon" type="image/svg" sizes="16x16" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXRyZWUiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iIzQ4NTM2MSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICA8cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMTIgMTNsLTIgLTIiIC8+CiAgPHBhdGggZD0iTTEyIDEybDIgLTIiIC8+CiAgPHBhdGggZD0iTTEyIDIxdi0xMyIgLz4KICA8cGF0aCBkPSJNOS44MjQgMTUuOTk1YTMgMyAwIDAgMSAtMi43NDMgLTMuNjlhMi45OTggMi45OTggMCAwIDEgLjMwNCAtNC44MzNhMyAzIDAgMCAxIDQuNjE1IC0zLjcwN2EzIDMgMCAwIDEgNC42MTQgMy43MDdhMi45OTcgMi45OTcgMCAwIDEgLjMwNSA0LjgzM2EzIDMgMCAwIDEgLTIuOTE5IDMuNjk1aC00eiIgLz4KPC9zdmc+CgoK" >
                    </head>
                    <body>
                        ${top_menu}
                        ${daily_notes}
                        ${status_line}
                    </body>
                </html> `
            }
        ]

        // this.selected = id

        this.listen()
    }

    float( options ) {
        return create_window( options )
    }

    get_tab( id ) {

        let to_return = null

        this.list.map( tab => {
            if( tab.id === id ) to_return = tab
        })

        return to_return
    }

    remove( tab ) {

        let index    = this.list.indexOf( this.get_tab( tab.id ) )
            if( index === -1 ) return // BUGFIX:

        // TODO: change THEN delete.
        this.list.splice( index, 1 )

        if( this.list.length === 1 ) { // [ 1, 1 ] = [1](focos on this)
            setTimeout( () => { this.select( this.list[0] ) }, 1 )
        } else { // [ 1, 1, 1 ]
            let last = this.list[index]
            setTimeout( () => { this.select( last ) }, 1 )
        }

    }

    get_selected_tab() {
        let selected = this.list.map( tab => { if( tab.is_active ) return tab } ).filter( e=>e )
        return selected[0]
    }

    add_with_component( name, options = { title:  "New Title", autoselect: true }) {

        let component_name = ilse.components[name]

        return this.add(`
            <html>
                <head>
                    <title> ${options.title} </title>
                </head>
                <body>
                    ${top_menu}
                    ${status_line}
                    ${component_name}
                </body>
            </html>
        `, options )

    }

    unselect_all() {

        this.list.map( tab => {
            tab.is_active = false
        })

    }

    add( html = `
        <html>
            <head>
                <title> $title </title>
            </head>
            <body>
                ${top_menu}
                ${status_line}
                ${new_tab}
            </body>
        </html>
    `, options = { autoselect: true, title: "New Tab" } ) {

        // Set Title
            html = html.replace( "$title", options.title )

        let is_active   = options.autoselect
        let title       = options.title
        let id          = Math.random().toString().replace( "0.", "" )

        if( is_active ) this.unselect_all()

        let tab = {
            id: id,
            html: html,
            title: title,
            is_active: options.autoselect,
        }

        printf( "Addinc -> tab -> ", tab )
        this.list.push( tab )

        // if( options.autoselect ) this.selected = id

        return this.list[this.list.length -1]
    }

    select_previous_tab() {

        let current = this.get_selected_tab()
        let index   = this.list.indexOf( current )
        let previous= this.list[--index]

        if( previous ) {
            this.select( previous )
        } else {
            this.select( this.list[ this.list.length - 1 ] )
        }

        return previous
    }

    select( tab ) {
        this.unselect_all()
        // this.selected = tab.id
        tab.is_active = true
        // tab.is_active = true
        // printf( "Selected -> Tab -> ", tab )
        // Messager.emit( "~tabs", "selected", tab.id )
        // Messager.emit( "~tabs", "selected", tab.id )

        Messager.emit( "~tabs", {
            action: "set",
            tabs: this.list,
            selected: this.get_selected_tab()
        })

    }

    select_next_tab() {

        let current = this.get_selected_tab()
            printf( "select_next_tab -> current -> ", current )

        let index   = this.list.indexOf( current )
            printf( "select_next_tab -> index -> ", index )

        let next    = this.list[++index]
            printf( "select_next_tab -> next -> ", next )

        if( next ) {
            this.select( next )
        } else {
            this.select( this.list[0] )
        }

        return next
    }

    listen() {

        Messager.on( "~keyboard", key => {
            if( key === "esc" ) this.list.map( (item, index) => { if( item.is_modal ) this.list.splice( index, 1 ) })
        })

        // Messager.on( "~top-menu", (action, payload) => {
            // this.selected = payload
        // })
    }

}
