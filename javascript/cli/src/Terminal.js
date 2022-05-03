const printf            = console.log

// Lib[s]
    var blessed         = require('blessed')
    var contrib         = require('blessed-contrib')

// Classes
    const Utils         = require( "./utils" )

class Terminal {

    constructor( rows = 12 , columns = 12 ) {

        this.screen             = blessed.screen({
            smartCSR: true,
            debug: true,
            label: "Title",
            autoPadding: true,
            dump: __dirname + "/log.log"
        })
        this.screen.title       = 'Title'

        this.grid               = new contrib.grid({
            rows: rows,
            cols: columns,
            screen: this.screen
        })

        this.boxes              = []
        this.utils              = new Utils()

        this.listen_screen()

    }

    listen_screen() {

        // this.screen.key(['escape', 'q', 'C-c', 'C-d'], function(ch, key) {
        this.screen.key(['escape', 'C-c', 'C-d'], function(ch, key) {
            return process.exit(0)
        })

    }

    key( event, fn ) {
        this.screen.on( event, fn )
    }

    add({ id,
        type,
        options = {
            mouse: true,
            inputOnFocus: true,
            style: {
                border: {type: "line", fg: "cyan"},
                focus: {
                    border: { type: 'line', fg: 'white' }
                },
            }
        },
        width,
        height,
        x,
        y,
        config,
    }) {

        let box_type    = this.get_type(type)
        let grid_box    = this.grid.set( y, x, height, width, box_type, options )


        grid_box.on('focus',function(el) {
            // printf( "focus -> el -> ", el )
        })

        if( config.focus_on_click ) {

            grid_box.on('click',function(el) {
                grid_box.focus()
            })

        }

        // grid_box.on('focus',function(el){
        // grid_box.on('element focus',function(el){
            // :process.exit( 0 )

            // this.screen.debug( "el", el )


            // el.parent.border.fg = 'red';
            // el.border.fg = 'red';

            // this.screen.render();

        // })



        let box         = {
            id,
            ...grid_box
        }

        this.boxes.push( box )

        this.screen.render()

        return grid_box
    }

    get_type( string ) {

        if( string === 'tree' ) {
            return contrib.tree
        } else if( string === 'textarea' ) {
            return blessed.textarea
        } else if( string === 'table' ) {
            return contrib.table
        } else if( string === 'button' ) {
            return blessed.button
        } else if( string === 'markdown' ) {
            return contrib.markdown
        } else if( string === 'box' ) {
            return blessed.box
        } else if( string === 'map' ) {
            return contrib.map
        }

        throw new Error( "Grid.js -> get_type( <string> ) -> <string> is not defined" )
    }

}

module.exports = Terminal
