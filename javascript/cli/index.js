const printf        = console.log

const envPaths      = require('./env-paths.js')
const fs            = require('fs')
const env_paths     = envPaths('ilse', { suffix: "" })
const inquirer      = require("inquirer")

const to_json       = require("ngraph.tojson")
const from_json     = require("ngraph.fromjson")
const createGraph   = require('ngraph.graph')


class Ilse {

    constructor() {

        this.commands           = process.argv.splice(2)
        this.command            = this.commands[0]
        this.payload            = this.commands[1]
        this.target_directory   = null
        this.graph              = {}

        this.setup()
        printf( "this.commands -> ", this.commands )
        printf( "command -> ", this.command )
        printf( "this.payload -> ", this.payload )

        if( this.command ) {
            this.run( this.command, this.payload )

        }

    }

    prompt( question, fn ) {

         // Prompt user to input data in console.
         printf( question )

        function readable( data ) {
            printf( "readable -> @data -> ", data )
            fn( data )
            process.stdin.off( 'readable', fn )
        }

        // When user input data and click enter key.
        process.stdin.on( 'readable', fn )
    }

    async setup() {

        let has_config_dir_already = fs.existsSync( env_paths.config ) && fs.existsSync( `${env_paths.config}/target.json` )

        if( !has_config_dir_already ) {

            let config = {
                target_directory: "",
            }

            inquirer
                .prompt([
                    {
                        name: 'target',
                        message: 'Type the path for your ilse universe:'
                    },
                ])
                .then(answers => {

                    config.target_directory = answers.target

                    fs.mkdirSync( `${env_paths.config}/`)
                    fs.writeFileSync( `${env_paths.config}/target.json` , JSON.stringify( config ) )


                    let target              = fs.readFileSync( `${env_paths.config}/target.json`, "utf8" )
                    let normalized_target   = JSON.parse( target )
                        this.target_directory   = `/${normalized_target.target_directory}`

                })

        } else if( has_config_dir_already ){

            let target              = fs.readFileSync( `${env_paths.config}/target.json`, "utf8" )
            let normalized_target   = JSON.parse( target )

                this.target_directory   = `${normalized_target.target_directory}`
        }

        let file            = fs.readFileSync( `${this.target_directory}/.ilse/graph.json`, "utf8")
            this.graph = from_json( file )

    }

    run( command, payload ) {

        if( command === 'add' || command === 'ad' || command === 'a' || ( command && !payload )/*ilse NoteHere.md*/ ) {
            if( payload ) {
                return this.add( payload )
            } else {
                return this.add( command )
            }
        }

        if( command === 'link' || command === 'lin' || command === 'l' || (command[0] === '[' && command[1] === '[') ) {

            if( payload ) {
                return this.show_link( payload )
            } else {

                let normalized_link = command.replace( "[[", "" ).replace( "]]", "" )
                    normalized_link += ".md"

                return this.show_link( normalized_link )
            }

        }

        if( command === 'tags' || command === 'tag' || command === 't' ) {
            return this.show_tags( payload )
        }

        if( command === 'journal' || command === 'jrl' || command === 'j' ) {
            return this.show_journal( payload )
        }

    }

    show_link( payload ) {
        printf( "this.graph.getNode( payload ) -> ", this.graph.getNode( payload ) )
    }

    show_tags( payload ) {
        let node        = this.graph.getNode( payload )
        printf( node.data.tags )
    }

    show_journal() {

        let today_date  = get_daily_note_format()

        let file
        try {
            file        = fs.readFileSync( `${this.target_directory}/${today_date}.md`, "utf8" )
            printf( file )
        } catch( e ) {
            printf( `Creating journal for: ${today_date} ...` )
            fs.writeFileSync( `${this.target_directory}/${today_date}.md`, today_date )
            file        = fs.readFileSync( `${this.target_directory}/${today_date}.md`, "utf8" )
            printf( file )
        }
    }

    add( payload ) {

        let lines = []
        process.stdin.on('readable', () => {

            let chunk
            let data
            let is_done

            // Use a loop to make sure we read all available data.
            while( (chunk    = process.stdin.read() ) !== null ) {

                data         = chunk.toString().trim()
                is_done      = data && data.trim() === '.done' || data.trim() === '.d'
                lines.push( data )

                if( is_done ) {

                    let file                = lines.join( "\n" ).replace(".done", "")

                    let has_file_already    = fs.existsSync( `${this.target_directory}/${payload}` )
                    if( !has_file_already ) {
                        fs.writeFileSync( `${this.target_directory}/${payload}`, file )
                        printf( `${payload} Created!!` )
                    } else {

                    }

                    process.exit()

                }
            }
        })

    }

}


function get_daily_note_format() {

    const today = new Date()
    let month   = today.toLocaleString('default', { month: 'long'  })
    let day     = today.getDate()
    let year    = today.getFullYear()
    let format  = `${month} ${day}th, ${year}`

    return format
}

new Ilse()
