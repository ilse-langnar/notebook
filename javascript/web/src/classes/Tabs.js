import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// html
    import top_menu                     from "@/html/top-menu.html"
    import daily_notes                  from "@/html/daily-notes.html"
    import status_line                  from "@/html/status-line.html"
    import new_tab                      from "@/html/new-tab.html"

export default class Tabs {

    constructor( ilse ) {
        this.list =  [
            ` <html>
                <head>
                    <title> Outline </title>
                    <link rel="icon" type="image/svg" sizes="16x16" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXRyZWUiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iIzQ4NTM2MSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICA8cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMTIgMTNsLTIgLTIiIC8+CiAgPHBhdGggZD0iTTEyIDEybDIgLTIiIC8+CiAgPHBhdGggZD0iTTEyIDIxdi0xMyIgLz4KICA8cGF0aCBkPSJNOS44MjQgMTUuOTk1YTMgMyAwIDAgMSAtMi43NDMgLTMuNjlhMi45OTggMi45OTggMCAwIDEgLjMwNCAtNC44MzNhMyAzIDAgMCAxIDQuNjE1IC0zLjcwN2EzIDMgMCAwIDEgNC42MTQgMy43MDdhMi45OTcgMi45OTcgMCAwIDEgLjMwNSA0LjgzM2EzIDMgMCAwIDEgLTIuOTE5IDMuNjk1aC00eiIgLz4KPC9zdmc+CgoK" >
                </head>
                <body>
                    ${top_menu}
                    ${daily_notes}
                    ${status_line}
                </body>
            </html> `
        ]

        this.selected = 0
        this.listen()
    }

    remove( tab ) {
        let index = this.selected

        if( this.list.length === 0 || this.list.lenght === 1 ) {
            this.list.splice( this.list.indexOf(tab), 1 )
            this.selected = --index
        }

        Messager.emit( "~tabs", this.list )
    }

    add( html = `<html> <head> <title> New Tab </title> </head> <body> ${top_menu} ${new_tab} ${status_line} </body> </html> `, autoselect = true ) {
        this.list.push( html )
        if( autoselect ) this.selected = this.list.length -1
        return this.list[this.list.length -1]
    }

    select( html ) {
        this.selected = this.list.indexOf( html )
        Messager.emit( "~tabs", this.list )
    }

    listen() {

        Messager.on( "~top-menu", (action, payload) => {
            this.selected = payload
        })

    }

}
