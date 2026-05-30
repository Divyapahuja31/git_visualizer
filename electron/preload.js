const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  getData: (repoPath) => ipcRenderer.send('get-data', repoPath)
}) 