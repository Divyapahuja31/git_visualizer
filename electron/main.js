const {app,BrowserWindow,ipcMain,dialog,} = require("electron");

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

ipcMain.handle("select-repo", async () => {
  const result =
    await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

  if (result.canceled) {
    return null;
  }
  return result.filePaths[0];
});

ipcMain.handle("get-git-history",async (_, selectedPath) => {
    try {
      const isGitRepo = fs.existsSync( path.join(selectedPath,".git"));
      if (!isGitRepo) {
        return [];}

      const log = execSync(
        `git -C "${selectedPath}" log --all --pretty=format:"%H|%P|%an|%ad|%s" --date=iso`
      ).toString();
      const commits = log.split("\n").filter(Boolean).map((line) => {
          const [hash,parents, author,date,message,] = line.split("|");

          return {hash,parents: parents? parents.split(" "): [],
            author,date,message,};
        });
      return commits;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,

    webPreferences: {
      preload: path.join(
        __dirname,
        "preload.js"
      ),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL(
    "http://localhost:5173"
  );
};

app.whenReady().then(() => {
  createWindow();
});