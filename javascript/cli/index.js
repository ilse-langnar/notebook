const printf        = console.log

// Libs
    const envPaths      = require('./libs/env-paths.js')
    const get_date_id   = require('./libs/get-date-id.js')

// blessed
    const Filesystem    = require('./libs/Filesystem.js')
    const Textarea      = require('./libs/Textarea.js')
    const Prompt        = require('./libs/Prompt.js')
    const ScrollableBoxes = require('./libs/ScrollableBoxes.js')
    const ListBar       = require('./libs/ListBar.js')
    const Layout        = require('./libs/Layout.js')
    const ListTable     = require('./libs/ListTable.js')
    const Table         = require('./libs/Table.js')
    const NoAlt         = require('./libs/NoAlt.js')
    const Autopad       = require('./libs/Autopad.js')
    const Terminal      = require('./libs/Terminal.js')
    const Insert        = require('./libs/Insert.js')
    const BigText       = require('./libs/BigText.js')
    const CSR           = require('./libs/CSR.js')
    const DockNoBorder  = require('./libs/DockNoBorder.js')
    const Dock          = require('./libs/Dock.js')
    const Exit          = require('./libs/Exit.js')
    const NestedAttr    = require('./libs/NestedAttr.js')
    const File          = require('./libs/File.js')
    const Form          = require('./libs/Form.js')
    const ObscureSides  = require('./libs/ObscureSides.js')
    const POS           = require('./libs/POS.js')
    const NoWrap        = require('./libs/NoWrap.js') // Like git log
    const Padding       = require('./libs/Padding.js')
    const Shadow        = require('./libs/Shadow.js')
    const ShrinkFail    = require('./libs/ShrinkFail.js')

// Libraries
    // const to_json       = require("ngraph.tojson")
    // const from_json     = require("ngraph.fromjson")
    // const createGraph   = require('ngraph.graph')
    // let stdin = process.stdin;
    const readline      = require("readline");
    var blessed         = require('blessed')
    const fs            = require('fs')
    const path          = require('path')
    const env_paths     = envPaths('ilse', { suffix: "" })


// Quine
let target_directories
    target_directories=""


class Ilse {

    constructor() {

        this.commands           = process.argv.splice(2)
        this.command            = this.commands[0]
        this.payload            = this.commands[1]
        this.target_directory   = null
        this.exe( this.command, this.payload )

        this.setup()
    }

    exe() {

        let has_command         = this.commands.length


        if( has_command ) {
            this.run( this.command, this.payload )
        } else {
            this.print_options()
        }

    }

    print_options() {

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

    }

    get_target_directory() {
        return target_directories.split("|")[0]
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

        }

    }

    setup() {
        this.check_if_target_directory_is_defined()
    }

    tui() {

        if( !target_directories ) return

        var screen = blessed.screen({
            tput: true,
            smartCSR: true,
            autoPadding: true,
            tput: true,
            dockBorders: true,
            fullUnicode: true,
            ignoreLocked: ['C-q'],
            title: 'widget-noalt test',
            noAlt: true,
            // dump: __dirname + '/logs/file.log',
            warnings: true
        });


        // let filesystem = Filesystem( blessed, screen, "" )
        // printf( "index.js -> tui -> filesystem -> ", filesystem )
        // let textarea   = Textarea( blessed, screen )
        // let prompt     = Prompt( blessed, screen, "How old are you??" )
        // let scrollable_box = ScrollableBoxes( blessed, screen )

        // let list_bar       = ListBar( blessed, screen )
        // let no_alt         = NoAlt( blessed, screen )
        // let autopad = Autopad( blessed, screen )
        // let big_text = BigText( blessed, screen )
        // let csr            = CSR( blessed, screen )
        // let dock_no_border = DockNoBorder( blessed, screen )
        // let dock           = Dock( blessed, screen )
        // let exit           = Exit( blessed, screen )
        // let nested_attr    = NestedAttr( blessed, screen )
        // let file = File( blessed, screen, target_directories )
        // let form          = Form( blessed, screen)
        // let obscure_sides = ObscureSides( blessed, screen )
        // let pos = POS( blessed, screen )
        // let no_wrap = NoWrap( blessed, screen )
        // let padding = Padding( blessed, screen )
        // let shadow  = Shadow( blessed, screen )
        let shrink_fail = ShrinkFail( blessed, screen )
        // let insert   = Insert( blessed, screen )
        // let terminal= Terminal( blessed, screen )
        // let list_table     = ListTable( blessed, screen )
        // let table          = Table( blessed, screen )
        // let layout        = Layout( blessed, screen )

        return
        var layout = blessed.layout({
          parent: screen,
          top: 'center',
          left: 'center',
          width: '100%',
          height: '100%',
          border: 'line',
          layout: process.argv[2] === 'grid' ? 'grid' : 'inline',
            keys: true,
          vi: true,
          alwaysScroll: true,
          scrollbar: {
            ch: ' ',
            inverse: true
          },
          style: {
            bg: 'transparent',
            border: {
              fg: 'blue'
            }
          },
        });


        var box1 = blessed.box({
          parent: layout,
          top: 'center',
          left: 'center',
          width: 30,
          height: "98%",
          border: 'line',
          content: 'Lorem   '
        });

        var text = blessed.box({
          parent: layout,
          content: 'hello1\nhello2\nhello3\nhello4',
          padding: 2,
          style: {
            bg: 'red'
          },
          left: 2,
          top: 30,
          width: '50%',
          height: 6
        });




        /*
        if (process.argv[2] !== 'grid') {
          for (var i = 0; i < 10; i++) {
            blessed.box({
              parent: layout,
              // width: i % 2 === 0 ? 10 : 20,
              // height: i % 2 === 0 ? 5 : 10,
              width: Math.random() > 0.5 ? 20 : 20,
              height: Math.random() > 0.5 ? 5 : 10,
              border: 'line',
              content: (i + 1 + 12) + ''
            });
          }
        }
        */

        screen.key('q', function() {
          return screen.destroy();
        });

        screen.render();

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

    }

    show_link( payload ) {
        // printf( "this.graph.getNode( payload ) -> ", this.graph.getNode( payload ) )
    }

    show_tags( payload ) {
        // let node        = this.graph.getNode( payload )
        // printf( node.data.tags )
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

new Ilse()
