const { app, BrowserWindow,ipcMain } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('http://localhost:5173/')
}

app.whenReady().then(() => {
  createWindow()
}) 