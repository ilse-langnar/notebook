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

        this.electron               = electron
        this.ipc                    = electron.ipcRenderer

        this.dialog                 = {}
        this.dialog.open = function() { _this.ipc.send( "open-file-dialog" ) }
    }

    open_pdf( file ) {
        file = path.join(ilse.target_directories[0] , file)
        this.ipc.send( "open-pdf", file )
    }


}
