const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  selectRepo: () => ipcRenderer.invoke("select-repo"),
  getGitHistory: (selectedPath) => ipcRenderer.invoke("get-git-history",
      selectedPath
    ),
});