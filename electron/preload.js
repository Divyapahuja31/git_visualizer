const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  selectRepo:()=> ipcRenderer.invoke("select-repo")

}) 