'use strict'

import printf                                       from "@/functions/printf.js"

// import { app, protocol, BrowserWindow, ipcMain, dialog, globalShortcut, remote } from 'electron'
import { app, protocol, Tray, nativeImage, BrowserWindow, BrowserView, ipcMain, dialog, globalShortcut, remote } from 'electron'

import electron from "electron"

// import Store from "electron-store"

// FEATURE: in-page-search v1
    import searchInPage from 'electron-in-page-search';

    // globalShortcut.register('Control+f', () => { });

    ipcMain.on("ctrl+f", (event, arg)=>{
        event.sender.send('on-find')
        // let findInPage = new FindInPage( electron.remote.getCurrentWebContents() )
        // findInPage.openFindWindow()
        // const inPageSearch = searchInPage( remote.getCurrentWebContents() )
        // inPageSearch.openSearchWindow()
        // const inPageSearch = searchInPage( remote.getCurrentWebContents() )
        // inPageSearch.openSearchWindow();
    })

    // v2
        // const schema = {
            // defaultKeyCombination: {
                // type: 'string',
                // default: 'Control+f'
            // }
        // }
        // const store = new Store({schema})

const contextMenu = require('electron-context-menu');

contextMenu({

    showCopyImageAddress: true,
    showSaveLinkAs:       true,
    showLearnSpelling:    true,
    showCopyImage:        true,
    showSaveImageAs:      true,
    showSaveImage:        true,
	prepend: (defaultActions, parameters, browserWindow) => [
		{
			label: `Rainbow`,
			visible: parameters.mediaType === "image",
            onClick: function(){
                printf( "wdqndwoiqnwd" )
            },
		},
		{
			label: `Search lll for <>`,
			/// visible: parameters.selectionText.trim().length > 0,
			click: (event) => {
                // console.log( ">>>> " )
                // printf( "event -> ", event )
                // event.sender.send( 'example' )
                // printf( "defaultActions -> ", defaultActions )
                // printf( "parameters -> ", parameters )
                // printf( "browserWindow -> ", browserWindow )
                // printf( "LLLL" )
                // shell.openExternal()
			}
		}
	]
})


// const app           = electron.app
    // const protocol      = electron.protocol
   // const BrowserWindow = electron.BrowserWindow
    // const ipcMain       = electron.ipcMain
    // const dialog        = electron.dialog
    // const globalShortcut= electron.globalShortcut
    // const remote        = electron.remote

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// const createProtocol = require('vue-cli-plugin-electron-builder/lib').createProtocol

// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

import path from 'path'
// const path = require('path')

// import os from "os"
const os = require("os")

// import child_process from "child_process"
const child_process = require("child_process")

// const PDFWindow     = require('electron-pdf-window')
const isDevelopment = process.env.NODE_ENV !== 'production'

    // app.quit()
// ipcMain.on("ctrl+f", (arg)=>{
    // let findInPage = new FindInPage( remote.getCurrentWebContents() )
    // findInPage.openFindWindow()
// })

// globalShortcut.register('Controlo+f', () => {
    // window.webContents.send('on-find');
    // ipcMain.send( "ctrl-f" )
// });

// Open native file dialog for selecting file[s] an directorie[s]
ipcMain.on("open-file-dialog", async (event, arg) => {
    let is_linux_or_windows = os.platform() === 'linux' || os.platform() === 'win32'
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    event.sender.send('selected-file', result.filePaths )
})


// Open native file dialog for selecting file[s] an directorie[s]

/*
ipcMain.on( "open-pdf", async ( event, arg ) => {
    printf( "open-pdf -> arg -> ", arg )
    // open_pdf( arg )

    const win = new PDFWindow({
        width: 800,
        height: 600
    })
    // win.loadURL('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')
    // let final = `app://${arg}`

    let final = arg
    printf( "final ->>>>>> ", final )

    // printf( "remote.BrowserWindow -> ", remove.BrowserWindow )
    // win.loadURL( final )

    win.loadURL('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf')
})
*/


ipcMain.on( "item", async ( event, payload ) => {

    let is_linux   = os.platform() === 'linux'
    let is_windows = os.platform() === 'win32'

    let op       = payload.op
    let path     = payload.path
    printf( "op -> ", op )
    printf( "path -> ", path )

    if( op === "delete" ) {
        child_process.exec( `notify-send "${path}" ` )
        if( is_linux ) child_process.exec( `gvfs-trash "${path}" ` )
        if( is_windows ) child_process.exec( `del "${path}" ` )
    }

    if( op === "read" ) {
        if( is_linux ) child_process.exec( `xdg-open "${path}" ` )
        // if( is_windows ) child_process.exec( `start "${path}" ` )
        if( is_windows ) child_process.exec( ` Start-Process ((Resolve-Path "C:${path}").Path) ` )
    }

})



ipcMain.on( "execute-zir", async ( event, payload ) => {

    let dir = payload.dir
    // child_process.exec( "o=$(pwd); notify-send \"Here: dir($o) path($ZETTELKASTEN_PATH)\" " )

    child_process.exec( `bash ${dir}/due-cervelli.sh "z" "open" ` )
    // child_process.exec( `bash ${dir}/zir.sh "z" "open" ` )

    // child_process.exec( `bash ${dir}/zir.sh "ir" "topic" ` )
    // child_process.exec( `bash ${dir}/zir.sh "ir" "write" ` )
    // child_process.exec( `bash ${dir}/zir.sh "ir" "delete" ` )
    // child_process.exec( `bash ${dir}/zir.sh "ir" "query" ` )
    // child_process.exec( `bash ${dir}/zir.sh "ir" "scan" ` )
    // child_process.exec( `bash ${dir}/zir.sh "ir" "last" ` )
    // child_process.exec( `bash ${dir}/zir.sh "ir" "read" ` )
    // child_process.exec( `bash ${dir}/zir.sh "ir" "-" ` )
    // child_process.exec( `bash ${dir}/zir.sh "ir" "+" ` )
})


/*
function open_pdf( filePath ) {

    printf( "remote.BrowserWindow -> ", remote.BrowserWindow )
    let pdfWindow = new remote.BrowserWindow({
        icon: '',
        width: 1200,
        height: 800,
        webPreferences: {
            plugins: true
        }
    })

    pdfWindow.loadURL( url.format({
        pathname: filePath,
        protocol: 'file:',
        slashes: true
    }) )

    pdfWindow.setMenu( null )

    pdfWindow.on("closed", function () {
        pdfWindow = null
    })
}
*/



// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

protocol.registerSchemesAsPrivileged([ { scheme: 'atom', privileges: { secure: true, standard: true } } ])

// protocol.registerSchemesAsPrivileged([ { scheme: 'file', privileges: { secure: true, standard: true } } ])



// protocol.interceptHttpProtocol('file', (request, callback) => {
    // const url = request.url.substr(8)
    // printf( "url -> ", url )
    // callback({url: 'http://example.com/' + url})
// }, (error) => {
    // if (error) console.error('Failed to register protocol')
// })

function is_dev() {
    return process.mainModule.filename.indexOf('app.asar') === -1;
}

if( !is_dev() ) { // disable in prod?
    electron.Menu.setApplicationMenu( null )
}

app.whenReady().then(() => {

    // protocol.registerFileProtocol('atom', (request, callback) => {
    // protocol.registerFileProtocol('file', (request, callback) => {

    protocol.registerFileProtocol('file', (request, callback) => {
        let url = request.url.substr(7)
        printf( ">>> file -> url -> -> ", url, requrest.url )
        // todo,
        let normalized_url = path.normalize(url)
        printf( "> file -> normalized_url -> ", normalized_url )
        // callback()
        // callback({ path: path.normalize(`${url}`) })
        callback({ path: normalized_url })
    }, err => {
        if( err ) console.error( "ERROR: Could not register file:// protocol" )
    })

    // const electron      = require( "electron" )
    // globalShortcut.register(store.get('defaultKeyCombination'), () => {
    globalShortcut.register('Control+f', () => {
        window.webContents.send('on-find');
    });
    // globalShortcut.register(store.get('defaultKeyCombination'), () => {
        // const inPageSearch = searchInPage( electron.remote.getCurrentWebContents() )
        // inPageSearch.openSearchWindow();
    // })

      const icon = nativeImage.createFromDataURL('data:image/png;base64,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')

    let tray = new Tray( icon )
        tray.setToolTip( "Ilse Langnar's Notebook" )

    protocol.registerFileProtocol('app', (request, callback) => {

        let url = request.url.substr(5)
        console.log( "app: url -> ", url )

        const normalized_url = decodeURIComponent(url)

        callback({ path: path.normalize(`${normalized_url}`) })

    }, err => {
        if( err ) console.error( "ERROR: Could not register file:// protocol" )
    })

    protocol.registerFileProtocol('atom', (request, callback) => {
        const url = request.url.substr(6)
        console.log( "atom: url -> ", url )
        let normalized_url = decodeURI(path.normalize(url))
        console.log( "atom: normalize -> ", normalized_url )
        // callback( normalized_url )
        callback({ path: normalized_url })
    })

})


async function createWindow() {

    // Create the browser window.
    const win = new BrowserWindow({
        // kiosk: true,
        // frame: true
        width: 800,
        height: 600,


        minimizable: true,
        maximazable: true,
        closable: true,
        skipTaskbar: true,

        transparent: true,
        titleBarStyle: 'hidden', // MacOS( hide title, keep buttons )
        frame: false,

        // transparent: false,
        // frame: false,

        backgroundColor: 'transparent',
        icon: path.join( __dirname, 'assets/logo.png' ),

        // alwaysOnTop: true,
        // focusable: false, //THIS IS THE KEY



        webPreferences: {
            spellcheck: true,
            webSecutity: false,
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            // contextIsolation: false,
            enableRemoteModule: true,
            // enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),

        }
    })

    win.on( "focus", event => {
        event.sender.send( "focus" )
    })

    win.on( "blur", event => {
        event.sender.send( "blur" )
    })

    win.webContents.on('did-finish-load',() => {
        win.setTitle( "Ilse Langnar's Notebook" )
    });



    /*
    app.on('browser-window-blur', function (event, browserWindow) {
    })

    app.on('browser-window-focus', function (event, browserWindow) {
    })
    */

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        printf( "!!!!" )
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

}

/*
electron.protocol.interceptFileProtocol('file', function (request, callback) {

    printf( "request -> ", request )
    printf( "callback -> ", callback )
    console.log(request.url.substr(8) )

}, function (err) {

    if (err) console.error('Failed to register protocol');
});
*/

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

    // BUGFIX: Allow transparent for linux
    if( process.platform === "linux" ) {
        app.commandLine.appendSwitch('enable-transparent-visuals');
        // app.disableHardwareAcceleration();
    }

    // app.commandLine.appendSwitch('disable-site-isolation-trials')
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            // await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
