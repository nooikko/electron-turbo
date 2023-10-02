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
  if (process.env.NODE_ENV === 'development') {
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
  } else {
    // Production mode
    const appPath = path.join(__dirname, '..', 'dist', 'web', 'index.html'); // Adjust the path to your built Next.js app
    const appUrl = new URL(`file://${appPath}`);
    await mainWindow?.loadURL(appUrl.toString());
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
