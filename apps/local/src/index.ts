import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  try {
    // Try to load the Next.js app
    await mainWindow.loadURL('http://localhost:3000');
  } catch (e) {
    // If the Next.js app is not available, load a local fallback HTML file
    const fallbackPath = path.join(__dirname, 'loading.html');
    const fallbackUrl = new URL(`file://${fallbackPath}`);
    await mainWindow.loadURL(fallbackUrl.toString());
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
