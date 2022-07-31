const printf = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

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


                // Classes
                    this.classes                    = {
                        component:  ilse.classes.Component,
                        Note:       ilse.classes.Note,
                    }

                // Vars
                    this.plugin_name                = plugin_name

                // Utils
                    this.utils                      = ilse.utils

                this.require = require
                this.listen()
            }

            listen() {

            }

            add_plugin_telemetry( key, value ) {
                PLUGIN_STATISTICS[key] = value
                printf( "PLUGIN_STATISTICS -> ", PLUGIN_STATISTICS )
            }

            get_plugin_statistics() {
                return PLUGIN_STATISTICS
            }

            async save_plugin_telemetry() {
                let normalized_statistics = JSON.stringify(PLUGIN_STATISTICS)
                await this.filesystem.file.write.async( `plugins/${this.plugin_name}/statistics.json`, normalized_statistics, { query_param: true })
            }

            // FUTURE: Warn the user that this plugin access the filesystem
            get_filesystem() {
                return this.filesystem
            }

            add_command({ id, name, description, fn, props }) {
                // this.add_plugin_telemetry( "commands", arguments )
                if( !props ) props = { source: this.name }
                ilse.commands.add({ id, name, description, fn, props })
            }

            open_modal( id ) {
                ilse.modals.open( id )
            }

            close_modal( id ) {
                ilse.modals.close( id )
            }

            run_command( id, args ) {
                ilse.commands.run( id, args )
            }

            add_modal({ id, name, component, props }) {

                /*
                this.add_plugin_telemetry( "modals", arguments )

                let new_modal =  {
                    id,
                    name,
                    component,
                    props,
                }

                ilse.modals.add( new_modal )

                return new_modal
                */
            }

            add_key({ combo, mode, view, command, prevent_default }) {
                this.add_plugin_telemetry( "keys", arguments )
                ilse.keyboard.add({ combo, mode, view, command, prevent_default })
            }

            remove_key( combo ) {
                ilse.keyboard.unbind_key( combo )
            }

            add_type({ id, name, description, img, type, component, props }) {

                props.plugin = "LLLL"

                printf( "ilse -> ", ilse )
                let is_pure_svg = img.indexOf( "<svg" ) !== -1
                if( is_pure_svg ) {
                    var svg = new Blob([img], { type: "image/svg+xml;charset=utf-8" })
                    var url = URL.createObjectURL( svg )
                    img     = url
                }

                ilse.types.add({
                    id: id,
                    name: name,
                    description: description,
                    img: img,
                    type: type,
                    component: component,
                    props: props,
                })
                printf( "props -> ", props )

                return id
            }

            async save( json, pretty = false ) {

                if( typeof json === "object" )  {

                    let normalized_data = pretty === true ? JSON.stringify( json, null, 4 ) : JSON.stringify( json )
                    let data            = await this.filesystem.file.write.async( `plugins/${this.plugin_name}/data.json`, normalized_data )

                    return data

                } else {
                    throw new Error( "save(<json>): <json> needs to be of type 'object' " )
                }

            }

            // loads data.json from your plugin
            async load() {
                let data = await this.filesystem.file.read.async( `plugins/${this.plugin_name}/data.json`)
                return data
            }

            async save_configuration( json, pretty = false ) {

                if( typeof json === "object" )  {

                    let normalized_data = pretty === true ? JSON.stringify( json, null, 4 ) : JSON.stringify( json )
                    let data            = await this.filesystem.file.write.async( `plugins/${this.plugin_name}/configuration.json`, normalized_data )

                    return data

                } else {
                    throw new Error( "save(<json>): <json> needs to be of type 'object' " )
                }

            }

            // loads configuration.json from your plugin
            async load_configuration() {
                let data = await this.filesystem.file.read.async( `plugins/${this.plugin_name}/configuration.json`)
                return data
            }

        }

    }

}
export default PluginAPIFactory
