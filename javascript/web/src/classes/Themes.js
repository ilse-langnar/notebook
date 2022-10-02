const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Constants
    import DEFAULT_THEME                     from "@/classes/DEFAULT_THEME.js"

/*
let DEFAULT_THEMES = [
    {
        css: `:root, .ilse[data-theme='light'] {
        --background-color: #EFEFEF;
        --secondary-background-color: #CED8E0;
        --secondary-text-color: #3c3b3b;
        --terciary-text-color: #8D9EAC;
        --text-color: #717171;
        --border: 1px solid #4a4a4a;
        --border-radius: 6px;
        --padding: 4px;
        --font-family: Mary, Helvetica, Georgia, Times New Roman, serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        --font-size: 1em;
        --link-color: #428bca;
        --link-color: #5ec7b8;
        --secondary-link-color: #70a7a8;
        --img-hover-invert: invert(100%);
        }`,
        id: "light",
    },
    {
        css: `.ilse[data-theme="dark"] {

            --background-color: #131313ff;
            --text-color: #F8F8F8;
            --secondary-background-color: #DCEAF8;
            --secondary-text-color: #000;
            --terciary-text-color: #8D9EAC;
            --border: 2px solid #777;
            --border-radius: 6px;
            --padding: 4px;
            --font-family: Mary, Helvetica, Georgia, Times New Roman, serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            --font-size: 1em;
            --box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            --link-color: #428bca;
            --link-color: #5ec7b8;
            --secondary-link-color: #99c6c2;
            --img-hover-invert: invert(100%);
        }`,
        id: "dark",

    }
]
*/

export default class Theme {

    constructor( ilse ) {

        this.themes   = []
        // this.active   = {}


        this.listen()
        // setTimeout( () => { this.setup( ilse ) }, 100 )
    }

    /*
    apply_default_theme() {

        ilse.config.active_theme = ""
        DEFAULT_THEMES.map( theme => {
            this.add_style( theme.css, theme.id )
        })
    }
    */

    /*
    setup( ilse ) {

        if( ilse.config.active_theme ) {
            let note = ilse.notes.query( `${ilse.config.active_theme}:` )[0]
            this.apply( note )
            return
        } else {
            this.apply_default_theme()
        }

    }
    */

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

    save( name ) {
        ilse.config.active_theme = name
    }

    /*
    clean() {
        document.querySelectorAll('.theme').forEach(e => e.remove());
    }
    */

    apply( note ) {

        let children = note.children
        let css      = `:root { `

        children.map( child => {
            css += ` ${child.content}`
        })
        css += `}`

        this.save( note )

        // this.clean()

        this.add_style(css, note.id)
    }

    /*
    add_style( css, id ) {

        const style         = document.createElement( 'style' )
            style.textContent   = css
            style.id            = `css-${id}`
            style.className     = `theme`

        document.getElementsByTagName('head')[0].appendChild( style )

        ilse.config.save()
    }
    */

    get( id ) {

        let themes = this.themes

        for( const _theme of themes ) {
            if( id === _theme.id ) return _theme
        }

        return null

    }

    /*
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
    */

    unrender( name ) {

        let child     = document.getElementById( `css-${name}` )
        let has_child = child && child.remove
            if( has_child ) child.remove()
    }

    render( css, name ) {

        // == Add to body == //
        const style         = document.createElement('style')
            style.textContent   = css
            style.id            = `css-${name}`

        document.body.appendChild( style )
        this.themes.push({ css, name })
    }

    /*
    // give note, it'll extract the ```css ```
    get_css_from_note( note ) {

        // BUGFIX:
            if( !note ) return ""

        // let content     = note.content
        /// let chunks      = content.split( "```" )
        // let css         = chunks[1].replace( "css", "" )

        return note.tagless
    }
    */

    /*
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
    */


    listen() {

        printf( "Themes.js -> listen -> " )
        Messager.on( "~plugin-manager", payload => {

            printf( "Themes.js -> listen -> payload -> ", payload  )

            if( payload.action === "loaded" ) {
                printf( "Themes.js -> listen -> payload -> @@@@!!! ", payload  )
                let has_loaded_any_style = !!this.themes.length
                printf( "this.themes.length -> ", this.themes.length )
                printf( "has_loaded_any_style -> ", has_loaded_any_style )
                if( !has_loaded_any_style ) {
                    this.render( DEFAULT_THEME, "default" )
                }
            }

        })
    }

    /*
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
    */

}
