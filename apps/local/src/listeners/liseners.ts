interface ListenerI {
  channel: string;
  callback: (data?: any) => any;
}

export const listeners: ListenerI[] = [
  {
    channel: 'ping',
    callback: () => {
      return 'pong';
    },
  },
];
