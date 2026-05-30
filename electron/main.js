const { app, BrowserWindow,ipcMain ,dialog } = require('electron')

const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation:true,
      nodeIntegration:false
    }
  })
  ipcMain.handle('select-repo',async()=>{
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    });
    console.log(result.canceled)
    if (result.canceled){
      return null
    }
    return result.filePaths[0]
  })

  win.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
  createWindow()
}) 