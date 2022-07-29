const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

let DEFAULT_THEMES = [
    {
        css: `:root, .ilse[data-theme='light'] {
        --background-color: #E9E9E9;
        --background-color: #EFEFEF;
        --text-color: #717171;
        --border: 1px solid #4a4a4a;
        --border-radius: 6px;
        --padding: 4px;
        --font-family: Mary, Helvetica, Georgia, Times New Roman, serif;
        --link-color: #428bca;
        --link-color: #5ec7b8;
        }`,
        id: "light",
    },
    {
        css: `.ilse[data-theme="dark"] {

            --background-color: #131313ff;
            --text-color: #F8F8F8;
            --border: 2px solid #777;
            --border-radius: 6px;
            --padding: 4px;
            --box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            --link-color: #428bca;
            --link-color: #5ec7b8;
        }`,
        id: "dark",

    }
]
export default class Theme {

    constructor( ilse ) {

        this.themes   = []
        this.active   = {}
        this.snippets = []

        this.listen()
        setTimeout( () => {
            this.setup( ilse )
        }, 100 )
    }

    apply_default_theme() {

        ilse.config.active_theme = ""
        DEFAULT_THEMES.map( theme => {
            this.add_style( theme.css, theme.id )
        })
    }

    setup( ilse ) {

        if( ilse.config.active_theme ) {
            let note = ilse.notes.query( `${ilse.config.active_theme}:` )[0]
            this.apply( note )
            return
        } else {
            this.apply_default_theme()
        }

    }

    add({ id, name, css, files }) {

        let theme = {
            id,
            name,
            css,
            files,
        }

        this.themes.push( theme )

        return theme

    }

    save( note ) {
        ilse.config.active_theme = note.id
    }

    clean() {
        document.querySelectorAll('.theme').forEach(e => e.remove());
    }

    apply( note ) {

        let children = note.children
        let css      = `:root { `

        children.map( child => {
            css += ` ${child.content}`
        })
        css += `}`

        this.save( note )

        this.clean()

        this.add_style(css, note.id)
    }

    add_style( css, id ) {

        const style         = document.createElement( 'style' )
            style.textContent   = css
            style.id            = `css-${id}`
            style.className     = `theme`

        document.getElementsByTagName('head')[0].appendChild( style )
        ilse.config.save()
    }

    get( id ) {

        let themes = this.themes

        for( const _theme of themes ) {
            if( id === _theme.id ) return _theme
        }

        return null

    }

    un_render( note  ) {

        // === Remove from style === //
        let child     = document.getElementById( `css-${note.id}` )
        let has_child = child && child.remove
            if( has_child ) child.remove()
        // === Remove from style === //


        // == Remove from snippets == //
        let has_found
        let index = 0
        for( const snippet of this.snippets ) {
            index++

            has_found   = snippet.note.id === note.id
            if( has_found ) this.snippets.splice( index, 1 )
        }
        // == Remove from snippets == //

    }

    render( css, note ) {

        // == Add to body == //
        const style         = document.createElement('style')
            style.textContent   = css
            style.id            = `css-${note.id}`

        document.body.appendChild( style )
        // == Add to body == //


        // == Add to snippets == //
        this.snippets.push({ css, note })
        // == Add to snippets == //
    }

    // give note, it'll extract the ```css ```
    get_css_from_note( note ) {

        // BUGFIX:
            if( !note ) return ""

        let content     = note.content
        let chunks      = content.split( "```" )

        let css         = chunks[1].replace( "css", "" )

        return css
    }

    check_has_snippet_changed( note ) {

        let has_changed_note_with_rendered_snippet

        let index = 0
        for( const snippet of this.snippets ) {
            index++

            has_changed_note_with_rendered_snippet = snippet.note.id === note.id

            if( !has_changed_note_with_rendered_snippet )  continue

            // Delete old
                this.snippets.splice( index, 1 )

            // Un Render
                // let child       = document.getElementById( `css-${note.id}`)
                // let css         = child.innerText
            this.un_render( note )

            // Get new CSS
            let new_css = this.get_css_from_note( note )

            // Render
                this.render( new_css, note )
        }

    }

    listen() {

        Messager.on( "~note.vue", ( action, payload ) => {

            if( action === "blur" ) {
                // this.check_has_snippet_changed( payload.note )
            }

        })

        Messager.on( "~tags", ( action, payload ) => {

            if( action === "new" ) {

                let note  = payload.note
                let css     = this.get_css_from_note( note )

                this.render( css, note )
            }

        })

    }

}
