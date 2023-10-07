import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';  // eslint-disable-line

let mainWindow: BrowserWindow | null = null;

// Function to get the saved window state
const getWindowState = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'window-state.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { width: 1280, height: 860 };
  }
};

// Function to save the window state
const saveWindowState = (state: { width: number; height: number }) => {
  fs.writeFileSync(path.join(__dirname, 'window-state.json'), JSON.stringify(state));
};

const createWindow = async () => {
  const { width, height } = getWindowState();

  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.on('resize', () => {
    if (mainWindow) {
      const [width, height] = mainWindow.getSize();
      saveWindowState({ width, height });
    }
  });

  try {
    if (process.env.NODE_ENV === 'development') {
      await mainWindow.loadURL('http://localhost:5173');
    } else {
      await mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
    }
  } catch (error) {
    console.error('Error loading URL/File:', error); // eslint-disable-line
  }

  // Open devtools in a separate window
  // mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Function to create the window, with ready state checking
const initialize = () => {
  if (app.isReady()) {
    createWindow();
  } else {
    app.whenReady().then(createWindow);
  }
};

initialize();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    initialize();
  }
});
