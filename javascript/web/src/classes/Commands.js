const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

class Commands {

        // TODO: ask-delete-this-component/tab/container -> this -> focused
        // TODO: Increase component width -> set-component-width -> set-component
    constructor() {
        this.commands = []
        this.setup()
    }

    setup() {
        this.last_save_attempt  = 0
        this.delay              = 20
        this.set_default_commands()

    }

    add({ id, name, description, fn, props = {} }) {

        let command = {
            id: id,
            fn: fn,
            description: description,
            name: name,
            props: props,
        }

        // Check for duplicates
            let id_list = this.commands.map( command => {
                return command.id
            }).filter( e => e )

            let is_duplicated = id_list.indexOf(id) !== -1
            if( is_duplicated ) {
                // dup, don't add
                return null
            }

        this.commands.push( command )

        return command
    }

    get( id ) {

        let commands = this.commands

        for( let command of commands ) {
            if( command.id === id ) return command
        }

        return null

    }

    // USE: let payload = args[0]
    run( id, ...args ) {
        printf( "run -> id -> ", id )

        if( !id ) throw new Error( "Commands.js -> run(<id>) <id> is not defined, it should be a string with the id of the command " )

        let command = this.get( id )

        if( command && command.fn ) {
            command.fn( args )
        }

    }

    get_binded_key( id ) {

        let keys        = ilse.keyboard.keys
        let commands    = this.commands

        for( const key of keys ) {

            for( const bind of key.bindings ) {
                if( bind.command === id ) {
                    return key
                }
            }
        }

        return {}
    }

    set_default_commands() {

        this.commands = [

            {
                id: "void",
                fn: function() { },
                description: "Void",
                name: "Void",
                hidden: true,
            },

            {
                id: "execute-focused-file-content",
                fn: async function() {

                    let file        = focused_component.props.file
                    let content     = await ilse.filesystem.file.get( file )

                    eval( content )

                },
                description: "Will take a .js file and execute its content via eval()",
                name: "Executed javascript",
            },

            {
                id: "toggle-menu",
                fn: async function() {
                    ilse.menu.is_on = !ilse.menu.is_on
                },
                description: "Will toggle the main menu",
                name: "Toggle Menu",
            },

            {
                id: "toggle-command-mode",
                fn: function() {
                    Messager.emit( "keyboard", "set-mode", "Command" )
                },
                description: "Will enter in a 'command mode' where you can compose more complex commands with keystrokes",
                name: "Toggle Command Mode",
            },

            {
                id: "save-focused-component-file",
                fn: function() {

                    printf( "Commands.js -> save-focused-component-file" )

                    printf( "Commands.js -> save-focused-component-file -> focused_component.id -> ", focused_component.id )

                    if( focused_component.id ) {
                        // Messager.emit( "text-editor.vue", "save", { target: focused_component.id } )
                        Messager.emit( "text-editor", "save", { target: focused_component.id } )
                    } else {
                        Messager.emit( "status-line", "set", "ERROR: No focused component, can't save" )
                    }

                },
                description: "Will enter in a 'command mode' where you can compose more complex commands with keystrokes",
                name: "Toggle Command Mode",
            },

            {
                id: "toggle-is-force-layout",
                fn: function() {
                    Messager.emit( "constellation", "toggle-is-force-layout", "" )
                },
                description: "Toggles is Force Layout(pretty network)",
                name: "Toggle is force layout",
            },

            {
                id: "pause-constellation-animation",
                fn: function() {
                    Messager.emit( "constellation", "pause" )
                },
                description: "Will freeze the nodes in the constellation",
                name: "Pause Constallation Animation",
            },

            {
                id: "resume-constellation-animation",
                fn: function() {
                    Messager.emit( "constellation", "resume" )
                },
                description: "Will resume the nodes in the constellation",
                name: "Resume Constallation Animation",
            },

            {
                id: "re-render-ilse",
                fn: function() {
                    Messager.emit( "ilse", "re-render" )
                },
                description: "Will Reload the entire Ilse DOM tree",
                name: "Reload Ilse",
            },

            {
                id: "increase-container-offset",
                fn: function() {

                    if( !container ) throw new Error( "Can't decrease container width since there is no container focused" )
                    Messager.emit( "container", "increase-offset", { target: container.id})

                },
                description: "Will increase the container's offset by 1 and move it to the right",
                name: "Increase container offset",
            },

            {
                id: "decrease-container-offset",
                fn: function() {

                    if( !container ) throw new Error( "Can't decrease container width since there is no container focused" )
                    Messager.emit( "container", "decrease-offset", { target: container.id})

                },
                description: "Will decrease the container's offset by 1 and move it to the ",
                name: "Decrease container offset",
            },

            {
                id: "increase-container-width",
                fn: function() {

                    if( !container ) throw new Error( "Can't increase container width since there is no container focused" )
                    Messager.emit( "container", "increase-width", { target: container.id})

                },
                description: "Will increase the container's width by 1 making it bigger",
                name: "Increase container width",
            },

            {
                id: "decrease-container-width",
                fn: function() {

                    if( !container ) throw new Error( "Can't decrease container width since there is no container focused" )
                    Messager.emit( "container", "decrease-width", { target: container.id})

                },
                description: "Will decrease the container's width by 1 making it bigger",
                name: "Decrease container width",
            },

            {
                id: "ask-delete-focused-container",
                fn: function() {

                    ilse.command_prompt.ask( `Are you sure you want to delete this container?(y/n)`, string => {

                        let answer = string

                        if( answer === 'y' ) {
                        } else if( answer === 'n' ) {
                            return
                        }

                    })


                    // Messager.emit( "command-prompt", "ask-delete-focused-container", "$$container" )
                },
                description: "Will open a command prompt asking if you're sure you want to delete the container",
                name: "Delete focused container",
            },

            {
                id: "save",
                fn: function() {
                    Messager.emit( "ilse", "save" )
                    Messager.emit( "graph", "save" )
                },
                description: "Will save the current tabs, containers, components, config etc",
                name: "Save",
            },

            {
                id: "ask-for-new-component-name",
                fn: function() {


                    if( focused_component ) {

                        ilse.command_prompt.ask( `Rename from [${focused_component.props.file}] to [...]`, string => {
                            let new_name = string
                            Messager.emit("component", "rename", new_name )
                        })

                    }

                    // Messager.emit( "command-prompt", "ask-for-new-component-name", "" )

                },
                description: "Rename component",
                name: "Rename component",
            },

            {
                id: "clean-focused-component",
                fn: function() {
                    Messager.emit( "component", "clean", "" )
                },
                description: "Cleans focused component to nothing",
                name: "Cleans focused component",
            },

            {
                id: "create-note-from-clipboard",
                fn: function() {
                    Messager.emit( "container", "new-note-from-clipboard", "" )
                },
                description: "Use text from clipboard to create a new note",
                name: "Create note from clipboard",
            },

            {
                id: "delete-component",
                fn: function() {
                    Messager.emit( "container", "delete-component", "$$component" )
                },
                description: "Delete focused component",
                name: "Delete component",
            },

            {
                id: "delete-visual-component",
                fn: function() {
                    Messager.emit( "container", "delete-visual-component", "" )
                },
                description: "Takes all the components marked with 'visual' in the focused container and delete them",
                name: "Delete visual component",
            },

            {
                id: "paste-component-from-clipboard",
                fn: function() {
                    Messager.emit( "container", "paste-clipboard", "$$clipboard" )
                },
                description: "Paste component copied inside of the clipboard",
                name: "Paste component from clipboard",
            },

            {
                id: "copy-focused-component-to-clipboard",
                fn: function() {
                    Messager.emit( "clipboard", "set", "$$component" )
                },
                description: "Copy focused component into ilse's clipboard",
                name: "Copy focused component to clipboard",
            },

            {
                id: "open-fullscreen-graph",
                fn: function() {
                    Messager.emit( "graph", "open-fullscreen", "" )
                },
                description: "Open network in fulllscreen",
                name: "Open fullscreen graph",
            },

            {
                id: "add-graph-width-depth",
                fn: function() {
                    Messager.emit( "container", "add-graph-width-depth", 1 )
                },
                description: "Open focused component's network graph",
                name: "Add graph with depth",
            },

            {
                id: "toggle-virtual-component",
                fn: function() {
                    Messager.emit( "config", "toggle-is-virtual" )
                },
                description: "Toggles if 'virtual component' 'virtual outline' is on",
                name: "Toggle virtual component",
            },

            {
                id: "search-files",
                fn: function() {
                    Messager.emit( "command-prompt", "search-files", "" )
                },
                description: "Search for all files in your zettelkasten",
                name: "Search files",
            },

            {
                id: "search-files-on-graph",
                fn: function() {
                    Messager.emit( "command-prompt", "search-files-graph", "" )
                },
                description: "Search for all files in your zettelkasten",
                name: "Search files",
            },

            {
                id: "go-foward-in-type-history",
                fn: function() {
                    Messager.emit( "component", "go-foward-type-history", "" )
                },
                description: "Travels back in time in your component's history",
                name: "Go Foward in type history",
            },

            {
                id: "go-backward-in-type-history",
                fn: function() {
                    Messager.emit( "component", "go-backward-type-history", "" )
                },
                description: "Travels to the future in your component's history",
                name: "Go Backward in type history",
            },

            {
                id: "focus-on-component",
                fn: function() {
                    Messager.emit( "text-editor", "focus", "" )
                },
                description: "Focus on component(Text Editor) and put the cursor there",
                name: "Focus on component",
            },

            {
                id: "ask-file-to-open",
                fn: function() {
                    // Messager.emit( "command-prompt", "ask-for-file-to-open", "" )

                    ilse.command_prompt.ask( `File to open`, string => {
                        let has_extention = string.lastIndexOf( "." ) !== -1
                        if( focused_component ) {

                            if( has_extention ) {
                                focused_component.set_file( string )
                            } else { // default to trying to open a .md file
                                focused_component.set_file( string + ".md" )
                            }
                        }
                    })

                    Messager.emit( "focus-file-links-and-backlinks", "update" )
                },
                description: "Type the name of a file to open it",
                name: "Open file",
            },

            /*
            {
                id: "increase-pointer",
                fn: function() {
                    Messager.emit( "command-prompt", "set-search-result-pointer", 1 )
                    Messager.emit( "~commands", "set-pointer", 1 )
                },
                description: "Go down in search list",
                name: "Increase pointer",
            },

            {
                id: "decrease-pointer",
                fn: function() {
                    Messager.emit( "command-prompt", "set-search-result-pointer", -1 )
                    Messager.emit( "~commands", "set-pointer", -1 )
                },
                description: "Go up in search list",
                name: "Decrease pointer",
            },

            {
                id: "increase-pointer-5",
                fn: function() {
                    Messager.emit( "command-prompt", "set-search-result-pointer", 5 )
                },
                description: "Go down in search list",
                name: "Increase pointer",
            },

            {
                id: "decrease-pointer-5",
                fn: function() {
                    Messager.emit( "command-prompt", "set-search-result-pointer", -5 )
                },
                description: "Go up in search list",
                name: "Decrease pointer",
            },
            */

            {
                id: "focus-on-left-component",
                fn: function() {
                    Messager.emit( "container", "focus-on-left-component", "" )
                },
                description: "Goes to component on the left",
                name: "Focus on left component",
            },

            {
                id: "focus-on-right-component",
                fn: function() {
                    Messager.emit( "container", "focus-on-right-component", "" )
                },
                description: "Goes to component on the right",
                name: "Focus on right component",
            },

            {
                id: "open-component-types-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "component-types"})
                },
                description: "Will open a modal for you to check the component types",
                name: "Open component types modal",
            },

            {
                id: "open-layouts-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "layouts"})
                },
                description: "Will show you a list of installed layouts",
                name: "Open layouts modal",
            },

            {
                id: "open-tags-modal",
                fn: function() {
                    printf( "OPKOKOKOK" )
                    Messager.emit( "modals.vue", "open", {target: "tags"})
                },
                description: "Will open a tags list modal",
                name: "Open tags modal",
            },

            {
                id: "open-links-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "links"})
                },
                description: "Will open a link list modal",
                name: "Open links modal",
            },

            {
                id: "open-templates-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "templates"})
                },
                description: "Will open the modal for controlling templates",
                name: "Open templates modal",
            },

            {
                id: "open-themes-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "themes"})
                },
                description: "Will open the modal for themes + CSS snippets",
                name: "Open Themes Modal",
            },






            {
                id: "rename-focused-tab",
                fn: function() {


                    ilse.command_prompt.ask( `Type the new name for the tab from: [${tab.name}] to [...]`, string => {
                        Messager.emit("tab", "rename", string )
                    })

                },
                description: "Opens up a input so you can type the new tab name",
                name: "Rename tab",
            },

            {
                id: "add-component",
                fn: function() {
                    Messager.emit( "tab", "add-component" )
                },
                description: "Adds a component",
                name: "Add component",
            },

            {
                id: "add-container",
                fn: function() {
                    Messager.emit( "tab", "add-container" )
                },
                description: "Will add a container to the focused tab",
                name: "Add container",
            },

            {
                id: "ask-delete-focused-component",
                fn: function() {
                    Messager.emit( "command-prompt", "ask-delete-focused-component", "$$component" )
                },
                description: "Delete component",
                name: "Delete component",
            },

            {
                id: "ask-delete-focused-tab",
                fn: function() {


                    ilse.command_prompt.ask( `Do you want to delete [${tab.name}]?(y/n)`, string => {
                        if( string.toLowerCase() === 'y' ) Messager.emit("ilse", "delete-tab", tab )
                    })


                    // Messager.emit( "command-prompt", "ask-delete-focused-tab", "$$tab" )
                },
                description: "Delete tab",
                name: "Delete tab",
            },

            {
                id: "ask-delete-tab",
                fn: function( args ) {

                    let payload = args[0]
                    let id      = payload.id

                    let tab         = ilse.get_tab_by_id( id )

                    ilse.command_prompt.ask( `Do you want to delete [${tab.name}]?(y/n)`, string => {
                        if( string.toLowerCase() === 'y' ) Messager.emit("ilse", "delete-tab", tab )
                    })


                    // Messager.emit( "command-prompt", "ask-delete-tab", {id})
                },
                description: "Delete tab",
                name: "Delete tab",
            },
            {
                id: "increase-graph-depth",
                fn: function() {
                    Messager.emit( "graph@vue", "increase-depth", "$$graph" )
                },
                description: "Increase graph depth",
                name: "Increase graph depth",
            },

            {
                id: "increase-component-width",
                fn: function() {
                    Messager.emit( "component", "set-component-width", "increase" )
                },
                description: "Increases component width",
                name: "Increase component width",
            },

            {
                id: "decrease-component-width",
                fn: function() {
                    Messager.emit( "component", "set-component-width", "decrease" )
                },
                description: "Decrease component width",
                name: "Decrease component width",
            },

            {
                id: "focus-on-container-below",
                fn: function() {
                    Messager.emit( "tab", "focus-on-container-below", "" )
                },
                description: "Focus on container below",
                name: "Focus on container below",
            },

            {
                id: "focus-on-container-above",
                fn: function() {
                    Messager.emit( "tab", "focus-on-container-above", "" )
                },
                description: "Focus on container above",
                name: "Focus on container above",
            },

            {
                id: "open-command-prompt",
                fn: function() {
                    Messager.emit( "command-prompt", "is-on", true )
                },
                description: "Open command prompt",
                name: "Open command prompt",
            },

            {
                id: "force-normal-mode",
                fn: function() {
                    Messager.emit( "keyboard", "set-mode", "Normal" )
                },
                description: "Force normal mode",
                name: "Force normal mode",
            },

            {
                id: "force-command-mode",
                fn: function() {
                    Messager.emit( "keyboard", "set-mode", "Command" )
                },
                description: "Force command mode",
                name: "Force command mode",
            },

            {
                id: "open-random-file",
                fn: function() {

                    if( focused_component ) {
                        Messager.emit( "component", "open-random-file", { target: focused_component.id })
                    }
                },
                description: "Open random file",
                name: "Open random file",
            },

            {
                id: "customize-open-random-file",
                fn: function() {

                    printf( "1" )
                    ilse.command_prompt.ask( `Write the new type( files, tags, links ) current: ${ilse.config.random_file_type}`, type => {

                        setTimeout( () => {

                            if( type === "files" ) {

                                ilse.command_prompt.ask( `What term for the file?(e.g .mp4, .mp3, .png, .gif, Neurology, Medicine, Jokes )`, query => {
                                    ilse.config.random_file_type  = type
                                    ilse.config.random_file_query = query
                                    ilse.config.save()
                                })

                            } else if( type === "tags" ) {

                                ilse.command_prompt.ask( `Which tag?( e.g #todo, #daily, #01-12-2025, #work, #translation #goals )`, query => {
                                    ilse.config.random_file_type  = type
                                    ilse.config.random_file_query = query
                                    ilse.config.save()
                                })

                            } else if( type === "links" )  {

                                ilse.command_prompt.ask( `Which Link?( e.g [[PHP]], [[News]], [[Ideas]], [[Wines]], [[Podcast]] )`, query => {
                                    ilse.config.random_file_type  = type
                                    ilse.config.random_file_query = query
                                    ilse.config.save()
                                })
                            }
                        }, 0 )

                    })

                },
                description: "Change the filter for the random file",
                name: "Cuztomize Open Random File",
            },

            {
                id: "toggle-visual-mode",
                fn: function() {
                    Messager.emit( "container", "toggle-visual-mode", "" )
                },
                description: "Toggle visual mode",
                name: "Toggles visual mode",
            },

            {
                id: "re-render-focused-component",
                fn: function() {
                    Messager.emit( "component", "re-render", "" )
                },
                description: "Will Reload the focused component DOM",
                name: "Re render focused component",
            },

            {
                id: "re-scan-links",
                fn: function() {

                    // Focused component file
                        let file        = focused_component.props.file

                    // BUGCATCH:
                        if( !file ) {
                            Messager.emit( "status-line", "set", "Error: Can't scan file: file does not exists" )
                            return
                        }

                    Messager.emit( "status-line", "set", `Scanning links for: ${file}` )
                    Messager.emit( "graph", "set-node", file )
                },
                description: "Will re-scan the links for the focused file",
                name: "ReScan focused file",
            },

            {
                id: "toggle-maximize",
                fn: function() {


                    if( focused_component.is_maximized ) {
                        Messager.emit( "component", "minimize" )
                    } else {
                        Messager.emit( "component", "maximize" )
                    }

                },
                description: "Maximizes the focused component",
                name: "Maximize component",
            },

            {
                id: "maximize-component",
                fn: function() {
                    Messager.emit( "component", "maximize" )
                },
                description: "Maximizes the focused component",
                name: "Maximize component",
            },

            {
                id: "minimize-component",
                fn: function() {
                    Messager.emit( "component", "minimize" )
                },
                description: "Minimize the focused component",
                name: "Minimize component",
            },

            {
                id: "open-daily-note",
                fn: function() {
                    Messager.emit( "component", "open-daily-note" )
                },
                description: "Open toda's not in YYYY-MM-DD format",
                name: "Open faily note",
            },

            {
                id: "open-graph-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "graph"})
                },
                description: "Will open the graph",
                name: "Open graph modal",
            },

            {
                id: "open-graph-config-modal",
                fn: function() {
                    printf( "open-graph-config-modal" )
                    Messager.emit( "modals.vue", "open", {target: "graph-config"})
                },
                description: "Will open graph configuration modal",
                name: "Open graph config modal",
            },

            {
                id: "open-configuration-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "configuration"})
                },
                description: "Will open the modal for configuring things like: plugins, themes etc.",
                name: "Open configuration modal",
            },

            {
                id: "open-help-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "help"})
                },
                description: "Will open the help modal, tutorials, guides etc.",
                name: "Open help modal",
            },

            {
                id: "open-command-pallet-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "command-pallet"})
                },
                description: "Will open the command pallet and show you all of the commands",
                name: "Open command pallet modal",
            },

            {
                id: "open-keys-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "keys"})
                },
                description: "Will open a list of all the available keys",
                name: "Open keys modal",
            },

            {
                id: "open-focused-component-modal",
                fn: function() {
                    // Messager.emit( "modals.vue", "open", {target: "keys"})
                    Messager.emit( "modals", "create", "$$component" )
                },
                description: "Will transform the focused component into a modal and open the modal",
                name: "Open focused component modal",
            },

            {
                id: "open-search-files-modal",
                fn: function() {
                    Messager.emit( "modals.vue", "open", {target: "search-files"})
                },
                description: "Will open a search component for searching files",
                name: "Search files",
            },

            {
                id: "ask-new-tab-name",
                fn: function() {

                    ilse.command_prompt.ask( `Name for the new tab`, string => {

                        let container = ilse.utils.get_default_container()

                        let tab     = {
                            name: string,
                            containers: [ container ]
                        }
                        Messager.emit("ilse", "add-tab", tab )
                    })

                },
                description: "Will open the command prompt and then you type the new name(for tab)",
                name: "Rename tab",
            },

            {
                id: "ask-new-container-name",
                fn: function( args ) {

                    let payload         = args[0]

                    let id              = payload.id
                    let container          = ilse.get_container_by_id( id )
                    let container_name     = container.name

                    ilse.command_prompt.ask( `Rename from [${container_name}] to [...]`, string => {
                        container.name = string
                    })

                },
                description: "Will open the command prompt and then you type the new name(for container)",
                name: "Rename container",
            },


            {
                id: "add-tab",
                fn: function() {
                    Messager.emit( "command-prompt", "ask-new-tab-name" )
                },
                description: "Will open an input for you to type the name of the tab",
                name: "New Tab",
            },

            {
                id: "focus-next-tab",
                fn: function() {
                    Messager.emit( "ilse", "focus-next-tab" )
                },
                description: "Will focus on tab to the right",
                name: "Go to next tab",
            },

            {
                id: "focus-previous-tab",
                fn: function() {
                    Messager.emit( "ilse", "focus-previous-tab" )
                },
                description: "Will focus on tab to the left",
                name: "Go to previous tab",
            },

            {
                id: "add-graph-with-depth",
                fn: function() {

                    printf( "focused_component -> ", focused_component )
                    let index               = focused_container.components.indexOf( focused_component )
                    printf( "index -> ", index )

                    if( index === undefined ) return

                    printf( "ilse.component.props.file -> ", ilse.component.props.file )
                    let component                 = new ilse.classes.Component({
                        type: "graph",
                        props: {
                            file: ilse.component.props.file,
                            graph_id: ilse.component.props.file,
                        },
                    })
                    focused_container.components.splice( ++index, 0, component )

                },
                description: "Will open a graph for the current file",
                name: "View graph for current file",
            },

            {
                id: "ask-delete-focused-component-file",
                fn: function() {

                    let file        = focused_component.props.file

                    if( !file ) {

                        ilse.notification.send({
                            title: "Error",
                            text: "The component has no file",
                            options: {
                                theme: "error"
                            }
                        })

                        throw new Error( "The component has no file" )

                    }

                    ilse.command_prompt.ask( `Are you sure you want to delete the file: ${file} ?(y/n)`, string => {

                        let answer = string

                        if( answer === 'y' ) {

                            Messager.emit( "graph", "move-file-to-trash", {file} )

                            /*

                            if( file && file.indexOf(".trash") === -1 ) {
                                Messager.emit("component", "rename", `.trash/${file}`)
                                Messager.emit( "status-line", "set", `delete: ${file}` )
                                Messager.emit( "component", "clean", "" )
                            }
                            */


                        } else if( answer === 'n' ) {
                            return
                        }

                    })

                    // Messager.emit( "command-prompt", "ask-delete-focused-component-file" )
                },
                description: "Will open a prompt asking if you really want to delete the file",
                name: "Delete focused file",
            },

            {
                id: "ask-new-note-name",
                fn: function() {

                    ilse.command_prompt.ask( `New note title`, string => {
                        Messager.emit("container", "add-new-file", string )
                    })
                    // Messager.emit( "command-prompt", "ask-new-note-name" )


                },
                description: "Will open a prompt asking the title of the new note",
                name: "Ask new note name",
            },

            {
                id: "list-links-by-date",
                fn: function() {
                    printf( "ok it's going " )
                    Messager.emit( "modals.vue", "open", {target: "links", selected_option: "timeline" })
                },
                description: "Will open the modal for links in cronological order",
                name: "list links by date",
            },

            {
                id: "toggle-is-focused-component-collapsed",
                fn: function() {
                    printf( "toggle-is-focused ..." )
                    Messager.emit( "outline.vue", "toggle-collapse")
                },
                description: "Will toggle if the focused component and its children are 'collapsed' ",
                name: "Toggle is focused component collapsed",
            },

            {
                id: "rename-ilse-universe",
                fn: function() {

                    ilse.command_prompt.ask( `Rename from [${ilse.name}] to [...]`, string => {
                        ilse.name = string
                    })

                    // Messager.emit( "command-prompt", "ask-new-ilse-name" )

                },
                description: "Will open a prompt for you to type the name name for ilse",
                name: "Rename ilse universe",
            },

            {
                id: "toggle-zen-mode",
                fn: function() {
                    Messager.emit( "css-snippets", "toggle", 'zen.css' )
                },
                description: "Will hide: <menu>, <plugin-menu>, <status-line> and <tabs> ",
                name: "Toggle Zen Mode",
            },

            {
                id: "toggle-right-sidebar",
                fn: function() {
                    Messager.emit( "right-sidebar", "toggle" )
                },
                description: "Will toggle the right sidebar",
                name: "Toggle Right Sidebar",
            },

            {
                id: "favorite-file",
                fn: function() {

                    let file        = focused_component.props.file

                    if( file ) Messager.emit( "favorites", "add", {
                        file: file,
                        type: 'file'
                    })

                    ilse.notification.send({
                        title: "Favorited",
                        text: `Added to favorites: "${file}"`,
                        options: { theme: "success", time: 4000 },
                    })

                },
                description: "Will put the current file on favorites",
                name: "Favorite file",
            },

            {
                id: "set-current-container-to-andy-matuschak",
                fn: function() {
                    Messager.emit( "container", "set-layout", "andy-matuschak" )
                },
                description: "Will transform the focused colum to a andy-matuschak-layout",
                name: "Set container to 'andy matuschak' layout",
            },

            {
                id: "set-current-container-to-grid-layout",
                fn: function() {
                    Messager.emit( "container", "set-layout", "grid" )
                },
                description: "Will transform the focused colum to a grid-layout",
                name: "Set container to Grid layout",
            },

            {
                id: "set-current-container-to-outline-layout",
                fn: function() {
                    Messager.emit( "container", "set-layout", "outline" )
                },
                description: "Will transform the focused colum to a outline-layout",
                name: "Set container to Outline layout",
            },

            {
                id: "generate-graph",
                fn: function() {
                    Messager.emit( "graph", "generate" )
                },
                description: "Will re-scan your directory's file for links, tags and metadata",
                name: "Generate Graph",
            },

            {
                id: "open-link-picker",
                fn: function() {


                    let files = ilse.graph.files
                    let list  = []

                    let index
                    for( let file of files ) {
                        index++

                        list.push( file )
                        if( index >= 100 ) break
                    }

                    // Messager.emit( "text-editor", "open-link-picker", list )

                    // We do this do we'll insert the [[]] automatically on selecting foo -> [[foo]]
                    let normalized_list = []
                    let normalized_display_text = ""
                    let normalized_text = ""

                    for( const item of list ) {

                        normalized_text         = item.replace( ".md", "" )
                        normalized_display_text = item.replace( ".md", "" )

                        normalized_list.push({
                            displayText: normalized_display_text,
                            text: `[${normalized_text}]`,
                        })

                    }

                    // Messager.emit( "text-editor", "open-link-picker", [ "foo", "bar" ] )
                    printf( "Emitting" )
                    Messager.emit( "text-editor-hint", "open-link-picker", normalized_list )
                    printf( "Emitted" )

                    // Messager.emit( "text-editor", "open-link-picker", [
                        // {
                            // text: "Example",
                            // displayText: "DisplayText",
                            // // hint:
                        // }
                    // ] )

                },
                description: "Will transform the focused colum to a outline-layout",
                name: "Set container to Outline layout",
            },

        ]

    }

}

export default Commands
