const printf = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

// Libraries
    import axios                        from "axios"

// Internal
    import TextEditor                   from "@/classes/TextEditor.js"

// Components
    import TextEditorComponent          from "@/components/TextEditor/TextEditor.vue"

// const importFrom                       = require('import-from')

const PLUGIN_STATISTICS = {}

class PluginAPIFactory {

    constructor( plugin_name ) {

        // If we try to initialize this method without a plugin_name, then we'll return a dumb class, this is for security, so people in the console don't have access to the last plugin permissions
        if( !plugin_name ) return class {  constructor() {} }

        return class PluginAPI {

            constructor( ) {
                    this.name = plugin_name

                // Messager
                    this.Messager                   = Messager

                // Internals
                    this.filesystem                 = ilse.filesystem
                    this.graph                      = ilse.graph
                    this.tags                       = ilse.tags.tags
                    this.notification               = ilse.notification
                    this.links                      = ilse.links.links
                    this.TextEditor                 = TextEditor


                // Components
                    this.components                 = {
                        TextEditor    : TextEditorComponent,
                        // component           : component,
                    }

                // Classes
                    this.classes                    = {
                        component: ilse.classes.Component,
                    }

                // Focused
                this.focused                        = {
                    component: ilse.component,
                    container: ilse.container,
                }

                // Vars
                    this.backend_url                = ilse.backend_url
                    this.plugin_name                = plugin_name
                    this.component                        = ilse.component

                // Libraries
                    this.axios                      = axios

                // Utils
                    this.utils                      = ilse.utils

                    this.focus_on_component               = ilse.focus_on_component
                    // this.add_component_to_focused_container  = ilse.add_component_to_focused_container
                this.require = require
                // this.import = importFrom

                this.listen()

            }

            listen() {

            }

            get_focused_component() {
            }

            add_plugin_telemetry( key, value ) {
                PLUGIN_STATISTICS[key] = value
            }

            get_plugin_statistics() {
                return PLUGIN_STATISTICS
            }

            async save_plugin_telemetry() {
                let normalized_statistics = JSON.stringify(PLUGIN_STATISTICS)
                await this.filesystem.file.set( `.ilse/plugins/${this.plugin_name}/statistics.json`, normalized_statistics, { query_param: true })
            }

            // FUTURE: Warn the user that this plugin access the filesystem
            get_filesystem() {
                return this.filesystem
            }

            test() {

            }

            /*
            add_layout( id, img, description, command, has_space = false ) {
                ilse.menu.add_plugin( id, img, description, command, has_space )
            }

            add_template( id, img, description, command, has_space = false ) {
                ilse.menu.add_plugin( id, img, description, command, has_space )
            }

            add_widget( id, img, description, command, has_space = false ) {
                ilse.menu.add_plugin( id, img, description, command, has_space )
            }
            */


            set_mode( mode ) {
                ilse.keyboard.set_mode( mode )
            }

            add_popover({ id, name, width, component_type, activation_event }) {
                ilse.popovers.add({ id, name, width, component_type, activation_event })
            }

            add_plugin_menu_item({ id, name, img, description, command, has_space = false, popover }) {
                // this.add_plugin_telemetry( "menu_items", arguments )
                ilse.plugin_menu.add({ id, name, img, description, command, has_space, popover })
            }

            add_command({ id, name, description, fn, props }) {
                this.add_plugin_telemetry( "commands", arguments )
                if( !props ) props = { source: this.name }
                ilse.commands.add({ id, name, description, fn, props })
            }

            open_modal( id ) {
                Messager.emit( "modals.vue", "open", id )
            }

            close_modal( id ) {
                Messager.emit( "modals.vue", "close" )
            }

            run_command( id, args ) {
                ilse.commands.run( id, args )
            }

            add_modal({ id, name, component, props }) {

                this.add_plugin_telemetry( "modals", arguments )

                let new_modal =  {
                    id,
                    name,
                    component,
                    props,
                }

                ilse.modals.add( new_modal )

                return new_modal
            }

            add_key({ combo, mode, view, command, prevent_default }) {
                this.add_plugin_telemetry( "keys", arguments )
                ilse.keyboard.add({ combo, mode, view, command, prevent_default })
            }

            remove_key( combo ) {
                ilse.keyboard.unbind_key( combo )
            }

            add_component({ id, name, type, component, props }) {

                this.add_plugin_telemetry( "components", arguments )

                // BUGFIX: so we can render this component with the props -> plugin
                    props.plugin = this.plugin_name

                // props.api = new PluginAPI( name )

                let new_component = {
                    id,
                    name,
                    type,
                    component,
                    props
                }

                ilse.types.add( new_component )

                return new_component
            }

            async save( json, pretty = false ) {

                if( typeof json === "object" )  {

                    let normalized_data = pretty === true ? JSON.stringify( json, null, 4 ) : JSON.stringify( json )
                    let data            = await this.filesystem.file.set( `.ilse/plugins/${this.plugin_name}/data.json`, normalized_data )

                    return data

                } else {
                    throw new Error( "save(<json>): <json> needs to be of type 'object' " )
                }

            }

            // loads data.json from your plugin
            async load() {
                let data = await this.filesystem.file.get( `.ilse/plugins/${this.plugin_name}/data.json`)
                return data
            }

            async save_configuration( json, pretty = false ) {

                if( typeof json === "object" )  {

                    let normalized_data = pretty === true ? JSON.stringify( json, null, 4 ) : JSON.stringify( json )
                    let data            = await this.filesystem.file.set( `.ilse/plugins/${this.plugin_name}/configuration.json`, normalized_data )

                    return data

                } else {
                    throw new Error( "save(<json>): <json> needs to be of type 'object' " )
                }

            }

            // loads configuration.json from your plugin
            async load_configuration() {
                let data = await this.filesystem.file.get( `.ilse/plugins/${this.plugin_name}/configuration.json`)
                return data
            }

        }

    }

}
export default PluginAPIFactory
