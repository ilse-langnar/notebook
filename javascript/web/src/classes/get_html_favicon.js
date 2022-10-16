import printf                   from "@/classes/printf.js"

import ilse                     from "@/ilse.js"

export default function get_html_favicon( html ) {

    let favicon = html.querySelector( "link[rel=icon]" )

    if( !favicon ) return "data:image/svg+xml;base64,         PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXBvaW50IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiM0ODUzNjEiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgPHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgLz4KPC9zdmc+CgoK"

    return favicon.href
}
