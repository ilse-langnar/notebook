const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"

// Used for components, can be: text-editor, image, video, embed, iframe, custom, mind-map etc.
export default class Component {

    constructor( component ) {

        if( !component ) component = {}

        this.id                   = component.id                        || Math.random().toString().replace( "0.", "" )
        this.width                = component.width                     || 0
        this.is_on                = component.is_on                     || true
        this.type                 = component.type                      || "empty"
        this.props                = component.props                     || {}

        this.setup()
    }

    setup() {
        Messager.emit( "~component", "created", this )
    }

    // <---------------------> component Type <--------------------->  //
    get_component() {

        let id              = this.type
        let type            = ilse.types.get( id )

        let is_component_ok = type && type.component && type.component.default
        if( is_component_ok ) {
            return type.component.default
        } else {
            throw new Error( `Could not find type: ${id}, it seems that it does not exists!!` )
        }
    }
    // <---------------------> component Type <--------------------->  //

}
