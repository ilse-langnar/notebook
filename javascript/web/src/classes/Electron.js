import printf                           from "@/classes/printf.js"

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
            printf( "details -> ", details )
            printf( "details.requestHeaders -> ", details.requestHeaders )
            printf( "1" )
            printf( "details.requestHeaders -> ", details.requestHeaders )
            printf( "details.requestHeaders -> ", details.requestHeaders.Origin )
            details.requestHeaders.Origin = null;
            // details.requestHeaders['Origin'] = null;
            printf( "2" )
            printf( "details.headers -> ", details.headers )
            details.requestHeaders['Access-Control-Allow-Origin'] = [ 'https://github.com'  ];
            // details.responseHeaders['Access-Control-Allow-Origin'] = [ 'http://localhost:3000'  ];

            // details.headers['Origin'] = null; printf( "2" )
            printf( "3" )
            callback({ requestHeaders: details.requestHeaders  })
            printf( "4" )

        });

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
