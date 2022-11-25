import printf                           from "@/functions/printf.js"

// Ilse
    import ilse                         from "@/ilse.js"

// Messager
    import Messager                     from "@/classes/Messager.js"
    // import electron                     from "electron"

// Node.js
    const path                          = require("path")

let electron

export default class Electron {

    constructor() {

        electron                    = require("electron")
        let _this                   = this
        this.is_focused             = false
        // this.on_focus_change        = []

        this.electron               = electron
        this.ipc                    = electron.ipcRenderer
        this.ipc                    = electron.ipcRenderer

        this.dialog                 = {}
        this.dialog.open = function() { _this.ipc.send( "open-file-dialog" ) }

        this.setup()
    }

    show_cookies() {
        let electron   = require('electron')
        printf( "electron.session -> ", electron.session )
    }

    screenshot( filename = Math.random().toString().replace("0.", "") ) {

        var remote

        printf( "> 1" )
        try {
            printf( "> 2" )
            remote = require('' + 'electron').remote
            printf( "> 3" )
        } catch(e) {
            printf( "> 4" )
            remote = require('' + 'remote')
            printf( "> 5" )
        }

        printf( "> 6" )
        printf( "remote -> ", remote )
        printf( "remote.getCurrentWindow() -> ", remote.getCurrentWindow() )

        remote.getCurrentWindow().capturePage(function handleCapture (img) {
            printf( ' aaaaaaa img -> ', img );
            printf( "filename -> ", filename )
            // remote.require('fs').writeFile( opt.filename, img.toPng(), cb)

        })

    }

    setup_target_folder() {

        this.ipc.send( "open-file-dialog" )

        ilse.electron.ipc.on( "selected-file", ( event , payload ) => {

            // BUGFIX: We should not do anything if it's already defined
            let has_directory     = !!ilse.target_directories.length
                if( has_directory ) return

            // BUGFIX: something wrong with the files
            let path              = payload[0]
                printf( "path -> ", path )
                if( !path ) return

            let list              = []
                list.push( path )
            printf( "list -> ", list )
            let stringified_list  = JSON.stringify( list )

            window.localStorage.setItem( "target-directories", stringified_list )

            ilse.target_directories       = window.localStorage.getItem( "target-directories" )
            setTimeout( () => { window.location.reload() }, 1000 )
        })

    }

    async open_file_dialog() {

        printf( "open_file_dialog 1" )
        this.ipc.send( "open-file-dialog" )
        printf( "open_file_dialog 2" )

        return new Promise((resolve, reject) => {
            printf( "open_file_dialog 3" )

            ilse.electron.ipc.on( "selected-file", ( event , payload ) => {
                try {
                    resolve( event, payload )
                } catch( e ) {
                    reject( e )
                }
            })

        })

    }

    setup() {
        // this.enable_context_menu()
        this.enable_cors()
        this.listen()
    }

    enable_context_menu() {
        const remote       = require('electron').remote;
        const { Menu, MenuItem  } = remote;

        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const menu = new Menu();

            menu.append(new MenuItem(new MenuItem({label: "This menu item is always shown"})));
            menu.append(new MenuItem(new MenuItem({label: "Example 2"})));

            if (e.target.id === "p1" || e.target.id === "p3") {
                menu.append(new MenuItem({
                    label: "This menu is not always shown",
                    click: function(){
                        printf( "HAHAHAHA" )
                    }
                }));
            }

            menu.popup({ window: remote.getCurrentWindow()  })

        }, false)

    }

    enable_cors() {

        const filter = {
            urls: ['*://*.github.com/*']

        };
        const session = electron.remote.session
        session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
            details.requestHeaders.Origin = null;
            // details.requestHeaders['Origin'] = null;
            details.requestHeaders['Access-Control-Allow-Origin'] = [ 'https://github.com'  ];
            // details.responseHeaders['Access-Control-Allow-Origin'] = [ 'http://localhost:3000'  ];
            // details.headers['Origin'] = null; printf( "2" )
            callback({ requestHeaders: details.requestHeaders  })
        });

    }

    select_file( fn ) {


    }

    listen() {

        let _this = this

        this.ipc.on( "focus", () => {
            _this.is_focused = true
            // this.on_focus_change.map( item => item(true) )
        })

        this.ipc.on( "blur", () => {
            _this.is_focused = false
            // this.on_focus_change.map( item => item(false) )
        })

        this.ipc.on( "example", () => {
            printf( "AAAAAAAAAAAAAA" )
        })


        // FEATURE: in-page-search
        const remote       = require('electron').remote;
        const FindInPage   = require('electron-find').FindInPage;
        // const searchInPage = require('electron-in-page-search').default;


        let findInPage = new FindInPage( remote.getCurrentWebContents() )

        this.ipc.on('on-find', (e, args) => {
            // const inPageSearch = searchInPage(remote.getCurrentWebContents());
            // inPageSearch.openSearchWindow();

            findInPage.openFindWindow()
        })


    }

}
