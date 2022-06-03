import {app, BrowserWindow, ipcMain} from 'electron';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

async function createWindow()
{
    mainWindow = new BrowserWindow({
        // icon: path.join(assetsPath, 'assets', 'icon.png'),
        width: 1100,
        height: 700,
        backgroundColor: '#191622',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    });

    await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.on('closed', () =>
    {
        mainWindow = null;
    });
}

async function registerListeners()
{
    ipcMain.on('message', (_, message) =>
    {
        console.log(message);
    });
}

app.on('ready', createWindow)
    .whenReady()
    .then(registerListeners)
    .catch(e => console.error(e));

app.on('window-all-closed', () =>
{
    if(process.platform !== 'darwin')
        app.quit();
});

app.on('activate', async () =>
{
    if(BrowserWindow.getAllWindows().length === 0)
        await createWindow();
});
