import printf                   from "@/classes/printf.js"

export default async function scan_links() {

    let tags        = []
    let has_no_scan = false
    let list        = Object.values( this.list )

    list.map( note => {

        tags  = this.ilse.utils.extract_tags( note )

        has_no_scan = tags.indexOf( "#!scan" ) !== -1 || tags.indexOf( "#!" ) !== -1  || tags.indexOf( "#!!!" ) !== -1
        if( has_no_scan ) return

        tags.map( tag => {
            Messager.emit( "~notes", "tag", { tag, note })
        })

    })
}
