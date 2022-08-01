const printf                        = console.log

// Ilse
    import ilse                         from "@/ilse.js"

// Utils
    import Messager                     from "@/classes/Messager.js"

// Libraries
    import hash                          from "object-hash"
    import createGraph                  from 'ngraph.graph'

    // JSON
        import to_json                      from "ngraph.tojson"
        import from_json                    from "ngraph.fromjson"

export default class Graph {

    constructor() {

        this.files          = []
        this.graph          = createGraph() // ngraph graph
        this.setup()
    }

    setup() {
        setTimeout( () => { this.generate() }, 1000 )
    }

    generate() {

        let list = Object.keys( ilse.links.links )

        let index = 0
        for( const file of list ) {
            index++

            this.set_node( file, this.graph, true )
        }

    }

    async set_files() {
        this.files          = await ilse.filesystem.file.get_all.async()
    }

    /*
    // Added files outside of ilse? no problem we scan them here.
    async check_for_new_files() {

        let files       = this.files
        let files_len   = 0

        Messager.emit( "status-line", "set", "Checking for files added outside of ilse ..." )

        for( let file of files ) {

            if( !this.graph.hasNode(file) ) {
                files_len++
                await this.set_node( file, this.graph, false )
            }

        }

        await this.save( this.graph )

        Messager.emit( "status-line", "set", `Checked ${files_len} for new files` )
    }
    */

    // If graph exists load it, if not generate it
    async initialize_graph() {

        let graph = createGraph()

       // Global
            await this.set_files()

        // Performance: Don't re-generate a graph if we already have it
        // TODO: Make saving/loading graph possible
            let json           = await ilse.filesystem.file.read.async( 'graph.json' )

            let has_graph

        if( json ) {
            graph           = this.load( json )
            has_graph       = true
        } else {
            has_graph       = false
        }

        // Has Graph
            if( has_graph ) {

                Messager.emit( "status-line", "set", "Graph Ok" )

                this.graph = graph

                // BUGFIX: sometimes the user will add files outside of ilse, we should scan those too
                    // this.check_for_new_files()

                Messager.emit( "~graph", "loaded", this.graph )

                return
            }

        // No Graph
            if( !has_graph ) {

                // Heavy Operation, generating the graph
                    // await this.generate()

                // Save generated graph to OS-FS
                    let normalized_graph = to_json( this.graph )
                    await ilse.filesystem.file.write.async( "graph.json", normalized_graph )

                // Messaging
                    // Messager.emit( "~graph", "generated" )
                    Messager.emit( "~graph", "loaded", this.graph )
            }

    }

    /*
    // Generate a graph from 0
    async generate() {

        let len = this.files.length

        // Performance: Brenchmark
            console.time('graph-generation');

        let index
        for( const file of this.files ) {
            index++

            // Exceptions:
                    if( file.indexOf(".json") !== -1 ) continue

            // UI: keep the user updated on progress
                ilse.status_line.set_status( `Graph ... ${index} of ${len} (${parseInt((index/len) * 100)}%)` )

            // Main
                await this.set_node( file, this.graph, true )
        }

        // Save
            await this.save( this.graph )

        // Performance: Brenchmark
            console.timeEnd('graph-generation');

        // UI: warn the user the graph has been generated
            ilse.status_line.set_status( "Graph generated" )

        // Emit generated thing
            Messager.emit( "~graph", "generated" )

    }
    */
    // Main Function
    /*
    async set_node( file, graph, is_generating ) {

        let links            = []
        let tags             = []

        let yaml             = {}

        let exists           = ilse.utils.is_file_on_fs( file )
        let content          = await ilse.filesystem.file.get( file )

        let has_content_and_is_markdown = content && file.indexOf(".md") !== -1 && typeof content.indexOf === 'function'

        // Set stuff such as links, tags, yaml etc.
        if( has_content_and_is_markdown ) {

            // Use different functions for when its generating and when its not, this is for performance
                let node_props
                if( is_generating ) {
                    node_props   = this.get_node_props_for_generation( content, file )
                } else {
                    node_props   = this.get_node_props( content, file )
                }

            links            = node_props.links
            tags             = node_props.tags
            yaml             = node_props.yaml
        }

        graph.addNode( file, {
            exists: exists,
            tags: tags,
            yaml: yaml,
        })

        // for every link([[]]) of thie file we'll build that we connect to.
        for( let link of links ) {

            // Sanitize link_name
                link = link.replace("[[", "").replace( "]]", "" )

            // Add link between file + string link
                let normalized_file  = ilse.utils.get_normalized_fs_name( file )

            // Try to resolve what the link extention looks like, normally .md, since it's the only one omitted [[Javascript]] vc [[Javascript.png]] or [[Javascript.mp3]]
                let link_extention      = ilse.utils.get_file_extention( link )

            // ????
                let normalized_link     = link

            // Only add .md, if no extention was found
                if( !link_extention ) {
                    normalized_link = normalized_link + ".md"
                }

            // Don't repeat links:
                if( !graph.hasLink( normalized_file, normalized_link ) ) {
                    graph.addLink( normalized_file, normalized_link )
                }

        }

        if( !is_generating ) Messager.emit( "~graph", "node", graph.getNode(file) )

        return graph
    }
    */

    async set_node( file, graph, is_generating ) {

        let node = graph.addNode( file )
        let links = ilse.links.links[file]

        // for every link([[]]) of thie file we'll build that we connect to.
        for( let link of links ) {

            // Don't repeat links:
            if( !graph.hasLink( link, file ) ) graph.addLink( link, file )
        }

        return graph
    }


    // Get links, tags, yaml from a note's content, then emit so other components can do somethign
    /*
    get_node_props( content, file ) {

        let links = []
        let tags  = []
        let yaml  = {}
        let YAML_TOKEN = ilse.config.yaml_token || "---yaml"

        if( content.indexOf( "[[" ) !== -1 ) {
            links = ilse.utils.extract_tokens_by_delimiters( content, /\[\[.*\/, /\]\]/ )
            Messager.emit( "~graph", "links", { links, file } )
        }

        if( content.indexOf( "#" ) !== -1 ) {
            tags  = ilse.utils.extract_tags( content )

            let has_tag_blocking_scanning = tags.indexOf( "#!scan" ) !== -1
            if( !has_tag_blocking_scanning ) {
                // Have tags
                Messager.emit( "~graph", "tags", { tags, file })
            }

        }

        if( content.indexOf( YAML_TOKEN ) !== -1 ) {
            yaml  = ilse.utils.yaml_parse( content )
        }

        let props = {
            links,
            tags,
            yaml,
        }

        return props

    }
    */

    /*
    get_node_props_for_generation( content, file ) {

        let links = []
        let tags  = []
        let yaml  = {}
        let YAML_TOKEN = ilse.config.yaml_token || "---yaml"

        if( content.indexOf( "[[" ) !== -1 ) {
            links = ilse.utils.extract_tokens_by_delimiters( content, /\[\[.\*\/, /\]\]/ )

            // Have Links
            if( links.length ) {
                Messager.emit( "~graph", "links", { links, file } )
            }
        }

        if( content.indexOf( "#" ) !== -1 ) {
            tags  = ilse.utils.extract_tags( content )

            // Have tags & hasn ot the blocking tag from scannig its tags
            let has_tag_blocking_scanning = tags.indexOf( "#!scan" ) !== -1
            if( tags.length && !has_tag_blocking_scanning ) {
                Messager.emit( "~graph", "tags", { tags, file })
            }
        }

        if( content.indexOf( YAML_TOKEN ) !== -1 ) {
            yaml  = ilse.utils.yaml_parse( content )
        }

        let props = {
            links,
            tags,
            yaml,
        }

        return props
    }
    */

    // ilse.graph.files = [ "Javascript.md", "Markdown.md" ], this will update the file as in ilse.graph.files so the current app can search it.o
    // update_files_file( old_title, new_title ) {
        // let index = this.files.indexOf( old_title )
        // this.files.splice( index, 1, new_title )
    // }

    /*
    async rename( old_title, new_title ) {

        // BUGFIX: sometimes, we want to rename something that we have not yet scanned, thus, we will re-scan them if they don't exist
            if( !this.graph.hasNode( old_title ) ) await this.set_node( old_title, this.graph, false )
            if( !this.graph.hasNode( new_title ) ) await this.set_node( new_title, this.graph, false )


        let new_node    = this.graph.getNode( new_title )
        let old_node    = this.graph.getNode( old_title )

        if( !old_node ) {
            Messager.emit( "status-line", "set", "ERROR: node is not defined, try running :reload-graph" )
            return
        }

        // Make sure the 'is_on_fs' using 'files' is updated to our renamed file
            this.update_files_file( old_title, new_title )

        // Update file name on graph, remove the old one and add an new one
            await this.update_file_on_graph( old_title, new_title )

        // rename on filesystem
            await this.update_file_on_filesystem( old_title, new_title )

        // UI
            // Messager.emit( "status-line", "set", `Renamed ${old_title} to ${new_title}` )

        // Filesystem rename
            await ilse.filesystem.file.rename.async( old_title, new_title )

        this.graph.removeNode( old_title )

    }
    */

    async save( graph ) {

        let json        = to_json( graph )

        try {
            await ilse.filesystem.file.set( "graph.json", json )
            Messager.emit( "status-line", "set", "Saved graph" )
        } catch( e ) {
            throw e
            Messager.emit( "status-line", "set", `Erorr: ${e}` )
        }

    }

    // get_graph_from_json
    load( json ) {

        if( !json ) throw new Error( "Graph.js load(<json>) json is not defined" )

        let graph       = from_json( json )

        return graph
    }

    get_links_and_backlinks( file ) {

        let graph           = this.graph
        let node            = graph.getNode( file )
        let links           = node.links

        let node_links      = []
        let node_backlinks  = []

        for( let link of links ) {

            if( link.fromId === file ) {
                node_links.push( link )
            } else {
                node_backlinks.push( link )
            }
        }

        return {
            links: node_links,
            backlinks: node_backlinks,
        }

    }

    /*
    rename_links( old_title, new_title ) {

        let node            = this.graph.getNode( old_title )
        let links           = node.links
        let renamed_links   = []

        for( let link of links ) {

            if( link.fromId === old_title) {

                renamed_links.push({

                    data: link.data,
                    fromId: new_title,
                    id: `${new_title}👉 ${link.toId}` ,
                    toId: link.toId,
                })

            }

            if( link.toId === old_title ) {

                renamed_links.push({
                    data: link.data,
                    fromId: link.fromId,
                    id: `${link.fromId}👉 ${new_title}` ,
                    toId: new_title,
                })

            }

        }

        return renamed_links

    }
    */

    /*
    // ????
    async update_file_on_graph( old_title, new_title ) {

        // Temp for getting old_node links + data
        let old_node                    = this.graph.getNode(old_title)

        let renamed_links               = this.rename_links( old_title, new_title )

        // New node, to rename we literally destroy the old one
        let new_node    = this.graph.addNode( new_title )
            // new_node.links  = old_node.links
            new_node.links  = renamed_links
            new_node.data   = old_node.data
    }
    */


    /*
    // Update backlinks( notes that links to this file )
    async update_file_on_filesystem( old_title, new_title ) {

        // change backlinks name
        let backlinks            = this.get_links_and_backlinks(old_title).backlinks

        let normalized_old_title = old_title.replace( ".md", "" )
        let normalized_new_title = new_title.replace( ".md", "" )

        let old_link             = "[[" + normalized_old_title + "]]"
        let new_link             = "[[" + normalized_new_title + "]]"

        let index = 0
        for( let backlink of backlinks ) {
            index++

            let content = await ilse.filesystem.file.read.async( backlink.fromId )

            if( !content ) continue

            content = content.replace( old_link, new_link )

            await ilse.filesystem.file.write.async( backlink.fromId, content )
            Messager.emit( "status-line", "set", `Updating: ${index} of ${backlinks.length}` )

        }

        Messager.emit( "status-line", "set", `Updated: ${backlinks.length} links` )

    }
    */

    /*
    async move_file( file, location ) {

        // Update it on ilse.graph.graph
            this.graph.removeNode( file )
        // Save changes
            await this.save( this.graph )

        // Update ilse.graph.files
            this.update_files_file( file, `${location}/${file}` )

        // Update on Filesystem
            ilse.filesystem.file.rename.async( file, `${location}/${file}` )
    }
    */

    // move_file_to_trash( file ) {
        // this.move_file( file, `.trash` )
    // }

    listen() {

        // Messager.on( "~links", async ( action, payload ) => {

            // if( action === 'new' ) {
                // this.set_node( payload.link )
            // }
        // })

        // Messager.on( "~filesystem", async ( action, payload ) => {

            // if( action === 'loaded' ) {
                // this.initialize_graph()
            // }

        // })

        Messager.on( "graph", async ( action, payload ) => {

            if( action === 'rename-node' ) {

                // let old_title = payload.old_title
                // let new_title = payload.new_title
                // this.rename( old_title, new_title )
            } else if( action === 'set-node' ) {

                // this.set_node( payload, this.graph, false )

                // // Add new file/node to ilse.graph.files
                    // let index            = this.files.indexOf( payload )
                    // let has_file_already = index !== -1
                    // if( !has_file_already ) { this.files.push( payload ) }

            } else if( action === 'save' ) {
                // await this.save( this.graph )
                // Messager.emit( "status-line", "set", "Saved Graph" )
            } else if( action === 'move-file-to-trash' ) {
                // let file = payload.file
                // this.move_file_to_trash( file )
            }

        })

    }

}
