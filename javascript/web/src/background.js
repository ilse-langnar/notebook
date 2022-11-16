'use strict'

import printf                                       from "@/functions/printf.js"

// import { app, protocol, BrowserWindow, ipcMain, dialog, globalShortcut, remote } from 'electron'
import { app, protocol, BrowserWindow, ipcMain, dialog, globalShortcut, remote } from 'electron'

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

// Oopen native file dialog for selecting file[s] an directorie[s]
ipcMain.on("open-file-dialog", async (event, arg) => {
    let is_linux_or_windows = os.platform() === 'linux' || os.platform() === 'win32'
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    event.sender.send('selected-file', result.filePaths )
})

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
