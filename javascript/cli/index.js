#!/usr/bin/env node

const printf        = console.log

    const envPaths      = require('./libs/env-paths.js')
    const get_date_id   = require('./libs/get-date-id.js')
    const readline      = require("readline");
    const prompt        = require("prompt");
    const fs            = require('fs')
    const path          = require('path')
    const env_paths     = envPaths('ilse', { suffix: "" })
    const print_options = require("./src/print_options.js")

    const get_note_id   = require("./src/get_note_id.js")


// Quine
let target_directories
    target_directories=""

let target_directory = target_directories ? target_directories.split("|")[0] : null

class Ilse {

    constructor() {

        this.commands           = process.argv.splice(2)
        this.command            = this.commands[0]
        this.payload            = this.commands[1]
        this.exec( this.command, this.payload )
    }

    before_exec() {
        this.check_for_default_files()
    }

    async exec() {

        this.before_exec()
        let has_command         = this.commands.length


        if( has_command ) {
            this.run( this.command, this.payload )
        } else {
            print_options()
        }

    }

    check_for_default_files() {

        if( !target_directory ) {
            this.ask_for_dir()
        } else {


            let url       = path.join( target_directory, "notes" )
            let has_notes = fs.existsSync( url )
            if( !has_notes ) {
                fs.writeFileSync( url, "20200509021657-k2w43agd: Hello, World. I'm your first note here (:" )
            }

        }

    }

    ask_for_dir() {

        let is_defined = !!target_directories
        if( !is_defined ) {
            printf( `You have not configured a directory where ilse will works, please use: "ilse set <directory>)" or "ilse set ." or "ilse set /home/example/Desktop/here" `)
        }

    }

    run( command, payload ) {

        if( command === "ui" ) {
            // this.tui()
            printf( "Not Supported, Comming Soon ..." )
            return
        }

        if( command === "search" || command === "s" ) {
            let notes = fs.readFileSync( path.join( target_directory, "notes" ) )
            let list = notes.toString().split("\n")
            list.map( item => {
                if( item.indexOf( payload ) !== -1 ) printf( item )
            })

        }

        if( command === "set" ) {

            let data = payload
            if( process.platform === "linux" ) data[data.length -1] === "/" ? data : data = data + "/" // BUGFIX: /home/usb = /home/usb/

            let content    = fs.readFileSync( __filename, "utf8" ) // Get this file's content
            let normalized = content.replace(`target_directories=""`, `target_directories="${data}"`) // Actually replaces it
            fs.writeFileSync( __filename, normalized )
        }

        if( command === "a" || command === "add" ) {
            if( !payload ) return
            let notes  = fs.readFileSync( path.join( target_directory, "notes" ) ).toString()
            let chunks = notes.split("\n")
            let ready  = `${get_note_id()}: ${payload}`
            chunks.push( ready )
            fs.writeFileSync( path.join( target_directory, "notes" ), chunks.join("\n") )
        }

        if( command === "locations" || command === "l" ) {
            let directories = target_directories.split("|")
            directories.map( item => { printf( item ) })
        }

    }


    /*
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
        // let shrink_fail = ShrinkFail( blessed, screen )
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

        screen.key('q', function() {
          return screen.destroy();
        });

        screen.render();

    }
    */
}

new Ilse()
