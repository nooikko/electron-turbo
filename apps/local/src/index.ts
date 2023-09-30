import { app, BrowserWindow, net } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

const checkLocalhostAvailable = async () => {
  return new Promise<boolean>((resolve) => {
    const request = net.request('http://localhost:3000');

    request.on('response', (response) => {
      // Check for the expected response status
      if (response.statusCode === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    request.on('error', () => {
      resolve(false);
    });

    request.end();
  });
};

const loadAppOrFallback = async () => {
  const isAvailable = await checkLocalhostAvailable();

  if (isAvailable) {
    await mainWindow?.loadURL('http://localhost:3000');
  } else {
    const fallbackPath = path.join(__dirname, 'public', 'loading.html');
    const fallbackUrl = new URL(`file://${fallbackPath}`);
    await mainWindow?.loadURL(fallbackUrl.toString());

    // Poll until localhost:3000 is available
    const intervalId = setInterval(async () => {
      if (await checkLocalhostAvailable()) {
        clearInterval(intervalId);
        await mainWindow?.loadURL('http://localhost:3000');
      }
    }, 1000);
  }
};

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  await loadAppOrFallback();

  // Open devtools in a separate window
  mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
