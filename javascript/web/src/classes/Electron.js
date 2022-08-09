const printf                        = console.log

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

        this.listen()
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
