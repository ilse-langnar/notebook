import printf                           from "@/classes/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"


export default class Tabs {

    constructor( ilse ) {
        this.list =  [
            { url: "outline", is_active: true, id: "outline", name: "Outline", components: [ "top-menu", "daily-notes", "status-line" ] }
        ]
    }

    remove( tab ) {

        if( this.list.lengt === 0 ) return

        let index = this.list.indexOf(tab)
        this.list.splice( index, 1 )
        // this.select( this.list[0] )
        this.list[0].is_active = true

    }

    unselect_all() {

        this.list.map( tab => {
            tab.is_active = false
        })

    }

    add({
        is_active  = true,
        url        = "",
        id         = Math.random().toString(),
        name       = "New Tag",
        components = [ "top-menu", "daily-notes", "status-line" ],
    }) {

        this.unselect_all()

        this.list.push({
            is_active: is_active,
            id: id,
            url: url,
            name: name,
            components: components
        })

        return this.list[this.list.length -1]
    }

    select( tab ) {
        this.unselect_all()
        tab.is_active = true
    }

}
