const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

export default class Theme {

    constructor( ilse ) {

        this.themes   = []
        this.active   = {}
        this.snippets = []

        this.listen()
    }

    /*
    async load() {

        let themes    = await ilse.filesystem.dir.list( ".ilse/themes" )

        if( !themes ) {
            themes    = []
        }

        let theme_css
        let files     = []

        for( const theme of themes ) {

            theme_css = await ilse.filesystem.file.get( `.ilse/themes/${theme}/style.css` )
            files     = await ilse.filesystem.dir.list( `.ilse/themes/${theme}/` )

            this.add({
                id: theme,
                name: theme,
                css:  theme_css,
                files: files,
            })

        }

        // this.after_load()

    }

    async after_load() {

        // let data            = await ilse.data.persistence.init( "active-theme", { active: "" } )
        let data            = await ilse.data.persistence.get( "active-theme" )
            if( !data ) data = { active: "" }

        let active_theme_id = data.active

        if( active_theme_id ) {
            let theme       = this.get( active_theme_id )
            this.select( theme )
        } else {
            let theme       = this.get( "main" )
            this.select( theme )
        }

    }
    */

    // <--------------> Rendering Effects / Appplying <--------------> //
    /*
    render( theme ) {

        const style         = document.createElement('style')
            style.textContent   = theme.css
            style.id            = theme.id

        document.body.appendChild( style )
    }

    un_render( theme ) {

        let child  = document.getElementById( theme.id )

        if( child ) {
            child.remove()
            return true
        } else {
            return false
        }

    }
    */
    // <--------------> Rendering Effects / Appplying <--------------> //

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

    /*
    deactivate_current_theme() {

        let active          = this.active
        let active_theme    = this.get( active )

        if( active_theme ) {
            try {
                this.un_render( active_theme )
            } catch ( e ) {

            }
        }
    }
    */

    // async save() {
        // await ilse.data.persistence.set( "active-theme", { active: this.active } )
    // }

    /*
    select( theme ) {

        this.deactivate_current_theme()

        // this.build( theme )

        this.active = theme.id

        this.render( theme )
        // this.save()
    }
    */

    /*
    async build( theme ) {

        let files       = await ilse.filesystem.dir.list( `.ilse/themes/${theme.name}/` )
        // Make sure variables.css ligth.css and dark.css are always first, otherwise things like variables won't be defined properly
        let sorted_files= files.sort( (one,two) => {

            if( one === 'variables.css' || one === 'light.css' || one === 'dark.css' ) {
                return -1
            } else {
                return 1
            }
        })

        let style_css   = ""
        let content     = ""

        let extention
        let is_css

        for( const file of sorted_files ) {

            if( file === "style.css" ) continue

            extention       = file.substr(file.lastIndexOf("."), file.length )
            is_css          = extention === '.css'

            if( is_css )  {
                content = await ilse.filesystem.file.get( `.ilse/themes/${theme.name}/${file}` )
                style_css += content
            }

        }

        await ilse.filesystem.file.set( `.ilse/themes/${theme.name}/style.css`, style_css )

        return style_css

    }
    */

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
        printf( "child -> ", child )
        printf( "note -> ", note )
        let has_child = child && child.remove
            if( has_child ) child.remove()
        // === Remove from style === //


        // == Remove from snippets == //
        let has_found
        let index = 0
        for( const snippet of this.snippets ) {
            index++

            printf( "snippet -> ", snippet )
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
                this.check_has_snippet_changed( payload.note )
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
