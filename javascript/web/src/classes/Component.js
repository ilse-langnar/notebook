const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Used for components, can be: text-editor, image, video, embed, iframe, custom, mind-map etc.
export default class Component {

    constructor( component ) {

        if( !component ) component = {}
        printf( "Component.js -> component.component -> ", component.component )

        this.id                   = component.id                        || Math.random().toString().replace( "0.", "" )
        this.name                 = component.name                      || "name" + Math.random().toString().replace( "0.", "" )
        this.description          = component.description               || ""
        this.img                  = component.img                       || ilse.irequire.img("menu.svg")
        this.type                 = component.type                      || "empty"
        this.component            = component.component                 || "empty"
        this.width                = component.width                     || 0
        this.is_on                = component.is_on                     || true
        this.props                = component.props                     || {}

        ilse.types.add({
            id: this.id,
            name: this.name,
            description: this.description,
            img: this.img,
            type: this.type,
            component: this.component,
            props: this.props,
        })

        this.setup()
    }

    setup() {
        Messager.emit( "~component", "created", this )
    }

    // <---------------------> component Type <--------------------->  //
    get_component() {

        let id              = this.id
        let type            = this.type

        let is_vue          = this.type === "vue"
        let is_html         = this.type === "html"
        let is_embed        = this.type === "embed"

        if( is_vue ) {
            return this.component.default
            /*
            let is_component_ok = type && type.component && type.component.default
            if( is_component_ok ) {
                return this.component.default
            } else {
                throw new Error( `Could not find type: ${id}, it seems that it does not exists!!` )
            }
            */
        } else if( is_html ) {
            return this.component
        } else if( is_embed ) {
            return this.component
        }

    }
    // <---------------------> component Type <--------------------->  //

}
