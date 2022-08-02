const printf        = console.log

printf( "1" )
// Libs
printf( "2" )
    const envPaths      = require('./libs/env-paths.js')
printf( "3" )
    const get_date_id   = require('./libs/get-date-id.js')

printf( "4" )
const fs            = require('fs')
printf( "5" )
const path          = require('path')
printf( "6" )
const env_paths     = envPaths('ilse', { suffix: "" })
printf( "7" )
// const inquirer      = require("inquirer")

// const to_json       = require("ngraph.tojson")
// const from_json     = require("ngraph.fromjson")
// const createGraph   = require('ngraph.graph')
const readline = require("readline");
printf( "8" )

var term  = require( 'terminal-kit'  ).terminal;
printf( "9" )
// let stdin = process.stdin;

// Quine
let target_directories
printf( "10" )
    target_directories="/home/viktor/Downloads/zettel/"

printf( "11" )
var blessed     = require('blessed')
printf( "12" )
let contrib = require('blessed-contrib')
printf( "13" )

class Ilse {

    constructor() {

        this.commands           = process.argv.splice(2)
        this.command            = this.commands[0]
        this.payload            = this.commands[1]
        this.target_directory   = null

        let has_command         = this.commands.length

        this.setup()

        if( has_command ) {
            this.run( this.command, this.payload )
        } else {
            this.print_options()
        }
    }

    listen() {

        // stdin.on( "data", chunk => {
            // let id = get_date_id()
            // printf( `${id}: ${chunk}` )
        // })

    }

    print_options() {

        // First Brain = memory
        // Read
        // Remove
        // query
        // tags
        /*
        console.table({
            "ilse":"Show this options",
                "ilse help":"Show Help OPtions",
                "ilse ui":"Enter TUI mode",
                "ilse (f)irst":"Show options for first brain",
                    "ilse (f)irst (n)ext":"Get next item",
                    "ilse (f)irst (r)emove":"Remove argument",
                    "ilse (f)irst (q)uery":"Query argument",
                    "ilse (f)irst (t)ags":"List all tags",
                "ilse (s)econd":"Show Options for second brain",
                    "ilse (s)econd (r)emove":"Show Options for second brain",
                    "ilse (s)econd (q)uery":"Show Options for second brain",
                    "ilse (s)econd (t)ags":"Show Options for second brain",
                    "ilse (s)econd (l)inks":"Show Options for second brain",
                    "ilse (s)econd (a)dd":"Show Options for second brain",
        })
        */

    }

    get_target_directory() {
        return target_directories.split("|")[0]
    }

    prompt( question, fn ) {

        // Prompt user to input data in console.
        // printf( question )

        // function readable( data ) {
            // fn( data )
            // process.stdin.off( 'readable', fn )
        // }

        // When user input data and click enter key.
        // process.stdin.on( 'readable', fn )
    }

    check_if_target_directory_is_defined() {

        let is_defined = !!target_directories

        if( !is_defined ) {

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })

            rl.question(`Please type the directory that you want to use as your home: (e.g /home/user/brain or C:\User\May\Brain)`, data =>  {

                let exists     = fs.existsSync( data )
                    if( !exists ) {
                        // printf( `ERROR: "${data}" does not exist` )
                        process.exit( 0 )
                    }

                // Get this file's content
                    let content    = fs.readFileSync( __filename, "utf8" )

                // BUGFIX: /home/usb = /home/usb/
                    data[data.length -1] === "/" ? data : data = data + "/"

                // Actually replaces it
                    let normalized = content.replace(`target_directories=""`, `target_directories="${data}"`)

                // Write
                    fs.writeFileSync( __filename, normalized )

                // Close prompt
                    rl.close()
            })

            // rl.on("close", function() { process.exit( 0 ) })

            // this.prompt( `Please type the directory that you want to use as your home: (e.g /home/user/brain C:\User\May\Brain)`, data => {
            // })
        }

    }

    setup() {

        this.check_if_target_directory_is_defined()
        this.listen()

        /*
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
            */

    }

    tui() {

        let screen  = blessed.screen()
        let line    = contrib.line(
            { style:
                { line: "yellow"
                    , text: "green"
                    , baseline: "black"}
                , xLabelPadding: 3
                , xPadding: 5
                , label: 'Title'}
        )
        let data = {
            x: ['t1', 't2', 't3', 't4'],
            y: [5, 1, 7, 5]

        }
        screen.append(line) //must append before setting data
        line.setData([data])

        screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        })

        screen.render()
    }

    run( brain, payload ) {

        if( brain === "ui" ) {
            this.tui()
            return
        }

        if( brain === "first" || brain === "f" )  {
            // printf( "first -> payload -> ", payload )
        } else if( brain === "second" || brain === "s" ){
            // printf( "second -> payload -> ", payload )
        }

        /*
        if( command === 'add' || command === 'ad' || command === 'a' || ( command && !payload ) ) {
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
        */

    }

    show_link( payload ) {
        // printf( "this.graph.getNode( payload ) -> ", this.graph.getNode( payload ) )
    }

    show_tags( payload ) {
        // let node        = this.graph.getNode( payload )
        // printf( node.data.tags )
    }

    show_journal() {

        let today_date  = get_daily_note_format()

        let file
        try {
            file        = fs.readFileSync( `${this.target_directory}/${today_date}.md`, "utf8" )
            // printf( file )
        } catch( e ) {
            // printf( `Creating journal for: ${today_date} ...` )
            fs.writeFileSync( `${this.target_directory}/${today_date}.md`, today_date )
            file        = fs.readFileSync( `${this.target_directory}/${today_date}.md`, "utf8" )
            // printf( file )
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
                        // printf( `${payload} Created!!` )
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
