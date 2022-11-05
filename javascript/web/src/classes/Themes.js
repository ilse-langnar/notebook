import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Constants
    import DEFAULT_THEME                from "@/constants/DEFAULT_THEME.js"

export default class Theme {

    constructor( ilse ) {

        this.list     = []
        this.ilse     = ilse

        this.setup()
    }

    setup() {
        // let has_theme = this.ilse.filesystem.file.exists.sync( "style.html" )
            // if( !has_theme ) this.apply_default_theme()
    }

    add({ id, name, css, files }) {

        let theme = {
            id,
            name,
            css,
            files,
        }

        this.list.push( theme )

        return theme

    }

    save( name ) {
        ilse.config.active_theme = name
    }

    apply( note ) {

        let children = note.children
        let css      = `:root { `

        children.map( child => {
            css += ` ${child.content}`
        })
        css += `}`

        this.save( note )

        this.add_style(css, note.id)
    }

    get( id ) {

        let themes = this.list

        for( const _theme of themes ) {
            if( id === _theme.id ) return _theme
        }

        return null

    }

    unrender( name ) {

        let child     = document.getElementById( `css-${name}` )
        let has_child = child && child.remove
            if( has_child ) child.remove()
    }

    render( css, name ) {

        const style         = document.createElement('style')
            style.textContent   = css
            style.id            = `css-${name}`

        document.body.appendChild( style )
        this.list.push({ css, name })
    }

    apply_default_theme() {
        this.render( DEFAULT_THEME, "default" )
    }

}
