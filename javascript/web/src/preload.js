
// import printf                                       from "@/functions/printf.js"

/*
import { ipcRenderer  } from 'electron'
printf( "ipcRenderer -> ", ipcRenderer )
window.ipcRenderer = ipcRenderer
*/


/*
import { contextBridge, ipcRenderer  } from 'electron'

printf( "contextBridge -> ", contextBridge )
printf( "ipcRenderer -> ", ipcRenderer )

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ['toMain']
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel, func) => {
        let validChannels = ['fromMain']
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    }
})
*/
