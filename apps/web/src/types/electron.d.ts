declare module 'electron' {
  global {
    interface Window {
      electron: {
        send: (channel: string, message: any) => void;
        receive: (channel: string, callback: (message: any) => void) => void;
        removeListener: (channel: string) => void;
      };
    }
  }
}
