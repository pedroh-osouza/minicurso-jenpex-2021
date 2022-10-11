const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron')
const path = require('path')

var win = null
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'script.js')
        }
    })
    win.webContents.openDevTools()
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    getStream()

})

function getStream() {
    desktopCapturer.getSources({ types: ['screen'] }).then(async sources => {
        win.webContents.send('SET_SOURCE', sources[0].id)
    })
}