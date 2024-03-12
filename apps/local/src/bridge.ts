import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
export const api = {
  // Exposes a method for the renderer to send a message to the main process
  sendMessage: (channel: string, message: string) => {
    ipcRenderer.send(channel, message);
  },

  // Exposes a method for the renderer to receive a message from the main process
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
